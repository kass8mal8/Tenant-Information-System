import { Box, Typography, Stack, Button } from "@mui/material";
import PropertyCard from "./PropertyCard"
import nothing from "../../assets/images/nothing.jpg"
import { InfoOutlined, NetworkCell } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PropertyList = ({ properties }) => {
    const headerText = [ "House Name", "House Number", "Location", "Units", "Actions" ]
    const navigate = useNavigate()
    console.log(properties)
    return (  
        <Box>
            {properties.length ?
                <>
                    <Box>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' my={2}>
                            <Typography variant='body2' color='text.secondary'>Showing 1 - {properties.length} of {properties.length}</Typography>
                            <Button variant='outlined' sx={{ textTransform: 'lowercase', paddingInline: '20px', color: 'gray', borderColor: 'gray'}} onClick={() => navigate('/add-property')}>Add new</Button>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            { headerText.map( text => ( <Typography sx={{ color: 'rgb(63, 125, 206)' }} >{text}</Typography> ) ) }
                        </Stack>
                    </Box>
                    { properties.map( appartment => (
                        <Stack direction='row'>
                            <PropertyCard appartment={appartment} />
                        </Stack>
                    ))}
                </>
            : <Box sx={{ marginLeft: '35%', mt: 15 }}>
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
                    onClick={() => navigate('/add-property')}
                    >add property
                </Button>
            </Box>
            }
        </Box>
    );
}
 
export default PropertyList;