


export let getShortString = (str, q) => {
    let arr = str.split(' ')
    let newArr = []
    for (let i = 0; i < q; i++) {
        newArr.push(arr[i])
    }
    if (arr.length > q) {
        newArr[newArr.length - 1] += '...'
    }
    return newArr.join(' ')
}