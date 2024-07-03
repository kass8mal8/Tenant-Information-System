import { useState, createContext, useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import "./styles/css/index.css";
import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signin from "./components/authentication/Signin";
import Signup from "./components/authentication/Signup";
import SideNav from "./components/layout/SideNav";
import NavBar from "./components/layout/NavBar";
import { useLocation } from "react-router-dom";
import AddTenant from "./components/tenants/AddTenant";
import Property from "./components/property/Property";
import AddProperty from "./components/property/AddProperty";
import Tenant from "./components/tenants/Tenant";
import AddFinance from "./components/finance/AddFinance";
import Dashboard from "./components/dashboard";
import Finance from "./components/finance/Finance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function App() {
	const queryClient = new QueryClient();
	const theme = createTheme({
		typography: {
			fontFamily: "poppins",
		},
	});

	const [auth, setAuth] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const authRoutes = ["/signin", "/signup"];

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		if (location.pathname === "/" && !jwt) {
			navigate("/signin");
		} else {
			try {
				const token = jwt.split(":");
				const userDetails = jwtDecode(token[1]);
				setAuth(userDetails);
			} catch (error) {
				console.error("Error decoding JWT token:", error);
				navigate("/signin");
			}
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider value={{ setAuth, auth }}>
				<ThemeProvider theme={theme}>
					<Box className="container">
						{authRoutes.includes(location.pathname) ? (
							<Routes>
								<Route path="/signin" element={<Signin />} />
								<Route path="/signup" element={<Signup />} />
							</Routes>
						) : (
							<>
								<NavBar />
								<SideNav />
								<Box
									sx={{
										position: "absolute",
										marginLeft: "27%",
										marginTop: "-43%",
										width: "71%",
										alignItems: "center",
									}}
								>
									<Routes>
										<Route path="/" element={<Dashboard />} />
										{/* <Route path='/' element={<Home />}/> */}
										<Route path="/add-tenant" element={<AddTenant />} />
										<Route path="/tenants" element={<Tenant />} />
										<Route path="/house" element={<Property />} />
										<Route path="/finance" element={<Finance />} />
										<Route path="/add-property" element={<AddProperty />} />
										<Route path="/add-finance" element={<AddFinance />} />
									</Routes>
								</Box>
							</>
						)}
					</Box>
				</ThemeProvider>
			</AuthContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
