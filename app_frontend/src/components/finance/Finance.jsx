import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import FinanceList from "./FinanceList";
import { Money } from "@mui/icons-material";

const Finance = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `http://localhost:5000/api/finance/${user_id}`

    const { data } = useFetch("finances", url)
    return (  
        <Box>
            <FinanceList finances={ data?.finance || [] } /> 
        </Box>
    );
}
 
export default Finance;