import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../db'


const User = {
  
  async create(req, res){
    const text = 
      `INSERT INTO
       users(id, first_name, last_name, email, password, created_date, modified_date)
       VALUES($1, $2, $3, $4, $5, $6, $7)
       returning *
      `
    const values = [
      uuidv4(),
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
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
    const findAllQuery = 'SELECT * FROM users'
    try{
      const { rows, rowCount } = await db.query(findAllQuery)
      return res.status(200).send({ rows, rowCount })
    } catch(err) {
      return res.status(400).send(err)
    }
  },

  async getOne(req, res){
    const text = 'SELECT * FROM users WHERE id=$1'
    try{
      const { rows } = await db.query(text, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'User not found'})
      return res.status(200).send(rows[0])
    } catch(err){
      return res.status(400).send(err)
    }
  },

  async update(req, res){
    const findOneQuery = 'SELECT * FROM users WHERE id=$1'
    const updateOneQuery = `UPDATE users 
      SET first_name=$1,last_name=$2,email=$3,password=$4,modified_date=$5
      WHERE id=$6 returning *`
    try{
      const { rows } = await db.query(findOneQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'User not found'})
      const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password,
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
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *'
    try{
      const { rows } = await db.query(deleteQuery, [req.params.id])
      if(!rows[0]) return res.status(404).send({'message': 'User not found'})
      return res.status(200).send({'message': 'User successfully deleted'})
    } catch(err){
      return res.status(400).send()
    }
  }
}


export default User

