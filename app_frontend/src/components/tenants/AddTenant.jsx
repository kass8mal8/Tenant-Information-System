import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField, Typography, FormControl } from "@mui/material";
import tenant from "../../assets/images/tenant illustration.svg"
import { useContext, useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import PrimaryButton from "../PrimaryButton";
import { AuthContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";

const AddTenant = () => {
    const [tenantDetails, setTenantDetails] = useState()
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `http://localhost:5000/api/tenants/add/${user_id}`
    const propertyURI = `http://localhost:5000/api/house/${user_id}`

    const { post, loading } = usePost(url)
    const { data } = useFetch("appartments", propertyURI)
    const [houseNumber, setHouseNumber] = useState()
    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(prev => !prev)

    const handleInputChange = (e) => {
        setTenantDetails({
            ...tenantDetails, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setTenantDetails({
            ...tenantDetails, house_number: houseNumber
        })
    }, [houseNumber]);
    console.log(houseNumber)


    const handleTenantSubmit = async(e) => {
        e.preventDefault()
        console.log(tenantDetails)

        try {
            const res = await post(tenantDetails)
            console.log(res)
            setSuccess(res.message)
            navigate('/tenants')
            
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }

    return (  
        <Stack direction='row' spacing={2} sx={{width: '95%', marginLeft: '0%', background: 'white', p: 3, borderRadius: '5px' }}>
            <img src={tenant} alt="tenant illustration" width='35%' />
            <form style={{ marginTop: '50px', width: '50%', marginLeft: '10%' }} onSubmit={handleTenantSubmit}>
                <Typography variant='body2' color='text.secondary' sx={{ my: 2 }} >Onboard new tenants!</Typography>
                <Stack direction='row' spacing={2}>
                    <TextField name="name" label='Name' placeholder='John Doe' fullWidth type='text' onChange={handleInputChange} />
                    <TextField name="telephone" label='Phone' placeholder="254712345678" type="text" fullWidth onChange={handleInputChange} /> 
                </Stack>
                <Stack direction='row' spacing={2} my={2}>
                    { data && data.appartments?.length && 
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">House No</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={houseNumber}
                                label="House No"
                                onChange={(e) => setHouseNumber(e.target.value)}
                            >
                                { data?.appartments.map( property => (
                                    <MenuItem value={property.house_number}>{property.house_number}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                    <TextField name="room_number" label='Room No' placeholder="93" type="text" fullWidth onChange={handleInputChange} /> 
                </Stack>
                <PrimaryButton loading={loading} />
            </form>
        </Stack>
    );
}
 
export default AddTenant;