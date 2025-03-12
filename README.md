# JavaScript Voice AutoType

JavaScript Voice AutoType is a free web application that leverages the Web Speech API to transform voice commands into live JavaScript code previews. This tool facilitates hands-free coding by interpreting spoken instructions and rendering them as executable code.

## Live Demo

[Try it here!](https://toxiclikith.github.io/js-auto-type/)

## Features

- **Continuous Voice Recognition:**  
  Upon granting microphone access, the application continuously listens for voice commands until "Stop Listening" is clicked.

- **Voice Command Interpretation:**  
  Specific phrases such as "open curly bracket" or "equals" are converted into their corresponding code symbols, while literal words and numbers are transcribed as spoken.

- **Cursor Navigation and Line Numbering:**  
  The code editor displays line numbers and a blinking cursor. Users can navigate the cursor using commands like "move left" or "go to line 3".

- **Editing Commands:**  
  - "backspace" removes the character preceding the cursor.  
  - "delete" removes the character following the cursor.  

- **Manual Code Editing:**  
  The "Edit Code" button opens a modal window, allowing direct text modifications.

- **Additional Features:**  
  The application includes help instructions, a "Copy Code" button, and a responsive design optimized for both desktop and mobile platforms.

## How to Use

1. **Access the Application:**  
   Open the application by hosting it locally or via GitHub Pages.

2. **Start Voice Recognition:**  
   Click the **Start Listening** button and grant microphone access when prompted.

3. **Issue Voice Commands:**  
   Speak your code instructions clearly. For example:
   - "var x equals 10"
   - "open curly bracket, new line, close curly bracket"

4. **Navigate and Edit Code:**  
   Use voice commands to navigate and edit the code:
   - "move left" or "move right"
   - "go to line 3"
   - "backspace"
   - "delete"

5. **Manual Editing:**  
   Click the **Edit Code** button to open the code editor modal for direct text input.

6. **Copy the Code:**  
   Use the **Copy Code** button to copy the generated code to your clipboard.

## Credits & License

Developed by [Toxiclikith](https://github.com/Toxiclikith)

Portfolio: [toxiclikith.github.io/portfolio/](https://toxiclikith.github.io/portfolio/)

Licensed under the [MIT License](https://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.

For major changes, please open an issue first to discuss your proposed modifications.

## Support

For support or to report issues, please visit the [GitHub repository](https://github.com/Toxiclikith/js-auto-type) and open an issue.

---

*Note: This application relies on the Web Speech API, which may have varying levels of support across different browsers. For the best experience, use the latest version of a compatible browser.*

