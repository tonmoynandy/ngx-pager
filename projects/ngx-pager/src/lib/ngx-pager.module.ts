import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgxPagerComponent } from './ngx-pager.component';

@NgModule({
  declarations: [NgxPagerComponent],
  imports: [
    BrowserModule,CommonModule
  ],
  exports: [BrowserModule,CommonModule,  NgxPagerComponent]
})
export class NgxPagerModule { }
