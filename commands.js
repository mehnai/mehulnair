// commands.js

function createAboutMeWidget() {
    return `
<div class="about-me-widget">
    <img src="mehul.png" alt="Mehul Nair">
    <div class="about-text">
        Hello! I'm Mehul Nair, a Materials Science and Nuclear Engineering student at the University of California Berkeley.
        I specialize in superconducting magnet research and have experience in both technical research and consulting roles.
        Type 'help' to see available commands and learn more about my background.
    </div>
</div>`;
}

function createExperienceWidget(title, summary, details) {
    return `
<div class="experience-widget">
    <div class="experience-title"><strong>${title}</strong></div>
    <div class="experience-summary">${summary}</div>
    <ul class="experience-details">
        ${details.map(detail => `<li>${detail}</li>`).join('')}
    </ul>
</div>`;
}

const commands = {
    help: function() {
        const helpText = `
<span class="highlight">Available commands:</span>

<span class="highlight">about</span>       - Learn about me
<span class="highlight">skills</span>      - View my technical skills
<span class="highlight">projects</span>    - Browse my research projects
<span class="highlight">experience</span>  - View my work experience
<span class="highlight">education</span>   - View my educational background
<span class="highlight">publications</span> - View my publications
<span class="highlight">contact</span>     - How to get in touch with me
<span class="highlight">social</span>      - Links to my social profiles
<span class="highlight">resume</span>      - View or download my resume
<span class="highlight">clear</span>       - Clear the terminal screen
`;
        appendToOutput(helpText);
    },
    
    about: function() {
        const aboutText = `
<span class="highlight">About Mehul Nair:</span>

I'm a Materials Science and Nuclear Engineering student at UC Berkeley with a focus on 
superconducting magnet research. My technical experience spans SEM imaging, mechanical 
property testing, and quench detection system development using LabView FPGA.
I'm driven by curiosity and continuous learning, always exploring new technologies
and approaches to solve complex problems.
`;
        appendToOutput(aboutText);
    },
    
    skills: function() {
        const skillsText = `
<span class="highlight">Technical Skills:</span>

<span class="highlight">Languages:</span> JavaScript, TypeScript, Python, HTML, CSS
<span class="highlight">Frontend:</span> React, Vue.js, Angular
<span class="highlight">Backend:</span> Node.js, Express, Django
<span class="highlight">Databases:</span> MongoDB, PostgreSQL, MySQL
<span class="highlight">DevOps:</span> Docker, AWS, CI/CD
<span class="highlight">Tools:</span> Git, VS Code, Figma
`;
        appendToOutput(skillsText);
    },
    
    projects: function() {
        const projectsText = `
<span class="highlight">Featured Projects:</span>

<span class="highlight">Project 1:</span> Project Name
- Description: Brief description of the project
- Technologies: React, Node.js, MongoDB
- Link: <a href="#" target="_blank">GitHub</a> | <a href="#" target="_blank">Live Demo</a>

<span class="highlight">Project 2:</span> Project Name
- Description: Brief description of the project
- Technologies: Vue.js, Express, PostgreSQL
- Link: <a href="#" target="_blank">GitHub</a> | <a href="#" target="_blank">Live Demo</a>

<span class="highlight">Project 3:</span> Project Name
- Description: Brief description of the project
- Technologies: Angular, Django, MySQL
- Link: <a href="#" target="_blank">GitHub</a> | <a href="#" target="_blank">Live Demo</a>

Type 'projects [number]' to learn more about a specific project.
`;
        appendToOutput(projectsText);
    },
    
    experience: function() {
        const experienceText = `
<span class="highlight">Work Experience:</span>

<span class="highlight">Company Name</span> | Job Title
20XX - Present
- Responsibility 1
- Responsibility 2
- Achievement 1

<span class="highlight">Previous Company</span> | Previous Title
20XX - 20XX
- Responsibility 1
- Responsibility 2
- Achievement 1
`;
        appendToOutput(experienceText);
    },
    
    education: function() {
        const educationText = `
<span class="highlight">Education:</span>

<span class="highlight">University Name</span>
Degree Name
20XX - 20XX
- Relevant coursework
- Achievements

<span class="highlight">Previous Education</span>
Degree/Diploma
20XX - 20XX
`;
        appendToOutput(educationText);
    },
    
    contact: function() {
        const contactText = `
<span class="highlight">Contact Information:</span>

<span class="highlight">Email:</span> your.email@example.com
<span class="highlight">Phone:</span> (XXX) XXX-XXXX
<span class="highlight">Location:</span> Your Location

Feel free to reach out for opportunities or just to say hello!
`;
        appendToOutput(contactText);
    },
    
    social: function() {
        const socialText = `
<span class="highlight">Social Media & Professional Profiles:</span>

<span class="highlight">LinkedIn:</span> <a href="https://linkedin.com/in/yourusername" target="_blank">linkedin.com/in/yourusername</a>
<span class="highlight">GitHub:</span> <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a>
<span class="highlight">Twitter:</span> <a href="https://twitter.com/yourusername" target="_blank">@yourusername</a>
<span class="highlight">Personal Blog:</span> <a href="https://yourblog.com" target="_blank">yourblog.com</a>
`;
        appendToOutput(socialText);
    },
    
    resume: function() {
        const resumeText = `
<span class="highlight">Resume:</span>

<a href="resume.html" target="_blank">View my resume</a> | <a href="assets/resume.pdf" download>Download PDF</a>

My resume shows my complete professional history and qualifications.
`;
        appendToOutput(resumeText);
    },
    
    clear: function() {
        document.getElementById('output').innerHTML = '';
    },
    
    ls: function() {
        const lsText = `
<span class="highlight">Directory contents:</span>

about/
projects/
skills/
resume.pdf
contact.txt
`;
        appendToOutput(lsText);
    },
    
    cd: function(args) {
        if (!args || args.length === 0) {
            appendToOutput('Please specify a directory');
            return;
        }
        
        const dir = args[0];
        switch(dir) {
            case 'about':
                this.about();
                break;
            case 'projects':
                this.projects();
                break;
            case 'skills':
                this.skills();
                break;
            default:
                appendToOutput(`<span class="error">cd: ${dir}: No such directory</span>`);
        }
    }
};

// Helper function to append content to output
// This function is already defined in script.js but needs to be accessible here
function appendToOutput(content) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML += `<div class="response">${content}</div>`;
    
    // Auto scroll to bottom
    const terminalContainer = document.getElementById('terminal-container');
    if (terminalContainer) {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
}