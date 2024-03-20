import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { useContext, useState } from 'react';
import usePost from '../../hooks/usePost';
// import useAuth from '../../hooks/useAuth';
import { jwtDecode } from "jwt-decode"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from '../../App'
import logo from "../../assets/images/logo.png"
import PrimaryButton from '../PrimaryButton';

const Signin = () => {
    const [passVisibility, setPassVisibility] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const url = 'http://localhost:5000/api/auth/signin'
    // const url =  'https://tmis-o6f8.onrender.com/api/auth/signin'
    const { post, loading } = usePost(url)
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const now = new Date()
    const expiry = 5 * 60 * 1000

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await post(userDetails)
            const options = {
                value: response.token,
                expiry: now.getTime() + expiry
            }
            options && localStorage.setItem('jwt', JSON.stringify(options))

            const decodedToken = jwtDecode(response?.token)
            navigate('/home/dashboard')
            console.log(decodedToken)
            setAuth(decodedToken)
        } catch (error) {
            console.log(error.message)
        }
    }
    return ( 
        <Box className='auth-box'> 
            {/* <Typography variant='h4' className='branding'>Rentaxo</Typography> */}
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} width='150px' alt="logo" />
                <Typography 
                    variant='h6'
                    className='intro-header'
                    sx = {{
                        fontWeight: '600'
                    }}
                >Sign in
                </Typography>
            </Stack>
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={1}>
                    <Typography 
                        type='email' 
                        variant='body2'
                        color='text.secondary'
                    >EMAIL
                    </Typography>
                    <TextField 
                        name='email' 
                        placeholder='email@example.com' 
                        fullWidth 
                        required 
                        onChange={handleChange} 
                    />
                </Stack>
                <Stack spacing={1} my={2}>
                    <Typography variant='body2' color='text.secondary'>PASSWORD</Typography>
                    <TextField 
                        placeholder='password' 
                        type= {passVisibility ? 'text' : 'password'}
                        required
                        name='password'
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position='end'>
                                    { passVisibility 
                                        ? <VisibilityOff onClick={() => setPassVisibility(false)} /> 
                                        : <Visibility onClick={() => setPassVisibility(true)} />
                                    }
                                </InputAdornment>
                        }}
                    />
                </Stack>
                <PrimaryButton loading={loading} />
                <Button className='redirect-link'>
                    <Link to='/signup'>
                        create account
                    </Link>
                </Button>
                
            </form>
        </Box>
    );
}
 
export default Signin;