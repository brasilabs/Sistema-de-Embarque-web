import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EmbarqueNewComponent } from './components/embarque-new/embarque-new.component';
import { EmbarqueListComponent } from './components/embarque-list/embarque-list.component';
import { EmbarqueDetailComponent } from './components/embarque-detail/embarque-detail.component';
import { SummaryComponent } from './components/summary/summary.component';

export const ROUTES: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
    { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
    { path: 'user-new/:id' , component: UserNewComponent, canActivate: [AuthGuard] },
    { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'embarque-new' , component: EmbarqueNewComponent, canActivate: [AuthGuard] },
    { path: 'embarque-new/:id' , component: EmbarqueNewComponent, canActivate: [AuthGuard] },
    { path: 'embarque-list' , component: EmbarqueListComponent, canActivate: [AuthGuard] },
    { path: 'embarque-detail/:id' , component: EmbarqueDetailComponent, canActivate: [AuthGuard] },
    { path: 'summary' , component: SummaryComponent, canActivate: [AuthGuard] }
    
  ]
  
  export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
  