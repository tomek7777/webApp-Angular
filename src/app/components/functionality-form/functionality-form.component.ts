import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FunctionalityInterface } from "src/app/interfaces/functionality.interface";
import { FunctionalityService } from "src/app/services/functionality.service";
import { TaskInterface } from "src/app/interfaces/task.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { WorkStatus } from "src/app/enums/workStatus.enum";


@Component({
  selector: "app-functionality-form",
  templateUrl: "./functionality-form.component.html",
  styleUrls: ["./functionality-form.component.scss"],
})
export class FunctionalityFormComponent implements OnInit {
  functionalities: FunctionalityInterface[] = [];
  functionalityForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);


  constructor(
    private formBuilder: FormBuilder,
    private functionalitiesService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split("T")[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });

    this.functionalityForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      priority: ["", Validators.required],
      projectName: ["", Validators.required],
      owner: ["", Validators.required],
      status: [WorkStatus.Todo, Validators.required],
      addedDate: addedDateControl,
      startDate: [""],
      endDate: [""],
      timeSpent: [""],
    });

    this.functionalitiesService
      .getFunctionalities()
      .subscribe((functionalities: FunctionalityInterface[]) => {
        this.functionalities = functionalities;
      });
  }

  createFunctionality() {
    const currentDate = new Date().toISOString().split("T")[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });
    const addedDateValue =
      addedDateControl.value !== null ? addedDateControl.value : currentDate;

    const functionality: FunctionalityInterface = {
      ID: Date.now().toString(),
      name: this.functionalityForm.value.name,
      description: this.functionalityForm.value.description,
      priority: this.functionalityForm.value.priority,
      status: this.functionalityForm.value.status,
      addedDate: new Date(addedDateValue),
      startDate: this.functionalityForm.value.startDate || undefined,
      endDate: this.functionalityForm.value.endDate || undefined,
      tasks: [], // Dodana właściwość "tasks" jako pusta tablica
    };

    this.functionalitiesService.createFunctionality(functionality).subscribe(
      () => {
        console.log(functionality);
        this.router.navigateByUrl("/functionalities");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
