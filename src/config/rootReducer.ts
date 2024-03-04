import { combineReducers } from "@reduxjs/toolkit";
import pokemonSlice from "./modules/pokemon.slice";
import pageSlice from "./modules/page.slice";
import pokedexSlice from "./modules/pokedex.slice";
import modalSlice from "./modules/modal.slice";

export const rootReducer = combineReducers({
    pokemonSlice:pokemonSlice,
    pageSlice: pageSlice,
    pokedexSlice: pokedexSlice,
    modalSlice: modalSlice
})