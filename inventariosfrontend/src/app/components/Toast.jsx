'use client'

import { Toaster } from "react-hot-toast"

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 4500,
        position: "top-right"
      }}
    />
  )
}

export default Toast