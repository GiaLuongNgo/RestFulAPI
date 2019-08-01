import teacherModel from '../models/teacher'

export default {
  list: async (req, res, next) => {
    try {
      const teachers = await teacherModel.list(req, next)
      res.status(200).json({
        teachers: teachers
      })
    } catch (err) {
      next(err)
    }
  },
  listClasses: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const requestTeacher = await teacherModel.findClass(id, next)
      if (requestTeacher !== undefined) {
        res.status(200).json({
          classes: requestTeacher
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
      const requestTeacher = await teacherModel.findById(id, next)
      if (requestTeacher !== undefined) {
        return res.send(requestTeacher)
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const teacher = {
        ...req.body
      }

      const teacherID = await teacherModel.create(teacher, next)
      const created = await teacherModel.findById(await teacherID.lastID, next)
      return res.status(200).send({
        teacher: created
      })
    } catch (err) {
      next(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const updateTeacher = await teacherModel.findById(id, next)
      if (updateTeacher !== null) {
        const teacherParams = {
          ...req.body
        }
        if (Object.keys(teacherParams).length === 0) {
          res.status(404).send({
            error: 'No data to update'
          })
        }
        await teacherModel.update(id, teacherParams, next)
        const updated = await teacherModel.findById(id, next)
        return res.status(200).send({
          teacher: updated
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
      const subjectTeacher = await teacherModel.findById(id, next)
      if (subjectTeacher === null) {
        res.status(404).send({
          errors: 'the student does not exist'
        })
      } else {
        const deleteTeacher = await teacherModel.destroy(id, next)
        if (deleteTeacher !== undefined || deleteTeacher !== null) {
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
