const generateWeekBinary = (val: number) => {
  console.log('seletecd: ', val);
  console.log('weekBinary: ', weekBinary);
  const firstPart = weekBinary.slice(0, val) + '1' + weekBinary.slice(val, 7);
  setWeekBinary(firstPart);
  // updateDpValue({ code: 'Timer1', value: 'MjA6MDAgMDE6MDA=' });
  console.log(firstPart);
};

const toStatesFromByteArray = () => {
  setStartHour(parseInt(receivedBinaryArray[1], 2));
  setStartMin(parseInt(receivedBinaryArray[2], 2));
  setWorkingHour(parseInt(receivedBinaryArray[3], 2));
  setWorkingMin(parseInt(receivedBinaryArray[4], 2));
  setWateringTime(parseInt(receivedBinaryArray[6], 2));
  setBreakTime(parseInt(receivedBinaryArray[8], 2));
};

const toByteArrayFromHexString = (hexVal: any) => {
  let str = hexVal.toString();
  let hexArr = new Array();
  for (let i = 0; i < str.length; i += 2) {
    hexArr.push(str[i] + '' + str[i + 1]);
  }
  for (let i = 0; i < hexArr.length; i++) {
    var hexNum = parseInt(hexArr[i], 16);
    receivedBinaryArray.push(byteString(hexNum));
  }
  console.log('Received:', receivedBinaryArray);
};

function byteString(n) {
  if (n < 0 || n > 255 || n % 1 !== 0) {
    throw new Error(n + ' does not fit in a byte');
  }
  return ('000000000' + n.toString(2)).substr(-8);
}

const decodeBase64String = (baseString: string) => {};
