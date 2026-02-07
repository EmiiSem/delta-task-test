import { useState, useEffect } from 'react';
import type { IndicatorRow } from './types/indicators';
import { mockIndicatorRows, getMockIndicatorHistory } from './data/mockIndicators';
import { IndicatorsTable } from './components/IndicatorsTable/IndicatorsTable';
import { IndicatorChart } from './components/IndicatorChart/IndicatorChart';
import styles from './App.module.scss';

function App() {
  const [rows, setRows] = useState<IndicatorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<IndicatorRow | null>(null);
  const [chartData, setChartData] = useState<{ indicatorName: string; points: { date: string; value: number }[] } | null>(null);

  // Загрузка данных таблицы (имитация запроса)
  useEffect(() => {
    const t = setTimeout(() => {
      setRows(mockIndicatorRows);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // При выборе строки — подставляем данные для графика
  useEffect(() => {
    if (!selected) {
      setChartData(null);
      return;
    }
    const data = getMockIndicatorHistory(selected.id, selected.name, selected.currentDay);
    setChartData({ indicatorName: data.indicatorName, points: data.points });
  }, [selected]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Показатели</h1>
      </header>
      <main className={styles.main}>
        {loading ? (
          <p>Загрузка…</p>
        ) : (
          <>
            <IndicatorsTable
              rows={rows}
              selectedId={selected?.id ?? null}
              onSelectRow={setSelected}
            />
            {chartData && (
              <IndicatorChart title={chartData.indicatorName} points={chartData.points} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App;
