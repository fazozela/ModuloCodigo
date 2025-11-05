import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './user-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserList {
  private userService = inject(UserService);
  private router = inject(Router);

  public users$: Observable<User[]> = this.userService.getUsers();
  public isDeleting = signal<number | null>(null);

  onAddUser(): void{
    this.router.navigate(['/users/create-user']);
  }

  onEditUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  onDeleteUser(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.isDeleting.set(id);

      this.userService.deleteUser(id).subscribe({
        next: () => {
          // Reload users list
          this.users$ = this.userService.getUsers();
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

}
