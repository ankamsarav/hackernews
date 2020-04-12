import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';

const App = ({ route }) => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
    </div>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
