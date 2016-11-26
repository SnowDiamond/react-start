import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) { // Если необходимо сделать redirect
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) { // Произошла ошибка любого рода
      return res.status(500).send(error.message);
    }

    if (!renderProps) { // мы не определили путь, который бы подошел для URL
      return res.status(404).send('Not found');
    }

    let styles = "<link rel='stylesheet' href='styles.css'>";
    let html = renderToString(
      <Provider store={configureStore()}>
        <RouterContext {...renderProps} />
      </Provider>);

    if (process.env.NODE_ENV === 'development') {
      html = styles = '';
    }

    return res.end(renderHTML(html, styles));
  });
};

function renderHTML(html, styles) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="">
          <meta name="keywords" content="">
          <meta name="author" content="">
          <title>Great App</title>
          ${styles}
      </head>
      <body>
        <div id='app'>${html}</div>
        <script type="application/javascript" src='bundle.js'></script>
      </body>
    </html>
  `;
}
