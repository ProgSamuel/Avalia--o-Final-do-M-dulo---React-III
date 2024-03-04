import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Modal, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pokemon } from '../models/pokemon.model';
import { useAppDispatch, useAppSelector } from '../config/hooks';
import { removePokemon } from '../config/modules/pokedex.slice';
import { closeModal } from '../config/modules/modal.slice';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const MyModal: React.FC<ModalProps> = ({  }) => {
    const pokedex = useAppSelector((state) => state.pokedexSlice);
    const open = useAppSelector((state)=> state.modalSlice)
    const dispatch = useAppDispatch()

    
    return (
        <Modal
            open={open}
            onClose={()=> dispatch(closeModal())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', boxShadow: 24, borderRadius: '8px', p: 2 }}>
                <Typography color={'black'} id="modal-modal-title" variant="h5" component="h2" textAlign="center" mt={2} sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                    Minha Pokédex
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '16px' }}>
                    <Grid container spacing={2}>
                        {pokedex.map((pokemon: Pokemon) => (
                            <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                                <Card sx={{ borderRadius: '8px', boxShadow: 2 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                                        alt={pokemon.name}
                                    />
                                    <CardContent sx={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                                        <Typography variant="h6" color="text.primary" textAlign="center">{pokemon.name}</Typography>
                                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{cursor: 'pointer'}} onClick={()=> dispatch(removePokemon(pokemon.id))}> <DeleteIcon fontSize='small' color='error'/> </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};

export default MyModal;
