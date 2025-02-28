// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Determine if it's the index (Home) page by checking for 'terminal-container'
    const isIndexPage = document.getElementById('terminal-container') !== null;

    if (!isIndexPage) return; // Only initialize on Home page

    // Declare global variables
    let output = null;
    window.gameState = null; // Make gameState globally accessible

    // Function to initialize the terminal
    function initializeTerminal() {
        // Handle Loading Screen
        const loadingScreen = document.getElementById('loading-screen');
        const terminalContainer = document.getElementById('terminal-container');
        const commandInput = document.getElementById('command-input');
        output = document.getElementById('output');
        const autocompleteList = document.getElementById('autocomplete-list');

        // Command history functionality
        let commandHistory = [];
        let historyIndex = -1;

        // Check if the loading screen has been shown in this session
        if (!sessionStorage.getItem('loadingShown')) {
            // Show loading screen
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
            }

            // After loading animation, show the terminal
            setTimeout(function() {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                if (terminalContainer) {
                    terminalContainer.classList.remove('hidden');
                }
                if (commandInput) {
                    commandInput.focus();
                }
                sessionStorage.setItem('loadingShown', 'true');
                // Automatically display About Me on load
                processCommand('about');
            }, 2500); // 2.5 seconds
        } else {
            // Skip loading screen
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            if (terminalContainer) {
                terminalContainer.classList.remove('hidden');
            }
            if (commandInput) {
                commandInput.focus();
            }
            // Automatically display About Me on load
            processCommand('about');
        }

        // Ensure that 'commands' object is loaded
        if (typeof commands === 'undefined') {
            console.error("Commands not loaded. Please ensure commands.js is included before script.js");
            return;
        }

        // Initialize Autocomplete Variables
        const availableCommands = Object.keys(commands);
        let currentFocus = -1;

        // Handle input for autocomplete
        function handleInput() {
            const value = commandInput.value;
            closeAllLists();
            if (!value) return false;
            currentFocus = -1;

            availableCommands.forEach(function(cmd) {
                if (cmd.substr(0, value.length).toLowerCase() === value.toLowerCase()) {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('autocomplete-suggestion');
                    suggestion.innerHTML = "<strong>" + cmd.substr(0, value.length) + "</strong>";
                    suggestion.innerHTML += cmd.substr(value.length);
                    suggestion.innerHTML += "<input type='hidden' value='" + cmd + "'>";
                    suggestion.addEventListener('click', function(e) {
                        commandInput.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                        commandInput.focus();
                        processCommand(commandInput.value);
                        commandInput.value = '';
                    });
                    autocompleteList.appendChild(suggestion);
                }
            });
        }

        commandInput.addEventListener('input', handleInput);

        // Handle keydown events for autocomplete navigation
        function handleKeyDown(e) {
            const x = autocompleteList.getElementsByTagName('div');
            if (e.key === 'ArrowDown') { // Down key
                currentFocus++;
                addActive(x);
            } else if (e.key === 'ArrowUp') { // Up key
                currentFocus--;
                addActive(x);
            } else if (e.key === 'Enter') { // Enter key
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x[currentFocus]) x[currentFocus].click();
                } else {
                    const command = commandInput.value.trim();
                    processCommand(command);
                    commandInput.value = '';
                    closeAllLists();
                }
            }
        }

        commandInput.addEventListener('keydown', handleKeyDown);

        // Add active class to current suggestion
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = x.length - 1;
            x[currentFocus].classList.add('active');
        }

        // Remove active class from all suggestions
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('active');
            }
        }

        // Close all autocomplete lists
        function closeAllLists() {
            while (autocompleteList.firstChild) {
                autocompleteList.removeChild(autocompleteList.firstChild);
            }
        }

        // Close autocomplete when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target != commandInput) {
                closeAllLists();
            }
        });

        // Process the entered command
        function processCommand(command) {
            if (command === '') return;

            appendOutput(`MehulNair@Home:~$ ${command}`);
            const parts = command.trim().split(' ');
            const cmd = parts.shift().toLowerCase();
            const args = parts.join(' ');

            if (commands[cmd]) {
                const response = commands[cmd].action(args);
                if (response !== undefined && response !== '') {
                    appendOutput(response);
                }
            } else if (commands[command]) { // Handle case-sensitive commands
                const response = commands[command].action();
                if (response !== undefined && response !== '') {
                    appendOutput(response);
                }
            } else {
                appendOutput(`Command not found: ${command}`);
            }
        }

        // Append text or widgets to the terminal output
        function appendOutput(text) {
            if (typeof text !== 'string') return;

            // Check if the response is HTML by looking for HTML tags
            const isHTML = /<\/?[a-z][\s\S]*>/i.test(text.trim());

            if (isHTML) {
                // Create a temporary container to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text;

                // Append each child to the output
                Array.from(tempDiv.children).forEach(child => {
                    output.appendChild(child);
                });
            } else {
                // Treat as plain text
                const lines = text.split('\n');
                lines.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.textContent = line;
                    output.appendChild(lineElement);
                });
            }
            scrollToBottom();
        }

        // Scroll terminal to the bottom
        function scrollToBottom() {
            output.scrollTop = output.scrollHeight;
        }

        // Welcome message function
        function printWelcomeMessage() {
            const welcomeMessage = `
Welcome to Mehul Nair's personal terminal.
Type 'help' to see available commands.

`;
            typeText(welcomeMessage);
        }

        // Simulates typing text character by character
        function typeText(text, speed = 10) {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    output.textContent += text[i];
                    output.scrollTop = output.scrollHeight; // Auto scroll
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
        }

        // Handle input for autocomplete
        commandInput.addEventListener('input', function() {
            handleAutocomplete();
        });

        // Click outside to clear autocomplete
        document.addEventListener('click', function(e) {
            if (e.target !== commandInput && e.target !== autocompleteList) {
                autocompleteList.innerHTML = '';
                autocompleteList.style.display = 'none';
            }
        });

        // Focus input when terminal is clicked
        document.getElementById('terminal').addEventListener('click', function() {
            commandInput.focus();
        });

        // Function to process entered commands
        function processCommand(command) {
            const commandLower = command.toLowerCase();
            const args = commandLower.split(' ');
            const cmd = args[0];

            // Use the handleCommand function from commands.js
            handleCommand(cmd, args);
        }

        // Export functions to window object for access from commands.js
        window.terminalOutput = output;
        window.typeText = typeText;
    }

    // Initialize the terminal
    initializeTerminal();
});