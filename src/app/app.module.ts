import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DialogService } from './dialog.service';
import { EmbarqueNewComponent } from './components/embarque-new/embarque-new.component';
import { EmbarqueService } from './services/embarque.service';
import { EmbarqueListComponent } from './components/embarque-list/embarque-list.component';
import { EmbarqueDetailComponent } from './components/embarque-detail/embarque-detail.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    UserNewComponent,
    UserListComponent,
    EmbarqueNewComponent,
    EmbarqueListComponent,
    EmbarqueDetailComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  
  ],
  providers: [
    UserService, 
    AuthGuard,
    SharedService,
    DialogService,
    EmbarqueService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
