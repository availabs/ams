import React from "react"


import { select as d3select } from "d3-selection"
import { transition as d3transition } from "d3-transition"

const DefaultModalOptions = {
  duration: 750,
  hideOnAction: true
}

export const useModal = (options = DefaultModalOptions) => {

  const [show, setShow] = React.useState(false);

  const openModal = React.useCallback(e => {
    e.stopPropagation();
    e.preventDefault();

    setShow(true);
  }, []);

  const closeModal = React.useCallback(e => {
    e.stopPropagation();
    e.preventDefault();

    setShow(false);
  }, []);

  return [{ show, closeModal, ...options }, openModal, closeModal];
}

export const Modal = ({ show, closeModal, actions, duration, hideOnAction, children }) => {

  const outer = React.createRef(),
    inner = React.createRef();

  const [closed, setClosed] = React.useState(true);

  React.useEffect(() => {
    if (closed && show) {
      const transition = d3transition().duration(duration)
      d3select(outer.current)
        .style("background-color", "rgba(0, 0, 0, 0.0)")
        .transition(transition)
          .style("background-color", "rgba(0, 0, 0, 0.75)");

      d3select(inner.current)
        .style("top", `-50%`)
        .transition(transition)
          .style("left", `50%`)
          .style("top", `50%`);

      setClosed(!show);
    }
    else if (!closed && !show) {
      const transition = d3transition().duration(duration);

      d3select(outer.current)
        .transition(transition)
          .style("background-color", "rgba(0, 0, 0, 0.0)");

      d3select(inner.current)
        .transition(transition)
          .style("left", `50%`)
          .style("top", `-50%`)
          .end().then(() => setClosed(!show));
    }
  }, [outer, inner, show, closed, setClosed, duration]);

  const theme = {}

  return (
    <div ref={ outer }
      className="inset-0 z-50 cursor-auto fixed"
      style={ { display: closed ? "none" : "block" } }>

      <div ref={ inner } className="absolute inline-block"
        style={ {
          transform: "translate(-50%, -50%)", left: "50%"
        } }>

        <button onClick={ closeModal } small
          className={ `
            top-0 left-0 absolute ${ theme.menuBg }
          ` }
          style={ {
            transform: "translate(-50%, -50%)"
          } }>
          <span className="fa text-lg fa-times"/>
        </button>

        { children }

      </div>

    </div>
  )
}
