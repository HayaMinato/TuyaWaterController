import React, { Component, useState } from 'react';

const multipleGroupData = [
  { value: 'Sun' },
  { value: 'Mon' },
  { value: 'Tue' },
  { value: 'Wed' },
  { value: 'Thi' },
  { value: 'Fri' },
  { value: 'Sat' },
];

function byteString(n) {
  if (n < 0 || n > 255 || n % 1 !== 0) {
    throw new Error(n + ' does not fit in a byte');
  }
  return ('000000000' + n.toString(2)).substr(-8);
}

export const toByteArrayFromHexString = (hexVal: any) => {
  let receivedBinaryArray = new Array<string>();
  let receivedDefaultBinaryArray = new Array<string>();
  let str = hexVal.toString();
  if (!str) {
    for (let i = 0; i < 9; i++) receivedDefaultBinaryArray.push('00000000');
    console.log('Received:', receivedDefaultBinaryArray);
    return receivedDefaultBinaryArray;
  } else {
    let hexArr = new Array();
    for (let i = 0; i < str.length; i += 2) {
      hexArr.push(str[i] + '' + str[i + 1]);
    }
    for (let i = 0; i < hexArr.length; i++) {
      var hexNum = parseInt(hexArr[i], 16);
      receivedBinaryArray.push(byteString(hexNum));
    }
    console.log('Received:', receivedBinaryArray);
    return receivedBinaryArray;
  }
};

export const toWeekArrayFromByteArray = (weekdayBinary: string) => {
  let weekString = weekdayBinary;
  console.log('weekstring:', weekString);
  const multipleWeekData: any = [];
  for (let i = 0; i < weekString.length - 1; i++) {
    if (weekString[i] == '1') {
      // multipleWeekData.push(multipleGroupData[i]);
      multipleWeekData.push(i);
    }
  }
  multipleWeekData.push(weekString[weekString.length - 1]);
  // console.log('parsedWeek', multipleWeekData);
  return multipleWeekData;
};

export const toWeekBinaryStringFromWeekString = (weekStringArray: any, activeVal: boolean) => {
  let weekArray: any = '00000000';
  for (let i = 0; i < weekStringArray.length; i++) {
    switch (weekStringArray[i]) {
      case 'Sun':
        weekArray = '1' + weekArray.slice(1, 8);
        break;
      case 'Mon':
        weekArray = weekArray.slice(0, 1) + '1' + weekArray.slice(2, 8);
        break;
      case 'Tue':
        weekArray = weekArray.slice(0, 2) + '1' + weekArray.slice(3, 8);
        break;
      case 'Wed':
        weekArray = weekArray.slice(0, 3) + '1' + weekArray.slice(4, 8);
        break;
      case 'Thi':
        weekArray = weekArray.slice(0, 4) + '1' + weekArray.slice(5, 8);
        break;
      case 'Fri':
        weekArray = weekArray.slice(0, 5) + '1' + weekArray.slice(6, 8);
        break;
      case 'Sat':
        weekArray = weekArray.slice(0, 6) + '1' + weekArray.slice(7, 8);
        break;
    }
  }
  weekArray = activeVal ? weekArray.slice(0, 7) + '1' : weekArray.slice(0, 7) + '0';
  return weekArray;
};

export const updateDpStateBinaryArray = (
  binString: string,
  insertIndex: number,
  updateDpName: string
) => {};
export const toHexStringFromBinaryArray = (
  binaryArray: any,
  position: number,
  hexString: string
) => {
  let hexVal: string = hexString;
  var hexa = parseInt(binaryArray, 2).toString(16);
  hexVal = hexVal.slice(0, 2 * (position - 1)) + hexa + hexVal.slice(2 * position, 18);
  return hexVal;
};
// useEffect(() => {
//   toByteArrayFromHexString(dpState['Timer1']);
// });
