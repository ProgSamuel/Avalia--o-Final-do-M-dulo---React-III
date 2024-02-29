import { Pokemon } from "./pokemon.model";

export interface PokemonState {
    data: Pokemon | null
    loading:boolean
    error: string | null

}