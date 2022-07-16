# unsubscriber
How to easy collect unsubscribe functions for several sources

```javascript
import { collect, un, attach, run } from "unsubscriber";

const unsubs = [];

// Run code and collect "un" calls.
const app = collect(usubs, () => {
  attach(() => {});
  return new App();
});

const detach = attach(usubs, () => {});

run(usubs);
```

Context dependent functions who available into the function body:

```javascript
const app = collect(usubs, () => {

  const detach = attach(unsubscriber);

});
```

Enjoy your code!