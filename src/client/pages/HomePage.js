/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import fetchTopNews from '../actions';
import { Logo, StyledNewsList } from '../components/styled';
import NewsItem from '../components/NewsItem';

const HomePage = props => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const renderNews = () => {
    return (
      props.news &&
      props.news.map((news, index) => <NewsItem news={news} index={index} key={news.objectID} />)
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
        <StyledNewsList>{renderNews()}</StyledNewsList>
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
