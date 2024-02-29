import { combineReducers } from "@reduxjs/toolkit";
import pokemonSlice from "./modules/pokemon.slice";

export const rootReducer = combineReducers({
    pokemonSlice:pokemonSlice
})