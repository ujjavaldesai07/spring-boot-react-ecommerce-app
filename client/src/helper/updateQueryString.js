export const updateQueryString = (history, attributeToUpdate, id, idList) => {
    let route = history.location.pathname
    let queryStr = history.location.search

    if (history.location.search.search(attributeToUpdate) === -1) {
        return `${route}${queryStr}::${attributeToUpdate}=${id}`
    } else {

        let attributes = queryStr.split("::")
        let newQueryStr = []
        for (let i = 0; i < attributes.length; ++i) {
            if (attributes[i].search(attributeToUpdate) !== -1) {
                if (idList.length > 0) {
                    newQueryStr.push(attributes[i].replace(
                        new RegExp(`${attributeToUpdate}=(.*)`),
                        `${attributeToUpdate}=${idList.toString()}`))
                }
                continue
            }
            newQueryStr.push(attributes[i])
        }

        return newQueryStr.join("::")
    }
}