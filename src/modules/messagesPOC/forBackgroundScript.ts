// Inside background script
import { getPreferences, setPreferences } from "../core/preferences";
import { onMessage, sendMessage } from "./bridge";

export default function init() {
  onMessage("get-preferences", async () => {
    return getPreferences();
  });

  const testMessage = () => {
    console.log("Sending message to background script");
    sendMessage("get-selection", { ignoreCasing: true }, "content-script").then(
      (selection) => {
        console.log(selection);
      }
    );

    setPreferences({ toLowerCase: true });
  };

  onMessage("test-message", async () => testMessage());
}
