import { UserInterface } from './user.interface';
import { ProjectInterface } from './project.interface';
import { WorkStatus } from '../enums/workStatus.enum';
import { TaskInterface } from './task.interface';

export interface FunctionalityInterface {
  ID: string;
  name: string;
  description: string;
  priority: string;
  status: WorkStatus;
  addedDate: Date;
  startDate?: Date;
  endDate?: Date;
  timeSpent?: number;
  tasks?: TaskInterface[];
}
