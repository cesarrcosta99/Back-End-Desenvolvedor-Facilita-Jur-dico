import { Router } from 'express'
import ClientController from './controllers/ClientController.js';

const routes = new Router()

routes.get('/clientes', ClientController.list);
routes.post('/clientes', ClientController.create);
routes.get('/clientes/rota', ClientController.calculateRoute);
routes.delete('/clientes/:id', ClientController.delete);

export default routes