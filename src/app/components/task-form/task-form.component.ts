import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { TaskService } from 'src/app/services/task.service';
import { WorkStatus } from 'src/app/enums/workStatus.enum';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  tasks: TaskInterface[] = [];
  taskForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);
  functionalityList: FunctionalityInterface[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private functionalityService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true
    });

    this.functionalityService.getFunctionalities().subscribe((f: FunctionalityInterface[]) => {
      this.functionalityList = f;
    });

    this.taskService.getTasks().subscribe((t: TaskInterface[]) => {
      this.tasks = t;
    });

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      functionality: ['', Validators.required],
      status: [WorkStatus.Todo, Validators.required],
      addedDate: addedDateControl,
      startDate: [''],
      endDate: ['']
    });
  }

  addTask() {
    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true
    });

    const addedDateValue = addedDateControl.value !== null ? addedDateControl.value : currentDate;

    const selectedFunctionalityId = this.taskForm.value.functionality;
    const selectedFunctionality = this.functionalityList.find((f) => f.ID === selectedFunctionalityId);

    if (!selectedFunctionality) {
      return; // Dodaj odpowiednie obsłużenie błędu, jeśli funkcjonalność nie zostanie znaleziona
    }

    const newTask: TaskInterface = {
      ID: Date.now().toString(),
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      functionalityID: selectedFunctionality.ID,
      functionality: selectedFunctionality,
      state: this.taskForm.value.status,
      addedDate: new Date(addedDateValue),
      startDate: this.taskForm.value.startDate,
      endDate: this.taskForm.value.endDate,
      assignedUser: this.taskForm.value.owner
    };

    this.taskService.createTask(newTask).subscribe(
      (task: TaskInterface) => {
        console.log(task);
        if (!selectedFunctionality.tasks) {
          selectedFunctionality.tasks = []; // Inicjalizuj tablicę zadaniami, jeśli nie istnieje
        }
        selectedFunctionality.tasks.push(task); // Dodaj zadanie do listy zadań funkcjonalności
        this.router.navigateByUrl('/functionalities');
      },
      (error) => console.log(error)
    );
  }
}
