import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import './styles.css';

const getFileComponent = config => class File extends Component {
  static propTypes: Object = {
    block: PropTypes.object,
    contentState: PropTypes.object,
  };

  state: Object = {
    hovered: false,
  };

  setEntityAlignmentLeft: Function = (): void => {
    this.setEntityAlignment('left');
  };

  setEntityAlignmentRight: Function = (): void => {
    this.setEntityAlignment('right');
  };

  setEntityAlignmentCenter: Function = (): void => {
    this.setEntityAlignment('none');
  };

  setEntityAlignment: Function = (alignment): void => {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    contentState.mergeEntityData(
      entityKey,
      { alignment },
    );
    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
    this.setState({
      dummy: true,
    });
  };

  toggleHovered: Function = (): void => {
    const hovered = !this.state.hovered;
    this.setState({
      hovered,
    });
  };

  renderAlignmentOptions(alignment): Object {
    return (
      <div
        className={classNames(
          'rdw-file-alignment-options-popup',
          {
            'rdw-file-alignment-options-popup-right': alignment === 'right',
          },
        )}
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="rdw-file-alignment-option"
        >
          L
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="rdw-file-alignment-option"
        >
          C
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="rdw-file-alignment-option"
        >
          R
        </Option>
      </div>
    );
  }

  render(): Object {
    const { block, contentState } = this.props;
    const { hovered } = this.state;
    const { isReadOnly, isImageAlignmentEnabled } = config;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src, alignment, height, width, alt } = entity.getData();

    return (
      <span
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        className={classNames(
          'rdw-file-alignment',
          {
            'rdw-file-left': alignment === 'left',
            'rdw-file-right': alignment === 'right',
            'rdw-file-center': !alignment || alignment === 'none',
          },
        )}
      >
        <span className="rdw-file-filewrapper">
          <img
            src={src}
            alt={alt}
            style={{
              height,
              width,
            }}
          />
          {
            !isReadOnly() && hovered && isImageAlignmentEnabled() ?
              this.renderAlignmentOptions(alignment)
              :
              undefined
          }
        </span>
      </span>
    );
  }
};

export default getFileComponent;