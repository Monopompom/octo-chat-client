import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService} from "../../service/loader/loader.service";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
    loader: any;
    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription = this.loaderService.getVisibility().subscribe(
            loader => {

                if (!loader) {
                    setTimeout(() => this.loader = false, 400);
                    return;
                }

                this.loader = loader;

                if (loader.type) {
                    this.loader.type = loader.type;
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}