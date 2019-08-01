const classesRoutes = require('express').Router()
import classesController from '../../controllers/classesController'

classesRoutes.get('/', classesController.list)

classesRoutes.get('/:id', classesController.show)

classesRoutes.get('/:id/students', classesController.listStudents)

classesRoutes.post('/:class_id/students', classesController.createEnrollment)

classesRoutes.delete(
  '/:class_id/students/:id',
  classesController.destroyEnrollment
)

classesRoutes.post('/', classesController.create)

classesRoutes.put('/:id', classesController.update)

classesRoutes.delete('/:id', classesController.destroy)

export default classesRoutes
