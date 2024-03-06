import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Pagination, Box } from '@mui/material';
import { Pokemon } from '../models/pokemon.model';
import { PokemonCard } from '../components/PokemonCard';
import { useAppDispatch, useAppSelector } from '../config/hooks';
import { setPokemonSuccess } from '../config/modules/pokemon.slice';
import { setPage } from '../config/modules/page.slice';
import { getPokemonList } from '../api.service';
import MyModal from '../components/modal';
import NavBar from '../components/NavBar';
import PokemonTypeLegend from '../components/PokemonTypeLegend';

const Listagem: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const pokemonList = useAppSelector((state) => state.pokemonSlice.data);
  const page = useAppSelector((state) => state.pageSlice.page);
  const itemsPerPage = useAppSelector((state) => state.pageSlice.itemsPerPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getPokemonList(itemsPerPage, (page - 1) * itemsPerPage)
      .then((results) => {
        dispatch(setPokemonSuccess(results));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os Pokémon:', error);
        setLoading(false);
      });
  }, [page, itemsPerPage]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <NavBar />

      <Box component={'main'} sx={{ margin: 0, marginBottom: "4em" }}>
        <MyModal
          open={openModal}
          handleClose={handleCloseModal}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
                  <PokemonTypeLegend />

            <Grid
              container
              spacing={3}
              sx={{
                margin: 'auto',
                marginTop: '1rem',
                width: '95%',
                maxWidth: '1200px',
                justifyContent:'center'
              }}
            >
              {pokemonList!.map((pokemon: Pokemon, index: number) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                >
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
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: '2rem',
                color: 'white',
              }}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Listagem;
