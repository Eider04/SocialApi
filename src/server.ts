/**
 * @Archivo:     server.ts
 * @Fecha:       2022-03-29T10:10
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion: Logica con definiciones de propiedades para el servidor
 **/


import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/api.rutes';



const router: Express = express(); 

/** Logging */
router.use(morgan('dev'));
/** Analisis de solicitud valida*/
router.use(express.urlencoded({ extended: false }));
/** Carda de datos JSON */
router.use(express.json());

/** Reglas */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Se definen las rutas */
router.use('/', routes);

/** Control de errores por rutas*/
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Servicio config */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`Servicio iniciado por el puerto: ${PORT}`));