'use client';
import styles from '@/styles/Editor.module.css';
import { EditorProps } from '@/types';
import { CKEditor as Editor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, Link, List, Paragraph } from 'ckeditor5';
import { useState } from 'react';

const editorConfig = {
  licenseKey: 'GPL',
  plugins: [Essentials, Paragraph, Bold, Italic, Link, List],
  toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link', '|', 'numberedList', 'bulletedList'],
};

const CKEditorComponent = (props: EditorProps) => {
  const [value, setValue] = useState(props.data ?? '');
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* CKEditor renders a contenteditable div, which is not submitted with the
          form. Mirror its content into a hidden field so `name` is posted. */}
      <textarea className={styles.ckeditorTextarea} name={props.name} value={value} readOnly />
      <Editor
        id={props.id ?? ''}
        editor={ClassicEditor}
        config={editorConfig}
        data={props.data}
        onChange={(_event, editor) => {
          setValue(editor.getData());
          if (props.onChange) {
            props.onChange({ name: 'change', path: [], source: editor }, editor);
          }
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
