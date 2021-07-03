export default function currencyFilter(value, currency = 'USD') {
  let options = {};
  options.style = 'currency';
  options.currency = currency;
  // if (format.includes('date')) {
  //   options.year = 'numeric';
  //   options.month = 'long';
  //   options.day = 'numeric';
  // }
  // if (format.includes('time')) {
  //   options.hour = 'numeric';
  //   options.minute = '2-digit';
  //   options.second = '2-digit';
  // }


  // options.hc = 'h24';
  let val = new Intl.NumberFormat('ru-RU', options).format(value);
  return val;
}
