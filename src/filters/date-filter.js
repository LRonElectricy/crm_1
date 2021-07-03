export default function dateFilter(value, format = 'date') {
  let options = {};
  if (format.includes('date')) {
    options.year = 'numeric';
    options.month = 'long';
    options.day = 'numeric';
  }
  if (format.includes('time')) {
    options.hour = 'numeric';
    options.minute = '2-digit';
    options.second = '2-digit';
  }


  // options.hc = 'h24';
  let val = new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
  return val;
}
