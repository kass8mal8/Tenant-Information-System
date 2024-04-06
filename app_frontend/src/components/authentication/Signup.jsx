import { SignalCellularNull, Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import { 
    Box, 
    Button,  
    Stack, 
    TextField, 
    Typography, 
    InputAdornment, 
} from "@mui/material";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { jwtDecode } from "jwt-decode"
import { AuthContext } from '../../App'
import logo from "../../assets/images/logo.png"
import PrimaryButton from "../PrimaryButton";
import PassValidation from "./PassValidation";
import Toast from "../Toast";

const Signup = () => {
    const url = 'http://localhost:5000/api/auth/signup'
    const navigate = useNavigate()

    const [userDetails, setuserDetails] = useState(null)
    const [passVisibility, setPassVisibility] = useState(false)
    const { post, loading, error } = usePost(url)
    const { setAuth } = useContext(AuthContext)
    const [isError, setIsError] = useState(true)
    const [isLengthError, setIsLengthError] = useState(true)

    const now = new Date()
    const expiry = 5 * 60 * 1000
    const condition = /\d/

    const [open, setOpen] = useState(false)
    const [snackData, setSnackData] = useState(null)

    const handleClose = (e, reason) => {
        if(reason === 'clickaway') return
        setOpen(false)
    }

    const handleChange = (e) => {
        setuserDetails({
            ...userDetails, [e.target.name]: e.target.value
        })

        !condition.test(e.target.value) ? setIsError(true) : setIsError(false) 
        e.target.value.length < 8 ? setIsLengthError(true) : setIsLengthError(false)
        
    }
    console.log(isError)

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await post(userDetails)
            
            if(response.token){
                const options = {
                    value: response.token,
                    expiry: now.getTime() + expiry
                }
                options && localStorage.setItem('jwt', JSON.stringify(options))
                const decodedToken = jwtDecode(response?.token)
                setSnackData(response?.message)
    
                setAuth(decodedToken)
                navigate('/signin')
                console.log(response)
            }
            setOpen(true)
            console.log(snackData)
        } catch (error) {
            console.log(error.message)
            setOpen(true)
        }
        
    }
    console.log(snackData)
    const requirements = [{
        "length": "Should not be less than 8 characters",
        "special": "Should include at least one number"
    }]

    
    return (  
        <Box className='auth-box'>
            <Toast open={open} handleClose={handleClose} error={error} data={snackData} />
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} width='150px' alt="logo" />
                <Typography 
                    variant='h6'
                    className='intro-header'
                    sx = {{
                        fontWeight: '600'
                    }}
                >Signup
                </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Box className='account-details'>
                    <Stack direction='row' spacing={2} sx={{ marginBottom: '8px'}}>
                        <TextField 
                            label='First Name' 
                            placeholder="John" 
                            name='first_name' 
                            onChange={handleChange}
                        />
                        <TextField 
                            label='Last Name' 
                            placeholder="John" 
                            name='surname' 
                            onChange={handleChange}
                        />
                    </Stack>
                    <TextField 
                        label='Email'
                        placeholder="johndoe@example.com" 
                        fullWidth 
                        type="email" 
                        className='input' 
                        name='email' 
                        onChange={handleChange}    
                    />
                    <TextField 
                        label="Password" 
                        className='input' 
                        fullWidth 
                        type= {passVisibility ? 'text' : 'password'}  
                        name='password' 
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position='end' sx={{cursor: 'pointer'}} >
                                { passVisibility
                                    ? <VisibilityOffOutlined onClick={() => setPassVisibility(false)} />
                                    : <Visibility onClick={() => setPassVisibility(true)} />
                                }
                            </InputAdornment>
                        }}
                        helperText={ 
                            requirements.map( requirement => ( 
                                <PassValidation 
                                    key={requirement.length} 
                                    requirement={requirement} 
                                    isError={isError}
                                    isLengthError={isLengthError}
                                /> 
                            )) 
                        }
                    />
                
                    <PrimaryButton loading={loading} />
                    
                    <Button className='redirect-link'>
                        <Link to='/signin'>
                            back to login
                        </Link>
                    </Button>
                </Box>

                
            </form>
            
        </Box>
    );
}
 
export default Signup;