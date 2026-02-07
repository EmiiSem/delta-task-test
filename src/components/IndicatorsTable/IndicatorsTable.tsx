import type { IndicatorRow } from '../../types/indicators';
import { formatNumber, formatChangePercent } from '../../utils/format';
import styles from './IndicatorsTable.module.scss';

interface IndicatorsTableProps {
  rows: IndicatorRow[],
  selectedId: string | null,
  onSelectRow: (row: IndicatorRow) => void,
}

export function IndicatorsTable({ rows, selectedId, onSelectRow }: IndicatorsTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const yesterdayChange = formatChangePercent(row.changePercent);

            // Расчёт процента изменения по сравнению с тем же днем недели
            const sameDayOfWeekChangeValue = row.sameDayOfWeek !== 0 
              ? ((row.currentDay - row.sameDayOfWeek) / Math.abs(row.sameDayOfWeek)) * 100 
              : 0;
            const sameDayOfWeekChange = formatChangePercent(sameDayOfWeekChangeValue);

            const isAlt = index % 2 === 1;
            const isSelected = selectedId === row.id;

            // Определение класса для фона ячейки "Вчера"
            let yesterdayBgClass = '';
            if (yesterdayChange.variant === 'positive') {
              yesterdayBgClass = styles.positiveBg;
            } else if (yesterdayChange.variant === 'negative') {
              yesterdayBgClass = styles.negativeBg;
            }

            // Определение класса для фона ячейки "Этот день недели"
            let sameDayOfWeekBgClass = '';
            if (sameDayOfWeekChange.variant === 'positive') {
              sameDayOfWeekBgClass = styles.positiveBg;
            } else if (sameDayOfWeekChange.variant === 'negative') {
              sameDayOfWeekBgClass = styles.negativeBg;
            }

            return (
              <tr
                key={row.id}
                className={isSelected ? styles.selected : undefined}
                onClick={() => onSelectRow(row)}
              >
                <td className={styles.indicator}>{row.name}</td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''}`}>
                  {formatNumber(row.currentDay)}
                </td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''} ${yesterdayBgClass}`}>
                  <span className={styles.yesterdayCell}>
                    {formatNumber(row.yesterday)}
                    <span className={`${styles.percent} ${styles[yesterdayChange.variant]}`}>
                      {yesterdayChange.text}
                    </span>
                  </span>
                </td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''} ${sameDayOfWeekBgClass}`}>
                  {formatNumber(row.sameDayOfWeek)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}