import UAParser from 'ua-parser-js'

const parser = new UAParser()
const result = parser.getResult()

export function useUAParser() {
    return result
}
