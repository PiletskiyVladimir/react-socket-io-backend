import strToNum from './strToNum.js';

function Crypt (str, key) {
    let resultedStr = '';
    for (let i = 0; i < str.length; i++) {
        resultedStr += +(strToNum[str[i]] + key + i) + " ";
    }

    resultedStr += Math.pow(key, 2);
    
    return resultedStr;
}

export default Crypt;