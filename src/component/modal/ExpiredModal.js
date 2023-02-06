import React from "react";

export default function ExpiredModal() {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Your session has timed out!",
  });
}
