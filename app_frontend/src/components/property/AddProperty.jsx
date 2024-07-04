import {
	Box,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import illustration from "../../assets/images/rentaxo.svg";
import usePost from "../../hooks/usePost";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";

const AddProperty = () => {
	const { auth: user } = useContext(AuthContext);
	const { user_id } = user;
	const url = `https://tenant-information-system.onrender.com/api/house/add-house/${user_id}`;
	const { loading, post, error } = usePost(url);
	const [propertyDetails, setPropertyDetails] = useState();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setPropertyDetails({
			...propertyDetails,
			[e.target.name]: e.target.value,
		});
	};
	const handleAddPropertySubmit = async (e) => {
		e.preventDefault();
		console.log(propertyDetails);

		try {
			const res = await post(propertyDetails);
			!error && console.log(res);
			navigate("/house");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Box
			sx={{
				width: "95%",
				p: 3,
				background: "white",
				borderRadius: "5px",
				flexFlow: "row",
				display: "flex",
				position: "absolute",
				mt: 5,
			}}
		>
			<img src={illustration} alt="illustration" width="100%" />
			<form
				style={{ width: "95%", marginLeft: "20px", marginTop: "20px" }}
				onSubmit={handleAddPropertySubmit}
			>
				<Typography
					color="text.secondary"
					sx={{ fontWeight: "bold", textAlign: "right", mb: 4 }}
				>
					Add New
				</Typography>
				<Stack direction="row" spacing={2} my={2}>
					<TextField
						label="Title"
						name="house_name"
						placeholder="xyz house"
						fullWidth
						onChange={handleInputChange}
					/>
					<TextField
						label="Rent"
						name="price"
						placeholder="12345"
						fullWidth
						onChange={handleInputChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Typography variant="body1" color="text.secondary">
										KES
									</Typography>
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<Stack direction="row" spacing={2}>
					<TextField
						label="Location"
						name="location"
						placeholder="eg, Nairobi"
						fullWidth
						onChange={handleInputChange}
					/>
					<TextField
						label="Units"
						name="units"
						placeholder="10"
						onChange={handleInputChange}
					/>
					<TextField
						label="House No"
						name="house_number"
						placeholder="C24"
						onChange={handleInputChange}
					/>
				</Stack>
				<PrimaryButton loading={loading} />
			</form>
		</Box>
	);
};

export default AddProperty;
