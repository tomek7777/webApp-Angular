import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityFormComponent } from './components/functionality-form/functionality-form.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FunctionalityListComponent } from './components/functionality-list/functionality-list.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FunctionalityEditComponent } from './components/functionality-edit/functionality-edit.component';
const routes: Routes = [
  { path: '', component: UserProjectsComponent },
  { path: 'functionalities', component: FunctionalityListComponent },
  { path: 'functionalities/create', component: FunctionalityFormComponent },
  { path: 'functionalities/:id', component: TaskListComponent },
  { path: 'task/create', component: TaskFormComponent },
  { path: 'task/edit/:id', component: EditTaskComponent },

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
