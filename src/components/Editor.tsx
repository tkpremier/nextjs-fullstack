import { EditorProps } from '@/types';
import 'ckeditor5/ckeditor5.css';
import { Suspense } from 'react';
import CKEditorComponent from './CKEditorComponent';

export const Editor = (props: EditorProps) => {
  return <Suspense fallback={<textarea defaultValue={props.data} />}> <CKEditorComponent {...props} /></Suspense>;
}