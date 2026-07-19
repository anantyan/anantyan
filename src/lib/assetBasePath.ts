// GitHub Pages serves this site as a project site under /anantyan (this repo
// isn't a <username>.github.io repo), while local dev/build stays at the
// root. next.config.ts applies this same conditional to the framework's own
// basePath; anything NOT routed through Next's basePath-aware asset pipeline
// (explicit metadata.icons paths, next/image with images.unoptimized) needs
// this prefix applied manually.
export const assetBasePath =
  process.env.GITHUB_ACTIONS === "true" ? "/anantyan" : "";
