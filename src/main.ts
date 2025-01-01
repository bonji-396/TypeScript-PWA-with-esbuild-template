import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// RxJS サンプル
of('Hello, PWA with RxJS!')
  .pipe(
    map((text: string) => text.toUpperCase()),
    filter((text: string) => text.includes('PWA'))
  )
  .subscribe(console.log);
