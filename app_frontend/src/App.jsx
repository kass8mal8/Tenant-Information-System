import { useState, createContext } from 'react'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import './styles/css/index.css'
import { Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Signin from "./components/authentication/Signin"
import Signup from './components/authentication/Signup'
import Home from './components/Home'
import SideNav from './components/layout/SideNav'
import NavBar from './components/layout/NavBar'
import { useLocation } from 'react-router-dom'
import AddTenant from './components/tenants/AddTenant'
import Property from './components/property/Property'
import AddProperty from './components/property/AddProperty'
import Tenant from './components/tenants/Tenant'
import AddFinance from './components/finance/AddFinance'
import Dashboard from './components/dashboard'

export const AuthContext = createContext({})

function App() {
	const queryClient = new QueryClient() 
	const theme = createTheme({
		typography: {
			fontFamily: 'poppins'
		}
	})
	
	const [auth, setAuth] = useState({})
    const [csrf] = useState({})
	console.log('auth:', auth)
	const location = useLocation()
	const authRoutes = ['/signin', '/signup']

  return (
  	<QueryClientProvider client={queryClient}>
		<AuthContext.Provider value={{setAuth, auth}}>
			<ThemeProvider theme={theme}>
				<Box className='container'>
					{authRoutes.includes(location.pathname)
						?   <Routes>
								<Route path='/signin' element={<Signin /> } />
								<Route path='/signup' element={<Signup />} />
							</Routes>
						:	<>
								<NavBar />
								<SideNav />
								<Routes>
									<Route path='/' element={<Home />}>
										<Route path='add-tenant' element={<AddTenant />} />
										<Route path='tenants' element={<Tenant />} />
										<Route path='house' element={<Property />} />
										<Route path='/add-property' element={<AddProperty />} />
										<Route path='add-finance' element={<AddFinance />} />
										<Route path='dashboard' element={<Dashboard />} />
									</Route>
								</Routes>
							</> 
					}
				</Box>
			</ThemeProvider>
		</AuthContext.Provider>
	</QueryClientProvider>
  )
}

export default App
