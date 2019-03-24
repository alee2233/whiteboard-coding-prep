const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const showAllCategories = (req, res) => {
  pool.query('SELECT * FROM category;', (error, results) => {
    if (error) throw error
    res.render('categories', {data:results.rows})
  })
}

const showCategory = (req, res) => {
  const cat_id = req.params.id
  pool.query('SELECT * FROM category WHERE id = $1;', [cat_id], (error, results1) => {
    if (error) throw error
    pool.query('SELECT * FROM problem WHERE category_id = $1;', [cat_id], (error, results2) => {
      if (error) throw error
      res.render('category', {
        category_name: results1.rows[0].name_,
        data:results2.rows
      })
    })
  })
}

const showProblem = (req, res) => {
  pool.query('SELECT * FROM problem WHERE id = $1;', [req.params.id], (error, results1) => {
    if (error) throw error
    pool.query('SELECT * FROM hint WHERE problem_id = $1 ORDER BY order_ ASC;', [req.params.id], (error, results2) => {
      if (error) throw error
      res.render('problem', {
        hints: results2.rows,
        title: results1.rows[0].title,
        description: results1.rows[0].description_
      })
    })
  })
}

const getRandom = (req, res) => {
  pool.query('SELECT * FROM problem ORDER BY RANDOM() LIMIT 1;', (error, results1) => {
    if (error) throw error
    pool.query('SELECT * FROM hint WHERE problem_id = $1 ORDER BY order_ ASC;', [results1.rows[0].id], (error, results2) => {
      if (error) throw error
      res.render('problem', {
        hints: results2.rows,
        title: results1.rows[0].title,
        description: results1.rows[0].description_
      })
    })
  })
}

// const saveProblem = (req, res) => {
//   const problemQuery = 'INSERT INTO problems (category_id, title, description_) VALUES ($1, $2, $3);'

//   pool.query(problemQuery, [req.params.], (error, results) => {
//     if (error) throw error
//     res.render('category', {data:results.rows})
//   })
// }

module.exports = {
  showAllCategories,
  showCategory,
  showProblem,
  getRandom
  //addProblem
  //saveProblem
}