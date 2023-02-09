//@source https://github.com/zikaari/webext-bridge

// Inside content script
import { IPreferences } from "../core/preferences";
import { onMessage, sendMessage } from "./bridge";

const getSelectionFromPage = () => {
  const selection = window.getSelection();
  if (selection) {
    return selection.toString();
  }
  return "";
};

export default function init() {
  onMessage("get-selection", async (message) => {
    const {
      sender,
      data: { ignoreCasing }
    } = message;

    console.log("msg received", message, ignoreCasing);
    console.log(sender.context, sender.tabId); // > content-script  156

    const preferences = await sendMessage(
      "get-preferences",
      { toLowerCase: false },
      "background"
    );
    let selection = getSelectionFromPage();

    if ((preferences as any).toLowerCase) {
      selection = selection.toLowerCase();
    }

    return selection;
  });

  console.log("content script loaded");

  (window as any).sendMessage = sendMessage;
  const testMessage = () => {
    console.log("Sending message to background script");
    sendMessage("test-message", { ignoreCasing: true }, "background").then(
      (selection) => {
        console.log("response to test", selection);
      }
    );
  };

  // Add a button to the page to trigger the test message
  const button = document.createElement("button");
  button.innerText = "Get selection";
  button.addEventListener("click", testMessage);
  document.body.appendChild(button);

  setTimeout(() => {
    testMessage();
  }, 3000);
}
