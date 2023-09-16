import { rest, RestHandler } from 'msw'

const handlers: RestHandler[] = [
  rest.get('/project/all', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: 'success'
      })
    )
  })
]

export default handlers
