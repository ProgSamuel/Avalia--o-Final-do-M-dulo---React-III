import { useEffect, useState } from "react";
import { Pokemon } from "../models/pokemon.model";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Chip, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    const [pokemonDetails, setPokemonDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get(pokemon.url)
        .then((res) => {
          setPokemonDetails(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do Pokémon:', error);
          setLoading(false);
        });
    }, [pokemon.url]);
  
    return (
      <Card style={{ height: '100%' }}>
        {loading ? (
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </CardContent>
        ) : (
          <>
            <Link to={`/pokemon/${pokemonDetails.id}`}>
              <CardMedia
                component="img"
                height="200"
                image={pokemonDetails.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600} color='secondary' textAlign={'left'} component="div">
                  {pokemon.name}
                </Typography>
  
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="caption" color="text.secondary">
                  ID: {pokemonDetails.id}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tamanho: {pokemonDetails.height}
                </Typography>
                <Box display="flex" alignItems="center">
    <Typography variant="body2" color="text.secondary">
      Tipo:
    </Typography>
    {pokemonDetails.types.map((type: any, index: number) => (
      <Chip key={index} label={type.type.name} style={{ marginLeft: '0.5rem' }} size='small' />
    ))}
  </Box>
  
                </Box>
              </CardContent>
            </Link>
          </>
        )}
      </Card>
    );
  };
  