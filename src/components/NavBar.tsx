import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../config/hooks';
import { openModal } from '../config/modules/modal.slice';
import pokeApi from '../../public/assets/pokeapi.png';
import pokedex from '../../public/assets/pokedex.png';

const NavBar = () => {
  const dispatch = useAppDispatch();

  return (
    <AppBar position="static" sx={{ margin:'auto', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <img src={pokeApi} alt="PokeAPI" style={{ maxHeight: '4em' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={() => dispatch(openModal())}>
        <img src={pokedex} alt="PokeAPI" style={{ maxHeight: '1.5em' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
