import { Injectable } from '@angular/core';
import { PocketbaseItem, PocketbaseResult, Task } from './shared/interfaces/pocketbase';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  client = new PocketBase('http://127.0.0.1:8090');

  constructor() { }

  public async addTask(task: string): Promise<any> {
    return await this.client.records.create('tasks', { description: task, isCompleted: false });
  }

  public async updateTask(task: Task): Promise<PocketbaseItem> {
    return await this.client.records.update('tasks', task.id, task);
  }

  public async deleteTask(task: Task): Promise<boolean> {
    return await this.client.records.delete('tasks', task.id, task);
  }

  public async getTasks(): Promise<PocketbaseResult> {
    return await this.client.records.getList('tasks', 1, 50, {
      filter: 'created >= "2022-01-01 00:00:00"'
    });
  }
}
