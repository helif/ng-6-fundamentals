import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EventService } from "../../common/index";

@Injectable()
export class EventResolverService implements Resolve<any> {

    constructor(private eventService: EventService) {

    }
    resolve(route: ActivatedRouteSnapshot) {
        return this.eventService.getServerEvent(route.params['id']);
    }
}