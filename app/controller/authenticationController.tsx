import { BearerToken, RegistrationResponse } from "../models/authenticationModel"
import { API_ENDPOINTS } from "./api-endpoints"

export class UserAuthentication{

    static async login(email:string, pass:string): Promise<BearerToken>{
        let response = await fetch(API_ENDPOINTS.LOGIN,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: pass
            })
        })

        return await response.json();
    };

    static async registration(email:string, pass:string, name: string, surename: string, workplace: string): Promise<RegistrationResponse>{
        let response = await fetch(API_ENDPOINTS.SIGNUP,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: pass,
                name: name,
                sureName: surename,
                workPlace: workplace
            })
        })

        return await response.json();
    }
}