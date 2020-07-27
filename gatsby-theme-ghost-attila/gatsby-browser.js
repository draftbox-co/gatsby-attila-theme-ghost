/* global window, document */

const instaEmbedClasses = [".instagram-media"].join(",");
const twitterEmbedClasses = [
  ".twitter-tweet",
  ".twitter-timeline",
  ".twitter-follow-button",
  ".twitter-share-button",
].join(",");
const scrollTo = (id) => () => {
  const el = document.querySelector(id);
  if (el) return window.scrollTo(0, el.offsetTop - 20);
  return false;
};

const injectScript = function injectScript() {
  var js = document.createElement("script");
  var firstScript = document.getElementsByTagName("script")[0];
  js.id = "gatsby-plugin-instagram";
  js.src = "https://instagram.com/embed.js";
  firstScript.parentNode.insertBefore(js, firstScript);
  injected = true;
  if (
    typeof instgrm !== "undefined" &&
    window.instgrm.Embeds &&
    typeof window.instgrm.Embeds.process === "function"
  ) {
    // manual process
    window.instgrm.Embeds.process();
  }
  return true;
};

var injectTwitterScript = function injectTwitterScript() {
  function addJS(jsCode) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerText = jsCode;
    document.getElementsByTagName("head")[0].appendChild(s);
    injectedTwitterScript = true;

    if (
      typeof twttr !== "undefined" &&
      window.twttr.widgets &&
      typeof window.twttr.widgets.load === "function"
    ) {
      window.twttr.widgets.load();
    }
  }

  addJS(
    '\n    window.twttr = (function(d, s, id) {\n      var js,\n        fjs = d.getElementsByTagName(s)[0],\n        t = window.twttr || {};\n      if (d.getElementById(id)) return t;\n      js = d.createElement(s);\n      js.id = id;\n      js.src = "https://platform.twitter.com/widgets.js";\n      fjs.parentNode.insertBefore(js, fjs);\n      t._e = [];\n      t.ready = function(f) {\n        t._e.push(f);\n      };\n      return t;\n    })(document, "script", "twitter-wjs");\n  '
  );
};
let injected = false;
let injectedTwitterScript = false;

export const onRouteUpdate = ({ location: { hash } }) => {
  if (hash) {
    window.setTimeout(scrollTo(hash), 10);
  }

  if (document.querySelector(instaEmbedClasses) !== null) {
    setTimeout(() => {
      if (!injected) {
        window.addEventListener(
          "scroll",
          function () {
            injectScript();
          },
          { once: true }
        );
      }
    }, 2000);
  }

  if (document.querySelector(twitterEmbedClasses) !== null) {
    setTimeout(() => {
      if (!injectedTwitterScript) {
        window.addEventListener(
          "scroll",
          function () {
            injectTwitterScript();
          },
          { once: true }
        );
      }
    }, 2000);
  }
};

export const registerServiceWorker = () => true;