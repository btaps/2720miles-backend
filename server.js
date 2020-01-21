import express from 'express';
import dotenv from 'dotenv'
import 'babel-polyfill'
import User from './src/routes/Users'
import Products from './src/routes/Products'
import Categories from './src/routes/Categories'

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
app.put('/api/users/email/:id', User.updateEmail)
app.put('/api/users/password/:id', User.updatePassword)
app.delete('/api/users/:id', User.delete)

app.post('/api/products', Products.create)
app.get('/api/products', Products.getAll)
app.get('/api/products/:id', Products.getOne)
app.put('/api/products/price&quantity/:id', Products.updatePriceAndQuantity)
app.delete('/api/products/:id', Products.delete)

app.post('/api/categories', Categories.create)
app.get('/api/categories', Categories.getAll)
app.get('/api/categories/:id', Categories.getOne)
app.put('/api/categories/:id', Categories.update)
app.delete('/api/categories', Categories.delete)

app.listen(PORT, ()=> console.log(`We clapping on port ${PORT}`))
