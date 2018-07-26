import React from 'react';

const File = (props) => {
  const { filename, content, index, length } = props || {};
  let remove = null;

  if (length > 1) {
    remove = (<div className="control">
      <button className="button is-danger" onClick={() => props.removeFile(index)}>
        <span className="icon is-small">
          <i className="far fa-trash-alt"></i>
        </span>
      </button>
    </div>);
  }

  return (
    <fieldset className="field has-background-light">
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Filename including extension..." value={filename} onChange={e => console.log(e)} />
        </div>
        {remove}
      </div>
      <div className="field">
        <div className="control">
          <textarea className="textarea" placeholder="10 lines of textarea" rows="15" value={content} onChange={e => console.log(e)}></textarea>
        </div>
      </div>
    </fieldset>
  );
}

export default File;
