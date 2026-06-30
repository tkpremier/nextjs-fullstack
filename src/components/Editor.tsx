'use client';
import { EditorProps } from '@/types';
import 'ckeditor5/ckeditor5.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CKEditorComponent = dynamic(() => import('./CKEditorComponent'), { ssr: false });
export const Editor = (props: EditorProps) => <Suspense fallback={<textarea name={props.name} id={props.id ?? props.name} defaultValue={props.data} />}><CKEditorComponent id={props.name} {...props} /> </Suspense>;