/** This is free and unencumbered software released into the public domain. */

// from https://developer.mozilla.org/en-US/docs/Glossary/Base64 (CC0)
function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(binString);
}

const stringToUTF8Base64 = (string) => bytesToBase64(new TextEncoder().encode(string));

const ocamlPlaygroundUrl = (code) =>
  code === null ?
    "https://ocaml.org/play" :
    `https://ocaml.org/play#code=${stringToUTF8Base64(code)}`

function writeOutput(s) {
  document.getElementById("output").innerHTML = s;
}

document.addEventListener("DOMContentLoaded", () => {
  writeOutput("Redirecting...");

  const playground = new URLSearchParams(window.location.search).get("playground");
  const code = location.hash.length > 0 ? decodeURIComponent(location.hash.substring(1)) : null;

  let target;
  switch (playground) {
    case "ocamlplay":
      target = ocamlPlaygroundUrl(code);
      break;
    case null:
      writeOutput(
        "Error: no playground provided " +
        "(<code>?playground=&lt...&gt</code> search parameter)");
      return;
    default:
      writeOutput("Error: unsupported playground.");
      return;
  }

  window.location.replace(target);
});
