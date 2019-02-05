import bold from '../../images/bold.svg';
import italic from '../../images/italic.svg';
import monospace from '../../images/code.svg';
import fontSize from '../../images/font-size.svg';
import ordered from '../../images/list-unordered.svg';
import unordered from '../../images/list-ordered.svg';
import left from '../../images/align-left.svg';
import center from '../../images/align-center.svg';
import right from '../../images/align-right.svg';
import justify from '../../images/align-justify.svg';
import color from '../../images/color.svg';
import eraser from '../../images/eraser.svg';
import link from '../../images/link.svg';
import unlink from '../../images/unlink.svg';
import emoji from '../../images/smile.svg';
import embedded from '../../images/embedded.svg';
import image from '../../images/image.svg';
import undo from '../../images/undo.svg';
import redo from '../../images/redo.svg';
import subscript from '../../images/subscript.svg';
import superscript from '../../images/superscript.svg';
import fastMessage from '../../images/bolt.svg';
import upload from '../../images/upload.svg';

// import Icon from '@dixa/dixa-modern-icons';

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
export default {
  options: ['blockType', 'inline', 'list', 'file', 'link', 'emoji', 'quickResponse'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'monospace'],
    bold: { icon: bold, className: undefined, title: undefined },
    italic: { icon: italic, className: undefined, title: undefined },
    monospace: { icon: monospace, className: undefined, title: undefined }
  },
  blockType: {
    inDropdown: true,
    options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Normal', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined,
  },
  fontSize: {
    icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
    unordered: { icon: unordered, className: undefined, title: undefined },
    ordered: { icon: ordered, className: undefined, title: undefined },
    title: undefined
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { icon: link, className: undefined, title: undefined },
    unlink: { icon: unlink, className: undefined, title: undefined },
  },
  emoji: {
    icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉',
      '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃', '⛷',
      '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
      '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸',
      '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺',
      '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉',
      '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅',
      '❎', '💯',
    ],
    title: undefined,
  },
  file: {
    icon: upload,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: '',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
    title: undefined,
  },
  quickResponse: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    quickResponses: { icon: fastMessage, className: undefined, title: undefined },
  }
};

/**
 * - add option property to color-picker, emoji.
 */
