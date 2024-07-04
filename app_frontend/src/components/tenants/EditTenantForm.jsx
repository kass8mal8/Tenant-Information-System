import {
	Stack,
	TextField,
	FormControl,
	Typography,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
import { AuthContext } from "../../App";
import PrimaryButton from "../PrimaryButton";
import usePatch from "../../hooks/usePatch";
import { useQueryClient } from "@tanstack/react-query";

const EditTenantForm = ({
	open,
	handleClose,
	tenant,
	setEdit,
	updateFn,
	setOpen,
}) => {
	// const [tenantDetails, setTenantDetails] = useState()
	const { auth: user } = useContext(AuthContext);
	const { user_id } = user;
	const url = `https://tenant-information-system.onrender.com/api/tenants/update/${tenant._id}`;
	const propertyURI = `https://tenant-information-system.onrender.com/api/house/${user_id}`;
	const [tenantUpdate, setTenantUpdate] = useState(tenant);
	useEffect(() => {
		setTenantUpdate(tenant);
	}, [tenant]);
	// const queryClient = useQueryClient()
	// const refetchTenants = () => queryClient.invalidateQueries(['tenants'])

	const { patch, loading } = usePatch(url);
	const { data } = useFetch("appartments", propertyURI);
	const [houseNumber, setHouseNumber] = useState();
	const navigate = useNavigate();

	const [snackData, setSnackData] = useState("");
	const [snackError, setSnackError] = useState("");

	useEffect(() => {
		setTenantUpdate({
			...tenantUpdate,
			house_number: houseNumber,
		});
	}, [houseNumber]);

	console.log(houseNumber);

	const DataMessages = ["Phone must be a number", "Invalid phone number"];

	const handleTenantSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await patch(tenantUpdate);
			setSnackData(res.message);
			setOpen(true);
			console.log(res);
			setEdit(false);
			updateFn();
			if (DataMessages.includes(res.message)) {
				return;
			} else {
				navigate("/tenants");
			}
		} catch (error) {
			setSnackError(error.message);
			setOpen(true);
			// console.log(Data.message)
		}
	};

	return (
		<Stack
			spacing={2}
			sx={{
				width: "40%",
				marginLeft: "40%",
				background: "white",
				p: 3,
				borderRadius: "5px",
				mt: 10,
			}}
		>
			<Toast
				open={open}
				data={snackData}
				error={snackError}
				handleClose={handleClose}
			/>
			<form style={{ width: "100%" }} onSubmit={handleTenantSubmit}>
				<Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
					Edit {tenant?.name}
				</Typography>
				<Stack direction="row" spacing={2}>
					<TextField
						name="name"
						label="Name"
						placeholder="John Doe"
						fullWidth
						type="text"
						value={tenantUpdate.name}
						onChange={(e) =>
							setTenantUpdate({ ...tenantUpdate, name: e.target.value })
						}
					/>
					<TextField
						name="telephone"
						label="Phone"
						placeholder="254712345678"
						type="text"
						fullWidth
						value={tenantUpdate.telephone}
						onChange={(e) =>
							setTenantUpdate({ ...tenantUpdate, telephone: e.target.value })
						}
					/>
				</Stack>
				<Stack direction="row" spacing={2} my={2}>
					{data && data.appartments?.length && (
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">House No</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={houseNumber}
								label="House No"
								onChange={(e) => setHouseNumber(e.target.value)}
							>
								{data?.appartments.map((property) => (
									<MenuItem value={property.house_number}>
										{property.house_number}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
					<TextField
						name="room_number"
						label="Room No"
						placeholder="93"
						type="text"
						fullWidth
						value={tenantUpdate.room_number}
						onChange={(e) =>
							setTenantUpdate({ ...tenantUpdate, room_number: e.target.value })
						}
					/>
				</Stack>
				<PrimaryButton loading={loading} />
			</form>
		</Stack>
	);
};

export default EditTenantForm;
