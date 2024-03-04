import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../models/pokemon.model";

const initialState: Pokemon[] = [];

const pokedexSlice = createSlice({
    name: "pokedex",
    initialState,
    reducers: {
        addPokemon: (state, action: PayloadAction<Pokemon>) => {
            const existingPokemon = state.find(pokemon => pokemon.id === action.payload.id);
            if (!existingPokemon) {
                state.push(action.payload);
            }
        },
        removePokemon: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(pokemon => pokemon.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addPokemon, removePokemon } = pokedexSlice.actions;

export default pokedexSlice.reducer;
