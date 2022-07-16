const { collect, attach, run } = require("./unsubscriber");

let steps = '';

(() => {

  const unsubs = [];

  let b_detach;

  // Run code and collect "un" calls.
  const app = collect(unsubs, () => {
    attach(() => steps += 'A');
    b_detach = attach(() => steps += 'B');
    attach(() => steps += 'C');
    return 'APP'
  });
  console.assert(app === 'APP');

  attach(unsubs, () => steps += 'D');
  const detach = attach(unsubs, () => steps += 'E');
  attach(unsubs, () => steps += 'F');
  
  detach();
  b_detach();

  console.assert(steps === '');
  run(unsubs);
  console.assert(steps === 'ACDF');
  console.assert(unsubs.length === 0);

})()
