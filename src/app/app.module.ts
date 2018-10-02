import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { ListComponent, ThumbComponent, ListResolverService } from './home/index';
import { EventService, CollapsibleWellComponent, DurationPipe, ToastrService, JQ_TOKEN, 
  SimpleModalComponent, ModalTriggerDirective } from "./common/index";
import { CreateEvent, EventComponent, CreateSessionComponent, SessionListComponent, 
  UpVoteComponent, VoterService, LocationValidatorDirective, EventResolverService } from './event/index';
import { AuthService } from "./user/auth.service";
import { AppRouter } from "./routes";
import { Error404 } from "./errors/404.component";
import { TOASTR_TOKEN, Toastr } from './common/new.toastr.service';

let jQuery = window['$'];
let toastr:Toastr = window['toastr'];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouter),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CreateEvent,
    Error404,
    EventComponent,
    ListComponent,
    NavbarComponent,
    ThumbComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpVoteComponent,
    ModalTriggerDirective,
    LocationValidatorDirective,
    DurationPipe
  ],
  providers: [
    EventService,
    ToastrService, 
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    ListResolverService,
    EventResolverService,
    {
      provide: 'canDeactivateEventCreation',
      useValue: checkDirtyState
    },
    AuthService,
    VoterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEvent) {
  if (component.isDirty) {
    return window.confirm('Do you really want to cancel before saving your changes?');
  }
  return true;
}