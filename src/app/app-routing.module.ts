import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityFormComponent } from './components/functionality-form/functionality-form.component';

import { FunctionalityListComponent } from './components/functionality-list/functionality-list.component';
import { UserProcjectsComponent } from './components/user-procjects/user-procjects.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FunctionalityEditComponent } from './components/functionality-edit/functionality-edit.component';
const routes: Routes = [
  { path: '', component: UserProcjectsComponent },
  { path: 'functionalities', component: FunctionalityListComponent },
  { path: 'functionalities/create', component: FunctionalityFormComponent },
  { path: 'functionalities/:id', component: TaskListComponent },
  { path: 'task/create', component: TaskFormComponent },
  {
    path: 'functionality/edit/:id',
    component: FunctionalityEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
