import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ConsumoPorRacaPet, estatisticasServices } from "../../services/estatisticasServices";
import { useEffect, useState } from "react";
import { ApiException } from "../../config/apiConfig";

const processData = (data) => {
    const result = [];
  
    data.forEach((item) => {
      const entry = { pet_raca: item.pet_raca };
      item.consumiveis.forEach((consumivel) => {
        entry[consumivel.consumivel] = consumivel.quantidade;
      });
      result.push(entry);
    });
  
    return result;
  };

const GraficoConsumiveisPorRacaPet: React.FC = () =>{ 
    const [ data, setData ] = useState<Array<ConsumoPorRacaPet>>([]);

    const fetchData = async () => {
        const result = await estatisticasServices.getConsumoPorRacaPet()
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setData(result.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const chartData = processData(data);

    const getUniqueConsumables = (data) => {
    const consumables = new Set();
    data.forEach((item) =>
        item.consumiveis.forEach((consumivel) =>
        consumables.add(consumivel.consumivel)
        )
    );
    return Array.from(consumables) as string[]; 
    };

    const uniqueConsumables = getUniqueConsumables(data);
      
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#975DB9', '#4FBF45', '#79C4E3', '#EB5151', '#DC5D81', '#93CC5B'];
    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pet_raca" />
                <YAxis />
                <Tooltip />
                <Legend />
                {uniqueConsumables.map((consumivel: string, index: number) => (
                <Bar
                    key={consumivel} 
                    dataKey={consumivel} 
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                />
                ))}
            </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default GraficoConsumiveisPorRacaPet