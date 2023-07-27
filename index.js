// Попробуйте сделать большой (512к),
// буффер с случайными данными,
// и подтвердить что outA.set(inA.subarray(inI, inI + 4), outI)
// будет обрабатываться быстрее. Пришлите, пожалуйста полученный код.

const NUMBER_OF_ELEMENTS = 512000
const ELEMENT_LEN_BYTES = 4
const inI = 4000
const outI = 6000

const bufferIn = new ArrayBuffer(NUMBER_OF_ELEMENTS)
const inA = new Uint8Array(bufferIn)

for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
  inA[i] = Math.floor(Math.random() * 10)
}

// Работа с буфером
let outA = Buffer.alloc(NUMBER_OF_ELEMENTS * ELEMENT_LEN_BYTES, 0)
console.time('Buffer')
outA.set(inA.subarray(inI, inI + 4), outI)
console.timeEnd('Buffer')

//Работа с типизированным масивом
console.time('TypeArray')
const bufferOut = new ArrayBuffer(NUMBER_OF_ELEMENTS)
const inOut = new Uint8Array(bufferOut)
inOut.set(inA.subarray(inI, inI + 4), outI)
console.timeEnd('TypeArray')

//Работа с массивом
let array = generateArray(NUMBER_OF_ELEMENTS, 10)
console.time('Array')
array = changeEl(array, array.slice(inI, inI + 4), outI)
console.timeEnd('Array')

function generateArray(length, max) {
  return [...new Array(length)].map(() => Math.round(Math.random() * max))
}

function changeEl(arr, subArr, idx) {
  let j = 0
  for (let i = idx; i < idx + subArr.length; i++) {
    arr[i] = subArr[j]
    j++
  }

  return arr
}
