import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../db'


const Products = {
  
  async create(req, res){
    const text = 
      `INSERT INTO
       products(product_cat_id, name, price, description, size, images, quantity, created_date, modified_date)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning *
      `
    const values = [
      req.body.product_cat_id,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.size,
      req.body.images,
      req.body.quantity,
      moment(new Date()),
      moment(new Date()),
    ]

    try{
      const { rows } = await db.query(text, values)
      return res.status(201).send(rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async getAll(req, res){
    const findAllQuery = 'SELECT * FROM products'
    try{
      const { rows, rowCount } = await db.query(findAllQuery)
      return res.status(200).send({ rows, rowCount })
    } catch(err) {
      return res.status(400).send(err)
    }
  },

  async getOne(req, res){
    const text = 'SELECT * FROM products WHERE id=$1'
    try{
      const { rows } = await db.query(text, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Product not found'})
      return res.status(200).send(rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async updatePriceAndQuantity(req, res){
    const findOneQuery = 'SELECT * FROM products WHERE id=$1'
    const updateOneQuery = `UPDATE products 
      SET price=$1, quantity=$2, modified_date=$3
      WHERE id=$4 returning *`
    try{
      const { rows } = await db.query(findOneQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Product not found'})
      const values = [
        req.body.price,
        req.body.quantity,
        moment(new Date()),
        req.params.id
      ]
      const response = await db.query(updateOneQuery, values)
      return res.status(200).send(response.rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async delete(req, res){
    const deleteQuery = 'DELETE FROM products WHERE id=$1 returning *'
    try{
      const { rows } = await db.query(deleteQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Product not found'})
      return res.status(200).send({'message': 'Product successfully deleted'})
    } catch(err){
      return res.status(400).send()
    }
  }
}


export default Products

