

//Symbol，是一个内存引用

//保证唯一性
// const a = Symbol('foo')
// const b = Symbol('foo')
// console.log(a === b)//true

//复用Symbol对象
// const a = Symbol.for('foo')
// const b = Symbol.for('foo')
// console.log(a === b) //true

//查找全局key
// const a = Symbol.for('foo')
// const key1 = Symbol.keyFor(a)
// console.log(key1)

// const b = Symbol.for({})
// const key2 = Symbol.keyFor(b)//如果不是 Symbol类型，会抛出TypeError
// console.log(key2)
// console.log(typeof a)

//可以用作对象的属性
// const s1 = Symbol('foo')

// const o = {
//     [s1]: 'shit',
//     kk: 'lk'
// }
// console.log(o)
// console.log(Object.getOwnPropertySymbols(o))
// console.log(Object.getOwnPropertyNames(o))
// console.log(Object.getOwnPropertyDescriptors(o))
// console.log(o.hasOwnProperty(s1))
//Reflect.ownKeys(o)


/*******Symbol.iterator**********/
//提供 改写 for of 的能力
//@@iterator 指的就是 Symbol.iterator

// 和generator一个效果
// function *aa() {
//     yield 1
//     yield 2
//     yield 3
// }
// for (const x of aa()) {
//     console.log(x)
// }

/*******Symbol.asyncIterator**********/

// class Emmiter {
//     constructor(max) {
//         this.max = max;
//         this.asyncIdx = 0
//     }

//     async *[Symbol.asyncIterator] () {
//         while (this.asyncIdx < this.max) {
//             yield new Promise(resolve => resolve(this.asyncIdx++))
//         }
//     }
// }
// async function asyncCount() {
//     for await (const x of new Emmiter(5)) {
//         console.log(x)
//     }
// }
// asyncCount()
// const arr = [
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(1)
//         }, 3000)
//     }), 
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(2)
//         }, 2000)
//     }), 
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(3)
//         }, 1000)
//     })
// ]
// async function asyncCount1() {//和下面一样效果
//     for await (const x of arr) {
//         console.log(x)
//     }
// }
// async function asyncCount2() {//和上面一样效果
//     for (const x of arr) {
//         console.log(await x)
//     }
// }
// asyncCount1()
// asyncCount2()

/*Symbol.isConcatSpreadable*/
// const a = [1]
// const b = [2]

// a[Symbol.isConcatSpreadable] = false

// console.log(a.concat(b))
// console.log(a.concat(5))

// /*Symbol.replace*/ 
// //Symbol.match、Symbol.search等都类同
// class Foor {
//     [Symbol.replace] (target, replacement) {
//         console.log(target, typeof target)
//         return target.split('foo').join(replacement)
//     }
// }
// console.log('barfoobar'.replace(new Foor(), 'foorr'))

//位运算 在数据底层表示上运算，速度很快

//& 与运算
// console.log(1 & 0) //0
// console.log(1 & 1) //1
// console.log(0 & 1) //0
// console.log(0 & 0) //0

// | 或运算
// console.log(1 | 0) //1
// console.log(0 | 1) //1
// console.log(1 | 1) //1
// console.log(0 | 0) //0

// ^ 异或运算
// console.log(1 ^ 0) //1
// console.log(0 ^ 1) //1
// console.log(1 ^ 1) //0
// console.log(0 ^ 0) //0

// 非运算（按位取反）
// let num = 25
// console.log(~num)//26
// console.log(~num + 1)//取反加一刚还是num的负数，25
// let num2 = 25.1
// console.log(~~num2)//去掉小数点

//左移 
//符号位不变，第32位表示符号位，如

//2   0000 0000 0000 0000 0000 0000 0000 0010 //第一个零就是符号位

//64  0000 0000 0000 0000 0000 0000 0100 0000 //第一个零就是符号位

//负数就是按位取反加1
// -64
// 0000 0000 0000 0000 0000 0000 0100 0000
//                                       1
// 1111 1111 1111 1111 1111 1111 1100 0000

// const a = 2
// const b = -2
// console.log(b << 5)// -64
// console.log(a << 5)//64


//右移 符号位不变（无符号）
// const a = 64
// const b = -64
// console.log(a >> 5)//2
// console.log(b >> 5)//-2

//右移 符号位不变（有符号）

// 正数无符号右移或有符号右移一样的
// const a = 64
// console.log(a >>> 5)//2

// 负数有符号右移差异就很大，负数二进制被当做正数二进制来处理转化为10进制
// const b = -64 //1111 1111 1111 1111 1111 1111 1100 0000
// console.log(b >>> 5)//134217726