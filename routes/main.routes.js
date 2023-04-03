'use strict';

const router = require('express').Router();
const controller = require('../controllers/logController');
const controllerApp = require('../controllers/aplicationController');
const  Auth  = require('../middleware/auth');



const prefix  = '/logs';
const prefixApp = '/app';

//LOGS
router.get(`${prefix}/`,Auth, controller.all);
router.post(`${prefix}/`,Auth, controller.create);
router.get(`${prefix}/:id`,Auth, controller.info);
router.put(`${prefix}/:id`,Auth, controller.update);
router.delete(`${prefix}/:id`,Auth, controller.delete);


//Aplicacion
router.get(`${prefixApp}/`, controllerApp.all);
router.post(`${prefixApp}/`, controllerApp.create);
router.get(`${prefixApp}/:id`, controllerApp.info);
router.put(`${prefixApp}/:id`, controllerApp.update);
router.delete(`${prefixApp}/:id`, controllerApp.delete);



module.exports = router;