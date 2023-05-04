export interface User{
    id?: string,
    username: string,
    roles: [],
    password: string,
    email: string,
    firstname: string,
    approved: boolean,
    lastname: string,
    titel: string,
    hygienepass: boolean,
    telephone: string,

    xPScore?: number,
    balance?: number,
}

