import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamServiceComponent } from './team-service/team-service.component';
import { MatchComponent } from './match/match.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { InterceptorService } from './services/interceptor.service';
import { ModalMatch } from './my-matches/modal_match/modal-match.component';
import { ProfileComponent } from './profile/profile.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchStatusServiceComponent } from './match-status-service/match-status-service.component';

const appRoutes:Routes=[
  {path: '', component:HomeComponent},
  {path: 'login', component:TeamServiceComponent},
  {path: 'match', component:MatchComponent},
  {path: 'match-status', component:MatchStatusServiceComponent},
  {path: 'profile', component:ProfileComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TeamServiceComponent,
    MatchComponent,
    MyMatchesComponent,
    ModalMatch,
    ProfileComponent,
    MatchStatusServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
