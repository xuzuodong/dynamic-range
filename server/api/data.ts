import { DomUtils, ElementType, parseDocument } from 'htmlparser2'
import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'

import type { DataNode, Element } from 'domhandler'
import type { Node } from '@babel/traverse'
import type { ArrayExpression, ObjectProperty, UnaryExpression } from '@babel/types'

// https://github.com/babel/babel/issues/13855
const traverse = (_traverse as unknown as { default: typeof _traverse }).default

export function astToObject(node: Node): any {
    switch (node.type) {
        case 'ArrayExpression':
            return (node as ArrayExpression).elements.map(element => astToObject(element))
        case 'ObjectExpression':{
            const obj: Record<string, any> = {}
            node.properties.forEach((property: ObjectProperty) => {
                const key = property.key.name || property.key.value
                obj[key] = astToObject(property.value)
            })
            return obj
        }
        case 'StringLiteral':
        case 'NumericLiteral':
        case 'BooleanLiteral':
            return node.value
        case 'NullLiteral':
            return null
        case 'UnaryExpression':
            if ((node as UnaryExpression).operator === '-')
                return -astToObject(node.argument)
            else
                throw new Error(`Unsupported unary operator: ${node.operator}`)
        default:
            throw new Error(`Unsupported AST node type: ${node.type}`)
    }
}

export default defineCachedEventHandler(async () => {
    const result = await $fetch<string>('https://www.photonstophotos.net/Charts/PDR.htm')

    const rootDOM = parseDocument(result)
    const scriptDOM = DomUtils.find((node) => {
        if (node.type === ElementType.Script && node.attribs.type === 'text/javascript' && !node.attribs.src) {
            const code = (node.children[0] as DataNode).data
            return code.includes('var chart;')
        }
        return false
    }, rootDOM.children, true, 1)[0] as Element

    const javascriptCode = (scriptDOM?.children[0] as DataNode).data
    const ast = parse(javascriptCode)

    let ret
    traverse(ast, {
        enter({ node }) {
            if (
                node.type === 'ObjectProperty'
                && node.key.type === 'Identifier'
                && node.key.name === 'series'
                && node.value.type === 'ArrayExpression'
            ) {
                ret = astToObject(node.value)
            }
        },
    })
    return ret
},
{ maxAge: 15 * 60 * 1000 },
)
