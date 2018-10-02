import { Routes } from "@angular/router";
import { EventComponent, CreateEvent, EventResolverService, CreateSessionComponent } from "./event/index";
import { ListComponent, ListResolverService } from "./home/index";
import { Error404 } from "./errors/404.component";

export const AppRouter: Routes = [
    {path:'home', component:ListComponent, resolve:{events: ListResolverService}},
    {path:'event/new', component:CreateEvent, canDeactivate:['canDeactivateEventCreation']},
    // {path:'event/:id', component:EventComponent, canActivate:[EventActivatorService]},
    {path:'event/:id', component:EventComponent, resolve:{event: EventResolverService}},
    {path: 'event/session/new', component:CreateSessionComponent},
    {path:'error', component:Error404},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'user', loadChildren:'./user/user.module#UserModule'}
];