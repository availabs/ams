import React from "react"

const AmsProfile = ({ user, className = null, children, ...props }) => {
  return (
    <div className={ className }>
      <div className="py-8 grid grid-cols-2 gap-8">
        <div className="font-bold text-4xl text-center col-span-2">
          Welcome: { user.email }
        </div>
        { children }
      </div>
    </div>
  )
}

export default ({
  type: AmsProfile,
  props: { amsAction: "profile", authLevel: 0 },
  wrappers: ["ams-profile"],
  // children: [
  //   { type: "ams-update-password" },
  //   { type: "ams-messages" }
  // ]
})
