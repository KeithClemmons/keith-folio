export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before first paint so the page never flashes the wrong theme.
// A saved choice wins; otherwise the device setting decides.
export const themeScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;
