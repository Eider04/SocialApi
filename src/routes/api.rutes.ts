import express from 'express';
const router = express.Router();

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');  

//Se definen las importaciones de los controladores
import usuarios from '../controllers/usuarios.controller';
import publicaciones from '../controllers/publicaciones.controller.';
import fotos from '../controllers/fotos.controller';
import peticiones from '../controllers/peticiones.controller'; 


//Api document
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
router.use('/api/v1', router);

// Rutas definidas para las publicaciones
router.get('/getPublicaciones', publicaciones.getPublicaciones);

// Rutas definidas para los usuarios
router.get('/getUsuarios', usuarios.getUsuarios);

// Rutas definidas para las fotos
router.post('/getFotos', fotos.getFotos);

// Rutas definidas para las peticiones
router.post('/getPeticiones', peticiones.getPeticiones);
router.post('/deletePeticion', peticiones.deletePeticiones);
router.post('/updatePeticion', peticiones.updatePeticiones);
router.post('/exportPeticion', peticiones.exportbase64);


//Se exporta el conjunto de rutas definidas
export = router;