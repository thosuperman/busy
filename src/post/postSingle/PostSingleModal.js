import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PostSingleContent from './PostSingleContent';
import PostSingleComments from './PostSingleComments';
import { updateVotePowerBar } from '../../user/userActions';
import Icon from '../../widgets/Icon';
import './PostSingleModal.scss';

const NextButton = ({ content, onClick }) => (
  <div className="NextButton">
    {content &&
      <Link
        to={content.url}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <Icon name="chevron_right" />
      </Link>
    }
  </div>
);

const PrevButton = ({ content, onClick }) => (
  <div className="PrevButton">
    {content &&
      <Link
        to={content.url}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <Icon name="chevron_left" />
      </Link>
    }
  </div>
);

@connect(({ user }) => ({ user }), { updateVotePowerBar })
export default class PostSingleModal extends Component {

  componentDidMount() {
    // manipulate address bar to show the article's address
    // eslint-disable-next-line
    if (window && window.history) {
      const { content } = this.props;
      this.pushUrlState(content);
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleClose = () => {
    // fix the manipulated URL
    /* eslint-disable */
    if (window && window.history) {
      window.onpopstate = null;
    }
    /* eslint-enable */
  };

  pushUrlState = (content) => {
    window.history.pushState({}, content.title, content.url);
  };

  replaceUrlState = (content) => {
    window.history.replaceState({}, content.title, content.url);
  };

  jumpToNextStory = () => {
    this.props.openPostModal(this.props.nextStory.id);
    this.replaceUrlState(this.props.nextStory);
  };

  jumpToPrevStory = () => {
    this.props.openPostModal(this.props.prevStory.id);
    this.replaceUrlState(this.props.prevStory);
  };

  render() {
    return (
      <div>
        <div className="PostSingleModal__header">
          <PrevButton
            content={this.props.prevStory}
            onClick={this.jumpToPrevStory}
          />
          <NextButton
            content={this.props.nextStory}
            onClick={this.jumpToNextStory}
          />
        </div>

        <PostSingleContent {...this.props} />

        <PostSingleComments
          content={this.props.content}
          openCommentingDraft={this.props.openCommentingDraft}
        />
      </div>
    );
  }
}
