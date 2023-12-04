import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="70%"
          data={VaccinationByAgeDetails}
          startAngle={0}
          endAngle={360}
          innerRadius="50%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="45-60" fill="#b3d23f" />
          <Cell name="Above 60" fill="#f3d26f" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default VaccinationByAge
