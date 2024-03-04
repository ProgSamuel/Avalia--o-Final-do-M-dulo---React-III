import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const modalSlice = createSlice({
    name: "modal", 
    initialState,
    reducers: {
        openModal: () => {
            return true; 
        },
        closeModal: () => {
            return false;
        }
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
