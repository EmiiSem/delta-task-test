/** Форматирование числа с пробелами как разделителями тысяч */
export function formatNumber(value: number): string {
  return value.toLocaleString('ru-RU').replace(/\s/g, ' ');
}

/** Знак и цвет для процента изменения */
export function formatChangePercent(percent: number): { text: string; variant: 'positive' | 'negative' | 'zero' } {
  if (percent > 0) return { text: `${percent}%`, variant: 'positive' };
  if (percent < 0) return { text: `${percent}%`, variant: 'negative' };
  return { text: '0%', variant: 'zero' };
}
