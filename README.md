# Facebook Login Popup Blocker for Chrome and Edge

**Remove the “See more on Facebook” login popup and restore scrolling on public Facebook pages.**

Facebook Login Popup Blocker is a lightweight Chrome and Microsoft Edge extension that hides Facebook login popups and their dimmed overlays. When a supported English “Log in to Facebook” dialog covers a public page, the extension hides the prompt and restores page scrolling. It also watches for login popups that appear after the page loads.

Originally named Facebook Login Popup Remover, it runs only on Facebook, uses a Manifest V3 content script, contains no remote code, and sends no data anywhere.

## Install the Facebook popup blocker in Chrome or Edge

1. On this repository, select **Code → Download ZIP**.
2. Extract the ZIP into a permanent folder.
3. Open `chrome://extensions` in Chrome or `edge://extensions` in Microsoft Edge.
4. Turn on **Developer mode**.
5. Click **Load unpacked** and select the extracted folder containing `manifest.json` and `content.js`.
6. Reload your public Facebook page.

The extension is installed locally from source. There is no Chrome Web Store listing at this time.

To turn it off, disable the extension on the same Extensions page and reload Facebook.

## Scope and limitations

- This hides a visual popup; it cannot unlock private content, make Facebook serve content that requires an account, or fix a redirect to a login page.
- Explicit login, signup, recovery and security pages stay available.
- Detection uses login form elements and English prompt text rather than Facebook's changing CSS class names. Other languages are not supported in this version.
- Built from the supplied screenshot. Tested against simulated popup DOM, including unrelated dialogs and a popup appearing after load; not verified on a live Facebook page. Facebook layout changes may require updates.

Manifest V3 content-script reference: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

## Version 1.1
Also hides separate, empty, translucent layers covering the viewport after detecting a login prompt. Verified with a simulated photo viewer that its button can be clicked after removing the separate backdrop. Live Facebook DOM has not been inspected.

To update an unpacked installation, replace its files with the current source, select **Reload** on the extension card, and reload your Facebook tab.

## Frequently asked questions

### How do I remove the Facebook login popup?

Install the extension and reload the public Facebook page. When it detects a supported English login dialog, it hides the prompt and its overlay automatically.

### Does it block the “See more on Facebook” popup?

Yes, that is the main popup this extension targets. It also recognizes supported “Log in to Facebook” dialogs containing account creation or password recovery text.

### Can I browse Facebook without logging in?

The extension can hide a login overlay on content Facebook has already made available to your browser. It cannot unlock private content, make Facebook serve account-only content, or bypass a redirect to a login page.

### Is this an ad blocker or a general browser popup blocker?

It specifically hides supported Facebook login dialogs. It does not block Facebook ads, new browser windows, or every type of Facebook popup.

### Why is Facebook still asking me to log in?

Facebook may use a different dialog, a non-English prompt, or a full login-page redirect. This version detects English dialog text and password form elements. Changes to Facebook's layout may require an update.

## Privacy and browser access

The extension runs on `facebook.com` and its subdomains. Its manifest declares one content script and no additional extension permissions. It does not send data to an external server or load remote code.

## Source files

- `manifest.json` — Chrome and Edge Manifest V3 configuration.
- `content.js` — login dialog detection, overlay hiding, and scroll restoration.

This is an independent project and is not affiliated with or endorsed by Facebook or Meta.
