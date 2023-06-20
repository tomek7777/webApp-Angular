import { Component, OnInit } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { Router } from '@angular/router';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import { WorkStatus } from 'src/app/enums/workStatus.enum';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss'],
})
export class FunctionalityListComponent implements OnInit {
  functionality: FunctionalityInterface[] = [];

  constructor(
    private functionalityService: FunctionalityService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.functionalityService
      .getFunctionalities()
      .subscribe((functionality: FunctionalityInterface[]) => {
        this.functionality = functionality;
        this.updateFunctionalityStatus();
      });
  }

  showFunctionalityDetails(ID: string) {
    this.router.navigate(['/functionalities', ID]);
  }

  deleteFunctionality(id: string) {
    this.functionalityService.deleteFunctionality(id).subscribe(
      () => {
        console.log('Funkcjonalność została usunięta.');
        this.functionality = this.functionality.filter(
          (item) => item.ID !== id
        );
        this.updateFunctionalityStatus();
      },
      (error) => {
        console.error('Wystąpił błąd podczas usuwania funkcjonalności:', error);
      }
    );
  }

  addFunctionality() {
    this.router.navigate(['functionalities/create']);
  }

  editFunctionality(ID: string) {
    this.router.navigate(['/functionality/edit', ID]);
  }

  private updateFunctionalityStatus() {
    this.functionality.forEach((func) => {
      const hasDoingTask = func.tasks?.some(
        (task) => task.state === WorkStatus.Doing
      );
      const allTasksDone = func.tasks?.every(
        (task) => task.state === WorkStatus.Done
      );

      if (hasDoingTask) {
        func.status = WorkStatus.Doing;
      } else if (allTasksDone) {
        func.status = WorkStatus.Done;
      } else {
        func.status = WorkStatus.Todo;
      }
    });
  }
}
