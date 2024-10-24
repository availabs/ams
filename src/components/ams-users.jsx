import React from "react";
import { Link } from "react-router-dom";
import usersWrapper from "../wrappers/ams-users";

export default usersWrapper((props) => {
  console.log("users wrapper, props::", props)
  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      Hello World from Users Component
    </div>
  );
});
