
let context_unsubs;

const un = (unsub) => (
  context_unsubs && context_unsubs.push(unsub), 
  unsub
)

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

const attach_to_scope = (fn) => (
  context_unsubs && attach_to(context_unsubs, fn)
)

const attach = (a, b) => (
  typeof b === "undefined"
    ? attach_to_scope(a)
    : attach_to(a, b)
)

const run = (unsubs) => (unsubs.forEach(fn => fn()), unsubs.length = 0);

module.exports = {
  un,
  collect,
  attach,
  run
}