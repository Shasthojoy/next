import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

import graphqlController, { rawSchemaController } from './graphql'

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/healthcheck', (ctx) => { ctx.body = '👻' })
  router.get('/graphql', rawSchemaController())
  router.post('/graphql', async (ctx, next) => {
    console.log('validating query')
    console.log(ctx.request.body.query)
    return next()
  }, graphqlController())

  router.get('/a', async ctx => {
    await app.render(ctx.req, ctx.res, '/b', ctx.query)
    ctx.respond = false
  })

  router.get('/b', async ctx => {
    await app.render(ctx.req, ctx.res, '/a', ctx.query)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
