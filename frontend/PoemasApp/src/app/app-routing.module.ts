import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PoemasComponent } from './pages/poemas/poemas.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component'
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component'
import { AuthsessionGuard } from './guards/authsession.guard';
import { AdminsessionGuard } from './guards/adminsession.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'poemas',component:PoemasComponent},
  {path:'admin',component:DashboardAdminComponent,canActivate:[AdminsessionGuard]},
  {path:'user',component:DashboardUserComponent,canActivate:[AdminsessionGuard]},
  {path: 'user/:id', component:DashboardUserComponent,canActivate:[AdminsessionGuard]},
  {path:'poema/:id',component:PoemasComponent,canActivate:[AuthsessionGuard]},
  //{path:'poema/:id',component:PoemasComponent, canActivate:[AuthsessionGuard]},   para proteger la ruta actua como un middleware
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
