
let context_unsubs;

const unsubscriber = () => [];

const collect = (unsubs, fn) => {
  const stack = context_unsubs;
  context_unsubs = unsubs;
  let v;
  try { v = fn() }
  finally { 
    context_unsubs = stack;
    return v;
  }
}

const attach_to = (unsubs, fn) => (
  unsubs.push(fn),
  () => {
    const len = unsubs.length;
    for (let i = 0; i < len; i++) {
      if (unsubs[i] === fn) {
        unsubs.splice(i, 1);
        i -= 1;
      }
    }
  }
)

const attach = (a, b) => (
  typeof b === "undefined"
    ? (context_unsubs && attach_to(context_unsubs, a))
    : attach_to(a, b)
)

const run = (unsubs) => (unsubs.forEach(fn => fn()), unsubs.length = 0);

const scope = () => context_unsubs;

module.exports = {
  unsubscriber,
  collect,
  scope,
  attach,
  run
}