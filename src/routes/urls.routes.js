import { Router } from 'express'
import {postUrlShorten, getUrl, getUrlOpen, deleteUrl } from '../controllers/urls.controllers.js'


const routerUrl = Router()

routerUrl.use.post('/urls/shorten', postUrlShorten)
routerUrl.use.get(' /urls/:id', getUrl)
routerUrl.use.get('/urls/open/:shortUrl', getUrlOpen)
routerUrl.use.delete('/urls/:id', deleteUrl)


export default routerUrl