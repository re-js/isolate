
let context_unsubs

const unsubscriber = () => new Set()

const collect = (unsubs, fn) => {
  const stack = context_unsubs
  context_unsubs = unsubs
  try {
    return fn()
  } finally {
    context_unsubs = stack
  }
}

const attach_to = (unsubs, fn) => (
  unsubs.add(fn),
  () => unsubs.delete(fn)
)

const attach = (a, b) => (
  b
    ? attach_to(a, b)
    : context_unsubs && attach_to(context_unsubs, a)
)

const run = (unsubs) => (
  unsubs.forEach(fn => fn()),
  unsubs.clear()
)

const scope = () => context_unsubs

module.exports = {
  unsubscriber,
  collect,
  scope,
  attach,
  run
}