import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const path = location.pathname;
	const handleSignOut = () => {
		localStorage.removeItem("jwt");
		navigate("/signin");
	};

	return (
		<Box className="sidenav" sx={{ width: "25%" }}>
			<img src={logo} width="150px" alt="logo" className="logo" />

			<List>
				<ListItem
					sx={
						path === "/" && {
							background: "#45a9ea",
							color: "white",
						}
					}
					onClick={() => navigate("/")}
				>
					<ListItemText primary="Dashboard" />
				</ListItem>
				<Divider />
				<ListItem
					sx={
						path === "/house" && {
							background: "#45a9ea",
							color: "white",
						}
					}
					onClick={() => navigate("/house")}
				>
					<ListItemText primary="Property" />
				</ListItem>
				<Divider />
				<ListItem
					sx={
						path === "/tenants" && {
							background: "#45a9ea",
							color: "white",
						}
					}
					onClick={() => navigate("/tenants")}
				>
					<ListItemText primary="Tenants" />
				</ListItem>
				<Divider />
				<ListItem
					sx={
						path === "/finance" && {
							background: "#45a9ea",
							color: "white",
						}
					}
					onClick={() => navigate("/finance")}
				>
					<ListItemText primary="Financials" />
				</ListItem>
			</List>

			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					position: "absolute",
					bottom: "20px",
					left: "20px",
					cursor: "pointer",
				}}
				onClick={handleSignOut}
			>
				signout
			</Typography>
		</Box>
	);
};

export default SideNav;
