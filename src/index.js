import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import "./style.scss";
import { marked } from "marked";
import Prism from "prismjs";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

function App() {
  const [data, dispatch] = React.useReducer(reducer, {
    markdown: placeholder,
    editorMaximized: false,
    previewMaximized: false,
  });

  const handleChange = (e) => {
    dispatch({
      type: "SET_MD",
      payload: e.target.value,
    });
  };

  const handleEditorMaximize = () => {
    dispatch({
      type: "MAXIMIZED",
      payload: "editorMaximized",
    });
  };

  const handlePreviewMaximize = () => {
    dispatch({
      type: "MAXIMIZED",
      payload: "previewMaximized",
    });
  };

  const classes = data.editorMaximized
    ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
    : data.previewMaximized
    ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
    : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];
  return (
    <div>
      <div className={classes[0]}>
        <Toolbar
          icon={classes[2]}
          onClick={handleEditorMaximize}
          text="Editor"
        />
        <Editor markdown={data.markdown} onChange={handleChange} />
      </div>
      <div className="converter" />
      <div className={classes[1]}>
        <Toolbar
          icon={classes[2]}
          onClick={handlePreviewMaximize}
          text="Previewer"
        />
        <Preview markdown={data.markdown} />
      </div>
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "MAXIMIZED":
      return { ...state, [action.payload]: !state[action.payload] };
    case "SET_MD":
      return { ...state, markdown: action.payload };
    default:
      throw new Error();
  }
};

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      {props.text === "Editor" ? (
        <i class="fas fa-pencil-alt" />
      ) : (
        <i class="fab fa-markdown" />
      )}
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

module.hot.accept();
