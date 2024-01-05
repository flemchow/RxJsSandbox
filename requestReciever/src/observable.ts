import { Observable, bufferTime, filter, from, fromEvent, map, switchMap, timer } from 'rxjs';

export class TheObservable {
  #pokemonNames: string[] = [];
  #timer: number = 2000;

  addData(pokemonName: string) {
    this.#pokemonNames.push(pokemonName);

    const result: Observable<string> = from(this.#pokemonNames)
      .pipe(switchMap(() => timer(this.#timer)))
      .pipe(switchMap(() => this.#pokemonNames))

    result.subscribe({ 
      complete: () => {
        if (this.#pokemonNames.length !== 0) {
          console.log(this.#pokemonNames)
          this.#pokemonNames = []
        }
      }
    })
  }
}

export class IncomingPokemonNameEventObservable {
  #eventType: string = 'incoming-pokemon';
  #dispatcher: EventTarget;

  constructor(dispatcher: EventTarget) {
    this.#dispatcher = dispatcher;
  }

  init() {
    return fromEvent(this.#dispatcher, this.#eventType)
    .pipe(
      map(x => {
        const customEvent = x as CustomEvent<IncomingPokemonNameBody>;

        return {
          name: customEvent.detail.pokemonName,
        }
      }),
      bufferTime(5000, null, 200),
      filter((arr: { name: string }[]) => arr.length !== 0)
    ).pipe(
      map(
        x => {
          return x
        }
      )
    )
  }
}

interface IncomingPokemonNameBody {
  pokemonName: string;
} 
