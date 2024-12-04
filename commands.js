// commands.js

function createAboutMeWidget() {
    return `
<div class="about-me-widget">
    <img src="mehul.png" alt="Mehul Nair">
    <div class="about-text">
        Hello! I'm Mehul Nair, a passionate Materials Science and Nuclear Engineering student at the University of California Berkeley.
        I specialize in superconducting magnet research and have experience in both technical and management roles.
        Feel free to explore my resume by typing 'help' for a list of available commands.
    </div>
</div>`;
}

const commands = {
    help: {
        description: "List available commands",
        action: function() {
            return "Available commands:\n- " + Object.keys(commands).join('\n- ');
        }
    },
    about: {
        description: "Show about me information",
        action: function() {
            return createAboutMeWidget();
        }
    },
    publications: {
        description: "Show publications",
        action: function() {
            return `Publications:
1. Investigating Irradiated Superconducting Magnet Insulation Materials for Particle Accelerators
   Published in IEEE Transactions on Applied Superconductivity.
2. Smart Quench Management System Based on Fast Low-Level Voltage Measurements for HTS Magnets
   Presented at ASC 2024.
3. Morphology Based Image Processing for Improved Atomic Position Determination in STEM Imaging
   Presented at UCI SURF Research Symposium.
4. Effects of Composition on Radiation Damage Severity in Epoxy Mixes
   Presented at MSE 104 Research Symposium at UC Berkeley.`;
        }
    },
    education: {
        description: "Show education details",
        action: function() {
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
        description: "Show experience categories",
        action: function(args) {
            if (!args || args.length === 0) {
                return `Experience categories:
- business
- science
Type 'experience [category]' to see experiences in that category, or simply type 'business' or 'science'.`;
            } else if (args.toLowerCase() === 'business') {
                return commands['business'].action();
            } else if (args.toLowerCase() === 'science') {
                return commands['science'].action();
            } else {
                return `Unknown category '${args}'. Available categories are 'business' and 'science'.`;
            }
        }
    },
    business: {
        description: "Show business experiences",
        action: function() {
            return `Business Experiences:
- Goodwater Capital
- Climeworks
- Kiss The Ground
Type the company name as a command to see more details.`;
        }
    },
    science: {
        description: "Show science experiences",
        action: function() {
            return `Science Experiences:
- Superconducting Magnet Program
- Center for Complex and Active Materials
- Applied Nuclear Physics Division
- Nuclear Materials Lab
- Radiation Safety Committee
Type the experience name as a command to see more details.`;
        }
    },
    skills: {
        description: "Show technical skills",
        action: function() {
            return `Technical Skills:

Software:
- Python
- Java
- MATLAB
- SolidWorks
- LabView
- Digital Micrograph
- Image Processing
- Data Analysis

Technical:
- Scanning Electron Microscopy (SEM)
- Sample Preparation
- Mechanical Property Testing
- EDS
- EBSD
- TEM Sample Preparation (FIB)
- X-Ray Diffraction
- STEM

Other:
- Organizational Skills
- Teamwork
- Leadership
- Interpersonal Skills`;
        }
    },
    linkedin: {
        description: "Open LinkedIn profile",
        action: function() {
            window.open('https://linkedin.com/in/mehnai', '_blank');
            return 'Opening LinkedIn profile...';
        }
    },
    email: {
        description: "Open email client",
        action: function() {
            window.location.href = 'mailto:mehulnair2005@gmail.com';
            return 'Opening email client...';
        }
    },
    fortune: {
        description: "Get a random fortune",
        action: function() {
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
        action: function() {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs!",
                "Why did the developer go broke? Because he used up all his cache.",
                "Why do Java developers wear glasses? Because they don't see sharp."
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return `Joke: ${randomJoke}`;
        }
    },
    guess: {
        description: "Play a number guessing game",
        action: function(args) {
            if (!gameState || !gameState.active) {
                // Initialize game state
                gameState = {
                    number: Math.floor(Math.random() * 10) + 1,
                    attempts: 0,
                    maxAttempts: 3,
                    active: true
                };
                return `🎮 Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 10.
You have ${gameState.maxAttempts} attempts to guess it.
Enter your guess using the 'guess [number]' command.`;
            } else if (args && args.length > 0) {
                const guess = parseInt(args);
                if (isNaN(guess) || guess < 1 || guess > 10) {
                    return 'Please enter a valid number between 1 and 10.';
                }
                gameState.attempts++;
                if (guess === gameState.number) {
                    gameState.active = false;
                    return `🎉 Correct! You guessed the number in ${gameState.attempts} attempts.`;
                } else if (gameState.attempts >= gameState.maxAttempts) {
                    gameState.active = false;
                    return `😞 Game over! The number was ${gameState.number}.`;
                } else {
                    const hint = guess < gameState.number ? 'higher' : 'lower';
                    return `Incorrect. Try a ${hint} number. Attempts left: ${gameState.maxAttempts - gameState.attempts}`;
                }
            } else {
                return 'Please enter your guess using the \'guess [number]\' command.';
            }
        }
    },
    calc: {
        description: "Calculate a mathematical expression",
        action: function(expression) {
            if (!expression || expression.length === 0) {
                return 'Please provide an expression to calculate. Usage: calc [expression]';
            }

            // Decode URI components to handle URL-encoded characters like '+'
            expression = decodeURIComponent(expression);

            // Remove any spaces in the expression (if necessary)
            expression = expression.replace(/\s+/g, '');

            // Validate the expression to allow only numbers and basic operators
            const validChars = /^[0-9+\-*/().]+$/;
            if (!validChars.test(expression)) {
                return 'Invalid characters in expression. Only numbers and +, -, *, /, (, ) are allowed.';
            }

            try {
                // Safely evaluate the expression
                const result = Function(`'use strict'; return (${expression})`)();
                return `Result: ${result}`;
            } catch (error) {
                return 'Error evaluating expression. Please check your syntax.';
            }
        }
    },
    clear: {
        description: "Clear the terminal",
        action: function() {
            if (output) {
                output.innerHTML = '';
            }
            return '';
        }
    },
    // Business experiences
    'Goodwater Capital': {
        description: "Show Goodwater Capital experience",
        action: function() {
            return `Goodwater Capital:
Student Consultant | August 2024 – Present, Berkeley, CA
- Conducted market analysis across nine global regions, identifying trends and growth opportunities.
- Processed data for 15 key metrics, creating regional plans.
- Created visualizations to identify strategic investment opportunities.`;
        }
    },
    'Climeworks': {
        description: "Show Climeworks experience",
        action: function() {
            return `Climeworks:
Student Consultant | January 2024 – May 2024, Berkeley, CA
- Analyzed market expansion possibilities for the Carbon Dioxide Removal (CDR) market.
- Managed top 100 Salesforce accounts, assessing CDR adoption.
- Developed strategic sales decision frameworks.`;
        }
    },
    'Kiss The Ground': {
        description: "Show Kiss The Ground experience",
        action: function() {
            return `Kiss The Ground:
Student Consultant | August 2023 – December 2023, Berkeley, CA
- Refined a B2B model to scale penetration in the EdTech market.
- Developed go-to-market strategies using case studies.
- Redesigned the website using interactive Figma prototypes.`;
        }
    },
    // Science experiences
    'Superconducting Magnet Program': {
        description: "Show Superconducting Magnet Program experience",
        action: function() {
            return `Superconducting Magnet Program, LBNL:
Student Researcher | October 2023 – Present, Berkeley, CA
- Created a quench detection system using LabView FPGA which beat current system sensitivity by 1000 times.
- Developing machine-level denoising of voltage data to detect quench seconds before it starts.`;
        }
    },
    'Center for Complex and Active Materials': {
        description: "Show Center for Complex and Active Materials experience",
        action: function() {
            return `Center for Complex and Active Materials, Pan Group:
Student Researcher | June 2024 – August 2024, Irvine, CA
- Utilized STEM imaging techniques to image ferroelectric interfaces at atomic resolution.
- Developed Python code to refine atomic positions in charge density maps using image processing methods.`;
        }
    },
    'Applied Nuclear Physics Division': {
        description: "Show Applied Nuclear Physics Division experience",
        action: function() {
            return `Applied Nuclear Physics Division, LBNL:
Research Affiliate | March 2023 – March 2024, Berkeley, CA
- Tested novel image reconstruction algorithms for low-noise near-field imaging in medical settings.
- Utilized Python and statistical models including MLEM and LBFGS for image reconstruction.
- Developed fitting algorithms identifying peaks of radiation spectra for detector characterization.`;
        }
    },
    'Nuclear Materials Lab': {
        description: "Show Nuclear Materials Lab experience",
        action: function() {
            return `Nuclear Materials Lab, UC Berkeley:
Undergraduate Research Assistant | September 2022 – September 2024, Berkeley, CA
- Conducted SEM, EBSD, and tensile testing on additive manufactured steel for microstructure characterization.
- Studied radiation effects on fusion materials in conjunction with the Superconducting Magnet Program at LBNL.
- Conducted mechanical properties testing on epoxies used for superconducting accelerator magnets.`;
        }
    },
    'Radiation Safety Committee': {
        description: "Show Radiation Safety Committee experience",
        action: function() {
            return `Radiation Safety Committee, UC Berkeley College of Engineering:
Undergraduate Student Representative | June 2023 – Present, Berkeley, CA
- Advised Environment, Health & Safety (EH&S) staff on radiation safety and radioactive waste programs.`;
        }
    }
};

// Note: Since the 'commands' object is used in script.js, we do not need to include a 'handleCommand' function here.