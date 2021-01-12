import numToStr from './numToStr.js';

function Decrypt (str) {
    let resultedStr = '';
    let arr = str.split(" ");
    let key = Math.sqrt(arr[arr.length - 1]);
    arr.pop();
    arr.map((num, index) => {
        num = num - key - index;
        resultedStr += numToStr[num];
    })
    return resultedStr;
}

export default Decrypt;