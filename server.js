// A simple and direct server setup
// To spin up our server running the user module
const app = require('./API/index')

app.listen(3000, (error) => {
  error ? console.error(`Server error: ${error}`) : console.log(`Server has spunned up and running!`)
})