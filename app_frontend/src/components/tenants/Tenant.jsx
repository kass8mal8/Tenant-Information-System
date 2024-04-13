import { Box } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import TenantList from "./TenantList";
import EditTenant from "./EditTenantForm";

const Tenant = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `http://localhost:5000/api/tenants/${user_id}`
    const { isLoading, data, isFetching, error } = useFetch("tenants", url)
    console.log(data)
    const [open, setOpen] = useState(true)
    return (  
        <Box>
            <TenantList tenants={data?.tenants || [] } />
            {/* <EditTenant open={open} /> */}
        </Box>
    );
}
 
export default Tenant;