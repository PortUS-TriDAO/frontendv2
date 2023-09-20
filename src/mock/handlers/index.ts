import { RestHandler } from 'msw';

import mineHandlers from './mine';
import projectHandlers from './project';

let handlers: RestHandler[] = [];
for (const handler of [projectHandlers, mineHandlers]) {
  handlers = handlers.concat(handler);
}

export default handlers;
