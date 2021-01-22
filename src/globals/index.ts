import { setMode } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";

declare global {
  interface Window {
    [key: string]: any
  }
}

interface WebCardinalElement extends HTMLStencilElement {
  mode: string
}

export default _ => setMode((element: WebCardinalElement) => (
    element.mode || element.getAttribute('mode') || 'default'
));