import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../service/alert/alert.service";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    alert: any;
    dismissible = true;
    private subscription: Subscription;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(
            alert => {

                if (!alert) {
                    return;
                }

                this.alert = alert;

                if (this.alert.options && this.alert.options.dismissible !== undefined) {
                    this.dismissible = this.alert.options.dismissible;
                }
            }
        );
    }

    onClosed(dismissedAlert: any): void {
        this.alert = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
