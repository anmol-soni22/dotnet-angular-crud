import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { Tasks } from '../models/tasks.model';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule  } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  http = inject(HttpClient);

  tasksForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string | null>(null),
  });

  tasks$ = this.getTasks();
  isEditMode = false;
  editingTaskId: string | null = null;

  onFormSubmit() {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.onAdd();
    }
  }

  onAdd() {
    const addTaskRequest = {
      name: this.tasksForm.value.name,
      description: this.tasksForm.value.description
    };

    this.http.post('https://localhost:7217/api/Tasks', addTaskRequest).subscribe({
      next: () => {
        this.tasks$ = this.getTasks();
        this.tasksForm.reset();
      }
    });
  }

  onUpdate() {
    if (this.editingTaskId) {
      const updateTaskRequest = {
        name: this.tasksForm.value.name,
        description: this.tasksForm.value.description
      };

      this.http.put(`https://localhost:7217/api/Tasks/${this.editingTaskId}`, updateTaskRequest).subscribe({
        next: () => {
          this.tasks$ = this.getTasks();
          this.tasksForm.reset();
          this.isEditMode = false;
          this.editingTaskId = null;
        }
      });
    }
  }

  onDelete(id: string) {
    this.http.delete(`https://localhost:7217/api/Tasks/${id}`).subscribe({
      next: () => {
        alert("Item Deleted!");
        this.tasks$ = this.getTasks();
      }
    });
  }

  onEdit(task: Tasks) {
    this.tasksForm.setValue({
      name: task.name,
      description: task.description
    });
    this.isEditMode = true;
    this.editingTaskId = task.id;
  }

  private getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>('https://localhost:7217/api/Tasks');
  }
}
