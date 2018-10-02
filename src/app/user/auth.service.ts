import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http:HttpClient) {

    }

    loginServerUser(userName:string, password:string):Observable<any> {
        let userInfo = {username: userName, password:password};
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})};

        return this.http.post('api/login', userInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user'];
            }))
            .pipe(catchError(err => {
                return of(false);
            }));
    }

    updateServerUser(userName:string, password:string):Observable<any> {
        this.updateCurrentUser(userName, password);

        // let userInfo = {username: userName, password:password};
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})};

        return this.http.put(`api/users/${this.currentUser.id}`, this.currentUser, options)
            .pipe(catchError(err => {
                return of(false);
            }));
    }

    loginUser(userName:string, password:string) {
        this.currentUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Pappa',
            userName: userName
        }
    }

    updateCurrentUser(firstName:string, lastName:string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }

    isAuthenticated () {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        this.http.get('api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser> data;
                }
            }))
            .subscribe();
    }

    logout():Observable<any> {
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        this.currentUser = undefined;
        return this.http.post('api/logout', {}, options);
    }
}