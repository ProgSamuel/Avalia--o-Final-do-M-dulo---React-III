import { combineReducers } from "@reduxjs/toolkit";
import pokemonSlice from "./modules/pokemon.slice";
import pageSlice from "./modules/page.slice";

export const rootReducer = combineReducers({
    pokemonSlice:pokemonSlice,
    pageSlice: pageSlice
})