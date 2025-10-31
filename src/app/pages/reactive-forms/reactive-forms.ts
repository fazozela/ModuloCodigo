import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule, TitleCasePipe, JsonPipe],
  templateUrl: './reactive-forms.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveForms implements OnInit {
  public name = signal("felix zelaya");

  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(5)]],
    cuantity: [0, [Validators.required, Validators.min(3)]],
    existance: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    console.log(this.name());
  }
}
