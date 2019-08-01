const teachersRoutes = require('express').Router()
import teachersController from '../../controllers/teachersController'

teachersRoutes.get('/', teachersController.list)

teachersRoutes.get('/:id', teachersController.show)

teachersRoutes.get('/:id/classes', teachersController.listClasses)

teachersRoutes.post('/', teachersController.create)

teachersRoutes.put('/:id', teachersController.update)

teachersRoutes.delete('/:id', teachersController.destroy)

export default teachersRoutes
