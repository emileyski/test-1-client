import { ITask } from "../Interfaces/ITask";

export function fetchTasks(): Promise<ITask[]> {
  //TODO: remove this link to .env
  return fetch(`http://localhost:3000/api/tasks`).then((response) =>
    response.json()
  );
}

export function createTask(task: string, description: string): Promise<ITask> {
  return fetch(`http://localhost:3000/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: task, description }),
  }).then((response) => response.json());
}

export function removeTask(id: string): Promise<any> {
  return fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

export function setTaskStatus(id: string, status: string): Promise<any> {
  return fetch(`http://localhost:3000/api/tasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  }).then((response) => response.json());
}
