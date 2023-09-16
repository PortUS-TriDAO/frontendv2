import { RestHandler } from 'msw'
import projectHandlers from './project'

let handlers: RestHandler[] = []
for (const handler of [projectHandlers]) {
  handlers = handlers.concat(handler)
}

export default handlers
