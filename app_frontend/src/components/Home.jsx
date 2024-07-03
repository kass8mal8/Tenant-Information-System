import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Home = () => {
	return (
		<Box
			sx={{
				position: "absolute",
				marginLeft: "27%",
				marginTop: "-45%",
				width: "71%",
				alignItems: "center",
			}}
		>
			<Outlet />
		</Box>
	);
};

export default Home;
