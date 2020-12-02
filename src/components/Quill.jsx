import React, {useMemo, useRef} from 'react'
import ReactQuill from 'react-quill';
import c from '../styles/edit.module.css'
import {quillUpload} from "../utils/util.js";

function Quill ({value, setValue}) {
	const quillRef = useRef(null)

	const imageHandler = () => {
		const quillEditor = quillRef.current.getEditor()
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()
		input.onchange = () => {
			quillUpload(input.files[0]).then(r => {
				quillEditor.insertEmbed(quillEditor.getSelection().index, 'image', r)
			})
		}
	}

  const modules = useMemo(() => (
    {
      toolbar: {
        container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        // [{ 'header': 1 }, { 'header': 2 }], // custom button values
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        // [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        // [{ 'direction': 'rtl' }], // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'] // remove formatting button
      ],
      handlers: {
        image: imageHandler
      }
    }
  }
  ), [])

	return <ReactQuill ref={quillRef} className={c.quill} modules={modules} theme="snow" value={value} onChange={e=>setValue(e)}/>
}

export default Quill
