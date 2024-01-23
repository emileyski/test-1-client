import { IStatus } from "./IStatus";

export interface ITask {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  updatedAt: Date;
  status: string;
  statuses: IStatus[];
}
