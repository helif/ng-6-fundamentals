import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "../../common";

@Component({
    templateUrl:"./create.component.html",
    styleUrls: ['./create.component.css']
})

export class CreateEvent {
    isDirty:boolean = true;
    newEvent;

    constructor(private router:Router, private eventService:EventService) {

    }

    saveEvent(formData) {
        // this.eventService.saveEvent(formData);
        this.eventService.saveServerEvent(formData).subscribe(() => {
            this.isDirty = false;
            this.router.navigate(['/home']);
        })
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}