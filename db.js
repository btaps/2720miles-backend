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
	  email VARCHAR(100) NOT NULL UNIQUE,
	  password VARCHAR(100) NOT NULL,
	  created_date TIMESTAMP,
	  modified_date TIMESTAMP
	);`
  
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

const createProductsTable = ()=> {
  const queryText = 
	`
        CREATE TABLE IF NOT EXISTS
	products(
          id SERIAL PRIMARY KEY,
	  product_cat_id INT,
	  name TEXT,
	  price TEXT,
	  description TEXT,
	  size TEXT,
	  images TEXT [],
	  quantity INT,
	  created_date TIMESTAMP,
	  modified_date TIMESTAMP
	);`
  
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

const createCategoriesTable = ()=> {
  const queryText = 
	`
        CREATE TABLE IF NOT EXISTS
	categories(
          id SERIAL PRIMARY KEY,
	  name TEXT
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
  const queryText = `DROP TABLE users`
  
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

const dropProductsTable = ()=>{
  const queryText = `DROP TABLE products`
  
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

const dropCategoriesTable = ()=>{
  const queryText = `DROP TABLE categories`
  
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

const createAllTables = ()=>{
  createUsersTable();
  createProductsTable();
  createCategoriesTable();
}

const dropAllTables = ()=>{
  dropUsersTable();
  dropProductsTable();
  dropCategoriesTable();
}

pool.on('remove', ()=>{
  console.log('client removed')
  process.exit(0)
})

module.exports = {
  createAllTables,
  dropAllTables
}

require('make-runnable')
