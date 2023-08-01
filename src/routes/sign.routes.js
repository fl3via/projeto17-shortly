import { Router } from 'express'
import {  createSignUp, createsingIn} from '../controllers/sign.controllers.js'


const routerSing = Router()

routerSing.post('/signup', createSignUp)
routerSing.post('/signin', createsingIn)  

export default routerSing 