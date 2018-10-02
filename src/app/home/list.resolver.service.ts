import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { EventService } from "../common/event.service";
import { map } from "rxjs/operators";

@Injectable()
export class ListResolverService implements Resolve<any> {
    constructor(private eventService:EventService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.eventService.getAllEvents().pipe(map(events => events))
        return this.eventService.getServerEvents();
    }
}