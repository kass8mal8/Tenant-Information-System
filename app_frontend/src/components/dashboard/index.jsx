import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'

import {PolarArea} from 'react-chartjs-2';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../App';

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale)

const Dashboard = () => {
    const labels = ['Tenants', 'Finance', 'Property']
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const propURI = `http://localhost:5000/api/house/${user_id}`
    const tenantURI = `http://localhost:5000/api/tenants/${user_id}`
    const financeURI = `http://localhost:5000/api/finance`
    const { data: propData } = useFetch("appartments", propURI)
    const { data: tenantData } = useFetch("tenants", tenantURI)
    const { data: financeData } = useFetch("finances", financeURI)
    console.log(financeData)

    const chartData = {
        labels,
        datasets: [{
            label: 'Summary',
            data: [tenantData?.tenants?.length, financeData?.finance?.length, propData?.appartments?.length],
            backgroundColor: ['blue', 'green', 'yellow']
            }
        ]
    }


    return <div>
        <PolarArea data={chartData} />
    </div>;
}
 
export default Dashboard;