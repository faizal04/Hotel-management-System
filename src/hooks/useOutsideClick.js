import { useEffect, useRef } from "react";

function useOutsideClick(handler, phase) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("e.target" + e.target);
          console.log("ref.current" + ref.current);
          handler();
        }
      }

      document.addEventListener("click", handleClick, phase);
      return () => document.removeEventListener("click", handleClick, phase);
    },
    [handler, phase]
  );
  return ref;
}

export default useOutsideClick;
