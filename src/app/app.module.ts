import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FunctionalityListComponent } from './components/functionality-list/functionality-list.component';
import { FunctionalityFormComponent } from './components/functionality-form/functionality-form.component';
import { FunctionalityEditComponent } from './components/functionality-edit/functionality-edit.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserProjectsComponent,
    FunctionalityFormComponent,
    FunctionalityListComponent,
    TaskListComponent,
    TaskFormComponent,
    FunctionalityEditComponent,
    EditTaskComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
