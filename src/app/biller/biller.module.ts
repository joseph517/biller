import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { CreateViewComponent } from './pages/create-view/create-view.component';
import { BillerRoutingModule } from './biller.routing.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    ListViewComponent,
    CreateViewComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    BillerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchComponent
  ]
})
export class BillerModule { }
