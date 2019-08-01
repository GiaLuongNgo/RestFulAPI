const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  list: async (req, next) => {
    try {
      const db = getDb()
      let sql = 'SELECT * FROM students'
      const students = await db.all(sql)
      return students
    } catch (err) {
      next(err)
    }
  },
  findClass: async (id, next) => {
    try {
      const db = getDb()
      let sql = `SELECT * FROM classes Where id IN ( SELECT class_ID from student_classes where student_ID =${id})`
      const classes = await db.all(sql)
      return classes
    } catch (err) {
      next(err)
    }
  },
  findById: async (id, next) => {
    try {
      const db = getDb()
      const student = await db.get(
        SQL`
          SELECT * FROM Students
          WHERE id=${id}`
      )
      return student
    } catch (err) {
      next(err)
    }
  },
  create: async (students, next) => {
    try {
      const db = getDb()
      const created = await db.run(
        SQL`INSERT INTO students (id, firstname, lastname) 
                  VALUES(${students.id}, ${students.firstname}, ${
          students.lastname
        })`
      )
      return await created
    } catch (err) {
      next(err)
    }
  },
  update: async (id, studentParams, next) => {
    try {
      const db = getDb()
      let columns = Object.keys(studentParams)
      let columnsql = columns.join(',')
      let cvalues = columns.map(col => {
        return studentParams[col]
      })
      let values = columns
        .map(() => {
          return '?'
        })
        .join(',')
      let sql = `UPDATE Students SET (${columnsql}) = (${values}) WHERE id='${id}'`
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
      const deleteStudent = await db.run(
        SQL`DELETE FROM students WHERE id=${id}`
      )
      return await deleteStudent
    } catch (err) {
      next(err)
    }
  }
}
