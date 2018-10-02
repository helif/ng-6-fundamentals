import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "../../common";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";

@Component({
    selector: 'session-list',
    templateUrl: './session.list.component.html',
    styleUrls: ['./session.list.component.css']
})
export class SessionListComponent implements OnChanges {
    @Input() sessions:ISession[];
    @Input() filterBy:string;
    @Input() sortBy:string;
    @Input() eventId:string;
    filteredSessions: ISession[];

    constructor(private voterService:VoterService, private authService:AuthService) {

    }
    ngOnChanges() {
        if (this.sessions && this.filterBy) {
            this.filterSessions(this.filterBy.toLocaleLowerCase());
        }

        if (this.filteredSessions && this.sortBy) {
            if (this.sortBy === "name") {
                this.filteredSessions.sort(sortByNameAsc)
            } else {
                this.filteredSessions.sort(sortByVotesDesc)
            }
        }
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.filteredSessions = this.sessions.slice(0);
        } else {
            this.filteredSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    userHasVoted(session:ISession) {
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }

    toggleVote(session:ISession) {
        if (this.userHasVoted(session)) {
            // this.voterService.deleteVoter(session, this.authService.currentUser.userName);
            this.voterService.deleteServerVoter(this.eventId, session, this.authService.currentUser.userName);
        } else {
            // this.voterService.addVoter(session, this.authService.currentUser.userName)
            this.voterService.addServerVoter(this.eventId, session, this.authService.currentUser.userName)
        }

        if (this.sortBy === 'votes') {
            this.filteredSessions.sort(sortByVotesDesc);
        }
    }
}

function sortByNameAsc(s1:ISession, s2:ISession) {
    if (s1.name > s2.name) return 1;

    if (s1.name === s2.name) return 0;

    return -1;
}

function sortByVotesDesc(s1:ISession, s2:ISession) {
    return (s1.voters.length - s2.voters.length);
}