# unsubs
How to easy collect unsubscribe functions for several sources

```javascript
import { isolate, un } from "unsubs";

const unsubs = isolate();

// Run code and collect "un" calls.
const app = usubs.collect(() => {
  un(() => {});
  return new App();
});

usubs.add(() => {});
// or
usubs.attach(() => {});

// and run

usubs.call();
usubs(); // magic )))

usubs.apply();
usubs.run();
```
