import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from '../common';

@Component({
  selector: 'thumb-component',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})

export class ThumbComponent {
  @Input() event:IEvent;
  @Output() eventClick = new EventEmitter(); 

  getStartTimeClass (event) {
    const early = event.time === '8:00 am';
    const late = event.time === '10:00 am';
    
    return {greenish: early, redish: late};
  }

  someProperty:string = "Click Click Click";

  handleClick($event) {
    console.log("Internal Click");
    this.eventClick.emit(this.someProperty);
    $event.stopPropagation();
  }

  handleExternalClick() {
    console.log("External Click!");
  }
}