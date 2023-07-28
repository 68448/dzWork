let outI = 300000
let inI = 34555

let array = []
for (let i = 0; i < 1000000; i++) array.push(i)

const inA = new Uint8Array(array)
const outA = new Uint8Array(1000000)

console.time('start')
outA.set(inA.subarray(inI, inI + 60000), outI)
console.timeEnd('start')

const inA2 = new Uint8Array(array)
const outA2 = new Uint8Array(1000000)

console.time('start2')
for (let i = outI; i < outI + 60000; i++) {
  outA2[i] = inA2[inI]
  inI++
}
console.timeEnd('start2')
