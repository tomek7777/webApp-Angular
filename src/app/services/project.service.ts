import { Injectable, OnInit } from '@angular/core';
import { ProjectInterface } from '../interfaces/project.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private localStorageKey = 'projects';
  private projects: ProjectInterface[] = [
    {
      ID: '1',
      name: 'Lista TODO Funkcjonalności',
      description: '',
    },
  ];

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.projects = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.projects));
  }

  constructor() {
    this.getDataFromLocalStorage();
  }

  getProjects(): Observable<ProjectInterface[]> {
    return of(this.projects);
  }

  getSingleProject(ID: string): Observable<ProjectInterface> {
    const project = this.projects.find((p) => p.ID === ID);

    if (project) {
      return of(project);
    } else {
      throw new Error('Task not found');
    }
  }

  createProject(project: ProjectInterface): Observable<ProjectInterface> {
    this.projects.push(project);
    this.saveDataToLocalStorage();
    return of(project);
  }

  updateProject(project: ProjectInterface): Observable<ProjectInterface> {
    const projectToUpdate = this.projects.find((p) => p.ID === project.name);

    if (projectToUpdate) {
      projectToUpdate.name = project.name;
      projectToUpdate.description = project.description;
      this.saveDataToLocalStorage();
      return of(projectToUpdate);
    } else {
      return of();
    }
  }

  deleteProject(ID: string): Observable<boolean> {
    const newProjectsList = this.projects.filter((p) => p.ID !== ID);

    if (newProjectsList) {
      this.projects = newProjectsList;
      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }
}
