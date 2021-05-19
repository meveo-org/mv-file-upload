import { LitElement, html, css } from "lit-element";
import "mv-button";
import "mv-font-awesome";

export class MvFileUpload extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      label: { type: String },
      placeholder: { type: String },
      multiple: { type: Boolean },
      buttonLabel: { type: String, attribute: "button-label" },
      fileTypes: { type: String, attribute: "file-types", reflect: true },
      files: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-button-padding: 5px 8px;
        --mv-button-min-width: 16px;
        font-size: var(--font-size-m, 16px);
      }

      table {
        width: 100%;
      }

      .upload-button {
        display: flex;
        font-size: 14px;
      }

      .upload-button div {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.name = "mv-file-upload";
    this.label = "";
    this.buttonLabel = "Add file";
    this.multiple = false;
    this.fileTypes = "";
    this.files = [];
  }

  render() {
    const fileList = [...this.files];
    const hasFiles = fileList.length > 0;
    return html`
      ${this.multiple && hasFiles
        ? html`
            <table>
              <tbody>
                ${hasFiles
                  ? fileList.map(
                      (file, index) => html`
                        <tr>
                          <td>${file.name}</td>
                          <td>
                            <mv-button
                              @button-clicked="${this.removeFile(index)}"
                              button-style="error"
                            >
                              <mv-fa icon="times"></mv-fa>
                            </mv-button>
                          </td>
                        </tr>
                      `
                    )
                  : null}
              </tbody>
            </table>
          `
        : null}
      <input
        type="file"
        files="${this.files}"
        id="${this.name}"
        name="${this.name}"
        ?multiple="${this.multiple}"
        accept="${this.fileTypes}"
        @change="${this.addFiles}"
        hidden
      />
      <div>
        ${this.label
          ? html`<label for="${this.name}">${this.label}</label>`
          : null}
        <mv-button @button-clicked="${this.openFileDialog}" type="outline">
          <div class="upload-button">
            <mv-fa icon="file-upload"></mv-fa>
            <div>${this.buttonLabel}</div>
          </div>
        </mv-button>
        ${!this.multiple && hasFiles
          ? html`
              <label>${this.files[0].name}</label>
              <mv-button
                @button-clicked="${this.removeFile(0)}"
                button-style="error"
              >
                <mv-fa icon="times"></mv-fa>
              </mv-button>
            `
          : null}
      </div>
    `;
  }

  openFileDialog = () => {
    const input = this.shadowRoot.querySelector('input[type="file"]');
    input.click();
  };

  removeFile = (index) => (event) => {
    this.updateFiles([
      ...this.files.slice(0, index),
      ...this.files.slice(index + 1),
    ]);
  };

  addFiles = (event) => {
    const {
      target: { files },
    } = event;
    const uniqueFiles = [...files].filter(
      (file) =>
        ![...this.files].find(
          (existingFile) =>
            existingFile.name === file.name &&
            existingFile.size === file.size &&
            existingFile.lastDateModified === file.lastDateModified
        )
    );
    this.updateFiles([...this.files, ...uniqueFiles]);
  };

  updateFiles = (files) => {
    this.files = files;
    this.dispatchEvent(
      new CustomEvent("update-files", {
        detail: { files },
      })
    );
  };
}

customElements.define("mv-file-upload", MvFileUpload);
