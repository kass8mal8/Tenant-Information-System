import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'

import {PolarArea} from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { MonetizationOn, MonetizationOnOutlined, PeopleRounded, HouseOutlined, HomeWork, AccountBalanceWallet, Groups, Timer } from "@mui/icons-material";
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

    const d = new Date()
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let remDays = 0

    for(let month in months) {
        if(+month === d.getMonth()) remDays = months[month] - d.getDate()
    }

    return (
        <Box>
            <Stack direction='row' spacing={2} sx={{ justifyContent: 'space-between' }} >
                <Box sx={{ width: '100%' }}>
                    <Stack direction='row' spacing={2}>
                        <Stack className='dashboard-card' direction='row' spacing={2}>
                            <Box>
                                {totalFunds ? <Typography variant='body1' sx={{ color: '#45a9ea', fontWeight: 'bold', fontSize: '30px' }}>{totalFunds !== 0 ? totalFunds : "0000"}</Typography>
                                : <Skeleton variant='text' sx={{ height: '40px', width: '100px' }}/>}
                                <Typography color='text.secondary' variant='body2' >Total Rent</Typography>
                            </Box>
                            <AccountBalanceWallet sx={{ width: '65px', height: '65px', color: 'gray' }} />
                        </Stack>
                        <Stack className='dashboard-card' direction='row' spacing={2}>
                            <Box>
                                {tenantData ? <Typography variant='body1' sx={{ color: '#45a9ea', fontWeight: 'bold', fontSize: '30px' }}>{tenantData.tenants.length ? tenantData.tenants?.length < 10 ? `0${tenantData.tenants?.length}` : tenantData.tenants?.length : "0000"}</Typography>
                                : <Skeleton variant='text' sx={{ height: '40px' }}/>}
                                <Typography color='text.secondary' variant='body2' >Total Tenants</Typography>
                            </Box>
                            <Groups sx={{ width: '70px', height: '70px', color: 'gray' }} />
                        </Stack>
                    </Stack>
                    <Stack my={2} direction='row' spacing={2} sx={{background: 'white', p: 2, alignItems: 'center'}}>
                        <Box>
                            {propData ? <Typography variant='body1' sx={{ color: '#45a9ea', fontWeight: 'bold', fontSize: '30px' }}>{propData.appartments?.length ? propData.appartments?.length < 10 ? `0${propData.appartments?.length}` : propData.appartments?.length : "0000"}</Typography>
                            : <Skeleton variant='text' sx={{ height: '40px' }}/> }
                            <Typography color='text.secondary' variant='body2' >Total Properties Managing</Typography>
                        </Box>
                        <HomeWork sx={{ width: '70px', height: '70px', color: 'gray'  }} />
                    </Stack>

                    <Stack direction='row' sx={{background: 'white', p: 2, alignItems: 'center'}}>
                        <Box>
                            {remDays ? <Typography sx={{ color: '#45a9ea', fontWeight: 'bold', fontSize: '30px' }}>{remDays < 10 && `0${remDays}` }</Typography>
                            : <Skeleton variant='text' sx={{ height: '40px' }}/>}
                            <Typography>Days remaining to rent collection</Typography>
                        </Box>
                        <Timer sx={{ width: '70px', height: '70px', color: 'gray', ml: 3 }} />
                    </Stack>
                </Box>
                <Box sx={{ width: '100%', height: '340px', background: 'white', borderRadius: '5px' }}>
                    <PolarArea data={chartData}/>
                </Box>
            </Stack>
        </Box>
    )
}
 
export default Dashboard;