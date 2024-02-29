import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PokemonState } from "../../models/pokemons.model";
import { Pokemon } from "../../models/pokemon.model";

const initialState: PokemonState = {
    data: null,
    loading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemonLoading:(state) => {
            state.loading=true;
            state.error=null;
        },
        setPokemonSuccess:(state, action: PayloadAction<Pokemon>)=> {
            state.loading=false;
            state.data= action.payload
        },
        setPokemonError: (state, action: PayloadAction<string>)=> {
            state.loading=false;
            state.error = action.payload
        }
    }
})

export default pokemonSlice.reducer