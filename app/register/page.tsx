
"use client"

import { createElement, useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "" })

  return createElement(
    "div",
    null,
    createElement("h2", null, "Register"),
    createElement(
      "form",
      { action: formAction },

      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Username",
          createElement("input", {
            type: "text",
            name: "username",
          })
        )
      ),

      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Name",
          createElement("input", {
            type: "text",
            name: "name",
          })
        )
      ),

      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Password",
          createElement("input", {
            type: "password",
            name: "password",
          })
        ),
        createElement(
          "label",
          null,
          "Confirm Password",
          createElement("input", {
            type: "password",
            name: "passwordConfirm",
          })
        )
      ),

      state.error &&
        createElement(
          "p",
          {
            style: { color: "red" },
            "data-testid":
              state.error === "Username must be at least 4 characters long"
                ? "username-error"
                : "passwordConfirm-error",
          },
          state.error
        ),

      createElement(
        "button",
        { id: "register-button", "data-testid": "register-button", type: "submit" },
        "Register",
      )
    )
  )
}
