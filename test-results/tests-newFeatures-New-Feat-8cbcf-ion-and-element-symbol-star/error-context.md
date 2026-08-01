# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/newFeatures.spec.js >> New Features Tests >> shiny creature notifications, culling protection, and element symbol star
- Location: tests/newFeatures.spec.js:88:3

# Error details

```
Error: page.evaluate: TypeError: scene.textures.get is not a function
    at spawnCreature (http://localhost:3000/:21449:36)
    at eval (eval at evaluate (:311:30), <anonymous>:56:14)
    at UtilityScript.evaluate (<anonymous>:313:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: Hospital
  - button "Menu" [ref=e4]
```