import React from 'react'
import "../../assets/css/Shop.css"
import { useState } from 'react'
import OneProd from '../../components/productsList/oneProd/oneProd'
import RangeSlider from '../../components/ui/priceFilter/priceFilter'
import { BsSearch, BsFilterSquare } from "react-icons/bs";
import { useEffect } from 'react'
import Loading from '../../components/ui/Loading/Loading'


export default function Shop({ prods, categs }) {

  let getMaxAndMinPrices = () => {
    let max = prods.reduce((acc, curr) => acc.price > curr.price ? acc : curr);
    let min = prods.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
    return [min.price, max.price]
  }

  let [sortQuery, setsortQuery] = useState({
    categFilter: [],
    minPrice: null,
    maxPrice: null,
  })

  let setCategfilter = (e) => {
    if (e.target.checked) {
      setsortQuery({ ...sortQuery, categFilter: [...sortQuery.categFilter, e.target.value] })
    } else {
      let categNum = sortQuery.categFilter.indexOf(e.target.value)
      let newObj = sortQuery
      if (categNum !== -1) {
        newObj.categFilter.splice(categNum, 1);
      }
      setsortQuery({ ...newObj })
    }
  }
  let setPriceFilter = (newValue) => {
    let newObj = sortQuery
    newObj.minPrice = newValue[0]
    newObj.maxPrice = newValue[1]
    setsortQuery({ ...newObj })
  }

  let [filteredProds, setfilteredProds] = useState(prods)
  let [filteredAndSearchedProds, setfilteredAndSearchedProds] = useState(filteredProds)
  let [searchQuery, setsearchQuery] = useState('')
  let [loadingSearchProds, setloadingSearchProds] = useState(false)

  useEffect(() => {
    let arr = prods
    sortQuery.categFilter.forEach(categ => {
      arr = arr.filter((prod) => {
        return prod.category.includes(categ)
      })
    });
    if (sortQuery.minPrice !== null && sortQuery.maxPrice !== null) {
      arr = arr.filter((a) => {
        if (a.price >= sortQuery.minPrice && a.price <= sortQuery.maxPrice) {
          return true
        }
      })
    }
    setfilteredProds([...arr])
    SearchPosts(searchQuery, arr)
  }, [sortQuery, searchQuery])

  let SearchPosts = (searchQuery, filteredProds) => {

    let a = filteredProds.filter((prod) => {
      if (prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || prod.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true
      } else {
        return false
      }
    })
    setfilteredAndSearchedProds([...a])

    setloadingSearchProds(false)
  }

  let [openNavMenu, setopenNavMenu] = useState(false)

  return (
    <main className="main">
      <h1>Магазин</h1>
      <div className="shopContent">
        <div className="shopContent_search">
          <input type="text" placeholder="Поиск товаров..." onChange={(e) => { setloadingSearchProds(true); setsearchQuery(e.target.value); }} />
          <div className="searchIcon">
            {(loadingSearchProds) ? <Loading /> : <BsSearch /> }
          </div>
        </div>

        <div className="shopContent_filtersAndProds">
          <h3 className="openFilters" onClick={() => { setopenNavMenu(!openNavMenu) }}><BsFilterSquare/></h3>
          
          <div className={"shopContent_filters " + ((openNavMenu) ? "show_nav" : "")}>

            <div className="nav_close" onClick={() => { setopenNavMenu(!openNavMenu) }}>&#10006;</div>

            <div className="oneFilter sortQuery_categFilter_w">
              <h3>Сортировать по категориям:</h3>

              <div className="sortQuery_categFilter">
                {Object.entries(categs).map((a) => {
                  return (
                    <div key={a[0]} className="oneCategFilter">
                      <input type="checkbox" value={a[0]} id={a[0]} onChange={(e) => { setCategfilter(e) }} />
                      <label htmlFor={a[0]}>{a[1].categName}</label>
                    </div>
                  )
                })}
              </div>

            </div>

            <div className="oneFilter sortQuery_priceFilter">
              <h3>Сортировать по цене:</h3>

              <RangeSlider 
                setPriceFilter={setPriceFilter}
                getMaxAndMinPrices={getMaxAndMinPrices}
              />
            </div>

          </div>

          <div className="shopContent_Prods">
            {(filteredAndSearchedProds.length > 0)
              ?
              (filteredAndSearchedProds.map((prod) => {
                return (
                  <OneProd
                    key={prod.id}
                    prod={prod}
                  />
                )
              }))
              :
              <h3>Нет товаров удовлетворяющих условиям поиска</h3>
            }
          </div>
        </div>
      </div>
    </main>
  )
}