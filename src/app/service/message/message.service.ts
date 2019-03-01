import {ComponentFactoryResolver, Inject, Injectable, ViewContainerRef} from '@angular/core';
import {MessageComponent} from "../../component/message/message.component";
import {Message} from "../../model/message";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    rootViewContainer: ViewContainerRef;

    constructor(
        private factoryResolver: ComponentFactoryResolver
    ) {
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
    }

    addMessage(message: Message) {
        const factory = this.factoryResolver
            .resolveComponentFactory(MessageComponent);
        const component = factory
            .create(this.rootViewContainer.injector);

        component.instance.message = message;

        this.rootViewContainer.insert(component.hostView);
    }
}
