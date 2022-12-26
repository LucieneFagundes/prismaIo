import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClients/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/updateDeliveryman/updateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController(); 

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController();

routes.post('/client', createClientController.handle);
routes.post('/authenticate/client', authenticateClientController.handle);

routes.post('/deliveryman', createDeliverymanController.handle);
routes.post('/authenticate/deliveryman', authenticateDeliverymanController.handle);

routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle);
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle);
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle);

export {routes}