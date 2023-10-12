import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailComponent from '~/component/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
    const { id } = useParams();
    return (
        <div>
            <ProductDetailComponent idProduct={id} />
        </div>
    );
};
export default ProductDetailPage;
