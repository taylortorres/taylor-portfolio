// Shared with the sticky site header (SiteHeader.tsx). On phones the header
// hides while scrolling down; it publishes how much of it is showing as the
// --nav-offset CSS variable (globals.css), which sticky bars and scroll
// margins use.

export const HIDE_NAV = "nav:hide";

// Before a scripted jump (sidebar links, in-page anchors): if the target is
// below, hide the phone header first, so the jump lands under the section bar
// with no empty space where the header was. No effect from sm up.
export function hideNavForJump(target: Element | null | undefined) {
  if (target && target.getBoundingClientRect().top > 0) document.dispatchEvent(new Event(HIDE_NAV));
}
