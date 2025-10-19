import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css';
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';


function ResetPassword() {

    const { success, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // console.log(useParams()); // useParams => Hook
    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set("password", password);
        // myForm.set("confirmPassword", confirmPassword);
        // for (let pair of myForm.entries()) {
        //     console.log(pair[0] + '-' + pair[1]);
        // }
        const data = {
            password,
            confirmPassword
        }
        dispatch(resetPassword({ token, userData: data }));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])

    useEffect(() => {
        if (success) {
            toast.success("Password reset Successfully!", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/login");
        }
    }, [dispatch, success])

    return (
        <>
            <PageTitle title="Reset Password" />
            <div className="container form-container">
                <div className="form-content">
                    <form className='form' onSubmit={resetPasswordSubmit}>
                        <h2>Reset Password</h2>
                        <div className="input-group">
                            <input type="password" name='password' placeholder='Enter your new password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <input type="password" name='confirmPassword' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button className="authBtn">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword