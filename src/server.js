import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import appRoutes from './routes';
import configureStore from './store/configureStore';

const routes = appRoutes();
const isDevelopment = process.env.NODE_ENV === 'development';

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

    const store = configureStore();
    const initialState = store.getState();

    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>);
    const styles = isDevelopment ? '' : "<link rel='stylesheet' href='styles.css'>";


    return res.end(renderHTML(html, styles, initialState));
  });
};

function renderHTML(html, styles, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          <meta name="description" content="TripGin is a social network for enthusiastic and devoted travellers. Find companions, organize new trips and share adventures. Show your photos, share the notes and find practical tips for travelling the world. Get to know new friends that love travelling the world as much as you do.">
          <meta name="keywords" content="Travellers, travell, trip, meet friedns, countries, voyage, around world, fellow travellers, adventure.">
          <meta name="author" content="Artur Babagulyyev">

          <title>TripGin</title>
          ${styles}

          <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Amaranth:700" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Lilita+One" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Droid+Sans:700" rel="stylesheet">
      </head>
      <body>
        <div id='app'>${html}</div>
        <script>
          window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)}
        </script>
        <script type="application/javascript" src='/bundle.js'></script>
      </body>
    </html>
  `;
}
