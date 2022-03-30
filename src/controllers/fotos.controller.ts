/**
 * @Archivo:     fotos.controller.ts
 * @Fecha:       2022-03-29T10:35
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion:  Logica que define los servicios necesario para consultar las fotos de los usuarios
 **/

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Fotos from '../interfaces/fotos.interfaces';
import controlPeticiones from '../utils/peticiones.utils';
import Peticiones from '../interfaces/peticiones.interfaces';


let dataPeticiones: Peticiones = {fecha: '', response: '', metodo: ''};

// Obtener listado de las fotos
const getFotos = async (req: Request, res: Response, next: NextFunction) => {

    let trama;
    try {

        let id: string = req.body.usuario;
        let lfotosglobal: any[] = [];
        let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        let post: any[] = result.data;

        for (const item of post) {
            let lfotos: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${item.id}/photos`);
            let response: Fotos[] = lfotos.data;
            lfotosglobal.push.apply(lfotosglobal, response);
        }

        trama = {
            usuario: id,
            fotos: lfotosglobal
        };

    } catch (error) {
        trama = {
            mensaje: "Se presento un problema realizando la operacion"
        };
    }

    dataPeticiones.fecha = new Date().toISOString();
    dataPeticiones.response = JSON.stringify(trama);
    dataPeticiones.metodo="getFotos";
    controlPeticiones.setPeticion(dataPeticiones); 


    return res.status(200).json(trama);
};


export default { getFotos };
