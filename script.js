document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const helpBtn = document.getElementById('help-btn');
    const copyBtn = document.getElementById('copy-btn');
    const editBtn = document.getElementById('edit-btn');
    const statusDiv = document.getElementById('status');
    const codePreview = document.getElementById('code-preview');
  
    const editModal = document.getElementById('edit-modal');
    const editTextarea = document.getElementById('edit-textarea');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
  
    let codeLines = [""];
    let cursor = { line: 0, col: 0 };
  
    function updateDisplay() {
      let html = "";
      for (let i = 0; i < codeLines.length; i++) {
        let lineContent = codeLines[i];
        if (i === cursor.line) {
          let before = lineContent.substring(0, cursor.col);
          let after = lineContent.substring(cursor.col);
          lineContent = before + `<span class="cursor">|</span>` + after;
        }
        html += `<div class="code-line"><span class="line-number">${i + 1}</span> ${lineContent}</div>`;
      }
      codePreview.innerHTML = html;
    }
    updateDisplay();
  
    function insertAtCursor(text) {
      let line = codeLines[cursor.line];
      codeLines[cursor.line] = line.substring(0, cursor.col) + text + line.substring(cursor.col);
      cursor.col += text.length;
      updateDisplay();
    }
  
    function backspace() {
      if (cursor.col > 0) {
        let line = codeLines[cursor.line];
        codeLines[cursor.line] = line.substring(0, cursor.col - 1) + line.substring(cursor.col);
        cursor.col--;
      } else if (cursor.line > 0) {
        let prevLine = codeLines[cursor.line - 1];
        let currentLine = codeLines[cursor.line];
        cursor.col = prevLine.length;
        codeLines[cursor.line - 1] = prevLine + currentLine;
        codeLines.splice(cursor.line, 1);
        cursor.line--;
      }
      updateDisplay();
    }
  
    function deleteWord() {
      let line = codeLines[cursor.line];
      if (cursor.col > 0) {
        let before = line.substring(0, cursor.col).trimEnd();
        let after = line.substring(cursor.col);
        let lastSpace = before.lastIndexOf(" ");
        if (lastSpace === -1) {
          codeLines[cursor.line] = after;
          cursor.col = 0;
        } else {
          codeLines[cursor.line] = before.substring(0, lastSpace) + after;
          cursor.col = lastSpace;
        }
      } else if (cursor.line > 0) {
        let prevLine = codeLines[cursor.line - 1];
        let currentLine = codeLines[cursor.line];
        cursor.col = prevLine.length;
        codeLines[cursor.line - 1] = prevLine + currentLine;
        codeLines.splice(cursor.line, 1);
        cursor.line--;
      }
      updateDisplay();
    }
  
    function moveCursorLeft() {
      if (cursor.col > 0) {
        cursor.col--;
      } else if (cursor.line > 0) {
        cursor.line--;
        cursor.col = codeLines[cursor.line].length;
      }
      updateDisplay();
    }
  
    function moveCursorRight() {
      if (cursor.col < codeLines[cursor.line].length) {
        cursor.col++;
      } else if (cursor.line < codeLines.length - 1) {
        cursor.line++;
        cursor.col = 0;
      }
      updateDisplay();
    }
  
    function moveCursorUp() {
      if (cursor.line > 0) {
        cursor.line--;
        cursor.col = Math.min(cursor.col, codeLines[cursor.line].length);
      }
      updateDisplay();
    }
  
    function moveCursorDown() {
      if (cursor.line < codeLines.length - 1) {
        cursor.line++;
        cursor.col = Math.min(cursor.col, codeLines[cursor.line].length);
      }
      updateDisplay();
    }
  
    function goToLine(lineNum) {
      if (lineNum < 1) return;
      if (lineNum > codeLines.length) {
        while (codeLines.length < lineNum) {
          codeLines.push("");
        }
      }
      cursor.line = lineNum - 1;
      cursor.col = 0;
      updateDisplay();
    }
  
    function insertNewLine() {
      let line = codeLines[cursor.line];
      let before = line.substring(0, cursor.col);
      let after = line.substring(cursor.col);
      codeLines[cursor.line] = before;
      codeLines.splice(cursor.line + 1, 0, after);
      cursor.line++;
      cursor.col = 0;
      updateDisplay();
    }
  
    editBtn.addEventListener('click', () => {
      editTextarea.value = codeLines.join("\n");
      editModal.style.display = "block";
    });
  
    saveBtn.addEventListener('click', () => {
      codeLines = editTextarea.value.split("\n");
      cursor.line = codeLines.length - 1;
      cursor.col = codeLines[cursor.line].length;
      updateDisplay();
      editModal.style.display = "none";
    });
  
    cancelBtn.addEventListener('click', () => {
      editModal.style.display = "none";
    });
  
    let recognition;
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      recognition = new SpeechRecognition();
    } else {
      statusDiv.textContent = "Sorry, your browser does not support Speech Recognition.";
    }
  
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
  
      recognition.onstart = () => {
        statusDiv.textContent = "Listening... Please speak your command.";
      };
  
      recognition.onerror = (event) => {
        statusDiv.textContent = "Error: " + event.error;
      };
  
      recognition.onend = () => {
        statusDiv.textContent = "Listening stopped. Click 'Start Listening' to resume.";
      };
  
      recognition.onresult = (event) => {
        let transcript = event.results[event.results.length - 1][0].transcript;
        transcript = transcript.replace(/[.?!]+$/, "");
        statusDiv.textContent = "Heard: " + transcript;
        processVoiceCommand(transcript);
      };
  
      startBtn.addEventListener('click', () => {
        try {
          recognition.start();
          statusDiv.textContent = "Listening... Please speak your command.";
        } catch (e) {
          statusDiv.textContent = "Error starting speech recognition: " + e.message;
        }
      });
  
      stopBtn.addEventListener('click', () => {
        recognition.stop();
        statusDiv.textContent = "Listening stopped.";
      });
    }
  
    const mapping = {
      "open curly bracket": "{",
      "open curly": "{",
      "close curly bracket": "}",
      "close curly": "}",
      "open bracket": "[",
      "close bracket": "]",
      "open parenthesis": "(",
      "close parenthesis": ")",
      "semi colon": ";",
      "colon": ":",
      "comma": ",",
      "dot": ".",
      "equals": "=",
      "is equal to": "=",
      "plus": "+",
      "minus": "-",
      "asterisk": "*",
      "slash": "/",
      "backslash": "\\",
      "quote": "'",
      "double quote": "\"",
      "space": " "
    };
  
    function processVoiceCommand(commandText) {
      let commands = commandText.split(/,| and /i).map(s => s.trim());
      commands.forEach(cmd => {
        if (/^go to line (\d+)$/i.test(cmd)) {
          let match = cmd.match(/^go to line (\d+)$/i);
          let lineNum = parseInt(match[1]);
          goToLine(lineNum);
        } else if (/^(move left)$/i.test(cmd)) {
          moveCursorLeft();
        } else if (/^(move right)$/i.test(cmd)) {
          moveCursorRight();
        } else if (/^(move up)$/i.test(cmd)) {
          moveCursorUp();
        } else if (/^(move down)$/i.test(cmd)) {
          moveCursorDown();
        } else if (/^(backspace)$/i.test(cmd)) {
          backspace();
        } else if (/^(delete)$/i.test(cmd)) {
          deleteWord();
        } else if (/^(new line|go to next line)$/i.test(cmd)) {
          insertNewLine();
        } else {
          let processed = cmd.toLowerCase();
          let keys = Object.keys(mapping).sort((a, b) => b.length - a.length);
          keys.forEach(key => {
            let regex = new RegExp("\\b" + key + "\\b", "gi");
            processed = processed.replace(regex, mapping[key]);
          });
          insertAtCursor(processed);
        }
      });
    }
  
    helpBtn.addEventListener('click', () => {
      alert(`Voice AutoType Help:
  You can speak JavaScript code commands and control the cursor by voice.
  
  Insertion Examples:
    • "var x equals 10" → inserts: var x = 10
    • "console dot log open parenthesis double quote Hello World double quote close parenthesis semi colon"
      → inserts: console.log("Hello World");
  
  Cursor Movement:
    • "move left" — move cursor one character left.
    • "move right" — move cursor one character right.
    • "move up" — move cursor to the previous line.
    • "move down" — move cursor to the next line.
    • "go to line 3" — move cursor to the beginning of line 3.
    • "new line" or "go to next line" — insert a new line.
  
  Editing:
    • "backspace" — remove the character before the cursor.
    • "delete" — remove the last complete word before the cursor.
  
  You can also click "Edit Code" to manually edit the code.
  Press "Copy Code" to copy the full code.`);
    });
  
    copyBtn.addEventListener('click', () => {
      const fullCode = codeLines.join("\n");
      navigator.clipboard.writeText(fullCode)
        .then(() => { alert("Code copied to clipboard!"); })
        .catch(err => { alert("Error copying code: " + err); });
    });
  });
  