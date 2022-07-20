## 1. What is important for the code interview?
1. Readable
2. Maintainable
3. Reusable

Hints for achieving these three goals:
1. IF ELSE
    是一定有问题的，如果代码逻辑是由 IF ELSE 组成必定有问题，除了两种情况：Debug 和 边界处理
2. 嵌套逻辑
    绝不使用，打自己层数的n次方个巴掌
3. 简单的重复，大于复杂的抽象 （AHA）avoid hasty abstraction

## 2. 面向对象编程

SOLID 面向对象
1. Single Responsibility  单一职责
2. Open / Close           开闭原则
3. Dependencies injection 依赖注入 （依赖反转）


## 3. In-class practice
1. Flights Stops (Qantas)
- flights: `[{ origin: 'MEL', destination: 'CAN'}]`
    -> 'Direct'
- flights: `[{ origin: 'MEL', destination: 'CAN'}, { origin: 'CAN', destination: 'PVG'}]`
    -> '1 stop'
- flights: `[{ origin: 'MEL', destination: 'HKG'}, { HKG - CAN}, { origin: 'CAN', destination: 'PVG'}]`
    -> '2 stops' (n stops)

``` js
function getStops(flights) {
    const length = flights.length;
    // 老师的代码
    return {
        1: 'Direct',
        2: '1 stop',
        17: 'The Asian Trip',
        0: 'On the Sky',
        32: 'Around the World',
    }[length] || (length - 1) + 'stops'

    // 自己写的三种
    // 1. If else
     if (flights.length === 1) {
        return 'Direct'
    } else if (flights.length === 2) {
        return '1 stop'
    } else {
        return flights.length + ' stops'
    }

    // 2. Switch
    switch(flights.length) {
        case 1:
            return 'Direct'
        case 2:
            return '1 stop'
        default:
            return flights.length - 1 + ' stops'
    }

    // 3. 短路计算
    // const length = flights.length;
    let caseDirect = length > 1 || 'Direct';
    let case2Stop = length > 2 || length < 1 || '1 stop';
    return caseDirect || case2Stop || length - 1 + ' stops';
}
```

2. Tax Calculation (MYOB)

| Income thresholds  |  Rate  | Tax payable on this income   |
| -----------------  | ------ | --------------------------   |
| $0 - $18,200       |  0%    | Nil |
| $18,201 - $37,000  |  19%   | 19c for each $1 over $18,200 |
| $37,001 - $90,000  |  20.5% | $3,572 plus 20.5% of amounts over $37,000 |
| $90,001 - $180,000 |  37%   | $20,797 plus over fee |
| $180,001 and over  |  45%   | $54,096 plus over fee |

```js

const TAX_TABLE_2021 = [
    { min: 0, max: 18200, rate:0 , base: 0 }, 
    { min: 18201, max: 37000, rate: 0.19, base: 0 }, 
    { min: 37001, max: 90000, rate: 0.205, base: 3572 }, 
    { min: 90001, max: 180000, rate: 0.37, base: 20797 }, 
    { min: 180001, max: POSITIVE_INFINITY, rate: 0.45, base: 54096 }
];

const TAX_TABLE_WORKING_HOLIDAY = [
    { min: 0, max: 45000, rate: 0.15, base: 0 }, 
    { min: 45001, max: 120000, rate: 0.325, base: 6750 }, 
    { min: 120001, max: 180000, rate: 0.37, base: 31125 }, 
    { min: 180001, max: POSITIVE_INFINITY, rate: 0.45, base: 53325 }
]

/*
function calTax(income, taxTable) {
    let [payableLevel] = taxTable.filter( (e) => e.min < income && e.max > income );
    result = payableLevel.rate * (income - (payableLevel.min - 1)) + payableLevel.base;
    return result;
} */

const calTax = (income, taxTable) => {
    let [payableLevel] = taxTable.filter( (e) => e.min < income && e.max > income );
    result = payableLevel.rate * (income - (payableLevel.min - 1)) + payableLevel.base;
    return result;
}

```

## 11. Scope


## 12. 闭包


## 14. Vanilla Javascript

Vanilla Javascript is a fast, lightweight, cross-platform framework for building incredible powerful Javascript applications.

Vanilla JS 基于 Native JS 对浏览器 APP 进行开发
Node JS 基于 Native JS 对服务器 APP 进行开发

## 15. ES6
optional arguments

### 15.h Destructuring 解构赋值
从数组或对象中提取数据