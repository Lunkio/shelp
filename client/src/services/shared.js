export const formatDate = (date) => {
    let modifyDate = date.slice(5,10).split('-').reverse()
    modifyDate.splice(1,0,'.')
    modifyDate.splice(3,0,'.')
    return modifyDate.join('').concat(date.slice(0,4))
}