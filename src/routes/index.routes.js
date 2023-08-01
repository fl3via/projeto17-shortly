import { Router } from 'express'
import routerRank from './rank.routes.js'
import routerSing from './sign.routes.js'
import routerUrl from './urls.routes.js'
import routerUser from './users.routes.js'

const router = Router()

router.use(routerRank)
router.use(routerSing)
router.use(routerUrl)
router.use(routerUser)

export default router
