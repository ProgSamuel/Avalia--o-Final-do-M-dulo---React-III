import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Page } from "../../models/page.model";

const initialState: Page = {
    page: 1,
    itemsPerPage: 20
}

const pageSlice = createSlice({
    name: "page", 
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload
        }
    },
});

export const { setPage, setItemsPerPage } = pageSlice.actions;

export default pageSlice.reducer;
