import { Router } from 'express'

// controllers
import examplesController from '../controllers/examples'
// middlewares
import exampleScopeMiddleware from '../middlewares/exampleScope'
import requestHandler from '../utils/requestHandler'

const router = Router()

router.get('/', requestHandler(examplesController.index))
router.post('/', requestHandler(examplesController.store))
router.use('/:exampleId', exampleScopeMiddleware)
router.get('/:exampleId', requestHandler(examplesController.show))
router.put('/:exampleId', requestHandler(examplesController.edit))
router.delete('/:exampleId', requestHandler(examplesController.destroy))

export default router
