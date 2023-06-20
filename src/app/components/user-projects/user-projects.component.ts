import { Component, OnInit } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {
  projects: ProjectInterface[] = [];
  project!: ProjectInterface;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: ProjectInterface[]) => {
      this.projects = projects;
      this.project = this.projects[0];
    });
  }

  showFunctionalities() {
    this.router.navigate(['/functionalities']);
  }
}
