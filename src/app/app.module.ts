import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { allIcons } from 'angular-feather/icons';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { Calendar2Component } from './components/calendar2/calendar2.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, CalendarComponent, Calendar2Component],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    FeatherModule.pick(allIcons),
  ],
  providers: [],
  exports: [FeatherModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
