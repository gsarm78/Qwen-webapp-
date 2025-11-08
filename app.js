// Qwen Chat PWA - Main Application Logic

// Configuration
const API_BASE_URL = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
const STORAGE_KEYS = {
    API_KEY: 'qwen_api_key',
    MODEL: 'qwen_model',
    MESSAGES: 'qwen_messages'
};

// State
let apiKey = '';
let selectedModel = 'qwen-max';
let messages = [];
let isProcessing = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    registerServiceWorker();
});

function initializeApp() {
    loadSettings();
    loadMessages();
    renderMessages();

    // Auto-resize textarea
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', autoResizeTextarea);

    // Check if API key is set, if not show settings
    if (!apiKey) {
        setTimeout(() => {
            openSettings();
        }, 500);
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    }
}

// Settings Management
function loadSettings() {
    apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
    selectedModel = localStorage.getItem(STORAGE_KEYS.MODEL) || 'qwen-max';

    document.getElementById('apiKeyInput').value = apiKey;
    document.getElementById('modelSelect').value = selectedModel;
}

function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
    const newApiKey = document.getElementById('apiKeyInput').value.trim();
    const newModel = document.getElementById('modelSelect').value;

    if (!newApiKey) {
        alert('Please enter an API key');
        return;
    }

    apiKey = newApiKey;
    selectedModel = newModel;

    localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    localStorage.setItem(STORAGE_KEYS.MODEL, selectedModel);

    closeSettings();

    // Show confirmation
    showToast('Settings saved successfully!');
}

// Message Management
function loadMessages() {
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    messages = stored ? JSON.parse(stored) : [];
}

function saveMessages() {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
}

function clearMessages() {
    messages = [];
    saveMessages();
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById('chatContainer');
    const emptyState = document.getElementById('emptyState');

    if (messages.length === 0) {
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';

    // Clear existing messages
    const existingMessages = container.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Render all messages
    messages.forEach(msg => {
        appendMessageToDOM(msg.role, msg.content);
    });

    // Scroll to bottom
    scrollToBottom();
}

function appendMessageToDOM(role, content) {
    const container = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'U' : 'Q';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    container.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const container = document.getElementById('chatContainer');
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

// Message Input Handling
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function autoResizeTextarea() {
    const textarea = document.getElementById('messageInput');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

async function sendMessage() {
    if (isProcessing) return;

    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    if (!apiKey) {
        alert('Please set your API key in settings first');
        openSettings();
        return;
    }

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Add user message
    messages.push({ role: 'user', content: message });
    saveMessages();
    appendMessageToDOM('user', message);

    // Show typing indicator
    showTypingIndicator();
    isProcessing = true;
    disableSendButton();

    try {
        // Call Qwen API
        const response = await callQwenAPI(message);

        // Add assistant message
        messages.push({ role: 'assistant', content: response });
        saveMessages();
        appendMessageToDOM('assistant', response);

    } catch (error) {
        console.error('Error calling Qwen API:', error);

        let errorMessage = 'Sorry, I encountered an error. ';

        if (error.message.includes('401')) {
            errorMessage += 'Please check your API key in settings.';
        } else if (error.message.includes('429')) {
            errorMessage += 'Rate limit exceeded. Please try again later.';
        } else if (error.message.includes('network')) {
            errorMessage += 'Network error. Please check your connection.';
        } else {
            errorMessage += error.message;
        }

        messages.push({ role: 'assistant', content: errorMessage });
        saveMessages();
        appendMessageToDOM('assistant', errorMessage);
    } finally {
        hideTypingIndicator();
        isProcessing = false;
        enableSendButton();
    }
}

async function callQwenAPI(userMessage) {
    // Prepare messages for API (only last 10 to avoid token limits)
    const apiMessages = messages.slice(-10).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
    }));

    const requestBody = {
        model: selectedModel,
        messages: apiMessages,
        stream: false
    };

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;
}

// UI Helpers
function showTypingIndicator() {
    document.getElementById('typingIndicator').classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').classList.remove('active');
}

function disableSendButton() {
    document.getElementById('sendBtn').disabled = true;
}

function enableSendButton() {
    document.getElementById('sendBtn').disabled = false;
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Add toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Debug helpers (remove in production)
window.clearChat = clearMessages;
window.exportMessages = () => {
    console.log(JSON.stringify(messages, null, 2));
    return messages;
};
