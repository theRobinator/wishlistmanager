import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'item-textarea',
  template: `
  	<mat-form-field style="width: 100%">
		<textarea
			maxlength="1024"
			matInput
			placeholder="{{placeholder}}"
			cdkTextareaAutosize
		    #autosize="cdkTextareaAutosize"
		    cdkAutosizeMinRows="1"
		    cdkAutosizeMaxRows="3"
		    [(ngModel)]="text"
		    (ngModelChange)="this.textChange.emit($event)"
		></textarea>
	</mat-form-field>
  `
})
export class ItemTextareaComponent {
	@Input() placeholder: string;
	@Input() text: string;
	@Output() textChange = new EventEmitter<string>();
}
