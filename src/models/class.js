const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  findAll: async (req, next) => {
    try {
      const db = getDb()
      let sql = 'SELECT * FROM classes'
      const classes = await db.all(sql)
      return classes
    } catch (err) {
      next(err)
    }
  },
  findStudent: async (id, next) => {
    try {
      const db = getDb()
      let sql = `SELECT * FROM students Where id IN ( SELECT student_ID from student_classes where class_ID =${id})`
      const students = await db.all(sql)
      return students
    } catch (err) {
      next(err)
    }
  },
  findById: async (id, next) => {
    try {
      const db = getDb()
      const classes = await db.get(
        SQL`
          SELECT * FROM classes
          WHERE id=${id}`
      )
      return classes
    } catch (err) {
      next(err)
    }
  },
  create: async (classes, next) => {
    try {
      const db = getDb()
      const created = await db.run(
        SQL`INSERT INTO classes (id, code, name, teacher_id, start_date, end_date) 
                  VALUES(${classes.id}, ${classes.code}, ${classes.name}, ${
          classes.teacher_id
        }, ${classes.start_date}, ${classes.end_date} )`
      )
      return await created
    } catch (err) {
      next(err)
    }
  },
  update: async (id, classParams, next) => {
    try {
      const db = getDb()
      let columns = Object.keys(classParams)
      let columnsql = columns.join(',')
      let cvalues = columns.map(col => {
        return classParams[col]
      })
      let values = columns
        .map(() => {
          return '?'
        })
        .join(',')
      let sql = `UPDATE classes SET (${columnsql}) = (${values}) WHERE id='${id}'`
      const updatedstmt = await db.prepare(sql)
      const updateQuery = await updatedstmt.run(cvalues)
      return updateQuery
    } catch (err) {
      next(err)
    }
  },
  destroy: async (id, next) => {
    try {
      const db = getDb()
      const deleteClass = await db.run(SQL`DELETE FROM classes WHERE id=${id}`)
      return await deleteClass
    } catch (err) {
      next(err)
    }
  }
}
