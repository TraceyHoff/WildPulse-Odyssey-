# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/visualTimerCircles.spec.js >> Active Visual Timer Circles >> should support split screen co-op symmetrically and isolate P1/P2 timer viewports
- Location: tests/visualTimerCircles.spec.js:62:3

# Error details

```
Error: Channel closed
```

```
Error: locator.boundingBox: Target page, context or browser has been closed
Call log:
  - waiting for locator('#p1Timers')
    - locator resolved to visible <div id="p1Timers" class="player-timers-container">…</div>

```

```
Error: browserContext.close: Target page, context or browser has been closed
```