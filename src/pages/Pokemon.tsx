import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, CircularProgress, Chip, Box, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemonDetailsById } from '../api.service';

const PokemonDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getPokemonDetailsById(id!)
      .then((details) => {
        setPokemonDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box p={3} sx={{border:'1px solid blue', borderRadius:'16px', borderColor:'#65499c', px:'3em', py:'2em'}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

          <Typography variant="h4" gutterBottom>
            Detalhes
          </Typography>
          <Button component={Link} to="/" sx={{my:'12px', fontWeight:600, color:'white', backgroundColor:"#65499c", border:'none', display:'flex', alignItems:'center'}}  variant="outlined">
          <ArrowBackIcon fontSize='small' />
          </Button>
        </Box>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <img
                src={pokemonDetails.sprites.other['official-artwork'].front_default}
                alt={pokemonDetails.name}
                style={{ maxWidth: '100%', height: '100%', marginBottom: '1rem', transition: 'filter 0.3s ease-in-out', filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box textAlign="left">
                <Typography variant="h6"  textAlign={'left'} fontWeight={600}>Nome: {pokemonDetails.name}</Typography>
                <Typography variant="body2">Tamanho: {pokemonDetails.height}</Typography>
                <Typography variant="body2">ID: {pokemonDetails.id}</Typography>
                <Typography variant="h6" mt={2}  textAlign={'left'} fontWeight={600}>Habilidades:</Typography>
                <Box component="ul" sx={{ listStyleType: 'none', paddingLeft: 0,display: 'flex' }}>
                  {pokemonDetails.abilities.map((ability: any, index: number) => (
                    <Box sx={{ mr:"10px"}} key={index} >
                      <Chip label={ability.ability.name} color='secondary' />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Typography variant="h6" mt={2} textAlign={'left'} fontWeight={600}>Stats:</Typography>
              <Box>
                {pokemonDetails.stats.map((stat: any, index: number) => (
                  <Box key={index} display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" textAlign="left" sx={{ minWidth: '100px' }}>
                      {stat.stat.name}:
                    </Typography>
                    <Box flexGrow={1} maxWidth="200px" ml={1}>
                      <Box
                        sx={{
                          height: '8px',
                          backgroundColor: '#D05FD1',
                          borderRadius: '5px',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${stat.base_stat}%`,
                            height: '100%',
                            backgroundColor: '#6A0080',
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" ml={1}>{stat.base_stat}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PokemonDetails;
