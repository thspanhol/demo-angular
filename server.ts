import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { createProxyMiddleware } from 'http-proxy-middleware'
import { environment } from './src/environments/environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);


//--------------------------------------------------

  const proxyApi: string = '/api';  // O caminho de proxy deve começar com '/api'

  server.use(proxyApi, createProxyMiddleware({
    target: 'http://localhost:8080',
    secure: false,  // desabilita SSL
    //logLevel: 'debug',  // Nível de log para depuração
    changeOrigin: true,  // Altera a origem do host
    // pathRewrite: {
    //   [`^${proxyApi}`]: '',  // Reescreve o caminho removendo a parte '/api'
    // },
    pathRewrite: (path, req) => {
      console.log('Original URL:', req.url); // Logando a URL original
      return path.replace(proxyApi, ''); // Mantendo a reescrita do caminho
    },
  }));
  
//--------------------------------------------------



  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
