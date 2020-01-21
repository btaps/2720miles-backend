import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../db'


const Categories = {
  
  async create(req, res){
    const text = 
      `INSERT INTO
       categories(name)
       VALUES($1)
       returning *
      `
    const values = [
      req.body.name,
    ]

    try{
      const { rows } = await db.query(text, values)
      return res.status(201).send(rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async getAll(req, res){
    const findAllQuery = 'SELECT * FROM categories'
    try{
      const { rows, rowCount } = await db.query(findAllQuery)
      return res.status(200).send({ rows, rowCount })
    } catch(err) {
      return res.status(400).send(err)
    }
  },

  async getOne(req, res){
    const text = 'SELECT * FROM categories WHERE id=$1'
    try{
      const { rows } = await db.query(text, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Category not found'})
      return res.status(200).send(rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async update(req, res){
    const findOneQuery = 'SELECT * FROM categories WHERE id=$1'
    const updateOneQuery = `UPDATE categories 
      SET name=$1
      WHERE id=$2 returning *`
    try{
      const { rows } = await db.query(findOneQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Category not found'})
      const values = [
        req.body.name,
        req.params.id
      ]
      const response = await db.query(updateOneQuery, values)
      return res.status(200).send(response.rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async delete(req, res){
    const deleteQuery = 'DELETE FROM categories WHERE id=$1 returning *'
    try{
      const { rows } = await db.query(deleteQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'Category not found'})
      return res.status(200).send({'message': 'Category successfully deleted'})
    } catch(err){
      return res.status(400).send()
    }
  }
}


export default Categories

