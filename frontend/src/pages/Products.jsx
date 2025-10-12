import React, { useEffect, useState } from 'react';
import '../pageStyles/products.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProducts from '../components/NoProducts';
import Pagination from '../components/Pagination';

function Products() {
    const { loading, error, products, resultsPerPage, productCount } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getProduct({keyword, page:currentPage}));
    }, [dispatch, keyword, currentPage])
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])
    const handlePageChange = (page)=>{
        if(page !== currentPage){
            setCurrentPage(page);
            const newSearchParams = new URLSearchParams(LocalGasStation.search);
            if(page === 1){
                newSearchParams.delete('page');
            }else{
                newSearchParams.set('page', page);
            }
            navigate(`?${newSearchParams.toString()}`)
        }
    }
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
                        {products.length>0?(<div className="products-product-container">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>):(
                            <NoProducts keyword={keyword}/>
                        )}
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default Products