import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField, Typography, FormControl } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import PrimaryButton from "../PrimaryButton";
import { AuthContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
import tenantPhoto from "../../assets/images/tenant illustration.svg"

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
    const [open, setOpen] = useState(false)
    const [snackError, setSnackError] = useState('')

    const handleClose = () => setOpen(prev => !prev)

    const handleInputChange = (e) => {
        if(e.target.name === 'telephone') {
            if(e.target.value.length > 10) {
                setTenantDetails({
                    ...tenantDetails, [e.target.name]: +`${e.target.value.slice(3, )}`
                })
            }
            else {
                setTenantDetails({
                    ...tenantDetails, [e.target.name]: +e.target.value
                })
            }
        }
        else {
            setTenantDetails({
                ...tenantDetails, [e.target.name]: e.target.value
            })
        }

    }
    useEffect(() => {
        setTenantDetails({
            ...tenantDetails, house_number: houseNumber
        })
    }, [houseNumber]);
    console.log(houseNumber)

    const errorMessages = ["Phone must be a number", "Invalid phone number"]

    const handleTenantSubmit = async(e) => {
        e.preventDefault()
        console.log(tenantDetails)

        try {
            const res = await post(tenantDetails)
            setSnackError(res.message)
            setOpen(true)
            console.log(res)
            

            if(errorMessages.includes(res.message)) {
                return
            }
            else { navigate('/tenants') }

            
        } catch (error) {
            setSnackError(error.message)
            setOpen(true)
            console.log(error.message)
        }
    }

    return (  
        <Stack direction='row' spacing={2} sx={{width: '95%', marginLeft: '0%', background: 'white', p: 3, borderRadius: '5px' }}>
            <Toast open={open} data={null} error={snackError} handleClose={handleClose} />
            <img src={tenantPhoto} alt="tenant illustration" width='35%' />
            <form style={{marginTop: '50px', width: '50%', marginLeft: '10%' }} onSubmit={handleTenantSubmit}>
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