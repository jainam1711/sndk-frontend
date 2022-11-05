import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd Party Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';

@NgModule({
    exports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlMessagesComponent,
    ],
    imports: [
        NgbModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ControlMessagesComponent,
    ]
})
export class SharedModule { }
