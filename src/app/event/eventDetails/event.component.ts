import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data } from "@angular/router";
import { EventService, IEvent, ISession } from '../../common';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    event:IEvent;
    addMode: boolean = false;
    filterBy: string = 'all';
    sortBy:string = 'name';

    constructor(private eventService:EventService, private activeRoute:ActivatedRoute) {
    }

    ngOnInit() {
      //snapshot is not an observable
      // let currentId:string = this.activeRoute.snapshot.params["id"];

      //to navigate to the same component we need to subscribe to changes in params
      // this.activeRoute.params.forEach((params:Params) => {
        // this.event = this.eventService.getEvent(+params['id']);
        // this.eventService.getServerEvent(params['id']).subscribe((event:IEvent) => {
          // this.event = event;
          // this.resetState();
        // })
      // })

        // simplified
        this.activeRoute.data.forEach((data:Data) => {
          this.event = data['event'];
          this.resetState();
        })
    }

    addSession() {
      this.addMode = true;
    }

    saveNewSession(session:ISession) {
      const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
      session.id = nextId + 1 || 1;

      this.event.sessions.push(session);
      // this.eventService.updateEvent(this.event);
      this.eventService.saveServerEvent(this.event).subscribe(() => {
        this.addMode = false;
      })
    }

    cancelNewSession() {
      this.addMode = false;
    }

    setFilter(level) {
      this.filterBy = level;
    }

    setSort(data) {
      this.sortBy = data;
    }

    private resetState() {
      this.addMode = false;
      this.filterBy = 'all';
      this.sortBy = 'name';
    }
}
