import { Component } from '@angular/core';
import PocketBase from 'pocketbase';
import { PocketbaseResult, Task } from './shared/interfaces/pocketbase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PocketbaseService } from './pocketbase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pocketbase-todo';
  client = new PocketBase('http://127.0.0.1:8090');
  tasks?: [Task];
  newTask = '';

  constructor(private _snackBar: MatSnackBar, private pocketBaseService: PocketbaseService) {
    this.pocketBaseService.getTasks().then((r: PocketbaseResult<[Task]>) => {
      this.tasks = r.items;
    });

    this.client.realtime.subscribe('tasks', (r) => {
      switch(r.action) {
        case 'create':
          this.tasks!.push(r.record as unknown as Task);
          break;
        case 'delete':
          this.tasks!.splice(this.tasks!.findIndex(t => t.id === r.record.id), 1);
          break;
      }
    });
  }

  public onAddTask(): void {
    this.pocketBaseService.addTask(this.newTask).then((t: Task) => {
      this._snackBar.open('Task ' + t.id + ' was created', 'dismiss');
    });
  }

  public toggleTask(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.pocketBaseService.updateTask(task).then(() => {
      this._snackBar.open('Task ' + task.id + ' was updated', 'dismiss');
    });
  }

  public onDeleteTask(task: Task): void {
    this.pocketBaseService.deleteTask(task).then(() => {
      this._snackBar.open('Task ' + task.id + ' was deleted', 'dismiss');
    });
  }


}
