/* @flow */

import React from 'react';
import { Editor } from '../../src';
import toolbar from './toolbar';

const DixaIconTest = () => (
  <div className="rdw-storybook-root">
    <Editor
      toolbar={toolbar}
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>
);

export default DixaIconTest;
