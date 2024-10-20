import { Router } from 'express'

import { CityController } from '../controllers/citys.js'

export const citiesRouter = Router()

citiesRouter.get('/', CityController.getAll)
citiesRouter.post('/', CityController.create)
citiesRouter.delete('/', CityController.delete)