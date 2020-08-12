import { Injectable } from "@angular/core";
import { forkJoin, of, from, concat, interval, range, Observable, Subject, BehaviorSubject, combineLatest, fromEvent, throwError } from "rxjs";
import { delay, tap, switchMap, take, pairwise, map, mergeMap, takeUntil, retry } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class Rx {
  func_forkJoin(destroyed){
    forkJoin(
      of(55).pipe(delay(1500),tap(vl => console.log(vl))),
      of(22).pipe(delay(1000),tap(vl => console.log(vl))),
      of(33).pipe(tap(vl => console.log(vl)))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('forkJoin', vl));
    // [33, 22, 55]
  }

  func_switchMap(destroyed){
    of(1, 2, 4)
      .pipe(switchMap(vl => of(vl).pipe(delay(20000 / vl))))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('switchMap - ', vl));
      //Результат: 4
  }

  func_mergeMap(destroyed){
    of(100, 200, 400)
      .pipe( mergeMap(vl => of(vl)
        .pipe(delay(1000 / vl)))
      )
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('mergeMap - ', vl));
  }

  func_concat(destroyed){
    concat(
      of('a', 'b', 'c'),
      interval(500).pipe(take(3)),
      from(['d', 3, 'e', 4])
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('concat - ', vl));
    //Результат: 'a', 'b', 'c', 0, 1, 2, 'd', 3, 'e', 4
  }

  func_pairwise(destroyed){
    interval(1000)
    .pipe(pairwise(), take(5))
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('pairwise - ', vl));
    //[0,1], [1,2], [2,3], [3,4], [4,5]
  }

  func_map(destroyed){
    from([7, 21, 10])
    .pipe(map(num => num <= 10 ? 1 : 0))
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('map - ', vl)); 
    //Результат: 1, 0, 1
  }

  func_take(destroyed){
    range(0, 100)
    .pipe( take(10) )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('take - ', vl)); 
    // от 0 до 9
  }

  func_tap(destroyed){
    from(['a', 'b', 'c'])
      .pipe(tap( vl => console.log('tap - ', vl) ))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log(vl));
      //'tap - a', 'a', 'tap - b', 'b', 'tap - c', 'c'
  }

  func_delay(destroyed){
    forkJoin(
      of(55).pipe(delay(1500),tap(vl => console.log(vl))),
      of(22).pipe(delay(1000),tap(vl => console.log(vl))),
      of(33).pipe(tap(vl => console.log(vl)))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('forkJoin', vl));
  }

  func_Observable(destroyed){
    const obs = new Observable((sub) => {
      sub.next(1)
      sub.next(21)
      setTimeout(() => { sub.error(3) }, 500)
    })

    obs
    .pipe(takeUntil(destroyed))
    .subscribe(
      (vl) => console.log('Observable', vl),
      (err) => console.log('Observable Error: ', err),
      () => console.log('Completed') // НЕ ВСЕГДА ОТРАБАТЫВАЕТ!!!!
    )
    /* Результат  в консоли: Observable 1 Observable 21 Observable Error: 3 */
  }

  func_Subject(destroyed){
    const sbj = new Subject()
    sbj.pipe(takeUntil(destroyed)).subscribe((vl) => console.log(`Subject - 1st: ${vl}`))
    sbj.next(3)
    sbj.pipe(takeUntil(destroyed)).subscribe((vl) => console.log(`Subject - 2nd: ${vl}`))
    sbj.next(9)
    /* Результат  в консоли: 1st: 3; 1st: 9; 2nd: 9; */
  }
  
  func_BehaviorSubject(destroyed){
    const Bsbj = new BehaviorSubject(5)
    Bsbj.pipe(takeUntil(destroyed)).subscribe((vl) => console.log(`BehaviorSubject - 1st: ${vl}`))
    Bsbj.pipe(takeUntil(destroyed)).subscribe((vl) => console.log(`BehaviorSubject - 2nd: ${vl}`))
    Bsbj.next(7)
    /* Результат  в консоли: 1st: 5; 2nd: 5; 1st: 7; 2nd: 7; */
  }

  func_combineLatest(destroyed){
    combineLatest(
      of(3, 6, 9),
      interval(500).pipe(take(3))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('combineLatest - ', vl));
    //Результат: [9, 0], [9, 1], [9, 2]
  }

  func_throwError(destroyed){
    interval(1000).pipe(
      mergeMap(x => x === 2
        ? throwError('Twos are bad')
        : of('a', 'b', 'c')
      ),
    )
    .pipe(takeUntil(destroyed))
    .subscribe(x => console.log(x), e => console.error(e));
    //Результат: a,b,c, a,b,c, Twos are bad
  }

  func_retry(destroyed){
    interval(1000)
    .pipe(
      mergeMap(val => {
        if(val > 3){ return throwError('Error!');}
        return of(val);
      }),
      retry(2) //retry 2 times on error
    )
    .subscribe(x => console.log(x), e => console.error(`${e}: Retried 2 times then quit!`));
    //Результат: 0,1,2,3, 0,1,2,3, 0,1,2,3, Error!: Retried 2 times then quit!
  }

  func_fromEvent(destroyed){
    fromEvent(document, 'mousemove')
      .pipe(takeUntil(destroyed))
      .subscribe((ev) => { console.log('Mouse event: ', ev) })
  }

  func_Promiseall(){
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/2')
    ]).then(
      async([fetch1, fetch2]) => {
        const a = await fetch1.json();
        const b = await fetch2.json();
        return [a, b]
      }
    )
    .then((responseText) => { console.log(responseText);})
    .catch((err) => { console.log(err); });
  }

  func_promise(){
    let promise = new Promise((resolve, reject) => { setTimeout(() => resolve(1), 1000);  });

    promise
      .then((result) => {  console.log(result); return result * 2; })
      .then((result) => {  console.log(result); return result * 2; })
      .then((result) => {  console.log(result); return result * 2; })
      .catch(err => console.log('catch = ', err))
      .finally(() => console.log("Промис завершён"))
  }

  func_resolve() {
    let promise = new Promise(resolve => resolve("готово!"));
    promise.then(console.log); 
  }

  func_race() {
    Promise.race([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/2')
    ])
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((err) => { console.log(err); });
  }

  func_async(){
    async function showAvatar() {
      let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      let user = await response.json();

      let githubResponse = await fetch(`https://api.github.com/users/${user.username}`);
      let githubUser = await githubResponse.json();
    
      // ждём 3 секунды
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));

      return githubUser;
    }

    showAvatar()
      .then(res => console.log('res', res))
  }
}

