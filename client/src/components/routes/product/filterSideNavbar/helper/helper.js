import history from "../../../../../history";
import log from "loglevel";

export const compareURLWithFilterQuery = (filterQuery) => {
    if(!filterQuery) {
        return -1
    }
    const uri = history.location.search.split("q=")

    if(uri.length === 2) {
        return uri[1].localeCompare(`${filterQuery}`)
    }
    return -1
}

export const sortByObjValues = (list) => {
    let cloneList = JSON.parse(JSON.stringify(list));

    return cloneList.sort((a, b) =>
        (a.value.charAt(0).toUpperCase() > b.value.charAt(0).toUpperCase()) ? 1 : -1)
}