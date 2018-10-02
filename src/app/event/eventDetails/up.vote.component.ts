import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "up-vote",
    templateUrl: "./up.vote.component.html",
    styleUrls: ["./up.vote.component.css"]
})
export class UpVoteComponent {
    @Input() count: number;
    @Output() vote = new EventEmitter(); 
    iconColor: string;

    @Input() set voted(val:boolean){
        this.iconColor = val ? 'red' : 'white';
    }
    onClick() {
        this.vote.emit({});
    }
}