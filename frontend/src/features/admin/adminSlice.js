import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
        const {data} = await axios.get('/api/v1/admin/products');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error While Fetching the products');
    }
})

// Create Products
export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/admin/product/create', productData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Product Creation Failed');
    }
})

// Update Products
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({id,formData}, { rejectWithValue }) => {
    try {
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.put(`/api/v1/admin/product/${id}`, formData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Product Update Failed');
    }
})

const adminSlice=createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
        product:{}
    },
    reducers:{
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.products = action.payload.products;
        })
        .addCase(fetchAdminProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Error While Fetching the products';
        })

        builder.addCase(createProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.products.push(action.payload.product);
            console.log(state.products);
        })
        .addCase(createProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Product Creation Failed';
        })

        builder.addCase(updateProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.product=action.payload.product;
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Product Update Failed';
        })
    }
})

export const {removeErrors, removeSuccess} = adminSlice.actions;
export default adminSlice.reducer;