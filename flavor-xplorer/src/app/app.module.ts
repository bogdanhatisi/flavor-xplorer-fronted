import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserServiceComponent } from './services/user-service/user-service.component';

@NgModule({
  declarations: [AppComponent, UserProfileComponent, UserServiceComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [UserServiceComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
