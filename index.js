function randomNumber (max) {
  // 使用一个质数防止图层与 unitLong 有相同公约数
  var unitLong = 9973; 
  var hash = {
    '0': 1,
    '1': unitLong,
    '2': Math.pow(unitLong, 2),
    '3': Math.pow(unitLong, 3),
  };
  var h = max > hash['1'] ? (max > hash['2'] ? 3 : 2) : 1;
  var highLong = Math.ceil(max / hash[h - 1]);
  var numberStore = [];
  var i = 0;
  var j = 0;
  var temp = [];
  var long = 0;
  var p = {};
  var highNumbersCount = 0;
  var highNumbers = [];
  var isUseHighNumbers = false;
  if (max > unitLong && max % unitLong !== 0) {
    isUseHighNumbers = true;
    highLong = highLong - 1;
    highNumbersCount = max - hash[h - 1] * highLong;
    // console.log('---->', highLong, hash[h - 1], highNumbersCount);
    i = 0;
    for (i; i < highNumbersCount; i++) {
      highNumbers.push(i);
    }
    highNumbers = highNumbers.sort(function () { return Math.random() - 0.5; });
  }
  i = 0;
  for (i; i < h; i++) {
    temp = [];
    j = 0;
    long = i === h - 1 ? highLong : unitLong;
    for (j; j < long; j++) {
      temp.push(j);
    }
    p[i] = 0;
    numberStore.push(temp.sort(function () { return Math.random() - 0.5; }));
  }
  function setFloorPoint (currentH) {
    if (currentH < 0) {
      return;
    }
    var len = numberStore[currentH].length;
    p[currentH] += 1;
    if (p[currentH] % len === 0) {
      setFloorPoint(currentH - 1);
      p[currentH] = 0;
    }
  }
  function random () {
    // 逆序从 numberStore 中每一层读取一个位置的数据用于组合成最后的数字
    var result = [];
    var number = 0;
    if (p[h - 1] === -1) {
      setFloorPoint(h - 1);
    } else if (isUseHighNumbers && (p[h - 1] + 1) % numberStore[h - 1].length === 0 && highNumbers.length) {
      // console.log(hash[h - 1], highNumbers);
      number = hash[h - 1] * highLong + highNumbers.shift();
      p[h - 1] = -1;
      return number;
    } else {
      setFloorPoint(h - 1);
    }
    Object.keys(p).sort(function (a, b) { return a - b; }).forEach(function (currentH) {
      result.push(numberStore[currentH][p[currentH]]);
    });

    number = result.reduce(function (prev, current, index) {
      return (prev || 0) + current * hash[index];
    });

    return number;
  }
  console.log('random函数配置信息：', {
    numberStore,
    p,
  });
  
  return random;
}
