import{ useEffect } from "react";
import log from "loglevel";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickAway(ref, closeHandler) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */

        function handleClickOutside(event) {
            try {
                if (event.target.getAttribute("class") &&
                    event.target.getAttribute("class").localeCompare("MuiBackdrop-root") === 0) {
                    closeHandler()
                }
            } catch (e) {
                log.error(`[useClickAway] event.target.getAttribute("class") is empty`)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // eslint-disable-next-line
    }, [ref]);
}