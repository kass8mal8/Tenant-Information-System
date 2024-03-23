import { AppBar, Avatar, Chip, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
    const { auth: user } = useContext(AuthContext)
    const location = useLocation()
    const route = location.pathname.split('/')[1]
    // console.log(route)
    const path = route ? `${route[0].toUpperCase()}${route.slice(1, route.length)}` : "Dashboard"

    return (  
        <AppBar className="navbar" position="static" elevation={0} >
            <Toolbar>
                <Typography component='div' sx={{flexGrow: 1, fontWeight: 500}}>{ path}</Typography>
                <Chip label={Object.entries(user).length ? `${user.first_name} ${user.surname}` : "username"} variant="outlined" avatar={<Avatar>{ Object.entries(user).length ? `${user.first_name[0]}${user.surname[0]}` : "U"}</Avatar>} />
            </Toolbar>
        </AppBar>
    );
}
 
export default NavBar;