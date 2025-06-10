export interface User{
    uid:string
    email:string,
    password:string,
    name:string,
    lastname:string
    isOwner?: boolean,
    isDriver?: boolean
}