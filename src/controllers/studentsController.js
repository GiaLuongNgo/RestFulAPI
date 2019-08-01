import studentModel from '../models/student'

export default {
  list: async (req, res, next) => {
    try {
      const students = await studentModel.list(req, next)
      res.status(200).json({
        students: students
      })
    } catch (err) {
      next(err)
    }
  },
  listClasses: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const requestStudent = await studentModel.findClass(id, next)
      if (requestStudent !== undefined) {
        res.status(200).json({
          classes: requestStudent
        })
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  },

  show: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const requestStudent = await studentModel.findById(id, next)
      if (requestStudent !== undefined) {
        return res.send(requestStudent)
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const student = {
        ...req.body
      }
      const studentID = await studentModel.create(student, next)
      const created = await studentModel.findById(await studentID.lastID, next)
      return res.status(200).send({
        student: created
      })
    } catch (err) {
      next(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const updateStudent = await studentModel.findById(id, next)
      if (updateStudent !== null) {
        const studentParams = {
          ...req.body
        }
        if (Object.keys(studentParams).length === 0) {
          res.status(404).send({
            error: 'No data to update'
          })
        }
        await studentModel.update(id, studentParams, next)
        const updated = await studentModel.findById(id, next)
        return res.status(200).send({
          student: updated
        })
      } else {
        res.status(404).send({
          errors: 'relevant resource does not exist'
        })
      }
    } catch (err) {
      next(err)
    }
  },
  destroy: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const subjectStudent = await studentModel.findById(id, next)
      if (subjectStudent === null) {
        res.status(404).send({
          errors: 'the student does not exist'
        })
      } else {
        const deleteStudent = await studentModel.destroy(id, next)
        if (deleteStudent !== undefined || deleteStudent !== null) {
          return res.status(200).send({
            id: id
          })
        } else {
          res.status(404).send({
            error: 'You are not authorized to perform this action'
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}
