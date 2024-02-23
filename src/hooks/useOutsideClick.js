import { useEffect, useRef } from "react";

function useOutsideClick(handleOutsideClick, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handleOutsideClick?.();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick);
    },
    [handleOutsideClick, listenCapturing]
  );
  return { ref };
}

export default useOutsideClick;
