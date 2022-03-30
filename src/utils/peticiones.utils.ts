
/**
 * @Archivo:     peticiones.controller.ts
 * @Fecha:       2022-03-29T17:35
 * @Version:     $Rev:$ 1.0
 * @Autor:       i4digital - Jesus Hurtado (eider9313@gmail.com)
 * @Descripcion:  Logica que define los servicios necesario para la gestion de las peticiones (FIREBASE)
 **/

import firestore from '../utils/db.utils';
import Peticiones from '../interfaces/peticiones.interfaces';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, } from 'firebase/firestore/lite';


async function setPeticion(peticion: Peticiones): Promise<void> {

    try {
        const db = firestore;
        const coleccion = collection(db, 'peticiones');
        const peticiondoc = await addDoc(coleccion, peticion);
        const response = peticiondoc.id;
    } catch (error) {
        console.error("Se presento un problema registrando la peticion", error);
    }
}

async function getPeticiones(): Promise<any> {

    try {
        const db = firestore;
        const coleccion = collection(db, 'peticiones');
        const peticiondoc = await getDocs(coleccion);
        const response: any[] = [];

        peticiondoc.docs.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            response.push(data);
        });

        return response;
    } catch (error) {
        console.error("Se presento un problema consultando las peticiones regsitradas", error);
    }
}


async function updatePeticiones(id: string, peticion: Peticiones): Promise<void> {

    try {

        const db = firestore;
        const washingtonRef = doc(db, "peticiones", id);
        await updateDoc(washingtonRef, {
            fecha: peticion.fecha,
            response: peticion.response,
            metodo: peticion.metodo
        });

    } catch (error) {
        console.error("Se presento un problema actualizando la peticion", error);
    }
}


async function deletePeticiones(id: string): Promise<void> {
    try {
        const db = firestore;
        await deleteDoc(doc(db, "peticiones", id))

    } catch (error) {
        console.error("Se presento un problema eliminando la peticion", error);
    }
}

export default { setPeticion, getPeticiones, updatePeticiones, deletePeticiones };