import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import finance from '../../assets/images/finance.svg';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../App';
import usePost from '../../hooks/usePost';
import PrimaryButton from '../PrimaryButton';
import { useNavigate } from 'react-router-dom';

const AddFinance = () => {
  const [houseNumber, setHouseNumber] = useState('');
  const [tenantName, setTenantName] = useState('');
  const { auth: user } = useContext(AuthContext);
  const { user_id } = user;
  const [financeDetails, setFinanceDetails] = useState();

  const tenantURI = `http://localhost:5000/api/tenants/${user_id}`;
  const propertyURI = `http://localhost:5000/api/house/${user_id}`;

  const { data: appartmentData } = useFetch(
    'appartments',
    propertyURI
  );
  const { data: tenantData } = useFetch('tenants', tenantURI);
  const navigate = useNavigate();

  let tenant_id;
  tenantData?.tenants.forEach((tenant) => {
    if (tenantName !== '' && tenant.name === tenantName) {
      tenant_id = tenant._id;
    }
  });

  useEffect(() => {
    setFinanceDetails({
      ...financeDetails,
      house_number: houseNumber,
      tenant_name: tenantName,
      user_id,
    });
  }, [houseNumber, tenantName]);

  const financeURI = `http://localhost:5000/api/finance/add/${tenant_id}`;
  const { post, loading } = usePost(financeURI);
  const dateExp = /\d\d-\d\d-\d\d\d\d/;
  // const ds = '10-12-2004'
  // console.log()

  const handleInputChange = (e) => {
    setFinanceDetails({
      ...financeDetails,
      [e.target.name]: e.target.value,
    });

    // if(e.target.name === 'payment_date') {
    //     dateExp.test(ds)
    // }
  };

  const handleFinanceSubmit = async (e) => {
    e.preventDefault();
    console.log(financeDetails);

    try {
      const res = await post(financeDetails);
      console.log(res);
      navigate('/finance');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{
        width: '95%',
        marginLeft: '0%',
        background: 'white',
        p: 3,
        borderRadius: '5px',
      }}
    >
      <form
        style={{
          marginTop: '30px',
          width: '50%',
          marginRight: '10%',
        }}
        onSubmit={handleFinanceSubmit}
      >
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ my: 3 }}
        >
          Add new finance records!
        </Typography>
        <Stack direction='row' spacing={2}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              House No
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={houseNumber}
              label='House No'
              onChange={(e) => setHouseNumber(e.target.value)}
            >
              {appartmentData?.appartments.map((property) => (
                <MenuItem
                  value={property.house_number}
                  key={property._id}
                >
                  {property.house_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Tenant Name
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={tenantName}
              label='Tenant Name'
              onChange={(e) => setTenantName(e.target.value)}
            >
              {tenantData?.tenants.map(
                (tenant) =>
                  tenant.house_number === houseNumber && (
                    <MenuItem value={tenant.name} key={tenant._id}>
                      {tenant.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction='row' spacing={2} my={2}>
          <TextField
            name='payment_date'
            label='Date'
            placeholder='dd-mm-yyyy'
            type='text'
            onChange={handleInputChange}
            sx={{ width: '100%' }}
          />
          <TextField
            label='Amount'
            name='amount'
            placeholder='1000'
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Typography variant='body2'>KES</Typography>
                </InputAdornment>
              ),
            }}
            sx={{ width: '60%' }}
          />
        </Stack>
        <PrimaryButton loading={loading} />
      </form>
      <img src={finance} alt='tenant illustration' width='35%' />
    </Stack>
  );
};

export default AddFinance;
