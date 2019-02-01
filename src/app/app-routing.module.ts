import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'space', component: LoginComponent},
    {path: 'sign-in', component: LoginComponent, data: {space: true}},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}