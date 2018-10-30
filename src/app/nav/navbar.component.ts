import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService } from '../common';

@Component({
    selector: "navbar-component",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
    searchTerm:string = "";
    foundSessions: any[];

    constructor(private auth:AuthService, private eventService:EventService) {

    }

    searchSessions(searchTerm) {
        // this.searchTerm = searchTerm;
        // this.eventService.searchSessions(searchTerm).subscribe(
        this.eventService.searchServerSessions(searchTerm).subscribe(
            sessions => {
                this.foundSessions = sessions;
            }
        )
    }
}
