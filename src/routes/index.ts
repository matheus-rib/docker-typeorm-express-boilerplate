import { Router } from 'express'

import paginationMiddleware from '../middlewares/pagination'
import examples from './examples'

const router = Router()

router.get('/', (req, res) => res.json('hello world'))

router.use(paginationMiddleware)
router.use('/examples', examples)

export default router
