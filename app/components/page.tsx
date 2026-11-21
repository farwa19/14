"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const isError = type === "error"

  return (
    <div
      data-testid={isError ? "error-message" : "notification"}
      className={`flex items-start sm:items-center p-4 mb-4 text-sm rounded-lg ${
        isError
          ? "bg-red-50 text-red-800"
          : "bg-blue-50 text-blue-800"
      }`}
      role="alert"
    >
      <svg
        className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <p>
        <span className="font-medium me-1">
          {isError ? "Danger alert!" : "Success!"}
        </span>
        {message}
      </p>
    </div>
  )
}