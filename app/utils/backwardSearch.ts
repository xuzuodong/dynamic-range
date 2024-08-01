export function backwardSearch(query: string, target: string) {
    query = query.toLowerCase()
    target = target.toLowerCase()

    let queryIndex = 0
    let targetIndex = 0

    while (queryIndex < query.length && targetIndex < target.length) {
        const queryChar = query[queryIndex]
        const targetChar = target[targetIndex]

        if (queryChar === targetChar) {
            queryIndex++
        }

        targetIndex++
    }

    return queryIndex === query.length
}
