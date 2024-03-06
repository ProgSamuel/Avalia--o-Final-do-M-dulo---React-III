import { Box, Chip, Typography } from '@mui/material';
export const pokemonTypes = {
    normal: { icon: '🟦', color: '#FCE4D9' }, 
    fighting: { icon: '🥊', color: '#DFEAF5' }, 
    flying: { icon: '🦅', color: '#E4E2EC' }, 
    poison: { icon: '☠️', color: '#D8EBEB' }, 
    ground: { icon: '🏜️', color: '#E5E5E5' }, 
    rock: { icon: '🪨', color: '#E5E5E5' }, 
    bug: { icon: '🐛', color: '#EDE3DB' }, 
    ghost: { icon: '👻', color: '#EDE3ED' }, 
    steel: { icon: '⚙️', color: '#E6D8D8' },
    fire: { icon: '🔥', color: '#DBE5F5' }, 
    water: { icon: '💧', color: '#F5D9D0' },
    grass: { icon: '🌿', color: '#EED8E8' },
    electric: { icon: '⚡', color: '#D8EBEB' },  
    psychic: { icon: '🔮', color: '#D8EBEB' }, 
    ice: { icon: '❄️', color: '#FCE4D9' }, 
    dragon: { icon: '🐉', color: '#F6E2D9' }, 
    dark: { icon: '🌑', color: '#EDECF2' }, 
    fairy: { icon: '🧚', color: '#E5E5E5' },
    unknown: { icon: '🤷‍♂️', color: '#F4E8E2' }, 
    shadow: { icon: '👤', color: '#F0F0F0' }, 
  };
  

const PokemonTypeLegend = () => (
  <Box
    sx={{
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginY: '2rem',
      color:'black',
      margin: 'auto',
      width: '90%',
      maxWidth: '1200px',

    }}
    
  >
    <Typography variant="h6" gutterBottom align='left' display={"flex"} alignItems={'center'} gap={'5px'}>
      Legenda: <Typography variant="body2" > tipos de pokemon </Typography>
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0.5rem',
      }}
    >
      {Object.entries(pokemonTypes).map(([type, { icon, color }]) => (
        <Box key={type} display="flex" alignItems="center">
          <Chip
            label={icon}
            style={{ backgroundColor: color, marginRight: '0.5rem' }}
            size="small"
          />
          <Typography variant="body2">{type}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default PokemonTypeLegend;
