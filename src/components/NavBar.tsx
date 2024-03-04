import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useAppDispatch } from '../config/hooks'
import { openModal } from '../config/modules/modal.slice'

const NavBar = () => {
  const dispatch = useAppDispatch()
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Pokemons
      </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <IconButton color="inherit" onClick={()=> dispatch(openModal())}>
          Pokedex
        </IconButton>
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default NavBar
