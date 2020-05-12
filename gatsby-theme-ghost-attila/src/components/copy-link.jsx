import React, { useState } from "react";
import copyIcon from "../images/copy.svg";
import copiedIcon from "../images/copied.svg";

const CopyLink = ({ textToCopy }) => {
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(false);

  const copyToClipboard = (e) => {
    e.preventDefault();
    if (window["clipboardData"] && window["clipboardData"].setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      setCopiedToClipBoard(true);

      setTimeout(() => {
        setCopiedToClipBoard(false);
      }, 5000);
      return window["clipboardData"].setData("Text", textToCopy);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = textToCopy;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        setCopiedToClipBoard(true);

        setTimeout(() => {
          setCopiedToClipBoard(false);
        }, 5000);
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <button
      onClick={(e) => copyToClipboard(e)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      title="Copy to clipboard"
      className="copy"
    >
      <i className="icon">
        <img
          style={{ marginLeft: "2px", height: "14px" }}
          src={copiedToClipBoard ? copiedIcon : copyIcon}
          alt=""
        />
      </i>
      <span className="hidden">Copy</span>
    </button>
  );
};

export default CopyLink;
