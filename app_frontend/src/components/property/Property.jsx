import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PropertyList from "./PropertyList";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AddProperty from "./AddProperty";

const property = () => {
	const { auth: user } = useContext(AuthContext);
	const { user_id } = user;
	const url = `https://tenant-information-system.onrender.com/api/house/${user_id}`;

	const { isLoading, data, isFetching, error } = useFetch("appartments", url);
	console.log(data);
	return (
		<Box sx={{ mt: 5 }}>
			<PropertyList properties={data?.appartments || []} />
		</Box>
	);
};

export default property;
