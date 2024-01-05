import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { forkJoin, map } from 'rxjs';
import ConcreteAxios from './axios';
import { IncomingPokemonNameEventObservable, TheObservable } from './observable';

const dispatcher = new EventTarget();
new IncomingPokemonNameEventObservable(dispatcher).init().subscribe((x) => {
  console.log(x)
});

(async () => {
  const observable = new TheObservable();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Welcome to RequestReciever')
  });

  app.get('/healthcheck', (req, res) => {
    res.status(200).send('healthy');
  });

  app.post('/gottacatchthemallevents', (req, res) => {
    const { body: { data: { pokemonName } } } = req.body as { body: { data: { pokemonName: string } } };

    dispatcher.dispatchEvent(
      new CustomEvent(
        'incoming-pokemon',
        {
          detail: { pokemonName: pokemonName },
        },
      ),
    );
  })

  app.post('/bulkgottacatchthemall', (req, res) => {
    const { body } = req.body as { body: { data: { pokemonName: string } } };
    const pokemonName = body.data.pokemonName;

    observable.addData(pokemonName)
  })

  app.post('/gottacatchthemall', (req, res) => {
    const { body } = req.body as { body: { data: { pokemonName: string } } };
    const pokemonName = body.data.pokemonName;

    const observable = forkJoin({ 
      pokemon: new ConcreteAxios(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`).get(),
    }).pipe(map(pokemon => {
        const types = pokemon.pokemon.data.types.map((type: any) => type.type.name)

        return {
          pokemon: `${pokemonName}`,
          types: types
        }
      }))

      observable.subscribe({
      next: value => console.log(JSON.stringify(value)),
      complete: () => {},
    })
  });

  app.listen(8000, () => {
    console.log('RequestReciever server started on port 8000');
  })
})().catch(error => console.log(error));
