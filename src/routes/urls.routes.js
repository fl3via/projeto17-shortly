import { Router } from 'express'
import {postUrlShorten, getUrl, getUrlOpen, deleteUrl } from '../controllers/urls.controllers.js'
import {validateSchema} from '../middlewares/validate.schemas.middleware.js'
import { urlsSchemas } from '../schemas/url.schemas.js'


const routerUrl = Router()

routerUrl.post('/urls/shorten', validateSchema(urlsSchemas), postUrlShorten)
routerUrl.get('/urls/:id', getUrl)
routerUrl.get('/urls/open/:shortUrl', getUrlOpen)
routerUrl.delete('/urls/:id', deleteUrl)


export default routerUrl