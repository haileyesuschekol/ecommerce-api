const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    // reject(new Error("sorry"))
  }, 2000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    // reject(new Error("sorry"))
  }, 2000)
})
// p1.then((res) => console.log(res)).catch((err) => console.log(err.message))

Promise.all([p1, p2]).then((res) => {
  console.log(res)
})
