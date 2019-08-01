import classModel from '../models/class'
import studentclassModel from '../models/studentclass'

export default {
  list: async (req, res, next) => {
    try {
      const classes = await classModel.findAll(req, next)
      res.status(200).json({
        classes: classes
      })
    } catch (err) {
      next(err)
    }
  },
  listStudents: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const requestClass = await classModel.findStudent(id, next)
      if (requestClass !== undefined) {
        res.status(200).json({
          students: requestClass
        })
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  },
  createEnrollment: async (req, res, next) => {
    try {
      const enrollmentParamms = {
        ...req.body
      }
      const classID = await studentclassModel.create(enrollmentParamms, next)
      const created = await studentclassModel.findByClassId(
        await classID.lastID,
        next
      )
      return res.status(200).send({
        enrollment: created
      })
    } catch (err) {
      next(err)
    }
  },

  show: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const requestClass = await classModel.findById(id, next)
      if (requestClass !== undefined) {
        return res.send(requestClass)
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const classParams = {
        ...req.body
      }
      const classID = await classModel.create(classParams, next)
      const created = await classModel.findById(await classID.lastID, next)
      return res.status(200).send({
        class: created
      })
    } catch (err) {
      next(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const updateClass = await classModel.findById(id, next)
      if (updateClass !== null) {
        const classParams = {
          ...req.body
        }
        if (Object.keys(classParams).length === 0) {
          res.status(404).send({
            error: 'No data to update'
          })
        }
        await classModel.update(id, classParams, next)
        const updated = await classModel.findById(id, next)
        return res.status(200).send({
          class: updated
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
      const subjectClass = await classModel.findById(id, next)
      if (subjectClass === null) {
        res.status(404).send({
          errors: 'the class does not exist'
        })
      } else {
        const deleteClass = await classModel.destroy(id, next)
        if (deleteClass !== undefined || deleteClass !== null) {
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
  },
  destroyEnrollment: async (req, res, next) => {
    try {
      const class_id = req.params.id * 1
      const student_id = req.params.id * 1

      const subjectClass = await studentclassModel.findByClassId(class_id, next)
      const subjectStudent = await studentclassModel.findByStudentId(
        student_id,
        next
      )
      if (subjectStudent === null || subjectClass === null) {
        res.status(404).send({
          errors: 'the student does not exist'
        })
      } else {
        const deleteE = await studentclassModel.destroy(
          class_id,
          student_id,
          next
        )
        if (deleteE !== undefined || deleteE !== null) {
          return res.status(200).send({
            class_id: class_id,
            student_id: student_id
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
