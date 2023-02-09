# esbuild-react-chrome-extension

This is a boilerplate for chrome extensions writted in React and bundled with esbuild.

## Build

```sh
yarn build
```

## Scripts

All scripts are bundled into the `public/build` folder.

## VS Code

- Plugin: Chrome Extension Manifest

# Notes

This extension will add a button to the page. When clicked it will print the selected text to the console in the backgorund. It is meant to show the back and forth communication between the content and background context.

The primary goal of this repo is to demonsrate how to bundle esmodules for use in extensions. It should be used as a reference to colocate code within another project so the two can reuse code.

Some key learnings

- The move from v2 to v3 is very disruptive. Libraries and techniques used must be matched with the manifest version they were built for.
  - `webext-bridge` is built for v2
- Messaging is not straight forward; I built `src/modules/messagesPOC/bridge.ts` to simplify.
  - content => background || background => background
    - use `chrome.runtime.sendMessage(...)`
  - background => content
    - use `chrome.tabs.sendMessage(...)`
  - content => content
    - Not supported
    - We could handle in abstration layer
  - Note: Sender context is not implemented; it might be a variable in `chrome`
- Used the following as a reference for manifest
  - `https://github.com/Debdut/browser-extension`
  - It is pretty flushed out, but I couldn't get it to run.
- `lodash/get` was used in background to demonstrate that libraries from `node_modules` work
- I couldn't get source maps working, but `yarn dev` will build without minification
- The service worker may stop if it produces a lot of errors. It might need to be flushed by going to `chrome://extensions/`, clicking on the Red Errors button, then clicking the trash icon in the top right. It might require a reload of the extension.
