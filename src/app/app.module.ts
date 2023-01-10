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

const appRoutes:Routes=[
  {path: '', component:HomeComponent},
  {path: 'login', component:TeamServiceComponent},
  {path: 'match', component:MatchComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TeamServiceComponent,
    MatchComponent,
    MyMatchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
