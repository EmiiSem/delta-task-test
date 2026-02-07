import type { IndicatorRow, IndicatorHistoryPoint } from '../types/indicators'

/** Моковые данные таблицы (как на картинке). В реальном приложении приходят с API. */
export const mockIndicatorRows: IndicatorRow[] = [
  { id: 'revenue', name: 'Выручка, руб', currentDay: 500521, yesterday: 480521, sameDayOfWeek: 4805121, changePercent: 4 },
  { id: 'cash', name: 'Наличные', currentDay: 300000, yesterday: 300000, sameDayOfWeek: 300000, changePercent: 0 },
  { id: 'noncash', name: 'Безналичный расчет', currentDay: 100000, yesterday: 100000, sameDayOfWeek: 100000, changePercent: 0 },
  { id: 'credit', name: 'Кредитные карты', currentDay: 100521, yesterday: 100521, sameDayOfWeek: 100521, changePercent: 0 },
  { id: 'avg_check', name: 'Средний чек, руб', currentDay: 1300, yesterday: 900, sameDayOfWeek: 900, changePercent: 44 },
  { id: 'avg_guest', name: 'Средний гость, руб', currentDay: 1200, yesterday: 800, sameDayOfWeek: 800, changePercent: 50 },
  { id: 'removal_after', name: 'Удаления из чека (после оплаты), руб', currentDay: 1000, yesterday: 1100, sameDayOfWeek: 900, changePercent: -9 },
  { id: 'removal_before', name: 'Удаления из чека (до оплаты), руб', currentDay: 1300, yesterday: 1300, sameDayOfWeek: 900, changePercent: 0 },
  { id: 'checks_count', name: 'Количество чеков', currentDay: 34, yesterday: 36, sameDayOfWeek: 34, changePercent: -6 },
  { id: 'guests_count', name: 'Количество гостей', currentDay: 34, yesterday: 36, sameDayOfWeek: 32, changePercent: -6 },
]

/** Генерация моковой истории для графика (последние 7 точек с трендом) */
function generateMockHistory(id: string, name: string, baseValue: number): { indicatorId: string; indicatorName: string; points: IndicatorHistoryPoint[] } {
  const points: IndicatorHistoryPoint[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const variation = Math.round(baseValue * (0.85 + Math.random() * 0.3));
    points.push({
      date: d.toISOString().slice(0, 10),
      value: variation,
    })
  }
  return { indicatorId: id, indicatorName: name, points };
}

/** Мок: история по id показателя */
export function getMockIndicatorHistory(indicatorId: string, indicatorName: string, currentValue: number): { indicatorId: string; indicatorName: string; points: IndicatorHistoryPoint[] } {
  return generateMockHistory(indicatorId, indicatorName, currentValue);
}
