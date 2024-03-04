export interface PokemonDetails {
    id: number;
    height: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: {
      type: {
        name: string;
      };
    }[];
    isPokedex: boolean
    
  }