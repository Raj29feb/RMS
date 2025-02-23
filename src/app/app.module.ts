import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarComponent } from './sdk/components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalModule } from './sdk/components/modal/modal.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Import this
import { AuthInterceptor } from './auth.interceptor';
import { SdkModule } from './sdk/sdk.module';
@NgModule({
  declarations: [AppComponent, SnackbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ModalModule,
    SdkModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Use the AuthInterceptor
      multi: true, // This allows multiple interceptors to be added
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
