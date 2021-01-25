import { setMode } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";

type WebCardinalWindow = {
  [key: string]: any
}

declare global {
  interface Window extends WebCardinalWindow {}
}

interface WebCardinalElement extends HTMLStencilElement {
  mode: string
}

export type { WebCardinalWindow };

export default _ => setMode((element: WebCardinalElement) => (
    element.mode || element.getAttribute('mode') || 'default'
));

