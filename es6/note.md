## var, let and const

function scope
var => global scope
let => block scope

const => cannot be change
object or string can be change


## Template String

```js
const name = 'mason';
const age = 24;

// es5
console.log('My name is ' + name + "and I'm " + age + ' years old.')
// es6
console.log(`My name is ${name}, and I\'m ${age} years old.`)
```

## Spread operator

```js
const array = [1, 2];
const newArray = [...array, 3, 4];
console.log(newArray); // [1, 2, 3, 4]
```

spread 部分一般在最前 否则对value的更新无效
```js
const fruit = { name: 'apple', color: 'green' };
let newFruit = { ...fruit, color: 'red' };
console.log(newFruit); // { name: 'apple', color: 'red' }
newFruit = { color: 'red', ...fruit }; // 属性被覆盖
console.log(newFruit); // { name: 'apple', color: 'green' }
```

## Destructing => object

We have a map "fruit"
```js
const fruit = { name: 'apple', color: 'red' };
```

右边的是被解构的对象
basic
```js
const name = fruit.name; // apple
const color = fruit.color; // red
```

without repeatly refer (together)
```js
const { name, color } = fruit;
console.log(name); // apple
console.log(color); // red
```

rename the variable
```js
const { name: fruitName, color: fruitColor } = fruit;
console.log(fruitName); // apple
console.log(fruitColor); // red
```

## Destructing => array

```js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'pear', color: 'green' },
];
const [apple, pear] = fruits;
console.log(apple); // { name: 'apple', color: 'red' }
console.log(pear); // { name: 'pear', color: 'green' }
const [ {color: appleColor}, {color: pearColor}] = fruits;
console.log(apple); // red
console.log(pear); // green
```

more complicated use cases
保持左右结构一致
```js
const [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo); // 1
console.log(bar); // 2
console.log(baz); // 3


const [, , third] = ['foo', 'bar', 'baz'];
console.log(third); // 'baz'


const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]
// Rest element must be last element 必须是最后几个元素


const [missing = true] = [];
console.log(missing); // true
```

## Default Parameter

```js
function sum (a = 1, b = 1) {
    return a + b;
}
console.log(sum()); // 2 (Take two default value)
console.log(sum(undefine, 2)); // 3 (Take one default value)
console.log(sum(3, 4)); // 7
```

## Arrow function

```js
const add = function (x, y) {
    return x + y;
}
// vs
const add = (x, y) => {
    return x + y;
}
// equals
const add = (x, y) => x + y;


const add = (x, y) => {
    return { sum: x + y };
}
// equals
const add = (x, y) => ({ sum: x + y});
```

## Callback

Pass a function as a parameter and when some event happened (addEventListener), execute this function.
Used for async or sequential purpose.

```js
function logger(param) {
    console.log(param);
}
function sum(x, y , callback) {
    setTimeOut(() => {
        const total = x + y;
        callback(total);
    }, 1000);
sum(1, 2, logger);
}
```

## Closure

A closure is when a function has access to its lexical scope even when it is called outside of it. Closures are created every time a function is created, at function created time. 闭包在函数被书写的那一刻就存在，而不是在调用时才出现

lexical scope 词法作用域 => 指function被声明的位置的作用域

1. Function was passed to another functino as param
```js
const number = 1;
function foo() {
    console.log(number);
}
function bar(function) {
    const number = 2;
    function(number);
}
bar(foo); // 1
```
2. Function was returned by another function
```js
function foo() {
    const number = 1;
    return () => {
        console.log(number);
    };
}
const number = 100;
foo()(); // 1
```

This technique can be used to hide some data.
Like "private" type in Java & Python.
```js
function createCounter() {
    let counter = 0;
    const increment = () => {
        counter++;
    };
    const getCount = () => {
        return counter;
    };
    return {
        increment,
        getCount,
    };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount());
```

### IIFEs

Immediately Invoked Function Expressions
Commonly used to avoid polluting the global namespace and modules.
```js
(function () {
    // some variable in it's own space
})();
```
使前一个括号内的函数立即执行

## this

### this keyword in normal functions

```js
function foo() {
    console.log(this);
}
foo(); // window
```
foo 这个函数可以说是注册在 window 上的

### this keyword: in normal functions with bind, call, apply

1. call
指定 this 为括号内的对象，并执行函数
```js
foo.call( {number: 1} ); // {number: 1}
```
1. apply
和call的区别是以 array of argument 的形式传入指定为 this 的对象，随后执行函数
```js
foo.apply( {number: 2} ); // {number: 2}
```
1. bind
改变this指定的对象，并返回一个函数
```js
const bar = foo.bind( {number: 3} );
bar(); // {number: 3}
```

this 的意义是找到上下文 context

### this keyword: in an object and callback functions

```js
const calendar = {
    currentDay: 6,
    nextDay() {
        this.currentDay++;
        console.log(this.currentDay);
    },
};
calendar.nextDay();
```
在 normal function 中, **this** 指向的永远是调用该 normal function 的对象

```js
const calendat = {
    currentDay: 6,
    nextDay() {
        setTimeOut(function () {
            this.currentDay++;
            console.log(this.currentDay);
        });
    },
};
calendar.nextDay();
```
在 setTimeOut 函数中形成了闭包
**this** 指向了window

In arrow function, **this** points to the enclosing lexical context's **this**.
```js
const calendar = {
    currentDay: 6,
    nextDay() {
        setTimeOut(() => {
            this.currentDay++;
            console.log(currentDay);
        });
    },
};
calendar.nextDay();
```
在 arrow function 中不存在 **this** 这一指向，他的 **this** 指向永远是该函数 lexical scope 的上级作用域

```js
const calendar = {
    currentDay: 6,
    normal: function () {
        console.log(1, this);
        setTimeOut(function () {
            console.log(2, this);
        });
    },
    arrow: function () {
        console.log(3, this);
        setTimeOut(() => {
            console.log(4, this);
        });
    },
};
calendar.normal();
calendar.arrow();
```
output (My answer)
- 1calendar
- 2window
- 3calendar
- 4calendar

All correct!

谁调用`callback function`，被调用的`callback function`的**this**就指向谁

## Common Array operations

### Manipulation

1. push
尾部添加
2. pop
取出尾部
3. shift
尾部添加
4. unshift
取出尾部
5. splice
中间操作（添加删除）

```js
const fruits = ['apple'];

fruits.push('pear');
console.log(fruits); // ["apple", "pear"]
fruits.unshift('grape');
console.log(fruits); // ["grape", "apple", "pear"]
// splice(x,y,newAdded)
// remove y items from index x, and add newAdded
fruits.splice(1, 1, 'watermelon', 'peach');
console.log(fruits); // ["grape", "watermelon", "peach", "pear"]
let fruit = fruits.pop();
console.log(fruit); // pear
console.log(fruits); //  ["grape", "watermelon", "peach"]
fruit = fruits.shift();
console.log(fruit); // grape
console.log(fruits); // ["watermelon", "peach"]
```

## iteration

### for loop
```js
const fruits = ['apple', 'pear'];
for (let index = 0; index < fruits.length; index++) {
  const fruit = fruits[index];
  console.log(fruit);
}
// apple
// pear
```

### for...of

```js
const fruits = ['apple', 'pear'];
for (let fruit of fruits) {
  console.log(fruit);
}
// apple
// pear

// for...in -> 0, 1    usually used in object
```

### forEach (Only array)

```js
const fruits = ['apple', 'pear'];
fruits.forEach((fruit) => console.log(fruit));
// apple
// pear
// cannot use break here
```

### Map

```js
const fruits = ['apple', 'pear'];
const newFruits = fruits.map((fruit) => ({
  name: fruit,
  price: 10,
}));
console.log(newFruits);
// [{name: "apple", price: 10},{name: "pear", price: 10}]
```

### Reduce

```js
const numbers = [1, 2, 3];
const sum = numbers.reduce((accumulator, number) => accumulator + number, 0);
console.log(sum); // 6
```

## Search

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(2)); // true
// Array.some
console.log(numbers.indexOf(2)); // 1
// Array.findIndex
```
### find

```js
const array = [
    { name: Sun, age: 25 },
    { name: Mike, age: 18 },
];

array.find((i) => i.name === 'Sun'); // { name: Sun, age: 25 }
```

### filter

进行true false判断，返回所有满足的元素
```js
const numbers = [1, 2, 3, 4, 5];
const odds = numbers.filter((i) => i % 2);
console.log(odds); // [1,3,5]

const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const filteredFruits = fruits.filter((i) => i.color === 'green');
console.log(filteredFruits);
// [{name: "pear", color: "green"}, {name: "grape", color: "green"}]
```

### diff in find() and filter()
Find only return first element that match the condition. Filter return all matched elements.

```js
const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const greenFruit = fruits.find((i) => i.color === 'green');
console.log(greenFruit);
// {name: "pear", color: "green"}
```

## Set

Only store unique values.
```js
const set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set(4) {1, 2, 3, 4}
set.add(5);
console.log(set); // Set(5) {1, 2, 3, 4, 5}
set.add(1);
console.log(set); // Set(5) {1, 2, 3, 4, 5}
console.log(set.has(5)); // true
set.delete(1);
console.log(set.has(1)); // false
console.log(set.size); // 4
```

快速去重复
```js
const array = [1, 2, 2, 3, 4, 4];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4]
```

## Classes

Classes are functions in fact.

### class inheritance 类继承
base on **prototype**

### delegate 代理

```js
function Person(name) {
  this.name = name;
  this.toString = function () {
    console.log('name: ' + this.name);
  };
}
var mason = new Person('mason');
mason.toString(); // name: mason
```

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  toString() {
    console.log(`name: ${this.name}`);
  }
}
const mason = new Person('mason');
mason.toString(); // name: mason
```

### extends

- 子类型 `extends` 父类型
- constructor 需要用 super 来匹配父类函数
```js
class Teacher extends Person {
  constructor(name) {
    super(name);
  }
  teach() {
    console.log(`${this.name} is teaching`);
  }
}

const mason = new Teacher('mason');
mason.teach(); // mason is teaching
mason.toString(); // name: mason -> BUT how?

// is mason constructed by Teacher?
mason instanceof Teacher; // true
mason instanceof Person; // true
mason instanceof Object; // true
```

### quiz
1. 
```js
function Pet(name) {
  this.name = name;
  this.getName = () => this.name;
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // Fluffy

const { getName } = cat;
console.log(getName()); // Fluffy
```
2. 
```js
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f();
}
checkscope(); // local
```
3. 
```js
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
checkscope()(); // local
```