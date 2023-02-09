type MessageKey = "get-selection" | "get-preferences" | "test-message";
type Context = "content" | "background" | "content-script";

export const onMessage = (
  key: MessageKey,
  handler: (data: any) => Promise<any>,
  context?: Context
) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("onMessage", message, sender, sendResponse);
    if (message.key === key) {
      handler({ sender, data: message.data }).then(sendResponse);
      // Return true to indicate that sendResponse will be called asynchronously
      // https://developer.chrome.com/extensions/runtime#event-onMessage
      // https://developer.chrome.com/extensions/messaging#simple
      // Note: If you return true, you must call sendResponse at some point during the execution of your event handler.
      // Only return true if you plan to send a response asynchronously or it will block other listeners.
      return true;
    }
  });
};

export const sendMessage = (key: MessageKey, data: any, context?: Context) => {
  console.log("attempting send message");

  if (context === "content" || context === "content-script") {
    return new Promise((resolve) => {
      console.log("sendMessage", key, data, context);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id as number, { key, data }, resolve);
      });
    });
  }
  return new Promise((resolve) => {
    console.log("sendMessage", key, data, context);
    chrome.runtime.sendMessage({ key, data }, resolve);
  });
};
