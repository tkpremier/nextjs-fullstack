'use client';
import { Editor } from '@/components/Editor';
import { EditorProps, IEventInfo } from '@/types';
import { Editor as CKEditor } from 'ckeditor5';

export const HTMLEditor = (props: EditorProps) => {
  const handleChange = (eventInfo: IEventInfo, editor: CKEditor) => {
    if (props.onChange) {
      props.onChange(eventInfo, editor);
    }
  };
  return (
    <Editor className="editor-container" id={props.name} data={props.data} name={props.name} onChange={handleChange} />
  );
};
