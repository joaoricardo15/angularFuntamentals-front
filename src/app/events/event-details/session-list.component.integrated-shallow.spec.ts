import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../shared/duration.pipe';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
      component: SessionListComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(async(() => {
    const mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Dao' }
    };
    const mockVoterService = {
      userHasVoted: () => {}
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        DurationPipe,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
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
      component.sessions = [{
        id: 3,
        name: 'session1',
        presenter: 'nico',
        duration: 1,
        level: 'beginer',
        abstract: 'abstract',
        voters: ['Gui', 'Zoio']
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(element.querySelector('[well-header]').textContent).toContain('session1');
      // just other way //expect(debugEl.query(By.css('[well-header]')).nativeElement.textContent).toContain('session1')
    });
  });

});
