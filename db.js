const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
})

pool.on('connect', ()=> console.log('connected to db'))

const createUsersTable = ()=> {
  const queryText = 
	`
        CREATE TABLE IF NOT EXISTS
	users(
          id UUID PRIMARY KEY,
	  first_name VARCHAR(50) NOT NULL,
	  last_name VARCHAR(50) NOT NULL,
	  email VARCHAR(100) NOT NULL,
	  password VARCHAR(100) NOT NULL,
	  created_date TIMESTAMP,
	  modified_date TIMESTAMP
	)`
  
  pool.query(queryText)
    .then(res=>{
      console.log(res)
      pool.end()
    })
    .catch(err=>{
      console.log(err)
      pool.end()
    })
}

const dropUsersTable = ()=>{
  const queryText = 'DROP TABLE IF IT EXISTS users'

  
  pool.query(queryText)
    .then(res=>{
      console.log(res)
      pool.end()
    })
    .catch(err=>{
      console.log(err)
      pool.end()
    })
}

pool.on('remove', ()=>{
  console.log('client removed')
  process.exit(0)
})

module.exports = {
  createUsersTable,
  dropUsersTable
}

require('make-runnable')
