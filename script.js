// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Determine the current page by checking for specific elements
    const isIndexPage = document.getElementById('terminal-container') !== null;
    const isResumePage = document.querySelector('.tab-container') !== null;

    if (isIndexPage) {
        // Handle Loading Screen and Terminal for index.html

        // Check if the loading screen has been shown in this session
        if (!sessionStorage.getItem('loadingShown')) {
            // Show loading screen
            document.getElementById('loading-screen').style.display = 'flex';
            // After loading animation, show the terminal
            setTimeout(function() {
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('terminal-container').classList.remove('hidden');
                document.getElementById('command-input').focus();
                sessionStorage.setItem('loadingShown', 'true');
                // Automatically display About Me on load
                processCommand('about');
            }, 2500); // Faster loading (2.5 seconds)
        } else {
            // Skip loading screen
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('terminal-container').classList.remove('hidden');
            document.getElementById('command-input').focus();
            // Automatically display About Me on load
            processCommand('about');
        }

        // Terminal command handling
        const commands = {
            help: {
                description: "List available commands",
                action: () => {
                    return "Available commands:\n- about\n- publications\n- education\n- experience\n- skills\n- linkedin\n- email\n- Climeworks\n- Goodwater Capital\n- fortune\n- joke\n- help\n- clear";
                }
            },
            about: {
                description: "Show about me information",
                action: () => {
                    return createAboutMeWidget();
                }
            },
            publications: {
                description: "Show publications",
                action: () => {
                    return `Publications:
1. Investigating Irradiated Superconducting Magnet Insulation Materials for Particle Accelerators
   Published in IEEE Transactions on Applied Superconductivity.
2. Smart Quench Management System Based on Fast Low-Level Voltage Measurements for HTS Magnets
   Presented at ASC 2024.`;
                }
            },
            education: {
                description: "Show education details",
                action: () => {
                    return `Education:
University of California Berkeley
B.S. Materials Science and Engineering & Nuclear Engineering
August 2022 - May 2026
GPA: 3.7
Activities and Societies: IEEE Indrel Officer, ANS Research Coordinator, Net Impact Berkeley, MSEA

Relevant Coursework:
- Thin-Film Materials Science
- Engineering Thermodynamics
- Mechanical Behavior of Materials
- Materials Characterization
- Advanced Modeling of Manufacturing Processes
- Statics and Mechanics of Materials
- Nuclear Reactions
- Bonding, Crystallography and Defects
- Controlled Fusion
- Modern Physics
- Properties of Materials
- Electricity and Magnetism`;
                }
            },
            experience: {
                description: "Show experience details",
                action: () => {
                    return `Experience:

Technical Experience:
1. Superconducting Magnet Program, LBNL
   Student Researcher | October 2023 – Present, Berkeley, CA
   - Created a quench detection system using LabView FPGA.
   - Developing machine-level denoising of voltage data.

2. Center for Complex and Active Materials, Pan Group
   Student Researcher | June 2024 – August 2024, Irvine, CA
   - Utilized STEM imaging to study ferroelectric interfaces.
   - Developed Python code to refine atomic positions.

3. Nuclear Materials Lab, UC Berkeley
   Undergraduate Research Assistant | September 2022 – September 2024, Berkeley, CA
   - Conducted SEM, EBSD, and tensile testing on steel.
   - Studied radiation effects on fusion materials.

4. Radiation Safety Committee, UC Berkeley
   Undergraduate Student Representative | June 2023 – Present, Berkeley, CA
   - Advised EH&S staff on radiation safety programs.

Management Experience:
1. Goodwater Capital
   Student Consultant | August 2024 – Present, Berkeley, CA
   - Conducted market analysis across nine global regions, identifying trends and growth opportunities.
   - Processed data for 15 key metrics, creating regional plans.
   - Created visualizations to identify strategic investment opportunities.

2. Climeworks
   Student Consultant | January 2024 – May 2024, Berkeley, CA
   - Analyzed market expansion possibilities for the Carbon Dioxide Removal (CDR) market.
   - Managed top 100 Salesforce accounts, assessing CDR adoption.
   - Developed strategic sales decision frameworks.

3. Kiss The Ground
   Student Consultant | August 2023 – December 2023, Berkeley, CA
   - Refined a B2B model to scale penetration in the EdTech market.
   - Developed go-to-market strategies using case studies.
   - Redesigned the website using interactive Figma prototypes.`;
                }
            },
            skills: {
                description: "Show technical skills",
                action: () => {
                    return `Technical Skills:

Software:
- Microsoft Office
- Figma
- Canva
- Python
- Data Analysis
- Research
- Data Acquisition

Technical:
- SEM
- Sample Preparation
- Mechanical Testing
- EDS
- EBSD
- TEM Sample Preparation
- X-Ray Diffraction
- STEM

Other:
- Organizational Skills
- Teamwork
- Leadership
- Interpersonal Skills`;
                }
            },
            'Climeworks': {
                description: "Show Climeworks experience",
                action: () => {
                    return `Climeworks:
Student Consultant | January 2024 – May 2024, Berkeley, CA
- Analyzed market expansion possibilities for the Carbon Dioxide Removal (CDR) market.
- Managed top 100 Salesforce accounts, assessing CDR adoption.
- Developed strategic sales decision frameworks.`;
                }
            },
            'Goodwater Capital': {
                description: "Show Goodwater Capital experience",
                action: () => {
                    return `Goodwater Capital:
Student Consultant | August 2024 – Present, Berkeley, CA
- Conducted market analysis across nine global regions, identifying trends and growth opportunities.
- Processed data for 15 key metrics, creating regional plans.
- Created visualizations to identify strategic investment opportunities.`;
                }
            },
            linkedin: {
                description: "Open LinkedIn profile",
                action: () => {
                    window.open('https://linkedin.com/in/mehnai', '_blank');
                    return 'Opening LinkedIn profile...';
                }
            },
            email: {
                description: "Open email client",
                action: () => {
                    window.location.href = 'mailto:mehulnair2005@gmail.com';
                    return 'Opening email client...';
                }
            },
            fortune: {
                description: "Get a random fortune",
                action: () => {
                    const fortunes = [
                        "Keep pushing forward!",
                        "Great things take time.",
                        "Believe in yourself.",
                        "Stay positive and happy.",
                        "Embrace the challenges ahead."
                    ];
                    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                    return `Fortune: ${randomFortune}`;
                }
            },
            joke: {
                description: "Hear a joke",
                action: () => {
                    const jokes = [
                        "Why do programmers prefer dark mode? Because light attracts bugs!",
                        "Why did the developer go broke? Because he used up all his cache.",
                        "Why do Java developers wear glasses? Because they don't see sharp."
                    ];
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                    return `Joke: ${randomJoke}`;
                }
            },
            clear: {
                description: "Clear the terminal",
                action: () => {
                    document.getElementById('output').innerHTML = '';
                    return '';
                }
            }
        };

        const input = document.getElementById('command-input');
        const output = document.getElementById('output');
        const autocompleteList = document.getElementById('autocomplete-list');

        // Autocomplete Variables
        const availableCommands = Object.keys(commands);
        let currentFocus = -1;

        // Handle input for autocomplete
        input.addEventListener('input', function(e) {
            const value = this.value;
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
                        input.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                        input.focus();
                        processCommand(input.value);
                        input.value = '';
                    });
                    autocompleteList.appendChild(suggestion);
                }
            });
        });

        // Handle keydown events for autocomplete navigation
        input.addEventListener('keydown', function(e) {
            let x = autocompleteList.getElementsByTagName('div');
            if (e.keyCode == 40) { // Down key
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { // Up key
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) { // Enter key
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                } else {
                    const command = this.value.trim();
                    processCommand(command);
                    this.value = '';
                    closeAllLists();
                }
            }
        });

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
        function closeAllLists(elmnt) {
            while (autocompleteList.firstChild) {
                autocompleteList.removeChild(autocompleteList.firstChild);
            }
        }

        // Close autocomplete when clicking outside
        document.addEventListener('click', function (e) {
            if (e.target != input) {
                closeAllLists(e.target);
            }
        });

        // Handle Enter key to process command
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                processCommand(command);
                input.value = '';
                closeAllLists();
            }
        });

        // Process the entered command
        function processCommand(command) {
            appendOutput(`MehulNair@Home:~$ ${command}`);
            if (command === '') return;
            const cmd = command.toLowerCase();
            if (commands[cmd] || commands[command]) { // Handle case-sensitive resume headings
                const response = commands[cmd] ? commands[cmd].action() : commands[command].action();
                appendOutput(response);
            } else {
                appendOutput(`Command not found: ${command}`);
            }
        }

        // Append text or widgets to the terminal output
        function appendOutput(text) {
            if (text.includes('<div class="about-me-widget">')) {
                // Inject About Me Widget
                const widgetDiv = document.createElement('div');
                widgetDiv.innerHTML = text;
                output.appendChild(widgetDiv);
            } else {
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

        // Function to create About Me widget
        function createAboutMeWidget() {
            return `
<div class="about-me-widget">
    <img src="mehul.png" alt="Mehul Nair">
    <div class="about-text">
        Hello! I'm Mehul Nair, a passionate Materials Science and Nuclear Engineering student at the University of California Berkeley.
        I specialize in superconducting magnet research and have experience in both technical and management roles.
        Type 'help' for a list of available commands.
    </div>
</div>`;
        }
    }

    if (isResumePage) {
        // Handle Resume Page Tabs

        // Function to open a specific tab
        window.openTab = function(event, tabName) {
            var i, tabcontent, tabbuttons;
            tabcontent = document.getElementsByClassName("tab-pane");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.remove("active");
            }
            tabbuttons = document.getElementsByClassName("tab-button");
            for (i = 0; i < tabbuttons.length; i++) {
                tabbuttons[i].classList.remove("active");
            }
            document.getElementById(tabName).classList.add("active");
            event.currentTarget.classList.add("active");
        }
    }
});