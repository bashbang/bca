import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/';
import styled from 'styled-components';


const Wrapper = styled.div`
    .ck.ck-editor__editable_inline {
      border: 1px solid var(--ck-color-base-border);
      min-height: 200px;
      > div {
        min-height: 200px;
        border-bottom: 25px;
      },
      .ck.ck-toolbar
      {
        display:block !important;
      }
  }
`;

const configuration = {
  fontColorConfig: {
    columns: 8, 
    documentColors: 8
  },  
  fontColor: {
    colors: [
      {
        color: "#07819a",
        label: "BCATeal"
      },
      {
        color: "#e0f3f1",
        label: "LightTeal"
      },
      {
        color: "#FF1493",
        label: "Sarah"
      }
    ] 
  },
 
  fontSize: {
    options: [
        9,
        11,
        13,
        'default',
        17,
        19,
        21,
        23,
        25,
        30
    ],
    supportAllValues: true
  },
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'fontSize',
    'fontColor',
    'bulletedList',
    'numberedList',
    '|',
    'indent',
    'outdent',
    '|',
    'blockQuote',
    'insertTable',
    'undo',
    'redo',
  ],
};

const Editor = ({ onChange, name, value }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={DecoupledEditor}
        config={configuration}
        data={value}
        onInit= { editor => {
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
	          window.editor = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;