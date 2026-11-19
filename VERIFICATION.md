# Verification record and reproduction

Review date: 19 November 2026. Code targets the 13 November draft; optional polyfill is 0.1.1.

## Automated handler and contract tests

Run npm test. These tests assert known fixture results, input rejection, cancellation, review payloads, partial-registration rollback and expected-origin selection. The registration/caller tests use mocks and do not establish native browser registration.

## Browser reproduction

1. Run npm start and open the printed trustworthy localhost URL in a clean browser. Record browser/version/OS and visible mode.
2. Run the known catalogue input manually; retain lamp-01 as the expected result. Record it as manual execution.
3. Without replacing an existing API, use native draft support if available, otherwise explicitly select the pinned polyfill experiment. Record that mode separately.
4. Use the tool invocation control. Verify getTools discovered the expected name/origin and executeTool returned the expected fixture result.
5. Test wrong type/unknown field and an empty query result.
6. Invoke the support draft: cancel, approve another exact fictional message, cancel an in-flight review and wait for review expiry. Check no message is sent and refusal/abort adds no approved draft.
7. Remove registration; await document.modelContext.getTools() in a compatible draft runtime and verify the demo names are absent. Re-register/reload and verify no duplicates.
8. Check keyboard-only review, safe rendering of HTML-shaped text, mobile width and visible execution-path labels.

## Evidence scope

Fill the actual browser record after running: browser/version/OS, origin, native/polyfill/manual mode, expected/actual results, discovery, execution, confirmation, cancellation, timeout and cleanup. Native browser-agent compatibility and external agent tasks require separate tests. A successful polyfill run is limited to that library/environment. Production authorization, durable idempotency and recovery are outside these local fictional demos.

See [Chrome setup](https://developer.chrome.com/docs/ai/webmcp) and [draft specification](https://webmachinelearning.github.io/webmcp/).

## Observed browser run

Chrome 157.0.8103.79 on Windows, 19 November 2026, trustworthy localhost. No required native draft API was exposed. The explicit polyfill 0.1.1 mode registered and discovered the intended tools and returned the known catalogue fixture through getTools → executeTool. Manual execution was recorded separately. Playground checks passed for documentation and availability lookup, unknown-property rejection, empty result, exact literal-text review, refusal, local approval with sent:false, 60-second review expiry, registration removal and re-registration without duplicates. Narrow-viewport review showed no horizontal overflow at the observed 468 CSS-pixel width.

This is polyfill/browser-interface evidence. Native browser-agent invocation, cross-origin delegation, real server authorization and durable replay protection remain unverified/out of scope.
