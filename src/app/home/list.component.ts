import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, ToastrService, IEvent } from "../common/index";

@Component({
//   selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    events: IEvent[];

    constructor( private eventService: EventService, private toastrService:ToastrService, 
        private route:ActivatedRoute ) {
    
    }

    ngOnInit(){
        // this.events = this.eventService.getEvents();

        // this.eventService.getAllEvents().subscribe(events => {
        //     this.events = events;
        // });

        this.events = this.route.snapshot.data['events'];
    }

    handleClick(data) {
        console.log(data);
    }

    handleEventClick(data) {
        console.log(data);
        this.toastrService.success(data);
    }
}
