const { test, expect } = require('@playwright/test');

test.describe('isPointerOverButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('correctly identifies buttons and interactive elements, and ignores canvas', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    const result = await page.evaluate(() => {
      // Create some elements in the DOM for testing
      const btn = document.createElement('button');
      btn.id = 'test-btn';
      document.body.appendChild(btn);

      const spanInBtn = document.createElement('span');
      btn.appendChild(spanInBtn);

      const textInput = document.createElement('input');
      textInput.id = 'test-input';
      document.body.appendChild(textInput);

      const select = document.createElement('select');
      select.id = 'test-select';
      document.body.appendChild(select);

      const cursorPointerDiv = document.createElement('div');
      cursorPointerDiv.style.cursor = 'pointer';
      document.body.appendChild(cursorPointerDiv);

      const canvas = document.createElement('canvas');
      canvas.id = 'test-canvas';
      document.body.appendChild(canvas);

      const ordinaryDiv = document.createElement('div');
      ordinaryDiv.id = 'test-div';
      document.body.appendChild(ordinaryDiv);

      // Verify isPointerOverButton is defined
      if (typeof window.isPointerOverButton !== 'function') {
        return { error: 'isPointerOverButton is not defined on window' };
      }

      // Test cases
      const testCases = [
        { desc: 'button element', target: btn, expected: true },
        { desc: 'child element inside button', target: spanInBtn, expected: true },
        { desc: 'input element', target: textInput, expected: true },
        { desc: 'select element', target: select, expected: true },
        { desc: 'element with cursor: pointer', target: cursorPointerDiv, expected: true },
        { desc: 'canvas element', target: canvas, expected: false },
        { desc: 'ordinary div element', target: ordinaryDiv, expected: false }
      ];

      const outcomes = {};
      for (const tc of testCases) {
        const mockPointer = {
          downEvent: { target: tc.target },
          event: null
        };
        const mockPointer2 = {
          downEvent: null,
          event: { target: tc.target }
        };
        const res1 = window.isPointerOverButton(mockPointer);
        const res2 = window.isPointerOverButton(mockPointer2);
        outcomes[tc.desc] = { res1, res2, expected: tc.expected };
      }

      // Clean up elements
      [btn, textInput, select, cursorPointerDiv, canvas, ordinaryDiv].forEach(el => el.remove());

      return outcomes;
    });

    console.log('Test cases outcomes:', result);
    expect(result.error).toBeUndefined();

    for (const [desc, outcome] of Object.entries(result)) {
      expect(outcome.res1).toBe(outcome.expected);
      expect(outcome.res2).toBe(outcome.expected);
    }
  });
});
