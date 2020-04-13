import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '../client/Routes';

export default (req, store, context, sheet) => {
  const content = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    )
  );
  const styles = sheet.getStyleTags();

  return `<!DOCTYPE html>
            <head>
                <link rel="icon" href="data:;base64,=">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                ${styles}
            </head>
            <body style='margin:0; font-family: arial'>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                <script src="/bundle.js"></script>                
            </body>
    </html>`;
};
