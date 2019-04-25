import {
  EditorState,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export default function addQuickResponse(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object,
  quickResponseText: String,
): void {
  const { value } = suggestion;
  const entityKey = editorState
    .getCurrentContent()
    .createEntity('QUICK_RESPONSE', 'MUTABLE', { text: `${value}`, value })
    .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const lastIndexOfTrigger = selectedBlockText.lastIndexOf(trigger);
  const index = lastIndexOfTrigger === -1 ? 0 : lastIndexOfTrigger;

  let spaceAlreadyPresent = false;
  const focusOffset = quickResponseText.length + 1;

  if (selectedBlockText[focusOffset] === ' ') {
    spaceAlreadyPresent = true;
  }

  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: index,
    focusOffset: focusOffset + index,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    newEditorState.getSelection(),
    `${value}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  if (!spaceAlreadyPresent) {
    // insert a blank space after Quick Response
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: index + value.length,
      focusOffset: index + value.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      updatedSelection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
  }
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
}
