import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users';
  private users: UserInterface[] = [];

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.users = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.users));
  }

  constructor() {
    this.getDataFromLocalStorage();
  }

  getUsers(): Observable<UserInterface[]> {
    return of(this.users);
  }

  createUsers(user: UserInterface): Observable<UserInterface> {
    this.users.push(user);
    this.saveDataToLocalStorage();
    return of(user);
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    const userToUpdate = this.users.find((u) => u.login === user.login);

    if (userToUpdate) {
      userToUpdate.login = user.login;
      userToUpdate.password = user.password;
      userToUpdate.name = user.name;
      userToUpdate.surname = user.surname;
      userToUpdate.role = user.role;
      this.saveDataToLocalStorage();
      return of(userToUpdate);
    } else {
      return of();
    }
  }

  deleteUser(userLogin: string): Observable<boolean> {
    const newUsersList = this.users.filter((u) => u.login !== userLogin);

    if (newUsersList) {
      this.users = newUsersList;
      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }
}
