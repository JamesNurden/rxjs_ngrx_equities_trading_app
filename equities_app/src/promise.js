import { from } from 'rxjs';

const promise = fetch('https://api.example.com/data');
const observable = from(promise);

observable.subscribe({
    next(response) { console.log(response); },
    error(err) { console.log('Error: ', err); },
    complete() { console.log('Request complete'); }
});
