import React from "react";

export default function useDocumentTitle(title) {
  React.useLayoutEffect(() => {
    document.title = title ? `${title} — myElcamino` : "myElcamino";
  }, [title]);
}
