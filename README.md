# JavaScript Voice AutoType

This free web application uses the Web Speech API to capture voice commands and auto-types JavaScript code into a live preview. It features:

- **Continuous Listening:**  
  Once microphone permission is granted, the app continuously listens until you click "Stop Listening."

- **Voice Command Mapping:**  
  Special phrases (like "open curly bracket" or "equals") are converted to code symbols, while literal words and numbers remain unchanged.

- **Cursor Control & Line Numbers:**  
  The code preview displays line numbers and a blinking cursor. You can move the cursor with commands (e.g., "move left," "go to line 3").

- **Editing Commands:**  
  • "backspace" removes a single character.  
  • "delete" removes the last complete word.

- **Manual Code Editing:**  
  Click the "Edit Code" button to open a modal, where you can edit the code directly.

- **Additional Features:**  
  Help instructions, a Copy Code button, and responsive design for both desktop and mobile.

## How to Use

1. Open the application (host on GitHub Pages or locally).
2. Click **Start Listening** and grant microphone access.
3. Speak commands (e.g., "var x equals 10", "open curly bracket, new line, close curly bracket").
4. Use commands like "move left/right/up/down", "go to line 3", "backspace", and "delete" for editing.
5. Click **Edit Code** to manually modify the code.
6. Click **Copy Code** to copy the full code.

## Credits & License

Developed by [Toxiclikith](https://github.com/Toxiclikith)  
Portfolio: [toxiclikith.github.io/portfolio/](https://toxiclikith.github.io/portfolio/)  
Licensed by Toxiclikith
