import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserCreate {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  public userForm: FormGroup;
  public roles = Object.values(Role);
  public isSubmitting = false;

  constructor() {
    this.userForm = this.fb.group({
      id: [0],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: [Role.USER, [Validators.required]]
    })
  }

  onSubmit(): void {
    if(this.userForm.valid){
      this.isSubmitting = true;

      this.userService
        .createUser(this.userForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.log('Error al crear usuario', err);
            this.isSubmitting = false;
          }
        })
    }
  }

  onCancel(): void{
    this.router.navigate(['/users']);
  }

  getErrorMessage(fieldname: string): string{
    const control = this.userForm.get(fieldname);

    if(control?.hasError('required')){
      return `${fieldname} es requerido`
    }

    if (control?.hasError('minLength')){
      const minLength = control.errors?.['minLength'].requiredLength;
      return `${fieldname} debe tener al menor ${minLength} caracteres`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean{
    const control = this.userForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}
