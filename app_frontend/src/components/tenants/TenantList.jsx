import { useContext } from "react";
import { Box, Stack, Button, Typography, Divider } from "@mui/material"
import TenantCard from "./TenantCard"
import { InfoOutlined } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

const TenantList = ({ tenants }) => {
    const headerText = ["Tenant Name", "House Number", "Room Number", "Telephone", "Actions"]
    const navigate = useNavigate()

    return (  
        <Box>
            { tenants.length ? 
                <>
                    <Box>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' my={2}>
                            <Typography variant='body2' color='text.secondary'>Showing 1 - {tenants.length} of {tenants.length}</Typography>
                            <Button variant='outlined' sx={{ textTransform: 'lowercase', paddingInline: '20px', color: 'gray', borderColor: 'gray'}} onClick={() => navigate('/add-tenant')}>Add new</Button>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            { headerText.map( text => ( 
                            <>
                                <Typography sx={{ color: 'rgb(63, 125, 206)' }} >{text}</Typography> 
                                
                            </> 
                            ))}
                        </Stack>
                    </Box>
                    { tenants.map( tenant => (
                        <Stack direction='row'>
                            <TenantCard tenant={tenant} />
                        </Stack>
                    ))}
                </>
            : 
            <Box sx={{ marginLeft: '35%', mt: 15 }}>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <InfoOutlined sx={{ width: '40px', height: '40px', color: 'gray' }} />
                    <Typography variant='body2' color="text.secondary">Nothing here at the moment</Typography>
                </Stack>
                <Button 
                    variant="outlined"
                    sx={{
                        textTransform: 'lowercase',
                        borderColor: 'gray',
                        color: 'gray',
                        marginLeft: '70px',
                        marginTop: '10px'
                    }}
                    onClick={() => navigate('/add-tenant')}
                    >add tenant
                </Button>
            </Box>
            }
        </Box>
    );
}
 
export default TenantList;