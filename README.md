# Facebook Login Popup Remover

A small Chrome / Microsoft Edge extension that hides the English "See more on Facebook" login popup and its containing overlay, then restores page scrolling. It watches for popups added after the page loads. It only runs on Facebook, has no remote code, and sends no data anywhere.

## Install

1. Extract `facebook-popup-remover.zip` into a permanent folder.
2. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the extracted folder containing `manifest.json`.
5. Reload your Facebook page.

To turn it off, disable the extension on the same Extensions page and reload Facebook.

## Scope and limitations

- This hides a visual popup; it cannot unlock private content, make Facebook serve content that requires an account, or fix a redirect to a login page.
- Explicit login, signup, recovery and security pages stay available.
- Detection uses login form elements and English prompt text rather than Facebook's changing CSS class names. Other languages are not supported in this version.
- Built from the supplied screenshot. Tested against simulated popup DOM, including unrelated dialogs and a popup appearing after load; not verified on a live Facebook page. Facebook layout changes may require updates.

Manifest V3 content-script reference: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

## Version 1.1
Also hides separate, empty, translucent layers covering the viewport after detecting a login prompt. Verified with a simulated photo viewer that its button can be clicked after removing the separate backdrop. Live Facebook DOM has not been inspected.

To update: remove the old extension in your browser's Extensions page, extract this ZIP, Load unpacked the new folder, then reload Facebook.
