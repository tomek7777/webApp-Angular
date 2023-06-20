import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FunctionalityInterface } from "src/app/interfaces/functionality.interface";
import { FunctionalityService } from "src/app/services/functionality.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorkStatus } from "src/app/enums/workStatus.enum";

@Component({
  selector: "app-functionality-form",
  templateUrl: "./functionality-form.component.html",
  styleUrls: ["./functionality-form.component.scss"],
})
export class FunctionalityFormComponent implements OnInit {
  functionalityForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);

  constructor(
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split("T")[0];

    this.functionalityForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      priority: ["", Validators.required],
      status: [WorkStatus.Todo, Validators.required],
      startDate: [""],
      endDate: [""],
    });
  }

  createFunctionality() {
    const currentDate = new Date(); // Zmiana

    const functionality: FunctionalityInterface = {
      ID: Date.now().toString(),
      name: this.functionalityForm.value.name,
      description: this.functionalityForm.value.description,
      priority: this.functionalityForm.value.priority,
      status: this.functionalityForm.value.status,
      addedDate: currentDate, // Zmiana
      startDate: this.functionalityForm.value.startDate || undefined,
      endDate: this.functionalityForm.value.endDate || undefined,
      tasks: [],
    };

    this.functionalityService.createFunctionality(functionality).subscribe(
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
