import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User { }
