import { Router } from 'express'
import { getRank } from '../controllers/rank.controllers.js'

const routerRank = Router()

routerRank.get('/ranking', getRank) 

export default routerRank 