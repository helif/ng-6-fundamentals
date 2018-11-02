import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { SessionListComponent } from "./session.list.component";
import { AuthService } from "src/app/user/auth.service";
import { VoterService } from "./voter.service";
import { UpVoteComponent } from "./up.vote.component";
import { DurationPipe, CollapsibleWellComponent } from "src/app/common";
import { By } from "@angular/platform-browser";


describe('SessionListComponent', () => {
    let fixture:ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {
                userName: 'Joe'
            }
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [SessionListComponent,
                UpVoteComponent,
                DurationPipe,
                CollapsibleWellComponent,
            ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService},
            ],
            schemas: [
                NO_ERRORS_SCHEMA // Ignore not declared components
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [{id:3, name:'Session 3', presenter: 'Joe', 
                duration:1, level:'beginner', abstract:'abstract', voters:['john', 'bob']}];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = '4';

            component.ngOnChanges();
            fixture.detectChanges(); //renders changes in the DOM

            expect(element.querySelector('h4').textContent).toContain('Session 3');
            // using debug element
            expect(debugEl.query(By.css('h4')).nativeElement.textContent).toContain('Session 3');
        })
    });
});