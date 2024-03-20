import { Typography, Divider, Stack, IconButton } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { useQueryClient } from "@tanstack/react-query"
import handleDelete from "../utils/handleDelete"
import { useLocation } from "react-router-dom"

const TenantCard = ({ tenant }) => {
    const queryClient = useQueryClient()
    const refetchTenants = () => queryClient.invalidateQueries(['tenants'])
    const location = useLocation()

    return (  
        <Stack key={tenant._id} direction='row' sx={{ mt: 1.5 , p: 0.6, borderRadius: '5px', background: 'rgba(236, 234, 234, 0.938)', alignItems: 'center', width: '100%' }}>
            <Typography variant='body2' color='text.secondary' sx={{width: '70%'}}>{tenant.name}</Typography> 
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{tenant.house_number}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{tenant.room_number}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{width: '40%'}}>{tenant.telephone}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />
            {/* <Divider variant="inset" /> */}
            <Stack direction='row' spacing={1} sx={{width: '30%'}}>
                <IconButton onClick={() => handleDelete(tenant._id, refetchTenants, location)}>
                    <Delete sx={{ width: '17px', height: '17px' }} />
                </IconButton>
                <IconButton>
                    <Edit sx={{ width: '17px', height: '17px' }} />
                </IconButton>
            </Stack>
        </Stack>
    );
}
 
export default TenantCard;