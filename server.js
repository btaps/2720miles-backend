import express from 'express';
import dotenv from 'dotenv'
import 'babel-polyfill'
import User from './src/routes/Users'

dotenv.config()

const app = express()
const PORT = 8080
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.post('/api/users', User.create)
app.get('/api/users', User.getAll)
app.get('/api/users/:id', User.getOne)
app.put('/api/users/:id', User.update)
app.delete('/api/users/:id', User.delete)


app.listen(PORT, ()=> console.log(`We clapping on port ${PORT}`))
