import React, { useEffect } from 'react';
import '../pageStyles/products.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct } from '../features/products/productSlice';
import Loader from '../components/Loader';

function Products() {
    const { loading, error, products } = useSelector(state => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    return (
        <>
            {(loading ? (<Loader />) : <>
                <PageTitle title="All Products" />
                <Navbar />
                <div className="products-layout">
                    <div className="filter-section">
                        <h3 className="filter-heading">CATEGORIES</h3>
                        {/* Render All Categories */}
                    </div>

                    <div className="products-section">
                        <div className="products-product-container">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default Products