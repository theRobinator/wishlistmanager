import {Component, Output, EventEmitter} from '@angular/core';
import {ApiService} from './api/api.service';


const template = `
    <div class="santa-close-button" (click)="onClose.emit()">X</div>
    <div *ngIf="loading; else content">Loading...</div>
    <ng-template #content>
        <div class="secret-santa-content" *ngIf="theme && person">
            <p>This year's theme is <strong>{{theme}}</strong>!</p>
            <p>You are the secret santa for <strong>{{person}}</strong>!</p>
        </div>
        <div class="error-message" *ngIf="errorMessage">
            {{errorMessage}}
        </div>
    </ng-template>
`;

@Component({
    selector: 'secret-santa-panel',
    template,
})
export class SecretSantaPanelComponent {
    @Output() public onClose = new EventEmitter<void>();
    public loading: boolean = true;
    public person: string;
    public theme: string;
    public errorMessage: string;

    constructor(
        private apiService: ApiService,
    ) {}

    public ngOnInit(): void {
        this.apiService.fetchSecretSanta().then(({theme, person}) => {
            this.theme = theme;
            this.person = person;

        }, (err) => {
            if (typeof err === 'string') {
                this.errorMessage = err;
            } else {
                this.errorMessage = 'Failed to load secret santa info. Check the console for more details.';
                console.error(err);
            }
        })
        this.loading = false;
    }
}
