document.addEventListener('DOMContentLoaded', function() {
    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');
    const minimizeChatbot = document.getElementById('minimize-chatbot');
    const clearChat = document.getElementById('clear-chat');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Show chatbot after 5 seconds
    setTimeout(() => {
        chatbotContainer.classList.add('active');
        notificationBadge.textContent = '1';
    }, 5000);
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            notificationBadge.style.display = 'none';
        }
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    minimizeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.toggle('minimized');
        if (chatbotContainer.classList.contains('minimized')) {
            minimizeChatbot.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            minimizeChatbot.innerHTML = '<i class="fas fa-minus"></i>';
        }
    });
    
    clearChat.addEventListener('click', function() {
        chatbotMessages.innerHTML = `
            <div class="bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hello! I'm your ASEAN Data Assistant. I can help you explore food security data across Southeast Asia. What would you like to know?</p>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
    });
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('user-message');
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        userInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            removeTypingIndicator();
            addBotResponse(message);
        }, 1500);
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('bot-message');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('bot-message');
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
        }
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addUserMessage(message);
            }
        }
    });
    
    // Voice recognition
    voiceBtn.addEventListener('click', function() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            
            recognition.onstart = function() {
                voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                voiceBtn.style.backgroundColor = '#dc3545';
                addBotMessage("I'm listening...");
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                addUserMessage(transcript);
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                addBotMessage("Sorry, I couldn't understand that. Could you try typing instead?");
            };
            
            recognition.onend = function() {
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceBtn.style.backgroundColor = '';
            };
            
            recognition.start();
        } else {
            addBotMessage("Your browser doesn't support speech recognition. Please type your question.");
        }
    });
    
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent;
            addUserMessage(question);
        });
    });
    
    // Chatbot responses
    function addBotResponse(userMessage) {
        let response = "I'm not sure how to answer that. Could you try asking in a different way?";
        const lowerMessage = userMessage.toLowerCase();
        
        // Production questions
        if (lowerMessage.includes('top rice producer') || lowerMessage.includes('who produces the most rice')) {
            response = "Indonesia is the top rice producer in ASEAN with 163 million tons in 2021-2023, followed by Vietnam (130 million tons) and Thailand (99 million tons). Despite this, Indonesia still imports rice due to high domestic demand.";
        } 
        else if (lowerMessage.includes('rice import') || lowerMessage.includes('who imports the most rice')) {
            response = "The Philippines imports the most rice in ASEAN (12,584 thousand tons in 2020-2022), followed by Malaysia (5,803 thousand tons). Interestingly, even large producers like Vietnam (2,773 thousand tons) and Indonesia (1,930 thousand tons) still import rice to meet their needs.";
        }
        else if (lowerMessage.includes('rice export') || lowerMessage.includes('who exports the most rice')) {
            response = "Thailand is the top rice exporter (27,779 thousand tons in 2020-2022), closely followed by Vietnam (26,684 thousand tons). Together they account for over 80% of regional exports. Myanmar (8,426 thousand tons) and Cambodia (3,213 thousand tons) are also significant exporters.";
        }
        
        // Nutrition questions
        else if (lowerMessage.includes('gdp') && lowerMessage.includes('nutrition')) {
            response = "While Singapore and Brunei have the highest GDP per capita, their nutrition indicators are similar to other countries. Food insecurity appears more related to economic distribution than absolute GDP. For example, the Philippines has higher food insecurity despite higher GDP than Cambodia or Myanmar.";
        }
        else if (lowerMessage.includes('dietary energy') || lowerMessage.includes('kcal')) {
            response = "The average dietary energy requirement across ASEAN ranges from 2,235 kcal/cap/day (Timor-Leste) to 2,482 kcal/cap/day (Singapore). Minimum requirements range from 1,729 kcal (Timor-Leste) to 1,912 kcal (Singapore). These relatively small variations suggest similar baseline nutritional needs across the region.";
        }
        
        // Food insecurity questions
        else if (lowerMessage.includes('most food insecure') || lowerMessage.includes('highest undernourishment')) {
            response = "Timor-Leste has the highest prevalence of undernourishment at 15.9% (2023). Cambodia shows severe food insecurity in the female population (16.1%), while the Philippines has concerning rates of moderate/severe food insecurity across both genders (43.8% females, 40.1% males).";
        }
        else if (lowerMessage.includes('people affected') || lowerMessage.includes('number of undernourished')) {
            response = "In absolute numbers, Indonesia has the most undernourished people (19.9 million), followed by the Philippines (6.9 million). For severe food insecurity, the Philippines has 11.9 million severely food insecure male adults, while Indonesia has 7.2 million.";
        }
        
        // Country specific questions
        else if (lowerMessage.includes('indonesia')) {
            response = "Indonesia leads ASEAN in rice production (163M tons) but still imports rice (1.9M tons). It has 19.9M undernourished people (7.2% prevalence). Food insecurity affects 5% of females and 4.5% of males. GDP per capita is $11,000.";
        }
        else if (lowerMessage.includes('philippines')) {
            response = "The Philippines produces 59M tons of rice but imports the most (12.6M tons). It has 6.9M undernourished people (5.9% prevalence). Food insecurity is high: 43.8% of females and 40.1% of males experience moderate/severe insecurity. GDP per capita is $8,600.";
        }
        else if (lowerMessage.includes('vietnam')) {
            response = "Vietnam is the 2nd largest rice producer (130M tons) and exporter (26.7M tons). It has 5.1M undernourished people (5.2% prevalence). Food insecurity affects 12.5% of females and 11.8% of males. GDP per capita is $10,000.";
        }
        
        // Analysis questions
        else if (lowerMessage.includes('key finding') || lowerMessage.includes('insight') || lowerMessage.includes('summary')) {
            response = "Key findings from the data:\n\n1. Rice production doesn't always correlate with food security - large producers still import rice\n2. Economic factors (GDP) don't always predict food security outcomes\n3. Timor-Leste, Cambodia and Philippines show concerning food insecurity levels\n4. Gender disparities exist, with females often more severely affected\n5. Absolute numbers reveal Indonesia and Philippines have the most people affected";
        }
        else if (lowerMessage.includes('recommendation')) {
            response = "Based on the data, I recommend:\n\n1. Strengthening regional cooperation for food distribution\n2. Targeted interventions in high-prevalence countries (Timor-Leste, Cambodia, Philippines)\n3. Gender-sensitive nutrition programs\n4. Investment in agricultural technology to boost productivity\n5. Policies to improve economic access to food";
        }
        else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = "Hello! I'm your ASEAN Data Assistant. I can help you explore food security data across Southeast Asia. Try asking about:\n\n• Country-specific data (Indonesia, Philippines, etc.)\n• Production and trade statistics\n• Food insecurity trends\n• Key findings and recommendations";
        }
        else if (lowerMessage.includes('thank')) {
            response = "You're welcome! Is there anything else about ASEAN food security you'd like to know?";
        }
        
        addBotMessage(response);
    }
    
    // Sample questions for first-time users
    if (!localStorage.getItem('chatbotGreeted')) {
        setTimeout(() => {
            addBotMessage("Here are some things you can ask me:");
            
            setTimeout(() => {
                addBotMessage("• What are the top rice producing countries?");
            }, 500);
            
            setTimeout(() => {
                addBotMessage("• Which country has the highest food insecurity?");
            }, 1000);
            
            setTimeout(() => {
                addBotMessage("• Tell me about nutrition in Indonesia");
            }, 1500);
            
            localStorage.setItem('chatbotGreeted', 'true');
        }, 2000);
    }
});