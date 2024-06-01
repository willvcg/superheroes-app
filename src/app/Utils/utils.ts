import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

export const debouncedSignal = <T>(
  input: Signal<T>,
  timeOutMs = 350
): Signal<T> =>
  toSignal(toObservable(input).pipe(debounceTime(timeOutMs)), {
    initialValue: input(),
  });

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
