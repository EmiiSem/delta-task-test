import type { IndicatorRow } from '../../types/indicators'
import { formatNumber, formatChangePercent } from '../../utils/format'
import styles from './IndicatorsTable.module.scss'

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
            const { text: percentText, variant: percentVariant } = formatChangePercent(row.changePercent)
            const isAlt = index % 2 === 1
            const isSelected = selectedId === row.id
            return (
              <tr
                key={row.id}
                className={isSelected ? styles.selected : undefined}
                onClick={() => onSelectRow(row)}
              >
                <td className={styles.indicator}>{row.name}</td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''}`}>{formatNumber(row.currentDay)}</td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''}`}>
                  <span className={styles.yesterdayCell}>
                    {formatNumber(row.yesterday)}
                    <span className={`${styles.percent} ${styles[percentVariant]}`}>{percentText}</span>
                  </span>
                </td>
                <td className={`${styles.value} ${isAlt ? styles.rowAlt : ''}`}>{formatNumber(row.sameDayOfWeek)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
