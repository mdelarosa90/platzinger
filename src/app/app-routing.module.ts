import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthenticationGuard } from "./services/authentication.guard";
import { NgModule } from "@angular/core";



const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
    {path: 'login', component: LoginComponent},
    {path: 'conversation/:uid', component: ConversationComponent, data: {animation: 'isRight'}},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard], data: {animation: 'isLeft'}}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
  