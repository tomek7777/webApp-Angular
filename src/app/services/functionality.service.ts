import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FunctionalityInterface } from '../interfaces/functionality.interface';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityService {
  private localStorageKey = 'functionalities';
  private functionalities: FunctionalityInterface[] = [];

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.functionalities = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.functionalities)
    );
  }

  constructor() {
    this.getDataFromLocalStorage();
  }

  getFunctionalities(): Observable<FunctionalityInterface[]> {
    return of(this.functionalities);
  }

  getSingleFunctionality(ID: string): Observable<FunctionalityInterface> {
    const functionality = this.functionalities.find((f) => f.ID === ID);

    if (functionality) {
      return of(functionality);
    } else {
      throw new Error('Project not found');
    }
  }

  createFunctionality(
    functionality: FunctionalityInterface
  ): Observable<FunctionalityInterface> {
    this.functionalities.push(functionality);
    this.saveDataToLocalStorage();
    return of(functionality);
  }

  updateFunctionality(
    functionality: FunctionalityInterface
  ): Observable<FunctionalityInterface> {
    const functionalityToUpdate = this.functionalities.find(
      (f) => (f.ID = functionality.ID)
    );

    if (functionalityToUpdate) {
      functionalityToUpdate.name = functionality.name;
      functionalityToUpdate.description = functionality.description;
      functionalityToUpdate.priority = functionality.priority;
      functionalityToUpdate.status = functionality.status;
      this.saveDataToLocalStorage();
      return of(functionalityToUpdate);
    } else {
      return of();
    }
  }

  deleteFunctionality(ID: string): Observable<boolean> {
    const newFunctionalities = this.functionalities.filter((f) => f.ID !== ID);

    if (newFunctionalities) {
      this.functionalities = newFunctionalities;
      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }
}
