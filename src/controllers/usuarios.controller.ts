/**
 * @Archivo:     usuarios.controller.ts
 * @Fecha:       2022-03-29T10:25
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion:  Logica que define los servicios necesario para la gestion de los usuarios 
 **/

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Usuarios from '../interfaces/usuarios.interfaces';
import controlPeticiones from '../utils/peticiones.utils';
import Peticiones from '../interfaces/peticiones.interfaces';

let dataPeticiones: Peticiones = {fecha: '', response: '', metodo: ''};

// Obtener listado de usuarios
const getUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let posts: [Usuarios] = result.data;

    dataPeticiones.fecha = new Date().toISOString();
    dataPeticiones.response = JSON.stringify(posts);
    dataPeticiones.metodo="getUsuarios";
    controlPeticiones.setPeticion(dataPeticiones); 

    return res.status(200).json({
        usuarios: posts
    });
};


export default { getUsuarios };
