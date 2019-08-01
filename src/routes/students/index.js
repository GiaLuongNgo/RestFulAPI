const studentsRoutes = require('express').Router()
import studentsController from '../../controllers/studentsController'

studentsRoutes.get('/', studentsController.list)

studentsRoutes.get('/:id', studentsController.show)

studentsRoutes.get('/:id/classes', studentsController.listClasses)

studentsRoutes.post('/', studentsController.create)

studentsRoutes.put('/:id', studentsController.update)

studentsRoutes.delete('/:id', studentsController.destroy)

export default studentsRoutes
