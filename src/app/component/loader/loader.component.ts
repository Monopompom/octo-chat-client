import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService} from "../../service/loader/loader.service";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
    isVisible = false;
    type = "logo";

    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription = this.loaderService.getVisibility().subscribe(
            loader => {

                if (!loader) {
                    return;
                }

                if (loader.type) {
                    this.type = loader.type;
                }

                if (loader.isVisible) {
                    this.isVisible = true;
                } else {
                    setTimeout(() => this.isVisible = false, 400);
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}