import { Button } from "@mui/material"

const PrimaryButton  = ({ loading }) => {
    return (  
        <Button 
            type='submit' 
            variant='contained' 
            fullWidth
            disabled = {loading}
            disableElevation
            className='primary-btn'
        >{loading ? 'processing...' : 'submit'}
        </Button>
    );
}
 
export default PrimaryButton;