

export const toggleId = (id, value, list) => {
    let valueExist = false
    let ids = []

    // eslint-disable-next-line array-callback-return
    let filteredList = list.filter(obj => {
        if (obj.id !== id) {
            ids.push(obj.id)
            return obj;
        }
        valueExist = true
    })

    if (valueExist) {
        return {list: filteredList, ids}
    } else {
        ids.push(id)
        list.push({id: id, value: value});
        return {list, ids}
    }
}