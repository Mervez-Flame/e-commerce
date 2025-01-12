/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import all_products from './../assets/all_products';
import { ShopContext } from './../context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductHd from './../components/ProductHd';
import ProductDisplay from '../components/ProductDisplay';
import ProductDescription from '../components/ProductDescription';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_products.find((products) => products.id === Number(productId));
    if(!product){ 
        return <div>Product not found! ! !</div>
    }

    return (
        <section className='max_padd_container py-28 bg-primary'>
            <ProductHd product={product}/>
            <ProductDisplay product={product}/>
            <ProductDescription/>
            <RelatedProducts />
        </section>
    )
}

export default Product
