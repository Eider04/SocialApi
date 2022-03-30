/**
 * @Archivo:     publicaciones.controller.ts
 * @Fecha:       2022-03-29T10:15
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion:  Logica que define los servicios necesario para la gestion de las publicaciones 
 **/

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Publicaciones from '../interfaces/publicaciones.interfaces';
import controlPeticiones from '../utils/peticiones.utils';
import Peticiones from '../interfaces/peticiones.interfaces';



let dataPeticiones: Peticiones = {fecha: '', response: '', metodo: ''};

// Obtener listado de publicaciones
const getPublicaciones = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Publicaciones] = result.data;

    dataPeticiones.fecha = new Date().toISOString();
    dataPeticiones.response = JSON.stringify(posts);
    dataPeticiones.metodo="getPublicaciones";
    controlPeticiones.setPeticion(dataPeticiones); 

    return res.status(200).json({
        lPubliaciones: posts
    });
};



export default { getPublicaciones};
