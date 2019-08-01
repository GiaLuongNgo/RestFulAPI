const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  list: async (req, next) => {
    try {
      const db = getDb()
      let sql = 'SELECT * FROM teachers'
      const teachers = await db.all(sql)
      return teachers
    } catch (err) {
      next(err)
    }
  },
  findClass: async (id, next) => {
    try {
      const db = getDb()
      let sql = `SELECT * FROM classes Where teacher_id=${id}`
      const classes = await db.all(sql)
      return classes
    } catch (err) {
      next(err)
    }
  },
  findById: async (id, next) => {
    try {
      const db = getDb()
      const teacher = await db.get(
        SQL`
          SELECT * FROM teachers
          WHERE id=${id}`
      )
      return teacher
    } catch (err) {
      next(err)
    }
  },
  create: async (teachers, next) => {
    try {
      const db = getDb()
      const created = await db.run(
        SQL`INSERT INTO teachers (id, firstname, lastname) 
                  VALUES(${teachers.id}, ${teachers.firstname}, ${
          teachers.lastname
        })`
      )
      return await created
    } catch (err) {
      next(err)
    }
  },
  update: async (id, teacherParams, next) => {
    try {
      const db = getDb()
      let columns = Object.keys(teacherParams)
      let columnsql = columns.join(',')
      let cvalues = columns.map(col => {
        return teacherParams[col]
      })
      let values = columns
        .map(() => {
          return '?'
        })
        .join(',')
      let sql = `UPDATE teachers SET (${columnsql}) = (${values}) WHERE id='${id}'`
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
      const deleteTeacher = await db.run(
        SQL`DELETE FROM teachers WHERE id=${id}`
      )
      return await deleteTeacher
    } catch (err) {
      next(err)
    }
  }
}
