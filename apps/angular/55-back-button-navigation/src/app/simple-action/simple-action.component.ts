import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AbstractActionComponent } from '../abstract-action/abstract-action.class';
@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent extends AbstractActionComponent {}
