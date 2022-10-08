import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HeaderComponent } from './header/header.component';
//import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
//import { ComponentsComponent } from './components/components/components.component';
//import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { PoemasComponent } from './pages/poemas/poemas.component';

@NgModule({
  declarations: [
    AppComponent,
  //  HeaderComponent,
  //  FooterComponent,
    HomeComponent,
  //  ComponentsComponent,
  //  CardsComponent,
    LoginComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    PoemasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
