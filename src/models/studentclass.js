const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  findByClassId: async (class_id, next) => {
    try {
      const db = getDb()
      const all = await db.get(
        SQL`
          SELECT * FROM student_classes
          WHERE class_id=${class_id}`
      )
      return all
    } catch (err) {
      next(err)
    }
  },

  findByStudentId: async (student_id, next) => {
    try {
      const db = getDb()
      const all = await db.get(
        SQL`
          SELECT * FROM student_classes
          WHERE student_id=${student_id}`
      )
      return all
    } catch (err) {
      next(err)
    }
  },

  create: async (student_classes, next) => {
    try {
      const db = getDb()
      const created = await db.run(
        SQL`INSERT INTO student_classes (student_id, class_id) 
                  VALUES(${student_classes.student_id}, ${
          student_classes.class_id
        })`
      )
      return await created
    } catch (err) {
      next(err)
    }
  },
  destroy: async (class_id, student_id, next) => {
    try {
      const db = getDb()
      const deleteAll = await db.run(
        SQL`DELETE FROM student_classes WHERE class_id=${class_id} and student_id= ${student_id}`
      )
      return await deleteAll
    } catch (err) {
      next(err)
    }
  }
}
