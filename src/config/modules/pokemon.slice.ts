import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PokemonState } from "../../models/pokemons.model";
import { Pokemon } from "../../models/pokemon.model";

const initialState: PokemonState = {
    data: null,
    loading: false,
    error: null,
};

const extractPokemonId = (url: string): string => {
    const idRegex = /\/(\d+)\/$/;
    const match = url.match(idRegex);
    if (match && match[1]) {
        return match[1];
    }
    return '';
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemonLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setPokemonSuccess: (state, action: PayloadAction<Pokemon[]>) => {
            state.loading = false;
            state.data = action.payload.map(pokemon => ({
                ...pokemon,
                isPokedex:false,
                id: extractPokemonId(pokemon.url)
            }));
        },
        setPokemonError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { setPokemonLoading, setPokemonSuccess, setPokemonError } = pokemonSlice.actions;

export default pokemonSlice.reducer;
