
let context_unsubs

const 

  unsubscriber = () => new Set(),

  collect = (unsubs, fn) => {
    const stack = context_unsubs
    context_unsubs = unsubs
    try {
      return fn()
    } finally {
      context_unsubs = stack
    }
  },

  attach = (unsubs, fn) => (
    (fn || (fn = unsubs, unsubs = context_unsubs)),
    unsubs && unsubs.add(fn),
    () => unsubs.delete(fn)
  ),

  run = (unsubs) => (
    unsubs.forEach(fn => fn()),
    unsubs.clear()
  ),

  scope = () => context_unsubs


module.exports = {
  unsubscriber,
  collect,
  scope,
  attach,
  run
}