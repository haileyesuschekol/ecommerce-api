console.log("before")
getUser(1, (user) => {
  console.log(user)
  getRepos((uname) => {
    console.log(uname)
  })
})

console.log("after")

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading from the database .. ")
    callback({ id: id, userName: "Mosh" })
  }, 2000)
  return id
}

function getRepos(username) {
  setTimeout(() => {
    console.log("calling from api ...")
    username(["repo1", "repo2", "repo3"])
  }, 2000)
}
