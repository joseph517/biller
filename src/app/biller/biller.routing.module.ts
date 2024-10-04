import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { CreateViewComponent } from './pages/create-view/create-view.component';

const routes: Routes = [

    {
        path: 'list-view',
        component: ListViewComponent
    },
    {
        path: 'create-form',
        component: CreateViewComponent
    },
    {
        path: 'edit-form/:billerId',
        component: CreateViewComponent
    },

    {
        path: '**',
        redirectTo: 'create-form',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillerRoutingModule { }