import { SessionListComponent } from "./session.list.component";
import { ISession } from "src/app/common";

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[{name:'session 1', level: 'intermediate'},
                {name:'session 2', level: 'intermediate'},
                {name:'session 3', level: 'beginner'}];

            component.filterBy = "intermediate";
            component.sortBy = "name";

            component.ngOnChanges();

            expect(component.filteredSessions.length).toBe(2);
        });

        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[{name:'session 2', level: 'intermediate'},
                {name:'session 3', level: 'intermediate'},
                {name:'session 1', level: 'beginner'}];

            component.filterBy = "all";
            component.sortBy = "name";

            component.ngOnChanges();

            expect(component.filteredSessions.length).toBe(3);
            expect(component.filteredSessions[0].name).toBe('session 1');
            expect(component.filteredSessions[1].name).toBe('session 2');
            expect(component.filteredSessions[2].name).toBe('session 3');
        });
    });
});