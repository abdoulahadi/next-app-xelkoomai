"use client"

import { Toaster as HotToaster } from "react-hot-toast"

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: "#fff",
          color: "#363636",
          padding: "16px",
          borderRadius: "8px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },

        // Success
        success: {
          duration: 3000,
          iconTheme: {
            primary: "var(--success)",
            secondary: "#fff",
          },
          style: {
            border: "1px solid var(--success)",
          },
        },

        // Error
        error: {
          duration: 5000,
          iconTheme: {
            primary: "var(--error)",
            secondary: "#fff",
          },
          style: {
            border: "1px solid var(--error)",
          },
        },

        // Loading
        loading: {
          iconTheme: {
            primary: "var(--info)",
            secondary: "#fff",
          },
        },
      }}
    />
  )
}
