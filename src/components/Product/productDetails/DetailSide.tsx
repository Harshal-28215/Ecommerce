import React from 'react'
import Description from './Description'
import Bestoffers from './Bestoffers'
import ProductDetail from './ProductDetail'
import Feature from './Feature'
import Size_Material from './Size_Material'

function DetailSide() {
    return (
        <aside className="w-[50%] px-3">
            <Description />
            <Bestoffers />
            <ProductDetail />
            <Feature />
            <Size_Material />
        </aside>
    )
}

export default DetailSide
