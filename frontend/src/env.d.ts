/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "twisty-player": Record<string, unknown>;
    }
  }
}

export {};
