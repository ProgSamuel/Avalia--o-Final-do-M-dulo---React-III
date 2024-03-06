import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Chip,
  Snackbar,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../api.service';
import { useAppDispatch } from '../config/hooks';
import { addPokemon, removePokemon } from '../config/modules/pokedex.slice';
import { PokemonDetails } from '../models/PokemonDetails';
import { PokemonCardProps } from '../models/PokemonCard';
import { pokemonTypes } from './PokemonTypeLegend';

type PokemonTypeName = keyof typeof pokemonTypes;

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
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
      setSnackbarOpen(true);
      setSnackbarMessage(`${pokemon.name} foi adicionado à Pokédex!`);
    }
  };

  const handleRemoveFromPokedex = () => {
    if (pokemonDetails) {
      dispatch(removePokemon(pokemon.id));
      setPokemonDetails({ ...pokemonDetails, isPokedex: false });
      setSnackbarOpen(true);
      setSnackbarMessage(`${pokemon.name} foi removido da Pokédex!`);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              pokemonDetails?.sprites.other['official-artwork'].front_default || ''
            }
            alt={pokemon.name}
            onClick={() => navigate(`/pokemon/${pokemonDetails?.id}`)}
            sx={{ cursor: 'pointer' }}
          />
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              color="black"
              textAlign={'left'}
              component="div"
            >
              {pokemon.name.toUpperCase()}
            </Typography>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginTop={2}>
              <Typography variant="caption" color="text.secondary">
                ID: {pokemonDetails?.id}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tamanho: {pokemonDetails?.height}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Tipo:
                </Typography>
                {pokemonDetails?.types.map((type, index) => {
                  const typeName = type.type.name.toLowerCase() as PokemonTypeName;
                  if (typeName in pokemonTypes) {
                    return (
                      <Chip
                        key={index}
                        label={pokemonTypes[typeName].icon}
                        style={{
                          marginLeft: '0.3rem',
                          backgroundColor: pokemonTypes[typeName].color,
                        }}
                        size="small"
                      />
                    );
                  }
                  return null;
                })}
              </Box>

              <Box sx={{ cursor: 'pointer' }}>
                {pokemonDetails?.isPokedex ? (
                  <StarIcon onClick={handleRemoveFromPokedex} color='warning'>
                  </StarIcon>
                ) : (
                  <StarBorderIcon onClick={handleAddToPokedex} color='warning'> </StarBorderIcon>
                )}
              </Box>
            </Box>
          </CardContent>
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={pokemonDetails?.isPokedex ? 'success' : 'error'} variant='filled'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};
