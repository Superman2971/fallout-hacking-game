import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// Component
import { AppComponent } from './app.component';
import { FalloutComponent } from './fallout/fallout.component';
// Services
import { FalloutService } from './fallout/fallout.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    FalloutComponent
  ],
  providers: [
    FalloutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
