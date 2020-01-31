export function giveDate() {
  const newDate = new Date();
  const date = newDate.toLocaleDateString('PL', { // you can skip the first argument
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = newDate.toLocaleTimeString('PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
  return `${date} ${time}`;
}
