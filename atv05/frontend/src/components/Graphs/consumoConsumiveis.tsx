import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ConsumoConsumivel, estatisticasServices } from "../../services/estatisticasServices";
import { useEffect, useState } from "react";
import { ApiException } from "../../config/apiConfig";


const GraficoConsumoConsumiveis: React.FC = () =>{
    const [ data, setData ] = useState<Array<ConsumoConsumivel>>([]);

    const fetchData = async () => {
        const result = await estatisticasServices.getConsumivelConsumo()
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setData(result.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#975DB9', '#4FBF45', '#79C4E3', '#EB5151', '#DC5D81', '#93CC5B'];
    return (
        <>
            <ResponsiveContainer width="100%" height={400} className={"responsive-pie"}>
                <PieChart  margin={{ top: 0, right: 0, left:0, bottom: 0 }}>
                    <Pie data={data} dataKey="quantidade" cx="50%" cy="50%" outerRadius={130} fill="#8884d8" nameKey="consumivel" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => {
                            return `${value} un`;
                    }}/>
                    <Legend verticalAlign="bottom" align="left"  margin={{ top: 100, left: 0, right: 0, bottom: 0 }}  />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default GraficoConsumoConsumiveis