/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../components/Option';
import Spinner from '../../../components/Spinner';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    src: '',
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && (!!this.props.config.privateFileUploadCallback || !!this.props.config.publicFileUploadCallback),
    showLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
    alt: '',
  };

  componentWillReceiveProps(props: Object): void {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        src: '',
        dragEnter: false,
        uploadHighlighted: this.props.config.uploadEnabled && (!!this.props.config.privateFileUploadCallback || !!this.props.config.publicFileUploadCallback),
        showLoading: false,
        height: this.props.config.defaultSize.height,
        width: this.props.config.defaultSize.width,
        alt: '',
      });
    } else if (props.config.privateFileUploadCallback !== this.props.config.privateFileUploadCallback ||
      props.config.publicFileUploadCallback !== this.props.config.publicFileUploadCallback ||
      props.config.uploadEnabled !== this.props.config.uploadEnabled) {
      this.setState({
        uploadHighlighted: props.config.uploadEnabled && (!!props.config.privateFileUploadCallback || props.config.publicFileUploadCallback),
      });
    }
  }

  onDragEnter: Function = (event: Object): void => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  onFileDrop: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });

    // Check if property name is files or items
    // IE uses 'files' instead of 'items'
    let data;
    let dataIsItems;
    if (event.dataTransfer.items) {
      data = event.dataTransfer.items;
      dataIsItems = true;
    } else {
      data = event.dataTransfer.files;
      dataIsItems = false;
    }
    for (let i = 0; i < data.length; i += 1) {
      if ((!dataIsItems || data[i].kind === 'file') ) {
        // && data[i].type.match('^image/')
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadFile(file);
      }
    }
  };

  showFileUploadOption: Function = (): void => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addFileFromState: Function = (): void => {
    const { src, alt } = this.state;
    let { height, width } = this.state;
    const { onChange } = this.props;
    if (!isNaN(height)) {
      height += 'px';
    }
    if (!isNaN(width)) {
      width += 'px';
    }
    onChange(src, height, width, alt);
  };

  showFileURLOption: Function = (): void => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  toggleShowFileLoading: Function = (): void => {
    const showLoading = !this.state.showLoading;
    this.setState({
      showLoading,
    });
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  selectFile: Function = (event: Object): void => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadFile(event.target.files[0]);
    }
  };

  uploadFile: Function = (file: Object): void => {
    this.toggleShowFileLoading();
    const { privateFileUploadCallback, publicFileUploadCallback } = this.props.config;
    publicFileUploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showLoading: false,
          dragEnter: false,
          src: data.link,
        });
        this.fileUpload = false;
      }).catch(() => {
        this.setState({
          showLoading: false,
          dragEnter: false,
        });
      });
  };

  fileUploadClick = (event) => {
    this.fileUpload = true;
    event.stopPropagation();
  }

  stopPropagation: Function = (event: Object): void => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddFileModal(): Object {
    const {
      src,
      uploadHighlighted,
      showLoading,
      dragEnter,
      height,
      width,
      alt,
    } = this.state;
    const {
      config: {
        popupClassName,
        publicFileUploadCallback,
        privateFileUploadCallback,
        uploadEnabled,
        urlEnabled,
        inputAccept,
        alt: altConf,
      },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-image-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-image-modal-header">
          {uploadEnabled && (publicFileUploadCallback || privateFileUploadCallback)  &&
            <span
              onClick={this.showFileUploadOption}
              className="rdw-image-modal-header-option"
            >
              {translations['components.controls.file.fileUpload']}
              <span
                className={classNames(
                  'rdw-image-modal-header-label',
                  { 'rdw-image-modal-header-label-highlighted': uploadHighlighted },
                )}
              />
            </span>}
          { urlEnabled &&
            <span
              onClick={this.showFileURLOption}
              className="rdw-image-modal-header-option"
            >
              {translations['components.controls.file.byURL']}
              <span
                className={classNames(
                  'rdw-image-modal-header-label',
                  { 'rdw-image-modal-header-label-highlighted': !uploadHighlighted },
                )}
              />
            </span>}
        </div>
        {
          uploadHighlighted ?
            <div onClick={this.fileUploadClick}>
              <div
                onDragEnter={this.onDragEnter}
                onDragOver={this.stopPropagation}
                onDrop={this.onFileDrop}
                className={classNames(
                  'rdw-image-modal-upload-option',
                  { 'rdw-image-modal-upload-option-highlighted': dragEnter })}
              >
                <label
                  htmlFor="file"
                  className="rdw-image-modal-upload-option-label"
                >
                  {src || translations['components.controls.file.dropFileText']}
                </label>
              </div>
              <input
                type="file"
                id="file"
                accept={inputAccept}
                onChange={this.selectFile}
                className="rdw-image-modal-upload-option-input"
              />
            </div> :
            <div className="rdw-image-modal-url-section">
              <input
                className="rdw-image-modal-url-input"
                placeholder={translations['components.controls.file.enterlink']}
                name="src"
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={src}
              />
              <span className="rdw-image-mandatory-sign">*</span>
            </div>
        }
        {altConf.present &&
        <div className="rdw-image-modal-size">
          <span className="rdw-image-modal-alt-lbl">Alt Text</span>
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={alt}
            name="alt"
            className="rdw-image-modal-alt-input"
            placeholder="alt"
          />
          <span className="rdw-image-mandatory-sign">{altConf.mandatory && '*'}</span>
        </div>}
        <div className="rdw-image-modal-size">
          &#8597;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            className="rdw-image-modal-size-input"
            placeholder="Height"
          />
          <span className="rdw-image-mandatory-sign">*</span>
          &nbsp;&#8596;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            className="rdw-image-modal-size-input"
            placeholder="Width"
          />
          <span className="rdw-image-mandatory-sign">*</span>
        </div>
        <span className="rdw-image-modal-btn-section">
          <button
            className="rdw-image-modal-btn"
            onClick={this.addFileFromState}
            disabled={!src || !height || !width || (altConf.mandatory && !alt)}
          >
            {translations['generic.add']}
          </button>
          <button
            className="rdw-image-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
        {showLoading ?
          <div className="rdw-image-modal-spinner">
            <Spinner />
          </div> :
          undefined}
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-image-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-image-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.file.file']}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderAddFileModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
