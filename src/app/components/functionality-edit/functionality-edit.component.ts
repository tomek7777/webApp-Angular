import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  selector: "app-functionality-edit",
  templateUrl: "./functionality-edit.component.html",
  styleUrls: ["./functionality-edit.component.scss"],
})
export class FunctionalityEditComponent implements OnInit {
  functionality: FunctionalityInterface | undefined;
  functionalityForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);
  functionalityId!: string;
  functionalityOptions!: FunctionalityInterface;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private functionalitiesService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.workStatusValues);
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id !== null) {
        this.functionalityId = id;
        this.loadFunctionality();
      } else {
        this.functionalityId = "";
      }
    });

    this.functionalitiesService
      .getSingleFunctionality(this.functionalityId)
      .subscribe((functionality: FunctionalityInterface) => {
        this.functionalityOptions = functionality;
      });
    console.log(this.functionalityOptions.status);
    const currentDate = new Date().toISOString().split("T")[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });

    this.functionalityForm = this.formBuilder.group({
      name: [this.functionalityOptions.name, Validators.required],
      description: [this.functionalityOptions.description, Validators.required],
      priority: [this.functionalityOptions.priority, Validators.required],
      status: [this.functionalityOptions.status, Validators.required],
      addedDate: addedDateControl,
      startDate: [this.functionalityOptions.startDate],
      endDate: [this.functionalityOptions.endDate],
      timeSpent: [this.functionalityOptions.timeSpent],
    });
  }

  loadFunctionality() {
    this.functionalitiesService
      .getSingleFunctionality(this.functionalityId)
      .subscribe(
        (functionality: FunctionalityInterface) => {
          this.functionality = functionality;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateFunctionalityStatus(taskStatus: string) {
    if (this.functionality) {
      if (taskStatus === "doing") {
        this.functionality.status = WorkStatus.Doing;
      } else if (taskStatus === "done") {
        this.functionality.status = WorkStatus.Done;
      } else {
        this.functionality.status = WorkStatus.Todo;
      }
    }
  }

  editFunctionality() {
    const taskStatus = this.functionalityForm.value.status;
    this.updateFunctionalityStatus(taskStatus);

    console.log(this.functionalityForm.value.status);

    if (this.functionality) {
      this.functionality.name = this.functionalityForm.value.name;
      this.functionality.description = this.functionalityForm.value.description;
      this.functionality.priority = this.functionalityForm.value.priority;
      this.functionality.status = this.functionalityForm.value.status;
      this.functionality.addedDate = new Date(
        this.functionalityForm.value.addedDate
      );
      this.functionality.startDate = this.functionalityForm.value.startDate
        ? new Date(this.functionalityForm.value.startDate)
        : undefined;
      this.functionality.endDate = this.functionalityForm.value.endDate
        ? new Date(this.functionalityForm.value.endDate)
        : undefined;
      this.functionality.timeSpent = this.functionalityForm.value.timeSpent
        ? +this.functionalityForm.value.timeSpent
        : undefined;

      this.functionalitiesService
        .updateFunctionality(this.functionality)
        .subscribe(
          (functionality) => {
            this.router.navigate(["/functionalities"]);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
