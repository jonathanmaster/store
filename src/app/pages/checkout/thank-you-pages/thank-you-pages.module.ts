import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouPagesRoutingModule } from './thank-you-pages-routing.module';
import { ThankYouPagesComponent } from './thank-you-pages.component';


@NgModule({
  declarations: [
    ThankYouPagesComponent
  ],
  imports: [
    CommonModule,
    ThankYouPagesRoutingModule
  ]
})
export class ThankYouPagesModule { }
