import Fastify from "fastify";
import cors from '@fastify/cors';
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
//import {fastifyVerifyTokenPlugin } from "./plugins/verifyCongig.js";
import PotluckRoutes from "./routes/routes.js";
import config from "./db/mikro-orm.config.js";
import multipart from '@fastify/multipart';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: "debug",
  },
  production: {
    level: "error"
  },
  test: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: "warn"
  },
};

const app = Fastify({
  logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
  origin: (origin, cb) => {
    cb(null, true);
  }
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);
await app.register(multipart);
await app.register(PotluckRoutes, {});



export default app;
