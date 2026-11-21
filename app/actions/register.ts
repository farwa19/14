import { createElement } from "react"
import { registerUser } from "./users"

export default function RegisterPage(
    
) {
  return createElement(
    "div",
    null,
    createElement("h2", null, "Register"),
    createElement(
      "form",
      { action: registerUser },
      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Username",
          createElement("input", { type: "text", name: "username", required: true }),
        ),
      ),
      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Name",
          createElement("input", { type: "text", name: "name", required: true }),
        ),
      ),
      createElement(
        "div",
        null,
        createElement(
          "label",
          null,
          "Password",
          createElement("input", { type: "password", name: "password", required: true }),
        ),
      ),
      createElement("button", { type: "submit" }, "Register"),
    ),
  )
}