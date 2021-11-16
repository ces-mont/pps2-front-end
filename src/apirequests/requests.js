import {SERVER_URL} from '../globals';

export function isTokenOk(token) {
    let jwt = JSON.parse(atob(token.split('.')[1]))      
    return (jwt.exp>(Date.now()/1000))
}
export function doSimpleCorsGetRequest(addres) { //para ver las salas/accesorios
    addres = SERVER_URL + addres;
    return new Promise((res, rej) => {
        let cabecera = { method:'GET' }
        cabecera.headers = { Accept: 'application/json', Origin: null }        
        fetch(addres, cabecera)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return (addres.search(SERVER_URL+'/usuarios/avatar/') === 0) ? resp.blob() : resp.json();
            })
            .then((rta) => { 
                res(rta);
            })
            .catch((err) => { rej(err) });
    })
}
export function doPreflightCorsPostRequest(addres, data, withFormData) { // para el login
    return new Promise((res, rej) => {
        let cabecera = { method:'POST' }
        cabecera.headers = {  Accept: 'text/html,apllication/xhtml+xml,application/xml,application/json' }
        if (!withFormData) cabecera.headers['Content-Type'] = 'application/json';
        cabecera.body = data;        
        fetch(SERVER_URL + addres, cabecera)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((rta) => {
                res(rta) })
            .catch((err) => { 
                rej(err) 
            });
    })
}
export function doJwtPreflightCorsPutRequest(addres, data, token) { 
    return new Promise((res, rej) => {
        let cabecera = { method:'PUT' }
        cabecera.headers = {  Accept: 'text/html,application/xhtml+xml,application/xml,application/json','Content-Type' : 'application/json' , Authorization: 'Bearer ' + token}
        cabecera.body = data;          
        fetch(SERVER_URL + addres, cabecera)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp//.json();
            })
            .then((rta) => {
                res(rta) })
            .catch((err) => { 
                rej(err) 
            });
    })
}
export function doJwtPreflightCorsPostRequest(direccion, data, withFormData, token) {
    return new Promise((res, rej) => {
        var cabecera = { method:'POST' }
        cabecera.headers = {'Access-Control-Request-Headers': 'Authorization', Accept: 'text/html,application/xhtml+xml,application/xml,application/json', Authorization: 'Bearer ' + token }
        if (!withFormData) cabecera.headers['Content-Type'] = 'application/json';
        cabecera.body = data;      
        fetch(SERVER_URL + direccion, cabecera)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then((rta) => { 
                res(rta) 
            })
            .catch((err) => { 
                rej(err) 
            });
    })
}
export function doJwtPreflightCorsDeleteRequest(addres, data, token) { 
    return new Promise((res, rej) => {
        let cabecera = { method:'DELETE' }
        cabecera.headers = {  Accept: 'text/html,application/xhtml+xml,application/xml,application/json','Content-Type' : 'application/json' , Authorization: 'Bearer ' + token}
        cabecera.body = data;        
        fetch(SERVER_URL + addres, cabecera)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp//.json();
            })
            .then((rta) => {
                res(rta) })
            .catch((err) => { 
                rej(err) 
            });
    })
}
export function doJwtCorsGetRequest(dir,token){
    dir = SERVER_URL + dir;
    return new Promise((res,rej)=>{
        let cabecera = {method:'GET'};
        cabecera.headers={
            Accept:'application/json',
            Origin: null,
            Authorization: 'Bearer '+token
        }
        fetch(dir,cabecera)
        .then((rta)=>{
            if(!rta.ok) throw new Error(rta.statusText);
            return rta.json();
        })
        .then((rta)=>{
            res(rta);
        })
        .catch((err)=>{rej(err)});
    });
}