import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkStatus } from '../enums/workStatus.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TaskInterface } from '../interfaces/task.interface';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskID!: string;
  taskFormGroup!: FormGroup;
  workStatusValues = Object.values(WorkStatus);
  taskToEdit!: TaskInterface;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.taskID = id ?? '';
    });

    this.taskService.getSingleTask(this.taskID).subscribe((task: TaskInterface) => {
      this.taskToEdit = task;

      this.taskFormGroup = this.formBuilder.group({
        name: [this.taskToEdit.name, Validators.required],
        description: [this.taskToEdit.description, Validators.required],
        priority: [this.taskToEdit.priority, Validators.required],
        state: [this.taskToEdit.state, Validators.required],
        startDate: [this.taskToEdit.startDate, Validators.required],
        endDate: [this.taskToEdit.endDate, Validators.required]
      });
    });
  }

  saveUpdatedTask(): void {
    this.updateTask();
    this.taskService.updateTask(this.taskToEdit).subscribe(() => {
      this.router.navigate(['/functionalities', this.taskToEdit.functionalityID]);
    });
  }

  private updateTask(): void {
    this.taskToEdit.name = this.taskFormGroup.value.name;
    this.taskToEdit.description = this.taskFormGroup.value.description;
    this.taskToEdit.priority = this.taskFormGroup.value.priority;
    this.taskToEdit.state = this.taskFormGroup.value.state;
    this.taskToEdit.startDate = this.taskFormGroup.value.startDate;
    this.taskToEdit.endDate = this.taskFormGroup.value.endDate;
  }
}
