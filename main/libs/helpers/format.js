export const format = {
  toAmountStr(amount, zeroDecimal) {
    const arr = parseFloat(amount).toFixed(2).split('');

    const decimal =
      arr[arr.length - 3] + arr[arr.length - 2] + arr[arr.length - 1];

    arr.splice(arr.length - 3, 3, decimal);

    for (let i = arr.length - 4; i > 0; i = i - 3) {
      arr.splice(i, 0, ',');
    }

    if (!zeroDecimal) {
      if (decimal === '.00') {
        arr.splice(arr.length - 1, 1);
      }
    }

    return arr.join('');
  },
  toStrAmount: (str) => {
    return str.split(',').join('');
  },
  toMobileNumberStr: (str) => {
    const spaceChar = ' ';

    const toStrNumber = format.toMobileNumberAmount(str);

    const startStr = toStrNumber.slice(0, 4);
    const midStr = toStrNumber.slice(4, 7);
    const endStr = toStrNumber.slice(7, 10);

    if (startStr && midStr && endStr)
      return startStr + spaceChar + midStr + spaceChar + endStr;

    if (startStr && midStr) return startStr + spaceChar + midStr;

    if (startStr) return startStr;

    return '';
  },
  toMobileNumberAmount: (str) => {
    const spaceChar = ' ';

    const validNumbers = Array.from(str).reduce((prevArray, char) => {
      const arrTemp = prevArray;

      if (char === spaceChar || isNaN(char)) {
        return arrTemp;
      }

      if (!isNaN(char)) {
        arrTemp.push(char);

        return arrTemp;
      }

      return arrTemp;
    }, []);

    return validNumbers.join('');
  },
};
