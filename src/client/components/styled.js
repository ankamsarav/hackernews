import styled from 'styled-components';

export const StyledNewsList = styled.div`
  .item {
    padding: 5px 0 5px 5px;
    display: flex;
    background: #f6f6ef;
  }
  .item:nth-child(even) {
    background: #e6e6df;
  }
`;

export const StyledNewsWrapper = styled.div`
  font-size: 11px;
  display: 'inline-block';
  .greySmallTxt {
    color: #828282;
    a {
      color: #828282;
    }
  }
  .blackSmallText {
    padding-right: 5px;
  }
  .hideLink {
    cursor: pointer;
    margin-left: 5px;
  }
`;

export const StyledCountWrapper = styled.div`
  width: 85px;
  display: flex;
  padding-top: 4px;
  .comments {
    width: 30px;
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
  }
  .points {
    width: 37px;
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
  }
  .arrowWrapper {
    width: 14px;
    display: inline-block;
  }
`;

export const Logo = styled.span`
  width: 15px;
  height: 15px;
  display: inline-block;
  border: 1px solid #fff;
  color: #fff;
  margin-right: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
`;

export const VotingIcon = styled.i`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 6px solid #9c9c9c;
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
`;
