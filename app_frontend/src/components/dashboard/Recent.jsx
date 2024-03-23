import { Stack, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadSkeleton from "./LoadSkeleton";

const Recent = ({ tenants, properties }) => {
    const navigate = useNavigate()
    const loadLength = [1, 2]
    
    return (  
        <Stack direction='row' spacing={2} sx={{justifyContent: 'space-between' }} mt={4}>
            <Box sx={{ width: '100%', background: 'white'}} p={2} >
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6'>Recent Tenants</Typography>
                    <Button 
                        variant='outlined'
                        sx={{
                            borderColor: 'gray',
                            color: 'gray',
                            textTransform: 'lowercase'
                        }}
                        onClick={() => navigate('/tenants')}
                    >view all
                    </Button>
                </Stack>
                <Stack direction='row' justifyContent='space-between' mt={2}>
                    <Typography sx={{ color: '#45a9ea' }}>Tenant Name</Typography>
                    <Typography sx={{ color: '#45a9ea' }}>House Number</Typography>
                </Stack>
                { tenants.length ? tenants.map( tenant => (
                    <Stack direction='row' spacing={2} sx={{justifyContent: 'space-between', paddingBlock: 0.8}}>
                        <Typography variant='body2'>{tenant.name}</Typography>
                        <Typography variant='body2' sx={{ width: '28%' }}>{tenant.house_number}</Typography>
                    </Stack>
                )) : <>{ loadLength.map ( load => <LoadSkeleton key={load} />) }</> }
            </Box>

            <Box sx={{ width: '100%', p: 2, background: 'white' }}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6'>Recent Properties</Typography>
                    <Button 
                        variant='outlined'
                        sx={{
                            borderColor: 'gray',
                            color: 'gray',
                            textTransform: 'lowercase'
                        }}
                        onClick={() => navigate('/house')}
                    >view all
                    </Button>
                </Stack>
                <Stack direction='row' justifyContent='space-between' mt={2}>
                    <Typography sx={{ color: '#45a9ea' }}>Property Name</Typography>
                    <Typography sx={{ color: '#45a9ea', marginRight: '50px' }}>Rent</Typography>
                </Stack>
                { properties.length ? properties.map( property => (
                    <Stack direction='row' sx={{ justifyContent: 'space-between', paddingBlock: 0.8 }}>
                        <Typography variant='body2'>{property.house_name}</Typography>
                        <Typography variant='body2' sx={{ width: '20%' }}>KES <span style={{ fontWeight: 600 }}>{property.price}</span></Typography>
                    </Stack>
                )) : <>{ loadLength.map ( load => <LoadSkeleton key={load} />) }</> }
            </Box>
        </Stack>
    );
}
 
export default Recent;