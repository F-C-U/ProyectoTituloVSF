export interface User{
    uid:string
    correo:string,
    contrasena:string,
    nombre:string,
    apellido:string
    esDueno?: boolean,
    esConductor?: boolean
}