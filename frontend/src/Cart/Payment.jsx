import React from 'react';
import '../CartStyles/Payment.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeErrors } from '../features/products/productSlice';

function Payment() {

  const orderItem = JSON.parse(sessionStorage.getItem('orderItem'));
  const { user } = useSelector(state => state.user);
  const { shippingInfo } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const completePayment = async (amount) => {
    try {

      const { data: keyData } = await axios.get('/api/v1/getKey');
      const { key } = keyData;
      const { data: orderData } = await axios.post('/api/v1/payment/process', { amount });
      const { order } = orderData;
      // Open Razorpay Checkout
      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'SuhanaPendhari',
        description: 'Ecommerce Website Payment Transaction',
        order_id: order.id,
        // callback_url: '/api/v1/paymentVerification',
        handler: async function (response) {
          const { data } = await axios.post('/api/v1/paymentVerification', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          })
          if (data.success) {
            navigate(`/paymentSuccess?reference=${data.reference}`);
          } else {
            alert('Payment verification Failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber
        },
        theme: {
          color: '#3399cc'  // #F37254
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message, {position:'top-center', autoClose:3000});
      dispatch(removeErrors());
    }
  }
  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
        <button className="payment-btn" onClick={() => completePayment(orderItem.total)}>Pay ({orderItem.total})/-</button>
      </div>
      <Footer />
    </>
  )
}

export default Payment