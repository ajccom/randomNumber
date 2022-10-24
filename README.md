# randomNumber
产出随机无重复的整数，支持 1000000000000 以内数字

# 用法 

调用 `randomNumber` 方法并输入最大值，返回一个函数，该函数每次调用会输出 [0, 最大值) 区间内整数。

```javascript
var getRandomNumber = randomNumber(100);
getRandomNumber() // 29
getRandomNumber() // 32
getRandomNumber() // 87
```
