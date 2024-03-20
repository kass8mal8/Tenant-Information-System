import { Delete, Edit } from "@mui/icons-material"
import { Divider, Stack, Typography, Button, IconButton } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import handleDelete from "../utils/handleDelete"
import { useLocation } from "react-router-dom"

const PropertyCard = ({ appartment }) => {
    const queryClient = useQueryClient()
    const refetchAppartments = () => queryClient.invalidateQueries(['appartments'])
    const location = useLocation()

    return(
        <Stack key={appartment._id} direction='row' sx={{ mt:1.5, p: 0.6, borderRadius: '5px', background: 'rgba(236, 234, 234, 0.938)', alignItems: 'center', width: '100%' }}>
            <Typography variant='body2' color='text.secondary' sx={{width: '70%'}}>{appartment.house_name}</Typography> 
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{appartment.house_number}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{appartment.location}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{width: '40%'}}>{appartment.units}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />
            {/* <Divider variant="inset" /> */}
            <Stack direction='row' spacing={1} sx={{width: '30%'}}>
                <IconButton onClick={() => handleDelete(appartment._id, refetchAppartments, location)}>
                    <Delete sx={{ width: '17px', height: '17px' }} />
                </IconButton>
                <IconButton>
                    <Edit sx={{ width: '17px', height: '17px' }} />
                </IconButton>
            </Stack>
        </Stack>
    )
}

export default PropertyCard