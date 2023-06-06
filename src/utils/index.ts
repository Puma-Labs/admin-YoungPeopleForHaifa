export function getStatus(status: string) {
    return status === 'show' ? 'Active' : 'Archive'
}

export function getUrl({status, page, search, order} : {status: string[], page: number, search: string, order?: number}) {
    let url = ''
    if (typeof status !== 'undefined') {
        url = '?status=' + status.join(',')
    }
    if (typeof page !== 'undefined') url += `&page=${page}`
    if (search) url += `&search=${search}`
    if (order) url += `&order=${order}`
    console.log(url);
    return url;
}
