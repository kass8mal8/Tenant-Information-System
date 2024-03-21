import { Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InfoOutlined } from "@mui/icons-material";
import FinanceCard from "./FInanceCard";

const FinanceList = ({ finances }) => {
    const headerText = ['Tenant Name', 'House Number', 'Date', 'Amount', 'Actions' ]
    const navigate = useNavigate()


    return (  
        <Box>
            {finances.length ?
                <>
                    <Box>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' my={2}>
                            <Typography variant='body2' color='text.secondary'>Showing 1 - {finances.length} of {finances.length}</Typography>
                            <Button variant='outlined' sx={{ textTransform: 'lowercase', paddingInline: '20px', color: 'gray', borderColor: 'gray'}} onClick={() => navigate('/add-finance')}>Add new</Button>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            { headerText.map( text => ( <Typography sx={{ color: 'rgb(63, 125, 206)' }} >{text}</Typography> ) ) }
                        </Stack>
                    </Box>
                    { finances.map( finance => (
                        <Stack direction='row'>
                            <FinanceCard finance={finance} />
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
                    onClick={() => navigate('/add-finance')}
                    >add finance
                </Button>
            </Box>
            }
        </Box>
    );
}
 
export default FinanceList;