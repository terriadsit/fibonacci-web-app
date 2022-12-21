import { useContext, useEffect, useCallback } from 'react';
import useBlocker from "./useBlocker";

/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
 export default function usePrompt(message, when = true, leaveGame) {
    const blocker = useCallback(
      (tx) => {
        if (window.confirm(message)) {
            // leave page
            tx.retry();
            leaveGame();
            console.log("in confirm messate")
        } else {
            // stay on page
            console.log("in else confirm message")
        };
      },
      [message]
    );
  
    useBlocker(blocker, when);
  }
  
