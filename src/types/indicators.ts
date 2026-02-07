/** Строка таблицы показателей: сводка за текущий день, вчера и этот день недели */
export interface IndicatorRow {
  id: string,
  name: string,
  currentDay: number,
  yesterday: number,
  sameDayOfWeek: number,
  /** Процент изменения относительно вчера (для отображения в колонке "Вчера") */
  changePercent: number,
}

/** Точка истории для графика — значение показателя в момент времени */
export interface IndicatorHistoryPoint {
  date: string,
  value: number,
}

/** Ответ API: история по одному показателю для графика */
export interface IndicatorHistory {
  indicatorId: string,
  indicatorName: string,
  points: IndicatorHistoryPoint[],
}
