import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addFeed: (state, action) => {

            return Array.isArray(action.payload)
                ? action.payload
                : action.payload.data || [];
        },
        removeFeed: (state, action) => {
            return null;
        },
    },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;


