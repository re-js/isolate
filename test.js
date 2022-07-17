const { unsubscriber, collect, attach, run, scope } = require("./unsubscriber");

let steps = '';

(() => {

  const unsubs = unsubscriber();

  let b_detach;
  let scope_handler;

  // Run code and collect "un" calls.
  const app = collect(unsubs, () => {
    attach(() => steps += 'A');
    b_detach = attach(() => steps += 'B');
    attach(() => steps += 'C');
    scope_handler = scope();
    return 'APP'
  });
  console.assert(app === 'APP');

  attach(unsubs, () => steps += 'D');
  const detach = attach(unsubs, () => steps += 'E');
  attach(unsubs, () => steps += 'F');
  
  attach(scope_handler, () => steps += 'G');

  detach();
  b_detach();

  console.assert(steps === '');
  run(unsubs);
  console.assert(steps === 'ACDFG');
  console.assert(unsubs.length === 0);

})()
