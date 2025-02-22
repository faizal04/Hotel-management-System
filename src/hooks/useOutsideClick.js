import { useEffect, useRef } from "react";

function useOutsideClick(handler, phase) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, phase);
      document.addEventListener("scroll", handleClick, phase);
      return () => {
        document.removeEventListener("click", handleClick, phase);
        document.removeEventListener("scroll", handleClick, phase);
      };
    },
    [handler, phase]
  );
  return ref;
}

export default useOutsideClick;
