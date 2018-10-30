import { VoterService } from "./voter.service";
import { of } from "rxjs";
import { ISession } from "src/app/common";

describe('VoterService', () => {
    let mockHttp, voterService:VoterService;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('delete Voter', () => {
        it('should delete Voter from the list of voters', () => {
            let session = {id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteServerVoter('1', <ISession>session, 'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with the right URL', () => {
            let session = {id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteServerVoter('1', <ISession>session, 'john');

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/1/sessions/6/voters/john');
        })
    });

    describe('add Voter', () => {
        it('should add voter to the list of voters', () => {
            let session = {id: 6, voters: ['joe', 'john']};
            mockHttp.post.and.returnValue(of(false));

            voterService.addServerVoter('1', <ISession>session, 'sam');

            expect(session.voters.length).toBe(3);
            expect(session.voters[2]).toBe('sam');
        });

        it('should call http.post with the right URL', () => {
            let session = {id: 6, voters: ['joe', 'john']};
            mockHttp.post.and.returnValue(of(false));

            voterService.addServerVoter('1', <ISession>session, 'sam');

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/1/sessions/6/voters/sam', {}, 
                jasmine.any(Object));
        });
    })
});