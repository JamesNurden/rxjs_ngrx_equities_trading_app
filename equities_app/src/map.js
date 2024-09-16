import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(
    map(x => x * 2)
).subscribe(console.log); // Output: 2, 4, 6
