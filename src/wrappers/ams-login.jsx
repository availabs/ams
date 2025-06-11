import React from "react"

import { useNavigate, useLocation, Navigate } from "react-router"

import get from "lodash/get"

export default Component =>
  class LoginWrapper extends React.Component {
    static defaultProps = {
      amsAction: "login",
      redirectTo: "/",
      showIfLoggedIn: false
    }
    state = {
      email: "",
      password: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.login(this.state.email, this.state.password);
    }
    render() {
      const { email, password } = this.state,
        canSubmit = email && password,

        { location, user } = this.props,
        { pathname } = location;

        let {redirectTo} = this.props;
        redirectTo = location?.state?.redirectTo ?? redirectTo;

        console.log('hola', this.props)

      if (user.authed) {
        const from = get(location, ["state", "from"]),
          to = ((pathname === from) || !from) ? redirectTo : from;
        this.props.navigate(to,{ replace: true, state: null })//<Navigate to={ to } state={null} />
      }
      return (
        <Component { ...this.props } { ...this.state }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }/>
      );
    }
  }
// export default Component => ({
//     redirectTo = '/',
//     user,
//     login
//   }) => {

//     console.log('hola', Component, props)
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       login(state.email, state.password);
//     }

//     const [state, setState] = React.useState({
//       email: "",
//       password: ""
//     })
//     const navigate = useNavigate()
//     const location = useLocation()
//     const { email, password } = state;
//     const canSubmit = email && password;
//     const { pathname } = location;

    
//     redirectTo = location?.state?.redirectTo ?? redirectTo;

//     if (user.authed) {
//       const from = get(location, ["state", "from"]),
//         to = ((pathname === from) || !from) ? redirectTo : from;
//       //console.log('to', to, 'from', from)
//       return navigate(to)
//     }
//     return (
//       <Component { ...state }
//         handleSubmit={ e => handleSubmit(e) }
//         update={ u => setState(u) }
//         canSubmit={ canSubmit }/>
//     );
  
// }