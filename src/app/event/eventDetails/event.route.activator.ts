import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { IEvent, EventService } from "../../common";

@Injectable()
export class EventActivatorService implements CanActivate {
    constructor(private eventService:EventService, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let event:IEvent = this.eventService.getEvent(+route.params["id"]);

        if (!event) {
            this.router.navigate(['/error']);
        }
        
        return true;
    }
}