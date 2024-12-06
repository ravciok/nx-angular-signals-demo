import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { WidgetComponent } from '../widget/component/widget.component';

@Component({
  imports: [NxWelcomeComponent, WidgetComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-angular-signals-demo';
}
