import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/admin/products');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error While Fetching the products');
    }
})

// Create Products
export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/admin/product/create', productData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Product Creation Failed');
    }
})

// Update Products
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Product Update Failed');
    }
})

// Delete Products
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (productId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
        return { productId };
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Product Delete Failed');
    }
})

// Fetch all Users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/users`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Fetch Users');
    }
})

// Get Single User
export const getSingleUser = createAsyncThunk('admin/getSingleUser', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Fetch Single User');
    }
})

// Update User role
export const updateUserRole = createAsyncThunk('admin/updateUserRole', async ({userId,role}, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/user/${userId}`,{role});
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Update User Role');
    }
})

// Delete User 
export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Delete User');
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null,
        product: {},
        deleting: {},
        users: [],
        user: {},
        message:null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        clearMessage:(state)=>{
            state.message=null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error While Fetching the products';
            })

        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.products.push(action.payload.product);
                console.log(state.products);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Product Creation Failed';
            })

        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Product Update Failed';
            })

        builder.addCase(deleteProduct.pending, (state, action) => {
            const productId = action.meta.arg;
            state.deleting[productId] = true;
        })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productId = action.payload.productId;
                state.deleting[productId] = false;
                state.products = state.products.filter(product => product._id !== productId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                const productId = action.meta.arg;
                state.deleting[productId] = false;
                state.error = action.payload?.message || 'Product Deletion Failed';
            })

        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Fetch Users';
            })

        builder.addCase(getSingleUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Fetch Single User';
            })

        builder.addCase(updateUserRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Update User Role';
            })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Delete User';
            })
    }
})

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;