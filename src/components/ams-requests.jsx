import React from "react"
import wrapper from "../wrappers/ams-requests"
import { Button, Select } from "../ui_components";

const PendingHeader = () =>
  <div className="grid grid-cols-12 gap-3 font-bold">
    <div className="col-span-3 border-b-2">
      User Account Requests
    </div>
    <div className="col-span-2 border-b-2 text-center">
      Age
    </div>
    <div className="col-span-5 border-b-2 text-center grid grid-cols-5">
    <div className="col-span-3">
      Group
    </div>
    <div className="col-span-2">
      Accept Request
    </div>
    </div>
    <div className="col-span-2 border-b-2 text-center">
      Reject Request
    </div>
  </div>
const PendingRequest = ({ request, groups, signupAccept, signupReject, ...props }) => {
  const age = ((Date.now() - new Date(request.created_at).valueOf()) / (1000 * 60 * 60)).toFixed(1);

  const [group, setGroup] = React.useState(null),
    canAccept = group && (request.state === "pending");

  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    signupAccept(request.user_email, group.name);
    setGroup(null);
  }, [signupAccept, request, group])

  return (
    <div className="grid grid-cols-12 gap-3 my-1 flex items-center">
      <div className="col-span-3">
        { request.user_email }
      </div>
      <div className="col-span-2 text-center">
        { age } hrs
      </div>
      <div className="col-span-5">
        <form onSubmit={ handleSubmit }>
          <div className="grid grid-cols-5 gap-1">
            <div className="col-span-3">
              <Select
                domain={groups}
                accessor={(g) => g.name}
                value={ group } 
                onChange={ e => setGroup(e) }
                placeholder="Select a group..."
              />
            </div>
            <div className="col-span-2 grid">
              <Button
                themeOptions={{size:"sm"}}
                type="submit"
                disabled={ !canAccept }
              >
                accept
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-2 grid">
        <Button
          themeOptions={{color:"danger", size:"sm"}}
          showConfirm
          onClick={ e => signupReject(request) }
        >
          reject
        </Button>
      </div>
    </div>
  )
}
const PendingRequests = ({ requests, ...props }) => {
  return !requests.length ? null : (
    <div className="py-1">
      <PendingHeader />
      { requests.map(req =>
          <PendingRequest key={ req.user_email } request={ req } { ...props }/>
        )
      }
    </div>
  )
}

const AwaitingHeader = () =>
  <div className="grid grid-cols-12 gap-3 font-bold">
    <div className="col-span-3 border-b-2">
      Awaiting Email Verification
    </div>
    <div className="col-span-2 border-b-2 text-center">
      Age
    </div>
    <div className="col-span-2 border-b-2 text-center">
      Reject Request
    </div>
  </div>
const AwaitingRequest = ({ request, signupReject, ...props }) => {
  const age = ((Date.now() - new Date(request.created_at).valueOf()) / (1000 * 60 * 60)).toFixed(1);
  return (
    <div className="grid grid-cols-12 gap-3 my-1 flex items-center">
      <div className="col-span-3">
        { request.user_email }
      </div>
      <div className="col-span-2 text-center">
        { age } hrs
      </div>
      <div className="col-span-2 grid">
        <Button
          themeOptions={{color:"danger", size:"sm"}}
          showConfirm
          onClick={ e => signupReject(request) }
        >
          reject
        </Button>
      </div>
    </div>
  )
}
const AwaitingRequests = ({ requests, ...props }) => {
  return !requests.length ? null : (
    <div className="py-1">
      <AwaitingHeader />
      { requests.map(req =>
          <AwaitingRequest key={ req.user_email } request={ req } { ...props }/>
        )
      }
    </div>
  )
}


const RejectedHeader = () =>
  <div className="grid grid-cols-12 gap-3 font-bold">
    <div className="col-span-3 border-b-2">
      Rejected Requests
    </div>
    <div className="col-span-5 border-b-2 text-center">
      Accept Request
    </div>
    <div className="col-span-2 border-b-2 text-center">
      Delete Request
    </div>
  </div>
const RejectedRequest = ({ request, groups, signupAccept, deleteRequest, ...props }) => {
  const [group, setGroup] = React.useState(null),
    canAccept = group && (request.state === "rejected");

  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    signupAccept(request.user_email, group.name);
    setGroup(null);
  }, [signupAccept, request, group]);

  return (
    <div className="grid grid-cols-12 gap-3 my-1 flex items-center">
      <div className="col-span-3">
        { request.user_email }
      </div>
      <div className="col-span-5">
        <form onSubmit={ handleSubmit }>
          <div className="grid grid-cols-5 gap-1">
            <div className="col-span-3">
              <select
                value={ group } 
                onChange={ e => setGroup(e.target.value) }
                placeholder="Select a group...">
                 {groups.map(d => <option value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <button type="submit" block disabled={ !canAccept }>
                accept
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-2 text-center">
        <button showConfirm
          onClick={ e => deleteRequest(request) }>
          delete
        </button>
      </div>
    </div>
  )
}
const RejectedRequests = ({ requests, ...props }) => {
  return !requests.length ? null : (
    <div className="py-1">
      <RejectedHeader />
      { requests.map(req =>
          <RejectedRequest key={ req.user_email } request={ req } { ...props }/>
        )
      }
    </div>
  )
}

export default wrapper(({ pending, awaiting, rejected, ...props }) => {
  const [open, setOpen] = React.useState(false),
    stop = React.useCallback(e => e.stopPropagation(), []),
    theme = {};

  return (
    <div className={ `
        mb-5 py-2 px-4 border-2 rounded
        ${ open ? theme.accent1 : "cursor-pointer" }
      ` }
      style={ { borderColor: "currentColor" } }
      onClick={ e => { stop(e); setOpen(true); } }>
      <div onClick={ e => { stop(e); setOpen(!open); } }
        className={ `
          border-b-2 cursor-pointer
          ${ open ? "border-current" : "border-transparent" }
        ` }>
        <span className={ `fa fa-${ open ? "minus" : "plus" }` }/>
        <span className="font-bold text-xl ml-2">Requests</span>
      </div>
      { !open ? null :
        <>
          <PendingRequests requests={ pending } { ...props }/>
          <AwaitingRequests requests={ awaiting } { ...props }/>
          <RejectedRequests requests={ rejected } { ...props }/>
        </>
      }
    </div>
  )
})
