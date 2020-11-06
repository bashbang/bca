import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/';
import styled from 'styled-components';
// import strapi from 'strapi';


const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
    .ck.ck-editor__editable_inline {
      border: 1px solid var(--ck-color-base-border);
      min-height: 200px;
      > div {
        min-height: 200px;
      }
  }
`;

const configuration = {
  fontColorConfig: {
    columns: 8, 
    documentColors: 8
  },  
  fontFamily: {
    supportAllValues: true
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
        25,30
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
    'fontFamily',
    'fontColor',
    'bulletedList',
    'numberedList',
    '|',
    'indent',
    'outdent',
    '|',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

const Editor = ({ onChange, name, value }) => {
  return (
    <Wrapper id="toolbar-container">
      <CKEditor
        editor={DecoupledEditor}
        config={configuration}
        data={value}
        onInit= { editor => {
          const toolbarContainer = document.querySelector( '#toolbar-container' );
            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
            toolbarContainer.appendChild( editor.ui.getEditableElement())
	          window.editor = editor;
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
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