import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponsedata{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient){
    }

    signup(email:string, password:string){
        return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEY_LgBRuRzob75hHo6TaYYL3_LEB4xp4',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(errorRes=>{
            let errorMessgae='AN unknow error ioccurred!!'
            if(errorRes.error || !errorRes.error.error){
                return throwError(errorMessgae)
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessgae='this email exists already'
              }
              return throwError(errorMessgae)
        }));
    }



    login(email:string, password:string){

        return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEY_LgBRuRzob75hHo6TaYYL3_LEB4xp4',
            {
            email:email,
            password:password,
            returnSecureToken:true
        })

    }

}