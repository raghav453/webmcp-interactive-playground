# WebMCP interactive playground

Inspect schemas, invoke fictional tools and see results, human review and lifecycle changes in a responsive browser interface. This WebMCP playground is for developers who want to understand what was actually executed. It offers a visible compatibility mode, origin-scoped discovery, editable JSON input, separate manual and tool controls, a local execution trace and a human-reviewed support draft. It works independently of WebMCPly's unreleased platform.

## Run locally

Node.js 20+; no installation or backend required.

```sh
npm test
npm start
```

Open http://127.0.0.1:4173/. PORT can select another local port. The source is plain HTML/CSS/JavaScript and can be served on GitHub Pages from the root of main.

## What is real and what is experimental?

The code targets document.modelContext from the [13 November 2026 WebMCP draft](https://webmachinelearning.github.io/webmcp/), including async registration, discovery, executeTool with a discovered object, and AbortSignal cleanup. It checks the required API methods before enabling tool controls. The draft is experimental and is not a W3C Standard; Chrome's implementation may use another revision.

Manual controls call the same validated handlers directly and are labelled as manual. If the draft API is absent, explicitly enable the pinned polyfill 0.1.1 experiment. That mode uses the library's actual discovery/execution surface but does not prove native browser-agent compatibility. No mock registry replaces the API. Existing document.modelContext is never overwritten. HTTPS or trustworthy localhost is required for the experimental API.

## Try these checks

1. Catalogue: query lamp with maxPrice 50 returns only lamp-01.
2. Enter an unknown input property or wrong price type: validation fails.
3. Search missing: an explicit empty result appears.
4. Select the support draft, run it and cancel: no reviewed draft is recorded.
5. Run another draft and approve the exact displayed text: it appears in local state, and sent remains false.
6. Remove tools, refresh discovery and verify zero local demo tools; register again and verify four.

Detailed evidence and reproducible inspection steps are in [VERIFICATION.md](VERIFICATION.md). Registration/caller helpers are in [registration.mjs](registration.mjs); fictional business functions in [actions.mjs](actions.mjs); review cancellation/timeout in [review.mjs](review.mjs).

## Security, accessibility and limits

No real users, credentials, payments or messages are involved. Review shows exact text and recipient, defaults focus to cancellation, expires after 60 seconds, and honors cancellation. Outputs use textContent. The interface includes labels, visible status, keyboard focus, semantic headings and a mobile layout. A local dialog is not a trusted server approval token. A real operation still needs authorization, exact-payload confirmation binding, atomic replay control and failure recovery.

Unit tests cover contracts and negative cases; browser discovery/execution is a separate evidence category. Cross-origin delegation and external-agent task interoperability have not been established. Declarative forms are outside this playground's implementation.

## Maintain and reuse

Original code/docs are MIT. [Vendored polyfill](THIRD-PARTY.md) is Apache-2.0. [CONTRIBUTING.md](CONTRIBUTING.md) and [MAINTENANCE.md](MAINTENANCE.md) describe contribution and compatibility review. Shared actions/registration/review modules originate in the companion [action examples](https://github.com/raghav453/webmcp-action-examples); update and test both copies together. Keep this project's purpose focused on interactive evidence rather than duplicating the example tutorials.

Maintained by WebMCPly contributors. [WebMCPly's explanation](https://webmcply.com/what-is-webmcp) is an educational follow-up; the complete product is in pre-launch. [Project information and early access](https://webmcply.com/). No browser-vendor or standards-body endorsement is implied.
