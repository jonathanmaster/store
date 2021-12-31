import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouPagesComponent } from './thank-you-pages.component';

const routes: Routes = [{ path: '', component: ThankYouPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankYouPagesRoutingModule { }
