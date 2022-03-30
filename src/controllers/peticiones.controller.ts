/**
 * @Archivo:     peticiones.controller.ts
 * @Fecha:       2022-03-29T02:25
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion:  Logica que define los servicios necesario para la gestion de las peticiones 
 **/

import { Request, Response, NextFunction } from 'express';
import controlPeticiones from '../utils/peticiones.utils';

// Obtener listado de peticiones registradas
const getPeticiones = async (req: Request, res: Response, next: NextFunction) => {
    const respuesta = await controlPeticiones.getPeticiones();
    return res.status(200).json({
        respuesta: respuesta
    });
};


// Actualizar peticion
const updatePeticiones = async (req: Request, res: Response, next: NextFunction) => {
    let responsedata = {
        exitoso: true,
        mensaje: 'Actualización exitosa'
    };

    let id: string = req.body.id;
    let peticion = req.body.data;
    if (peticion != null) {
        await controlPeticiones.updatePeticiones(id, peticion);
    } else {
        responsedata.exitoso = false;
        responsedata.mensaje = 'Debe ingresar los valores a modificar'
    }

    return res.status(200).json(responsedata);
};


// Eliminar peticion
const deletePeticiones =  async (req: Request, res: Response, next: NextFunction) => {
    let responsedata = {
        exitoso: true,
        mensaje: 'Eliminacion exitosa'
    };
    let id: string = req.body.id;

    if (id != null) {
        await controlPeticiones.deletePeticiones(id);
    } else {
        responsedata.exitoso = false;
        responsedata.mensaje = 'No se recibio un id valido para eliminar'
    }

    return res.status(200).json(responsedata);
};



// Exportar a base64
const exportbase64 = async (req: Request, res: Response, next: NextFunction) => {

    let responsedata = {
        exitoso: true,
        mensaje: 'Eliminacion exitosa'
    };

    const respuesta = await controlPeticiones.getPeticiones();

    if(respuesta != null && respuesta.length > 0){
        responsedata.mensaje =  Buffer.from(JSON.stringify(respuesta)).toString('base64')
    } else {
        responsedata.mensaje = "No hay información para exportar";
        responsedata.exitoso = false; 
    }
    
  
    return res.status(200).json({
        response: responsedata 
    });
};





export default { getPeticiones, updatePeticiones, deletePeticiones,exportbase64 };
