import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Pagination, Chip, CardMedia, Box } from '@mui/material';
import { Pokemon } from '../models/pokemon.model';
import { Link } from 'react-router-dom';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
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

const Listagem: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 50;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`)
      .then((res) => {
        setPokemonList(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os Pokémon:', error);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <h1>Pokémons</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3}>
            {pokemonList.map((pokemon: Pokemon, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PokemonCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(1118 / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: '2rem', color: 'white' }}
          />
        </>
      )}
    </div>
  );
};

export default Listagem;
