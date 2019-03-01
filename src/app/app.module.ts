import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {JwtInterceptor} from "./helper/jwt.interceptor";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {SharedBootstrapModule} from './shared/bootstrap.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from './component/alert/alert.component';
import {LoginComponent} from './component/login/login.component';
import {LoaderComponent} from './component/loader/loader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './component/register/register.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ChatComponent} from './component/chat/chat.component';
import {MessageComponent} from './component/message/message.component';
import {MessageService} from "./service/message/message.service";

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        AlertComponent,
        LoginComponent,
        LoaderComponent,
        MessageComponent,
        RegisterComponent,
        DashboardComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedBootstrapModule
    ],
    entryComponents: [
        MessageComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
