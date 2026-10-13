// Home page intro (first load of the home page in a session). The timing
// lives in globals.css (the --intro-* values); this file only holds the
// decision, which must run before the first paint.

export const INTRO_KEY = "intro-played";

// Development only: /?intro=1 replays the intro on that load, ignoring the
// once-per-session rule. Production builds don't contain this check.
const DEV_REPLAY =
  process.env.NODE_ENV === "production" ? "false" : `new URLSearchParams(location.search).get("intro")==="1"`;

// Inline in <body> before any content (root layout), so the classes are set
// before the browser paints. `intro` turns the sequence on; `intro-wait`
// holds every animated element paused in its hidden start state until the
// headline fonts and the hero's images are ready (at most 600ms), so the
// sequence always starts cleanly. Then the timeline (and its 150ms hold)
// begins. Without JavaScript nothing is added and the page is static.
export const INTRO_SCRIPT = `(function(){try{
var d=document.documentElement,force=${DEV_REPLAY};
if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(!force&&sessionStorage.getItem("${INTRO_KEY}"))return;
sessionStorage.setItem("${INTRO_KEY}","1");
d.classList.add("intro","intro-wait");
var done=false,go=function(){if(done)return;done=true;d.classList.remove("intro-wait")};
setTimeout(go,600);
var ready=function(){var imgs=[].slice.call(document.querySelectorAll("section[aria-labelledby='hero-heading'] img"));
Promise.all([document.fonts.ready].concat(imgs.map(function(i){return i.decode?i.decode().catch(function(){}):0}))).then(function(){requestAnimationFrame(go)})};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready);else ready();
}catch(e){document.documentElement.classList.remove("intro-wait")}})()`;
