import { Component, OnInit } from '@angular/core';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import { WorkStatus } from 'src/app/enums/workStatus.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  functionality!: FunctionalityInterface;
  functionalities: FunctionalityInterface[] = [];
  tasks: TaskInterface[] = [];
  functionalityID!: string;
  item: any;

  constructor(
    private route: ActivatedRoute,
    private functionalityService: FunctionalityService,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.functionalityID = params['id'];
      this.getSingleFunctionality(this.functionalityID);
    });

    this.taskService.getTasks().subscribe((taskList: TaskInterface[]) => {
      this.tasks = taskList;
    });
  }

  getSingleFunctionality(ID: string) {
    this.functionalityService
      .getSingleFunctionality(ID)
      .subscribe((functionality) => {
        this.functionality = functionality as FunctionalityInterface;
        this.functionalities.push(this.functionality);
      });
  }

  deleteTask(ID: string) {
    this.taskService.deleteTask(ID).subscribe(
      () => {
        console.log('Task został usunięty');
        this.tasks = this.tasks.filter((item) => item.ID !== ID);
      },
      (error) => console.log(error)
    );
  }

  showTaskDetails(ID: string) {
    this.router.navigate(['/task/edit', ID]);
  }

  addTask() {
    this.router.navigate(['/task/create']);
  }

  updateFunctionalityStatus(functionality: FunctionalityInterface) {
    if (functionality.tasks && functionality.tasks.length > 0) {
      const hasDoingTask = functionality.tasks.some(
        (task) => task.state === WorkStatus.Doing
      );
      const allTasksDone = functionality.tasks.every(
        (task) => task.state === WorkStatus.Done
      );

      if (hasDoingTask) {
        functionality.status = WorkStatus.Doing;
      } else if (allTasksDone) {
        functionality.status = WorkStatus.Done;
      } else {
        functionality.status = WorkStatus.Todo;
      }
    } else {
      if (functionality.status === WorkStatus.Doing) {
        functionality.status = WorkStatus.Done;
      }
    }
  }
}
