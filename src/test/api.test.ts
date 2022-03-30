import firestore from '../utils/db.utils';

function estadoBD() : boolean {
    return firestore != null;
}

console.log('Estado de la BD: ', estadoBD() );