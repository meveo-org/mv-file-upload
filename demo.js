import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";
import "./mv-file-upload.js";

export class MvFileUpload extends LitElement {
  static get properties() {
    return {
      detail: { type: Object, attribute: false },
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 300px;
        --mv-container-min-height: 200px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px;
      }

      i {
        font-style: normal;
        color: #00b7ff;
        font-weight: bold;
        font-size: 1.2em;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }

      .prefix-suffix {
        --mv-input-prefix-width: 24px;
        --mv-input-suffix-width: 24px;
      }
    `;
  }

  constructor() {
    super();
    this.detail = {};
    this.theme = "light";
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark
        </label>
      </fieldset>
      <mv-container .theme="${theme}">
        <mv-file-upload
          name="fileUpload"
          label="Single file"
          file-types=".pdf,.docx"
        ></mv-file-upload>
        <mv-file-upload
          multiple
          label="Multiple files"
          name="multiFileUpload"
          file-types=".pdf,.docx"
        ></mv-file-upload>
      </mv-container>
    `;
  }

  changeValue = (event) => {
    const { detail } = event;
    this.detail = detail;
  };

  changeTheme = (originalEvent) => {
    this.theme = originalEvent.target.value;
  };
}

customElements.define("mv-file-upload-demo", MvFileUpload);
