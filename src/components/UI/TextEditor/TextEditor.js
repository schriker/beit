import React from 'react';
import { init, exec } from './Pell';

const TextEditor = (props) => {

    const editor = init({
        element: document.getElementById('pell'),
        onChange: html => {
          document.getElementById('html-output').textContent = html
        },
        defaultParagraphSeparator: 'p',
        styleWithCSS: true,
        actions: [
          'bold',
          'underline',
          {
            name: 'italic',
            result: () => exec('italic')
          },
          {
            name: 'custom',
            icon: '<b><u><i>C</i></u></b>',
            title: 'Custom Action',
            result: () => console.log('YOLO')
          },
          {
            name: 'image',
            result: () => {
              const url = window.prompt('Enter the image URL')
              if (url) exec('insertImage', url)
            }
          },
          {
            name: 'link',
            result: () => {
              const url = window.prompt('Enter the link URL')
              if (url) exec('createLink', url)
            }
          }
        ],
        classes: {
          actionbar: 'pell-actionbar-custom-name',
          button: 'pell-button-custom-name',
          content: 'pell-content-custom-name',
          selected: 'pell-button-selected-custom-name'
        }
      })
  
      editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'

    return (
        <React.Fragment>
        <div id="pell"></div>
            <div>
            HTML output:
            <div id="html-output"></div>
        </div>
        </React.Fragment>
    )
}

export default TextEditor;