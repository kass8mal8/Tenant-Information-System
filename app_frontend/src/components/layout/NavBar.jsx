import { AppBar, Avatar, Chip, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { useLocation } from "react-router-dom";

const NavBar = () => {
    const { auth: user } = useContext(AuthContext);
    const location = useLocation();
    const route = location.pathname.split('/')[1];
    const path = route ? `${route[0].toUpperCase()}${route.slice(1)}` : "Dashboard";

    let username = "Username";
    let avatarInitials = "U";

    if (user && typeof(user) === 'object') {
        const { first_name, surname } = user;
        if (first_name && surname) {
            username = `${first_name} ${surname}`;
            avatarInitials = `${first_name[0]}${surname[0]}`;
        }
    }

    return (  
        <AppBar className="navbar" position="static" elevation={0}>
            <Toolbar>
                <Typography component='div' sx={{ flexGrow: 1, fontWeight: 500 }}>{path}</Typography>
                <Chip
                    label={username}
                    variant="outlined"
                    avatar={<Avatar>{avatarInitials}</Avatar>}
                />
            </Toolbar>
        </AppBar>
    );
}
 
export default NavBar;
