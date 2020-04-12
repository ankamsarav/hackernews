/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import fetchTopNews from '../actions';
import extractHostname from '../utils';
import { GreySmallTxt, SmallBox, PointsBox, Logo, UpArrowIcon } from './styled';
import TimeAgo from '../components/TimeAgo';

const HomePage = props => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const renderNews = () => {
    return (
      props.news &&
      props.news.map((news, index) => (
        <div
          className="col l12"
          style={{
            background: index % 2 === 0 ? 'e6e6df' : '#f6f6ef',
            padding: '5px 0 5px 5px',
            display: 'flex'
          }}
          key={news.title}
        >
          <div style={{ width: '85px', display: 'flex', paddingTop: '4px' }}>
            <SmallBox>{news.num_comments}</SmallBox>
            <PointsBox>
              {news.points}
              <UpArrowIcon />
            </PointsBox>
          </div>
          <div style={{ display: 'inline-block' }}>
            <span style={{ fontSize: '14px' }}>{news.title}</span>
            <GreySmallTxt>
              <a href={news.url} target="_blank">{` (${extractHostname(news.url)})`}</a>
            </GreySmallTxt>
            <GreySmallTxt> by </GreySmallTxt>
            <span style={{ fontSize: '11px', paddingRight: '5px' }}>{news.author}</span>
            <GreySmallTxt>
              <TimeAgo time={news.created_at_i} />
            </GreySmallTxt>
            <span style={{ fontSize: '11px' }}> [Hide]</span>
          </div>
        </div>
      ))
    );
  };

  const handlerMore = e => {
    e.preventDefault();
    dispatch(fetchTopNews(page + 1));
    setPage(page + 1);
  };

  return (
    <div>
      <header style={{ background: '#ff6601', padding: '7px', fontSize: '12px' }}>
        <Logo>Y</Logo>
        <span>Top | New</span>
      </header>
      <div className="row">
        <div>
          <div>{renderNews()}</div>
        </div>
      </div>
      <footer>
        <span
          style={{ color: '#ff6601', marginLeft: '90px', cursor: 'pointer' }}
          role="link"
          onClick={handlerMore}
        >
          More
        </span>
      </footer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    news: state.news
  };
};

const loadData = store => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchTopNews()); // Manually dispatch a network request
};

HomePage.propTypes = {
  news: PropTypes.arrayOf(PropTypes.any)
};

HomePage.defaultProps = {
  news: []
};

export default {
  component: connect(mapStateToProps, { fetchTopNews })(HomePage),
  loadData
};
