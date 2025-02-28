// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Terminal elements
    const terminalContainer = document.getElementById('terminal-container');
    const outputElement = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const loadingScreen = document.getElementById('loading-screen');
    const autocompleteList = document.getElementById('autocomplete-list');
    
    // Available commands
    const availableCommands = [
        'help', 'about', 'skills', 'projects', 'contact', 'clear', 
        'education', 'experience', 'social', 'resume', 'ls', 'cd'
    ];
    
    let commandHistory = [];
    let historyIndex = -1;
    let suggestions = [];
    let selectedSuggestionIndex = -1;

    // Simulate loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            terminalContainer.classList.remove('hidden');
            commandInput.focus();
            
            // Display welcome message
            displayWelcomeMessage();
        }, 500);
    }, 1500);
    
    // Display welcome message
    function displayWelcomeMessage() {
        const welcomeMessage = `
Welcome to Mehul Nair's interactive terminal portfolio!
Type 'help' to see available commands.
`;
        appendToOutput(welcomeMessage);
    }
    
    // Handle command input
    commandInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Enter':
                const command = commandInput.value.trim();
                if (command) {
                    processCommand(command);
                    commandHistory.unshift(command);
                    historyIndex = -1;
                }
                commandInput.value = '';
                hideAutocomplete();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (autocompleteList.style.display === 'block') {
                    navigateSuggestions(-1);
                } else if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (autocompleteList.style.display === 'block') {
                    navigateSuggestions(1);
                } else if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    commandInput.value = '';
                }
                break;
                
            case 'Tab':
                e.preventDefault();
                if (suggestions.length === 1) {
                    commandInput.value = suggestions[0];
                } else if (suggestions.length > 0) {
                    showAutocomplete();
                }
                break;
                
            case 'Escape':
                hideAutocomplete();
                break;
        }
    });
    
    // Handle command input changes for autocompletion
    commandInput.addEventListener('input', () => {
        const input = commandInput.value.trim().toLowerCase();
        if (input) {
            suggestions = availableCommands.filter(cmd => cmd.startsWith(input));
            if (suggestions.length > 0) {
                showAutocomplete();
            } else {
                hideAutocomplete();
            }
        } else {
            hideAutocomplete();
        }
    });
    
    // Process the entered command
    function processCommand(command) {
        appendToOutput(`<span class="prompt">MehulNair@Home:~$</span> ${command}`);
        
        const commandLower = command.toLowerCase().trim();
        const args = commandLower.split(' ');
        const primaryCommand = args[0];
        
        if (typeof commands[primaryCommand] === 'function') {
            commands[primaryCommand](args.slice(1));
        } else {
            appendToOutput(`<span class="error">Command not found: ${primaryCommand}. Type 'help' for available commands.</span>`);
        }
    }
    
    // Append content to terminal output
    function appendToOutput(content) {
        outputElement.innerHTML += `<div>${content}</div>`;
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
    
    // Show autocomplete suggestions
    function showAutocomplete() {
        autocompleteList.innerHTML = '';
        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                commandInput.value = suggestion;
                hideAutocomplete();
                commandInput.focus();
            });
            autocompleteList.appendChild(item);
        });
        autocompleteList.style.display = 'block';
        selectedSuggestionIndex = -1;
    }
    
    // Hide autocomplete suggestions
    function hideAutocomplete() {
        autocompleteList.style.display = 'none';
        selectedSuggestionIndex = -1;
    }
    
    // Navigate through suggestions
    function navigateSuggestions(direction) {
        const suggestionItems = autocompleteList.querySelectorAll('.suggestion');
        
        // Clear previous selection
        if (selectedSuggestionIndex >= 0) {
            suggestionItems[selectedSuggestionIndex].classList.remove('active');
        }
        
        // Update index
        selectedSuggestionIndex += direction;
        
        // Handle wrapping
        if (selectedSuggestionIndex < 0) {
            selectedSuggestionIndex = suggestionItems.length - 1;
        } else if (selectedSuggestionIndex >= suggestionItems.length) {
            selectedSuggestionIndex = 0;
        }
        
        // Apply new selection
        suggestionItems[selectedSuggestionIndex].classList.add('active');
        commandInput.value = suggestions[selectedSuggestionIndex];
    }
    
    // Always focus on command input when clicking terminal
    terminalContainer.addEventListener('click', () => {
        commandInput.focus();
    });
});