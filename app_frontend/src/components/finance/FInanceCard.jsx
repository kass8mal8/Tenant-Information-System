import { Stack, Divider, Typography, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import handleDelete from "../utils/handleDelete"

const FinanceCard = ({ finance }) => {
    const queryClient = useQueryClient()
    const refetchFinances = () => queryClient.invalidateQueries(['finances'])
    const location = useLocation()

    return (  
        <Stack key={finance._id} direction='row' sx={{ mt: 1.5 , p: 0.6, borderRadius: '5px', background: 'rgba(236, 234, 234, 0.938)', alignItems: 'center', width: '100%' }}>
            <Typography variant='body2' color='text.secondary' sx={{width: '70%'}}>{finance.tenant_name}</Typography> 
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{finance.house_number}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{ width: '70%' }}>{finance.payment_date}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />

            <Typography variant='body2' color='text.secondary' sx={{width: '40%'}}>{finance.amount}</Typography>
            <Divider orientation='vertical' flexItem sx={{ marginRight: '30px' }} />
            {/* <Divider variant="inset" /> */}
            <Stack direction='row' spacing={1} sx={{width: '30%'}}>
                <IconButton onClick={() => handleDelete(finance._id, refetchFinances, location)}>
                    <Delete sx={{ width: '17px', height: '17px' }} />
                </IconButton>
                <IconButton>
                    <Edit sx={{ width: '17px', height: '17px' }} />
                </IconButton>
            </Stack>
        </Stack>
    );
}
 
export default FinanceCard;