# Fetchar

`yarn add fetchar`
or
`npm install fetchar`

## class getters

- get
- post
- put
- patch
- delete
- head
- options

```ts
import Fetchar from 'fetchar';

const rest = new Fetchar({
  baseURL: 'http://localhost:3000'
});

rest.get.path.to.my.route({
  params: {
    abc: 'xyz'
  }
}).then(res => console.log(res.data));
```
