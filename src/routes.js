import { Router } from 'express'

const routes = new Router()

routes.get('/clientes', ClientController.list);
routes.post('/clientes', ClientController.create);

export default routes