import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const input = document.querySelector('input');
fromEvent(input, 'input').pipe(
    debounceTime(500),
    map(event => event.target.value)
).subscribe(value => console.log(value));
