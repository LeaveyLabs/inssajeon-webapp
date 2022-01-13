import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}

export function fDecimal(number: number) {
  let formatted: string = "";
  if (number < 1000) return number; 
  else if (number < 10000 ) //천
  {
    let cheon: number = Math.floor(number / 1000)
    let asstring: string = numeral(number).format('0')
    let baek: string = asstring.charAt(asstring.length - 3)
    formatted = cheon + "." + baek + "천"
  }
  else if (number < 10000000 ) //만
  {
    let mahn: number = Math.floor(number/10000)
    let asstring: string = numeral(number).format('0')
    let cheon: string = asstring.charAt(asstring.length - 4)
    formatted = mahn + "." + cheon + "만"
  }
  else if (number < 100000000 ) //천만
  {
    let cheonman: number = Math.floor(number/10000000)
    let asstring: string = numeral(number).format('0')
    let baekman: string = asstring.charAt(asstring.length - 7)
    formatted = cheonman + "." + baekman + "천만"
  }
  else if (number < 100000000000 ) //억
  {
    let oek: number = Math.floor(number/100000000)
    let asstring: string = numeral(number).format('0')
    let cheonman: string = asstring.charAt(asstring.length - 8)
    formatted = oek + "." + cheonman + "억"
  }
  else if (number < 1000000000000 ) //천억
  {
    let cheonoek: number = Math.floor(number/100000000000)
    let asstring: string = numeral(number).format('0')
    let baekoek: string = asstring.charAt(asstring.length - 11)
    formatted = cheonoek + "." + baekoek + "천억"
  }
  else //if (number < 100000000000 ) //조
  {
    let jo: number = Math.floor(number/1000000000000)
    let asstring: string = numeral(number).format('0')
    let cheonoek: string = asstring.charAt(asstring.length - 12)
    formatted = jo + "." + cheonoek + "조"
  }
  if (formatted.length > 5) {
    return formatted.slice(0,3) + formatted.slice(-1); //dont display decimals if three digits on left of decimal
  } else return formatted;
}