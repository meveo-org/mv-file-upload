# mv-file-upload

MvFileUpload is a Meveo file upload component based on lit-element.

## Quick Start

To experiment with the MvFileUpload component.

1. Clone this repo.
2. Serve the project from the root directory with some http server (best served with meveo itself)
3. Update the input demo component in demo.js file

## Sample usage

```html
<mv-file-upload
  multiple                                // boolean attribute allow multiple files to be selected
  name="uploadFile"                       // name attribute to be passed into hidden input element
  file-types=".pdf,.docx"                 // list of file types accepted by html input
  label="File",                           // optional label shown before the button
  button-label="Add file"                 // label shown inside the button
  @update-files="${this.updateFilesList}" // returns the selected files
>
</mv-file-upload>
```

> The file-types attribute uses the same list of values in the [html input accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers)