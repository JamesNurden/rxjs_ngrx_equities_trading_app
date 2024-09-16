import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
    filter(x => x % 2 === 0)
).subscribe(console.log); // Output: 2, 4
