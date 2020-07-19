import{ useEffect } from "react";
import log from "loglevel";
import history from "../history";

export function useBackButton() {
    useEffect(() => {

        function handleBackButton() {
            history.goBack()
        }

        // Bind the event listener
        window.addEventListener("popstate", handleBackButton);

        return () => {
            // Unbind the event listener on clean up
            window.removeEventListener("popstate", handleBackButton);
        };
    }, []);
}