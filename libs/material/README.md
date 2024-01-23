# Material DataSource

This is a Reactive DataSource to feed the Material Table.

## Determinate Progress Indicator

```
rawFetch(args: REQ): Observable<RAW> {
  return merge<RAW>(
    timer(1000, 1000),
    this.database.fetch(args).pipe(delay(20000))
  ).pipe(
    tap(sec => {
      if (typeof sec === 'number') {
        this._progress = sec * 5;
        this._change$.next();
      }
    }),
    filter(v => typeof v !== 'number')
  );
}
```
