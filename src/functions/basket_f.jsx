


export let addToBasket = (newProd, prodsInBasket, setprodsInBasket, quantity) => {
    let isInArray = false
    prodsInBasket.forEach(item => {
        if (item.id == newProd.id) {
            isInArray = true
        }
    })
    if (!isInArray) {
        newProd.quant = quantity
        newProd.totalSum = newProd.quant * newProd.price
        setprodsInBasket([...prodsInBasket, newProd])
    }
}

export let addQuant = (newQuant, ID, prodsInBasket, setprodsInBasket) => {
    console.log(newQuant, ID)
    let arrProds = prodsInBasket
    arrProds.forEach(a => {
        if (a.id == ID) {
            a.quant = newQuant
            a.totalSum = a.price * newQuant
        }
    })
    console.log(arrProds)
    setprodsInBasket([...arrProds])
}

export let removeProd = (ID, prodsInBasket, setprodsInBasket) => {
    let arr = prodsInBasket.filter(prod => {
        if (prod.id === ID) {
            return false
        } else {
            return true
        }
    })
    setprodsInBasket([...arr])
}