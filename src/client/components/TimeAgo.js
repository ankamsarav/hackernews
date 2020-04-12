import React from 'react';
import timeago from 'epoch-timeago';
import PropTypes from 'prop-types';

const TimeAgo = ({ time }) => (
  <time dateTime={new Date(time * 1000).toISOString()}>{timeago(time * 1000)}</time>
);

export default TimeAgo;

TimeAgo.propTypes = {
  time: PropTypes.number.isRequired
};
