import React from "react"


import Container from "./components/Container"
import { Modal, useModal } from "./components/Modal"

import PostMessage from "./ams-post-message"
import MessageWrapper from "../wrappers/ams-messages"
import { MarkdownViewer } from "../ui_components";

const MessagesHeading = ({ showModal, ...props }) => {
  return (
    <div className="flex items-center">
      <div className="flex-1 text-3xl font-bold">Messages</div>
      <div className="text-base flex-0">
        <button onClick={ showModal }>
          compose
        </button>
      </div>
    </div>
  )
}

const AmsMessages = props => {
  const {
    messages,
    toggleSelected,
    viewMessages,
    viewSelected,
    deleteMessages,
    deleteSelected,
    toggleAll,
    selected
  } = props;

  const [modalState, showModal, closeModal] = useModal();

  const Title = React.useMemo(() => {
    return <MessagesHeading showModal={ showModal }/>
  }, [showModal]);
  console.log("inside ams messages, messages::", messages)
  return (
    <>
      <Modal { ...modalState }>
        <div className="bg-gray-200 p-4 rounded">
          <PostMessage onPostMessage={ closeModal }/>
        </div>
      </Modal>

      <div className="col-span-2">
        <Container className="w-full" Title={ Title }>

          <div className="grid grid-cols-1 gap-y-1">

            { !messages.length ? null :
              <div className="flex items-center h-6 px-2">
                <div className="w-4 mr-1 flex-0">
                  <input className="cursor-pointer"
                    type="checkbox"
                    checked={ Boolean(selected.length) }
                    onChange={ toggleAll }
                    onClick={ e => e.stopPropagation() }/>
                </div>
                { !selected.length ? null :
                  <div className="flex-1 flex items-center">
                    <span className="fa fa-trash mx-2 cursor-pointer hover:text-red-400"
                      onClick={ deleteSelected }/>
                    <span className="fa fa-eye mx-2 cursor-pointer hover:text-blue-400"
                      onClick={ viewSelected }/>
                  </div>
                }
              </div>
            }

            { messages.sort((a, b) => {
                  return new Date(b.sent_at) - new Date(a.sent_at);
                })
                .map(msg =>
                  <Message key={ msg.id } { ...msg }
                    deleteMessages={ deleteMessages }
                    viewMessages={ viewMessages }
                    toggleSelected={ toggleSelected }
                    selected={ selected.includes(msg.id) }/>
                )
            }

          </div>

        </Container>
      </div>
    </>
  )
}

export default MessageWrapper(AmsMessages);

const Message = props => {

  const {
    id,
    heading,
    message,
    sent_by, sent_at,
    viewed, viewMessages,
    toggleSelected,
    // deleteMessages,
    selected
  } = props;

  const [open, setOpen] = React.useState(false);

  const toggle = React.useCallback(e => {
    setOpen(!open);
    if (!open && !viewed) {
      viewMessages([id]);
    }
  }, [id, viewMessages, viewed, open]);

  const setChecked = React.useCallback(e => {
    e.stopPropagation();
    toggleSelected(id);
  }, [toggleSelected, id])

  return (
    <div onClick={ toggle }
      className={ `
        cursor-pointer px-2 rounded
        ${ viewed ? "bg-gray-300" : "bg-gray-100" }
      ` }>

      <div className="flex items-center">

        <div className="w-4 mr-1 flex-0">
          <input className="cursor-pointer"
            type="checkbox"
            checked={ selected }
            onChange={ setChecked }
            onClick={ e => e.stopPropagation() }/>
        </div>

        <div className="font-bold text-lg flex-0 w-72 overflow-hidden mr-4">
          { sent_by }
        </div>

        <div className="font-bold text-lg flex-0">
          { heading }
        </div>

        <div className="flex-1 text-right">
          { new Date(sent_at).toLocaleString() }
        </div>

      </div>

      { !open ? null :  <MarkdownViewer markdown={message} /> }

    </div>
  )
}
