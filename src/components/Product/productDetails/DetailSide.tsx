import React from 'react'
import Description from './Description'
import Bestoffers from './Bestoffers'
import ProductDetail from './ProductDetail'
import Feature from './Feature'
import Size_Material from './Size_Material'
import Specification from './Specification'

type DeatailSideDataProp = {
    _id: string,
    ProductDetails: string,
    sizeAndFit: string,
    materialAndCare: string,
    ProductId: {
        _id: string,
        name: string,
        description: string,
        price: number,
        category: string,
        cardImage:{
            data:string,
            contentType:string
        }
    },
    specifications: [{
        title: string,
        about: string,
        _id: string
    }]
}

function DetailSide({ DeatailSideData }:{DeatailSideData:DeatailSideDataProp}) {
    return (
        <aside className="w-[50%] px-3">
            <Description Product={DeatailSideData.ProductId}/>
            <Bestoffers />
            <ProductDetail ProductDetails={DeatailSideData.ProductDetails}/>
            <Feature />
            <Size_Material sizeAndFit={DeatailSideData.sizeAndFit} materialAndCare={DeatailSideData.materialAndCare}/>
            <Specification specifications={DeatailSideData.specifications}/>
        </aside>
    )
}

export default DetailSide
