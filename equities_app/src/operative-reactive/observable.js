import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    setTimeout(() => {
        subscriber.next('RxJS');
        subscriber.complete();
    }, 1000);
});

observable.subscribe({
    next(x) { console.log(x); },
    complete() { console.log('Completed'); }
});
