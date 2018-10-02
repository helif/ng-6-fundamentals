import { Injectable } from "@angular/core";
import { ISession, IEvent } from "../../common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class VoterService {

    constructor(private http:HttpClient) {
    }

    userHasVoted(session:ISession, voter:string) {
        return session.voters.includes(voter);
    }

    addServerVoter(eventId:string, session:ISession, voter:string) {
        const options = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voter}`;

        this.addVoter(session, voter);

        return this.http.post<ISession>(url, {}, options).
          pipe(catchError(this.handleServerError<IEvent>('addVoter'))).
          subscribe(); //self-subscribe method
    }

    deleteServerVoter(eventId:string, session:ISession, voter:string) {
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voter}`;

        this.deleteVoter(session, voter);

        return this.http.delete<ISession>(url).
          pipe(catchError(this.handleServerError<ISession>('deleteVoter'))).
          subscribe(); //self-subscribe method
    }

    handleServerError<T>(operation = 'operation', result?: T){
        return (error:any):Observable<T> => {
          console.log(error);
          return of(result as T);
        } 
      }
  
    addVoter(session:ISession, voter:string) {
        session.voters.push(voter);
    }

    deleteVoter(session:ISession, voter:string) {
        session.voters = session.voters.filter(voterName => voter !== voterName);
    }
}