import { Pipe, PipeTransform } from '@angular/core';
import { catchError, isObservable, map, of, startWith } from 'rxjs';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {

  transform(val: any) {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({
          loading: value.type === 'start',
          value: value.type ? value.value : value
        })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }

}
