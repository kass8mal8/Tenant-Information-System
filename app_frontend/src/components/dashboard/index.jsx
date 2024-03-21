import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'

import {PolarArea} from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { Box, Stack, Typography } from "@mui/material";
import { MonetizationOn, MonetizationOnOutlined, PeopleRounded, PersonTwoTone } from "@mui/icons-material";
import chart from "../../assets/images/chart.jpg"

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale)

const Dashboard = () => {
    const labels = ['Tenants', 'Finance', 'Property']
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user

    const propURI = `http://localhost:5000/api/house/${user_id}`
    const tenantURI = `http://localhost:5000/api/tenants/${user_id}`
    const financeURI = `http://localhost:5000/api/finance/${user_id}`

    const { data: propData } = useFetch("appartments", propURI)
    const { data: tenantData } = useFetch("tenants", tenantURI)
    const { data: financeData } = useFetch("finances", financeURI)
    console.log(financeData)

    let totalFunds;
    const fundsArr = []
    financeData?.finance.forEach( finance => fundsArr.push(finance.amount))

    totalFunds = fundsArr?.length && fundsArr.reduce((a, b) => a + b)

    const chartData = {
        labels,
        datasets: [{
            label: 'Summary',
            data: [tenantData?.tenants?.length, financeData?.finance.length, propData?.appartments?.length],
            backgroundColor: ['#45a9ea', 'orange', 'rgb(184, 86, 99)']
            }
        ]
    }    

    return (
        <Box>
            <Stack direction='row' spacing={2} sx={{ justifyContent: 'space-between' }} >
                <Box sx={{ width: '100%' }}>
                    <Stack direction='row' spacing={2}>
                        <Stack direction='row' spacing={2} sx={{background: 'white', p: 2}}>
                            <Box>
                                <Typography variant='body1' sx={{ color: '#45a9ea' }}>{totalFunds ? totalFunds : "0000"}</Typography>
                                <Typography color='text.secondary' variant='body2' >Rent Collected</Typography>
                            </Box>
                            <MonetizationOnOutlined sx={{ width: '50px', height: '50px', color: 'gray' }} />
                        </Stack>
                        <Stack direction='row' spacing={2} sx={{background: 'white', p: 2}}>
                            <Box>
                                <Typography variant='body1' sx={{ color: '#45a9ea' }}>{tenantData?.tenants?.length ? tenantData.tenants?.length < 10 ? `0${tenantData.tenants?.length}` : tenantData.tenants?.length : "0000"}</Typography>
                                <Typography color='text.secondary' variant='body2' >Total Tenants</Typography>
                            </Box>
                            <PeopleRounded sx={{ width: '50px', height: '50px', color: 'gray' }} />
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ width: '100%', background: 'white', borderRadius: '5px' }}>
                    <PolarArea data={chartData}/>
                </Box>
            </Stack>
        </Box>
    )
}
 
export default Dashboard;