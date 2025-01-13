import React from "react"


import { Input, Select } from "../ui_components";
import { postMessageWrapper, MessageTypes } from "../wrappers/ams-post-message"
import { MarkdownViewer } from "../ui_components";


const PostMessage = ({ postState,
                        updatePostState,
                        canPostMessage,
                        postMessage,
                        users,
                        groups,
                        onPostMessage, ...props }) => {

  const { heading, message, type, target, filterGroups } = postState;
  const doPostMessage = React.useCallback(e => {
    postMessage()
      .then(() => {
        if (typeof onPostMessage === "function") {
          onPostMessage(e);
        }
      })
  }, [postMessage, onPostMessage]);

  return (
    <div className="grid grid-cols-2 gap-4 w-screen"
      style={ { maxWidth: "90vw" } }>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="heading" className="font-bold">
            Heading
          </label>
          <Input type="text" id="heading"
            placeholder="Type the heading..."
            value={ heading }
            onChange={ e => updatePostState({ heading:e }) }/>
        </div>
        <div>
          <label htmlFor="message" className="font-bold">
            Message
          </label>
          <textarea id="message" value={ message }
            placeholder="Type a message..."
            onChange={ e => updatePostState({ message:e.target.value }) }/>
        </div>
        <div>
          <label className="font-bold">
            Message Type
          </label>
          <select
            onChange={ e => updatePostState({ type:e.target.value }) }
            value={ type }
            multi={ false }>
            {MessageTypes.map(d => <option value={d}>{d}</option>)}
          </select>
        </div>
        { !["user", "users"].includes(type) || (groups.length < 2) ? null :
            <div>
              <label className="font-bold">
                Filter By Groups
              </label>
              <Select options={ groups }
                onChange={ filterGroups => updatePostState({ filterGroups }) }
                accessor={ g => g.name }
                value={ filterGroups }
                multi={ true }/>
            </div>
        }
      </div>

      <div className="grid grid-cols-1 gap-4"
        style={ { gridTemplateRows: "auto min-content" } }>
        <div>
          <label className="font-bold">Message Preview</label>
          <div className="bg-white rounded px-2 py-0">
            <MarkdownViewer markdown={ message }/>
          </div>
        </div>

        { !type ? null :
          <div>
            <label className="font-bold">
              Message Target
            </label>
            { type === "user" ?
                <Select options={ users }
                  accessor={ u => u.email }
                  valueAccessor={ u => u.email }
                  onChange={ target => updatePostState({ target }) }
                  value={ target }
                  multi={ false }/> :
              type === "users" ?
                <Select options={ users }
                  accessor={ u => u.email }
                  valueAccessor={ u => u.email }
                  onChange={ target => updatePostState({ target }) }
                  value={ target }
                  multi={ true }/> :
              type === "group" ?
                <Select options={ groups }
                  accessor={ g => g.name }
                  valueAccessor={ g => g.name }
                  onChange={ target => updatePostState({ target }) }
                  value={ target }
                  multi={ false }/> :
              type === "project" ?
                <Input type="text" readOnly
                  value={ target }/> :
              null
            }
          </div>
        }

      </div>

      <div className="col-span-2 border"/>

      <div className="col-span-2 flex justify-end">
        <button disabled={ !canPostMessage }
          onClick={ doPostMessage }>
          post message
        </button>
      </div>

    </div>
  )
}

export default postMessageWrapper(PostMessage);
