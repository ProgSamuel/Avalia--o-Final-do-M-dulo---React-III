import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Typography,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../api.service';
import { useAppDispatch } from '../config/hooks';
import { addPokemon, removePokemon } from '../config/modules/pokedex.slice';
import { PokemonDetails } from '../models/PokemonDetails';
import { PokemonCardProps } from '../models/PokemonCard';

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPokemonDetails(pokemon.url)
      .then((details: PokemonDetails) => {
        details.isPokedex = false;
        setPokemonDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
        setLoading(false);
      });
  }, [pokemon.url]);

  const handleAddToPokedex = () => {
    if (pokemonDetails) {
      dispatch(addPokemon(pokemon));
      setPokemonDetails({ ...pokemonDetails, isPokedex: true });
    }
  };

  const handleRemoveFromPokedex = () => {
    if (pokemonDetails) {
      dispatch(removePokemon(pokemon.id));
      setPokemonDetails({ ...pokemonDetails, isPokedex: false });
    }
  };

  return (
    <Card style={{ height: '100%' }}>
      {loading ? (
        <CardContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </CardContent>
      ) : (
        <>
          <CardMedia
            component="img"
            height="200"
            image={
              pokemonDetails?.sprites.other['official-artwork'].front_default ||
              ''
            }
            alt={pokemon.name}
            onClick={() => navigate(`/pokemon/${pokemonDetails?.id}`)}
            sx={{ cursor: 'pointer' }}
          />
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              color="secondary"
              textAlign={'left'}
              component="div"
            >
              {pokemon.name}
            </Typography>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="caption" color="text.secondary">
                ID: {pokemonDetails?.id}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tamanho: {pokemonDetails?.height}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Tipo:
                </Typography>
                {pokemonDetails?.types.map((type, index) => (
                  <Chip
                    key={index}
                    label={type.type.name}
                    style={{ marginLeft: '0.5rem' }}
                    size="small"
                  />
                ))}
              </Box>
              <Box>
                {pokemonDetails?.isPokedex ? (
                  <IconButton onClick={handleRemoveFromPokedex} color='error'>
                    {' '}
                    -{' '}
                  </IconButton>
                ) : (
                  <IconButton onClick={handleAddToPokedex} color='success'> + </IconButton>
                )}
              </Box>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};
