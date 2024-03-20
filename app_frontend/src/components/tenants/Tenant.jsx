import { Box } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import TenantList from "./TenantList";

const Tenant = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `http://localhost:5000/api/tenants/${user_id}`
    const { isLoading, data, isFetching, error } = useFetch("tenants", url)
    console.log(data)
    return (  
        <Box>
            <TenantList tenants={data?.tenants || [] } />
        </Box>
    );
}
 
export default Tenant;