import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png"
import { useLocation, useNavigate } from "react-router-dom"

const SideNav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const path = location.pathname

    return (  
        <Box className='sidenav' sx={{ width:'25%' }}>
            <img src={logo} width='150px' alt="logo" className="logo" />

            <List>
                <ListItem sx={{ background: path === '/' && '#45a9ea', color: path === '/' && 'white' }} onClick={() => navigate('/')}>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <Divider />
                <ListItem sx={{ background: path === '/house' && '#45a9ea', color: path === '/house' && 'white' }} onClick={() => navigate('/house')}>
                    <ListItemText primary="Property"/>
                </ListItem>
                <Divider />
                <ListItem sx={{ background: path === '/tenants' && '#45a9ea', color: path === '/tenants' && 'white' }} onClick={() => navigate('/tenants')}>
                    <ListItemText primary="Tenants"/>
                </ListItem>
                <Divider />
                <ListItem sx={{ background: path === '/finance' && '#45a9ea', color: path === '/finance' && 'white' }} onClick={() => navigate('/finance')}>
                    <ListItemText primary="Financials"/>
                </ListItem>
            </List>

            <Typography 
                variant='body2' 
                color='text.secondary'
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/signin')}
            >signout</Typography>
        </Box>
    );
}
 
export default SideNav;