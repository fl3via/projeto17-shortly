import { Router } from 'express'
import { getUser } from '../controllers/user.controllers.js'


const routerUser = Router()

routerUser.use.get('/users/me', getUser)

export default routerUser