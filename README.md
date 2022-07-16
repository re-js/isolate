# unsubscriber
How to easy collect unsubscribe functions for several sources

```javascript
import { isolate, un, scope } from "unsubscriber";

const unsubs = isolate();

// Run code and collect "un" calls.
const app = usubs.collect(() => {
  un(() => {});
  return new App();
});

const detach = usubs.attach(() => {});

usubs.run();
```

Context dependent functions who available into the function body:

```javascript
const app = usubs.collect(() => {

  const detach = scope().attach(unsubscriber);

});
```
