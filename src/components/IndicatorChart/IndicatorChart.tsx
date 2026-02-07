import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../utils/format';
import styles from './IndicatorChart.module.scss';

interface IndicatorChartProps {
  title: string,
  points: { date: string; value: number }[],
}

export function IndicatorChart({ title, points }: IndicatorChartProps) {
  const chartData = points.map((p) => ({ date: p.date.slice(5), value: p.value }));

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#666" />
            <YAxis tick={{ fontSize: 12 }} stroke="#666" tickFormatter={(v) => formatNumber(v)} />
            <Tooltip
              labelFormatter={(label) => `Дата: ${label}`}
              formatter={(v: number | undefined) => [v != null ? formatNumber(v) : '—', title]}
            />
            <Line
              type="monotone"
              dataKey="value"
              name={title}
              stroke="#1a7f37"
              strokeWidth={2}
              dot={{ fill: '#1a7f37', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
