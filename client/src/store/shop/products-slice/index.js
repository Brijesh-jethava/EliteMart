import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading : false,
    productList: [],
    productDetails:null
}


export const fetchAllFilteredProducts = createAsyncThunk(
    '/products/fetchAllProducts',
    async ({ filterParams, sortParams }) => {
   
        // Serialize array values into comma-separated strings
        const serializedParams = {
          ...filterParams,
          category: filterParams.category?.join(',') || '', // Convert array to string
          brand: filterParams.brand?.join(',') || '', // Convert array to string
          sortBy: sortParams,
        };
  
        const query = new URLSearchParams(serializedParams).toString();
       
  
        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
    
        return result.data;
    }
  );

  
export const fetchProductsDetail = createAsyncThunk(
  '/products/fetchProductDetails',
  async (id) => {

    const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
  
      return result.data;
  }
);
  
const shopProductSlice = createSlice({
    name : 'shopingProducts',
    initialState,
    reducers: { 
      setProductDetails: (state, action) => {
        state.productDetails = action.payload; // Use action.payload to allow flexibility
      }
    },
    

    extraReducers : (builder) =>{
       builder.addCase(fetchAllFilteredProducts.pending, (state,action)=>{
        state.isLoading = true;
       }).addCase(fetchAllFilteredProducts.fulfilled, (state,action)=>{
     
        state.isLoading = false;
        state.productList = action.payload.data;
       }).addCase(fetchAllFilteredProducts.rejected, (state,action)=>{
        state.isLoading = false;
        state.productList = [];
       }).addCase(fetchProductsDetail.pending, (state,action)=>{
        state.isLoading = true;
       }).addCase(fetchProductsDetail.fulfilled, (state,action)=>{
        
        state.isLoading = false;
        state.productDetails = action.payload.data;
       }).addCase(fetchProductsDetail.rejected, (state,action)=>{
       
        state.isLoading = false;
        state.productDetails = null;
       })
    }

})
export const {setProductDetails} = shopProductSlice.actions
export default shopProductSlice.reducer;