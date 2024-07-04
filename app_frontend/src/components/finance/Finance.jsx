import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import FinanceList from "./FinanceList";

const Finance = () => {
	const { auth: user } = useContext(AuthContext);
	const { user_id } = user;
	const url = `https://tenant-information-system.onrender.com/api/finance/${user_id}`;

	const { data } = useFetch("finances", url);
	return (
		<Box sx={{ mt: 5 }}>
			<FinanceList finances={data?.finance || []} />
		</Box>
	);
};

export default Finance;
