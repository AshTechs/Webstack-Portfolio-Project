// Message data
const messages = [
    {
        title: "Hello! You are welcome.",
        subtitle: "We're thrilled to have you join us on this journey to better health and wellness.",
        button: 'Next'
    },
    {
        title: "Accessible Laboratory Services",
        subtitle: "Get quality yet affordable laboratory service anytime, anywhere.",
        button: 'Next'
    },
    {
        title: "You're all set!",
        subtitle: "Get started and sign up for the best lab services.",
        button: 'Get Started'
    }
];

// Get DOM elements
const messageContainer = document.getElementById('message-container');
const skipBtn = document.getElementById('skipBtn');
const nextBtn = document.getElementById('nextBtn');
const scientistImage = document.getElementById('scientistImage');

// State to track message position
let currentIndex = 0;

// Function to load message content
function loadMessage() {
    // Display message content
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `
        <p class="title">${messages[currentIndex].title}</p>
        <p class="subtitle">${messages[currentIndex].subtitle}</p>`;
    nextBtn.textContent = messages[currentIndex].button;

    // Update skip button visibility
    skipBtn.style.display = (currentIndex === messages.length - 1) ? 'none' : 'inline-block';

    // Update next button functionality
    if (currentIndex === messages.length - 1) {
        // Set the redirect to the signup page for the last message
        nextBtn.onclick = () => window.location.href = "/signup";

    } else {
        // For other messages, proceed to the next message
        nextBtn.onclick = () => {
            currentIndex++;
            if (currentIndex < messages.length) {
                loadMessage();
            }
        };
    }
}

// Initial page load delay (simulating the appearance of the scientist image first)
setTimeout(() => {
    scientistImage.style.opacity = '1';
    messageContainer.style.opacity = '1';
    nextBtn.style.opacity = '1';
    skipBtn.style.opacity = '1';
    loadMessage();
}, 1000); // 1-second delay

// Handle skip button (jumps to the last message)
skipBtn.addEventListener('click', () => {
    currentIndex = messages.length - 1;
    loadMessage();
});

// Load the initial message
loadMessage();
