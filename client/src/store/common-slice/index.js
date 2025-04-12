

import axios from "axios";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false,
    featureImagesList : []
}

export const getFeatureImages = createAsyncThunk('order/getFeatureImages', async()=>{
    const response = await axios.get('http://localhost:5000/api/common/feature/get');
    
    return response.data;
  });
  

export const addFeatureImages = createAsyncThunk('order/addFeatureImages', async(image) => {
  
    const response = await axios.post(`http://localhost:5000/api/common/feature/add`, { image });

    return response.data;
});


const commonSlice = createSlice({
    name : 'commonSlice',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getFeatureImages.pending, (state)=>{
            state.isLoading  = true
        }).addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImagesList = action.payload.data;
            
        }).addCase(getFeatureImages.rejected, (state)=>{
            state.isLoading  = false
        })
    }
})

export default commonSlice.reducer