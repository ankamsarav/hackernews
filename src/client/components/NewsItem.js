/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledNewsWrapper, StyledCountWrapper, VotingIcon } from './styled';
import extractHostname from '../utils';
import TimeAgo from './TimeAgo';

function NewsItem({ news, index }) {
  const { title, num_comments, points, url, author, created_at_i, objectID } = news;
  const [showVote, setVote] = useState(true);
  const [point, setPoint] = useState(0);
  const [visible, setVisible] = useState(true);
  const [newsHiddenStatus, setNewsHiddenStatus] = useState(false);

  const votingHandler = () => {
    let updatedNewsVote;
    if (sessionStorage.voted) {
      updatedNewsVote = JSON.parse(sessionStorage.voted);
      updatedNewsVote[objectID] = points + 1;
      sessionStorage.setItem('voted', JSON.stringify(updatedNewsVote));
    } else {
      updatedNewsVote = {
        [news.objectID]: points + 1
      };
      sessionStorage.setItem('voted', JSON.stringify(updatedNewsVote));
    }
    setPoint(point + 1);
    setVote(false);
  };

  const hideHandler = () => {
    let updatedHiddenNews;
    if (sessionStorage.hiddenNews) {
      updatedHiddenNews = JSON.parse(sessionStorage.hiddenNews);
      updatedHiddenNews[objectID] = 'hidden';
      sessionStorage.setItem('hiddenNews', JSON.stringify(updatedHiddenNews));
    } else {
      updatedHiddenNews = {
        [news.objectID]: 'hidden'
      };
      sessionStorage.setItem('hiddenNews', JSON.stringify(updatedHiddenNews));
    }
    setVisible(false);
  };

  const isNewsHidden = () => {
    if (sessionStorage.hiddenNews && JSON.parse(sessionStorage.hiddenNews)[objectID]) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setVote(showVote);
    setNewsHiddenStatus(isNewsHidden());
  }, [showVote]);

  return visible && !newsHiddenStatus ? (
    <div className="col l12 item">
      <StyledCountWrapper>
        <span className="comments">{num_comments}</span>
        <div className="points">
          {points + point}
          <span className="arrowWrapper">{showVote && <VotingIcon onClick={votingHandler} />}</span>
        </div>
      </StyledCountWrapper>
      <StyledNewsWrapper>
        <span style={{ fontSize: '14px' }}>{title}</span>
        <span className="greySmallTxt">
          <a href={url} rel="noopener noreferrer" target="_blank">{` (${extractHostname(url)})`}</a>
          {` by `}
        </span>
        <span className="blackSmallText">{author}</span>
        <span className="greySmallTxt">
          <TimeAgo time={created_at_i} />
        </span>
        <span className="hideLink" onClick={hideHandler}>
          [Hide]
        </span>
      </StyledNewsWrapper>
    </div>
  ) : (
    <></>
  );
}

NewsItem.propTypes = {
  news: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired
};

export default NewsItem;
