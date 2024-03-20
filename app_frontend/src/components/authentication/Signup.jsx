import { Home, Person, Visibility, VisibilityOffOutlined } from "@mui/icons-material";
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

const Signup = () => {
    const url = 'http://localhost:5000/api/auth/signup'
    const navigate = useNavigate()

    const [userDetails, setuserDetails] = useState(null)
    const [passVisibility, setPassVisibility] = useState(false)
    const { post, loading } = usePost(url)
    const { setAuth } = useContext(AuthContext)

    const now = new Date()
    const expiry = 5 * 60 * 1000

    const handleChange = (e) => {
        setuserDetails({
            ...userDetails, [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        // const userData = {...userDetails, user_type: userType}

        try {
            const response = await post(userDetails)
            if(response.token){
                const options = {
                    value: response.token,
                    expiry: now.getTime() + expiry
                }
                options && localStorage.setItem('jwt', JSON.stringify(options))
                const decodedToken = jwtDecode(response?.token)
    
                setAuth(decodedToken)
                navigate('/signin')
                console.log(response)
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    return (  
        <Box className='auth-box'>
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