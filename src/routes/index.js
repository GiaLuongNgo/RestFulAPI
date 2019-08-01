import express from 'express'
import students from './students'
import classes from './classes'
import teachers from './teachers'

const router = express.Router()

router.use('/students', students)
router.use('/classes', classes)
router.use('/teachers', teachers)

export default router
