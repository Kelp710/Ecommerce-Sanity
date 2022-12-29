// const { https,  logger } = require('firebase-functions');
// const { default: next } = require('next');
// import * as admin from "firebase-admin";

// admin.initializeApp();

// const isDev = process.env.NODE_ENV !== 'production';

// const server = next({
//   dev: isDev,
//   //location of .next generated after running -> yarn build
//   conf: { distDir: '.next' },
// });

// const nextjsHandle = server.getRequestHandler();

// // exports.nextServer = https.onRequest(async(req, res)=>{
// //     logger.info(req.path, req.query)
// //     return await server.prepare().nextjsHandle(req, res)
// // }
// // )
// exports.nextServer = https.onRequest(async (req, res) => {
//   console.log("File: " + req.originalUrl);
//   await server.prepare();
//   logger.info(req.path, req.query);
//   return await nextjsHandle(req, res);
// })
const { https } = require('firebase-functions');
const { default: next } = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
  console.log(req)
  console.log('File: ' + req.originalUrl);
  return app.prepare().then(() => handle(req, res));
});