import { ViewTransition } from "react";

// Page transition for every route. A template remounts on each navigation, so:
// - enter: the wrapper's CSS animation (blur-to-sharp + fade) runs on the
//   first load and after every navigation, with no JavaScript.
// - exit: on client navigations React snapshots the old page and fades it out
//   (::view-transition-old(.page-exit) in globals.css). Browsers without the
//   View Transitions API just skip the exit.
// Reduced motion: both are off and pages swap instantly. During the home
// intro (html.intro) the enter is replaced by the intro (globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="none" exit="page-exit" default="none">
      <div data-page className="flex flex-1 flex-col motion-safe:animate-page-enter">{children}</div>
    </ViewTransition>
  );
}
