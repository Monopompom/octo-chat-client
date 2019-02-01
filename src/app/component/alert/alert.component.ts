import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../service/alert/alert.service";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    alert: any;
    dismissible = true;
    private subscription: Subscription;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(alert => {
            this.alert = alert;
        });
    }

    onClosed(dismissedAlert: any): void {
        this.alert = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
