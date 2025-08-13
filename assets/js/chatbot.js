document.addEventListener('DOMContentLoaded', function() {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const emojiPickerBtn = document.getElementById('emoji-picker-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const minimizeBtn = document.getElementById('minimize-chatbot');
    const closeBtn = document.getElementById('close-chatbot');
    const clearBtn = document.getElementById('clear-chatbot');
    
        // All questions functionality
    const allQuestionsBtn = document.getElementById('show-all-questions');
    const allQuestionsModal = document.getElementById('all-questions-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const questionsList = document.getElementById('questions-list');
    
    // Replace the existing allQuestions object with this enhanced version
    const allQuestions = {
        "Production & Trade": [
            "Who produces the most rice in ASEAN?",
            "What are the top rice producers?",
            "Who are the largest rice importers?",
            "What are the rice import trends?",
            "What are the rice export trends?",
        ],
        "Food Security": [
            "What are the food insecurity rates?",
            "How many people are affected by food insecurity?",
            "What's the number of undernourished people?",
            "What are the main causes of food insecurity?",
        ],
        "Nutrition": [
            "How does GDP relate to nutrition?",
            "What are the average dietary energy requirements?",
            "How many kcal do people need in ASEAN?",
        ],
        "Country Specific - General": [
            "Tell me about Indonesia's food security",
            "What are Indonesia's stats?",
            "What about Vietnam's rice production?",
            "Give me Thailand's food security overview",
            "What's Cambodia's food situation?",
        ],
        "Indonesia": [
            "Indonesia data",
            "Indonesia stats",
            "Tell me about Indonesia",
            "Indonesia rice production",
            "Indonesia undernourishment rate",
            "Indonesia nutrition data",
            "Indonesia food security challenges",
            "Indonesia agricultural policies"
        ],
        "Vietnam": [
            "Vietnam data",
            "Vietnam stats",
            "Tell me about Vietnam",
            "Vietnam rice production",
            "Vietnam undernourishment rate",
            "Vietnam Mekong Delta agriculture",
            "Vietnam agricultural successes"
        ],
        "Thailand": [
            "Thailand data",
            "Thailand stats",
            "Tell me about Thailand",
            "Thailand rice production",
            "Thailand rice exports",
            "Thailand jasmine rice",
            "Thailand undernourishment rate",
            "Thailand agricultural policies",
            "Thailand rice export markets"
        ],
        "Cambodia": [
            "Cambodia data",
            "Cambodia stats",
            "Tell me about Cambodia",
            "Cambodia rice production",
            "Cambodia undernourishment rate",
            "Cambodia gender disparities in food access",
            "Cambodia rural food security",
            "Cambodia agricultural development"
        ],
        "Other ASEAN Countries": [
            "Timor-Leste food insecurity",
            "Compare Vietnam and Thailand",
        ],
        "Analysis & Recommendations": [
            "What are the key findings?",
            "What insights can you share?",
            "Give me a summary of the data",
            "What are the main recommendations?",
        ],
        "Gender": [
            "Are there gender differences in food security?",
            "Female-headed households and food security",
            "Gender-sensitive nutrition programs",
            "How to reduce gender gaps in food access?"
        ],
        "General": [
            "Hello",
            "Hi",
            "Hey",
            "Thank you",
            "Thanks",
            "How are you?",
            "What's your name?",
            "Who are you?",
            "Help",
            "What can you do?",
        ]
    };
    
    // Populate the questions list
    function populateQuestionsList() {
        questionsList.innerHTML = '';
        
        for (const category in allQuestions) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'question-category';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.textContent = category;
            
            const questionsDiv = document.createElement('div');
            
            allQuestions[category].forEach(question => {
                const questionItem = document.createElement('div');
                questionItem.className = 'question-item';
                questionItem.textContent = question;
                
                questionItem.addEventListener('click', function() {
                    addUserMessage(question);
                    generateBotResponse(question);
                    allQuestionsModal.classList.remove('active');
                });
                
                questionsDiv.appendChild(questionItem);
            });
            
            categoryDiv.appendChild(categoryTitle);
            categoryDiv.appendChild(questionsDiv);
            questionsList.appendChild(categoryDiv);
        }
    }
    
    // Show modal
    allQuestionsBtn.addEventListener('click', function() {
        populateQuestionsList();
        allQuestionsModal.classList.add('active');
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        allQuestionsModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    allQuestionsModal.addEventListener('click', function(e) {
        if (e.target === allQuestionsModal) {
            allQuestionsModal.classList.remove('active');
        }
    });





    // Emoji picker functionality
    emojiPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        emojiPicker.classList.toggle('active');
    });
    
    document.querySelectorAll('.emoji-grid span').forEach(emoji => {
        emoji.addEventListener('click', function() {
            userInput.value += this.textContent;
            emojiPicker.classList.remove('active');
            userInput.focus();
        });
    });
    
    // Close emoji picker when clicking outside
    document.addEventListener('click', function(e) {
        if (!emojiPicker.contains(e.target) && e.target !== emojiPickerBtn) {
            emojiPicker.classList.remove('active');
        }
    });
    
    // Send message functionality
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            emojiPicker.classList.remove('active');
            generateBotResponse(message);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Clear chat history
    clearBtn.addEventListener('click', function() {
        chatbotMessages.innerHTML = `
            <div class="bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hello! 👋 I'm your ASEAN Data Assistant. The chat has been cleared. What would you like to know?</p>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
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
                addBotMessage("I'm listening... 👂");
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                sendMessage();
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                addBotMessage("Sorry, I couldn't understand that. Could you try typing instead? 🤔");
            };
            
            recognition.onend = function() {
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceBtn.style.backgroundColor = '';
            };
            
            recognition.start();
        } else {
            addBotMessage("Your browser doesn't support speech recognition. Please type your question. ⌨️");
        }
    });
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent;
            addUserMessage(question);
            generateBotResponse(question);
        });
    });
    
    // Minimize and close buttons
    minimizeBtn.addEventListener('click', function() {
        document.querySelector('.chatbot-messages').classList.toggle('minimized');
        this.innerHTML = this.innerHTML.includes('minus') ? 
            '<i class="fas fa-expand"></i>' : '<i class="fas fa-minus"></i>';
    });
    
    closeBtn.addEventListener('click', function() {
        document.querySelector('.chatbot-container').classList.add('hidden');
    });
    
    // Add user message to chat
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
        scrollToBottom();
    }
    
    // Add bot message to chat
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
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('bot-message');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Generate bot response
    function generateBotResponse(userMessage) {
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(userMessage);
            addBotMessage(response);
        }, 1500);
    }
    
    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Enhanced bot response logic with emoji support
    function getBotResponse(userMessage) {
        let response = "";
        const lowerMessage = userMessage.toLowerCase();
        
        // Emoji responses
        if (userMessage.match(/[\u{1F600}-\u{1F64F}]/gu)) {
            const emojiResponses = [
                "I see you're using emojis! 😊 How can I assist you with ASEAN food security data today?",
                "Emojis are fun! 😄 What would you like to know about rice production or food security?",
                "Great use of emojis! 🌟 Ask me anything about food security in Southeast Asia.",
                "I love emojis too! ❤️ What's your question about ASEAN agriculture?",
                "Nice emoji! 👍 Did you have a specific question about food security?"
            ];
            return emojiResponses[Math.floor(Math.random() * emojiResponses.length)];
        }
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `Hello! 👋 I'm your ASEAN Data Assistant. I can help you explore food security data across Southeast Asia. 

Try asking about:
• Country-specific data (Indonesia, Philippines, Vietnam, etc.) 🇮🇩🇵🇭🇻🇳
• Production and trade statistics 📊
• Food insecurity trends 🚨
• Nutrition indicators 🥗
• Key findings and recommendations 💡

You can also click the quick suggestion buttons below to explore common questions!`;
        }
        
        // Thanks
        else if (lowerMessage.includes('thank')) {
            return `You're welcome! 😊 Is there anything else about ASEAN food security you'd like to know? 

Remember, I can help with:
- Comparative country analysis 🌏
- Historical trends 📈
- Policy recommendations 📝
- Specific data points 🔢

Just ask or click one of the suggestion buttons!`;
        }
        
        // Production questions
        else if (lowerMessage.includes('top rice producer') || lowerMessage.includes('who produces the most rice') || 
            lowerMessage.includes('top rice producers')) {
            response = `🌾 Indonesia is the top rice producer in ASEAN with 163 million tons in 2021-2023, followed by Vietnam (130 million tons) and Thailand (99 million tons). 

Key insights:
- Indonesia's production accounts for about 30% of ASEAN's total rice production 📊
- Vietnam has significantly increased production in recent years 📈
- Thailand maintains stable production despite climate challenges ☔

Despite high production, Indonesia still imports rice due to:
1. High domestic demand from its large population 👨‍👩‍👧‍👦
2. Distribution challenges across its many islands 🏝️
3. Quality preferences for certain rice varieties 🍚`;
        } 
        else if (lowerMessage.includes('rice import') || lowerMessage.includes('who imports the most rice') || 
                 lowerMessage.includes('largest importers')) {
            response = `🚢 The Philippines imports the most rice in ASEAN (12,584 thousand tons in 2020-2022), followed by Malaysia (5,803 thousand tons). 

Interesting findings:
- Philippines imports account for about 50% of total ASEAN rice imports 📊
- Malaysia imports despite having higher GDP per capita 💰
- Even large producers like Vietnam (2,773 thousand tons) and Indonesia (1,930 thousand tons) still import rice 🏭

Reasons for imports:
- Population growth outpacing production 📈
- Climate change impacts on local production ☔
- Preference for specific rice varieties not grown domestically 🍚`;
        }
        else if (lowerMessage.includes('rice export') || lowerMessage.includes('who exports the most rice') || 
                 lowerMessage.includes('export trends')) {
            response = `🌍 Thailand is the top rice exporter (27,779 thousand tons in 2020-2022), closely followed by Vietnam (26,684 thousand tons). 

Key export facts:
- Together they account for over 80% of regional exports 📊
- Myanmar (8,426 thousand tons) and Cambodia (3,213 thousand tons) are emerging exporters 🚀
- Thailand's exports are known for high-quality jasmine rice 🌾
- Vietnam focuses on more affordable white rice 💰

Export trends:
1. Increasing demand from Africa and Middle East 🌍
2. Growing premium rice market 💎
3. Climate change may impact future export capacity ☔`;
        }
        
        // Nutrition questions
        else if ((lowerMessage.includes('gdp') && lowerMessage.includes('nutrition')) || 
                 lowerMessage.includes('gdp vs nutrition')) {
            response = `💰 While Singapore and Brunei have the highest GDP per capita, their nutrition indicators are similar to other countries. 

Key observations:
- Food insecurity appears more related to economic distribution than absolute GDP 📊
- The Philippines has higher food insecurity despite higher GDP than Cambodia or Myanmar 🚨
- Vietnam performs better on nutrition indicators than its GDP would predict ✅

Factors to consider:
- Income inequality within countries ↔️
- Government policies on food distribution 🏛️
- Urban vs rural access to nutritious food 🏙️🌾
- Cultural dietary preferences 🍽️`;
        }
        else if (lowerMessage.includes('dietary energy') || lowerMessage.includes('kcal') || 
                 lowerMessage.includes('average dietary energy')) {
            response = `⚡ The average dietary energy requirement across ASEAN ranges from 2,235 kcal/cap/day (Timor-Leste) to 2,482 kcal/cap/day (Singapore). 

Minimum requirements range from:
- 1,729 kcal (Timor-Leste) 
- 1,912 kcal (Singapore)

Key findings:
1. Requirements correlate with physical activity levels 🏃‍♂️
2. Urban populations generally have lower requirements 🏙️
3. Agricultural communities need more calories 🌾
4. Small variations suggest similar baseline nutritional needs across the region 📊

Countries meeting requirements:
- Singapore, Brunei, Malaysia exceed requirements ✅
- Cambodia, Philippines, Timor-Leste struggle to meet minimums ❌`;
        }
        
        // Food insecurity questions
        else if (lowerMessage.includes('most food insecure') || lowerMessage.includes('highest undernourishment') || 
                 lowerMessage.includes('food insecurity')) {
            response = `🚨 Timor-Leste has the highest prevalence of undernourishment at 15.9% (2023). 

Critical findings:
- Cambodia shows severe food insecurity in the female population (16.1%) ♀️
- The Philippines has concerning rates of moderate/severe food insecurity (43.8% females, 40.1% males) 📊
- Indonesia has the highest absolute numbers of food insecure people 👨‍👩‍👧‍👦

Key drivers of food insecurity:
1. Poverty and income inequality 💰
2. Climate vulnerability ☔
3. Conflict and instability ⚠️
4. Gender disparities in access to food ♀️♂️
5. Urban slums with limited food access 🏙️`;
        }
        else if (lowerMessage.includes('people affected') || lowerMessage.includes('number of undernourished') || 
                 lowerMessage.includes('affected population')) {
            response = `📊 In absolute numbers:
- Indonesia has the most undernourished people (19.9 million) 🇮🇩
- Philippines follows with 6.9 million 🇵🇭
- Vietnam has 5.1 million 🇻🇳

For severe food insecurity:
- Philippines has 11.9 million severely food insecure male adults 🚨
- Indonesia has 7.2 million
- Cambodia has 1.2 million

Vulnerable groups:
1. Rural agricultural workers 🌾
2. Urban poor 🏙️
3. Indigenous communities 🌍
4. Female-headed households ♀️
5. Children under 5 👶`;
        }
        
        // Country specific questions
        else if (lowerMessage.includes('indonesia') || lowerMessage.includes('indonesia data') || 
                 lowerMessage.includes('indonesia stats')) {
            response = `🇮🇩 Indonesia Food Security Overview:
            
- Rice Production: 163M tons (1st in ASEAN) 🌾
- Rice Imports: 1.9M tons (4th in ASEAN) 🚢
- Undernourishment: 7.2% prevalence (19.9M people) 🚨
- Food Insecurity: 5% of females, 4.5% of males 📊
- GDP per capita: $11,000 💰

Key Challenges:
1. Geographic distribution challenges 🏝️
2. Climate change impacts on agriculture ☔
3. Rapid urbanization 🏙️
4. Dependence on rice imports for quality varieties 🍚

Successes:
- Self-sufficiency in staple foods ✅
- National food reserve system 🏛️
- Farmer support programs 👩‍🌾`;
        }
        else if (lowerMessage.includes('philippines') || lowerMessage.includes('philippines data') || 
                 lowerMessage.includes('philippines stats')) {
            response = `🇵🇭 Philippines Food Security Overview:
            
- Rice Production: 59M tons (5th in ASEAN) 🌾
- Rice Imports: 12.6M tons (1st in ASEAN) 🚢
- Undernourishment: 5.9% prevalence (6.9M people) 🚨
- Food Insecurity: 43.8% females, 40.1% males (highest in ASEAN) 📊
- GDP per capita: $8,600 💰

Key Challenges:
1. Frequent typhoons damage crops 🌀
2. High population growth rate 📈
3. Limited agricultural land 🏞️
4. High food prices relative to income 💸

Government Initiatives:
- Rice Tariffication Law 📝
- National Food Policy 🏛️
- School feeding programs 🍎
- Climate-resilient agriculture programs ☔`;
        }
        else if (lowerMessage.includes('vietnam') || lowerMessage.includes('vietnam data') || 
                 lowerMessage.includes('vietnam overview')) {
            response = `🇻🇳 Vietnam Food Security Overview:
            
- Rice Production: 130M tons (2nd in ASEAN) 🌾
- Rice Exports: 26.7M tons (2nd in ASEAN) 🚢
- Undernourishment: 5.2% prevalence (5.1M people) 🚨
- Food Insecurity: 12.5% females, 11.8% males 📊
- GDP per capita: $10,000 💰

Success Factors:
1. Mekong Delta as rice basket 🌾
2. Government investment in agriculture 💰
3. Effective farmer cooperatives 👩‍🌾
4. Diversified export markets 🌍

Emerging Challenges:
1. Mekong Delta salinity intrusion ☔
2. Labor migration from rural areas 🚶‍♂️
3. Competition for water resources 💧
4. Need for value-added products 🏭`;
        }
        else if (lowerMessage.includes('thailand') || lowerMessage.includes('thailand data')) {
            response = `🇹🇭 Thailand Food Security Overview:
            
- Rice Production: 99M tons (3rd in ASEAN) 🌾
- Rice Exports: 27.8M tons (1st in ASEAN) 🚢
- Undernourishment: 5.6% prevalence (4.0M people) 🚨
- Food Insecurity: 7.6% females, 7.0% males 📊
- GDP per capita: $20,000 💰

Strengths:
1. Global leader in jasmine rice 🌾
2. Advanced processing industry 🏭
3. Strong agricultural research 🔬
4. Established export networks 🌍

Challenges:
1. Aging farmer population 👵
2. Drought conditions in northeast ☔
3. Competition from Vietnam ↔️
4. Need for sustainable practices ♻️`;
        }
        else if (lowerMessage.includes('cambodia') || lowerMessage.includes('cambodia data')) {
            response = `🇰🇭 Cambodia Food Security Overview:
            
- Rice Production: 36M tons (6th in ASEAN) 🌾
- Rice Exports: 3.2M tons (4th in ASEAN) 🚢
- Undernourishment: 4.6% prevalence (0.8M people) 🚨
- Food Insecurity: 54.0% females, 48.5% males (highest rates) 📊
- GDP per capita: $4,200 💰

Key Issues:
1. High gender disparity in food access ♀️♂️
2. Rural poverty 🏡
3. Limited agricultural infrastructure 🏗️
4. Dependence on rain-fed agriculture ☔

Progress:
1. Increasing rice exports 📈
2. Farmer cooperatives developing 👩‍🌾
3. Improved rice varieties 🌱
4. Growing domestic processing 🏭`;
        }
        
        // Analysis questions
        else if (lowerMessage.includes('key finding') || lowerMessage.includes('insight') || 
                 lowerMessage.includes('summary') || lowerMessage.includes('key findings')) {
            response = `🔍 Key findings from ASEAN food security data:

1. Production ≠ Food Security
- Large rice producers still import significant quantities ↔️
- Export-oriented countries maintain domestic reserves 🏭

2. Economic Factors
- GDP doesn't always predict food security outcomes 📊
- Distribution systems matter more than absolute wealth 💰

3. Critical Areas
- Timor-Leste, Cambodia and Philippines show severe food insecurity 🚨
- Indonesia has highest absolute numbers affected 👨‍👩‍👧‍👦

4. Gender Disparities
- Females often more severely affected ♀️
- Highest in Cambodia (54% female vs 48.5% male insecurity) ↔️

5. Climate Vulnerability
- Low-lying countries (Vietnam, Thailand) face salinity intrusion ☔
- Island nations (Philippines, Indonesia) face typhoon risks 🌀

6. Policy Implications
- Need for regional cooperation on food reserves 🤝
- Climate-smart agriculture investments 🌱
- Gender-sensitive nutrition programs ♀️`;
        }
        else if (lowerMessage.includes('recommendation') || lowerMessage.includes('suggestion') || 
                 lowerMessage.includes('solution')) {
            response = `💡 Policy Recommendations for ASEAN Food Security:

1. Regional Cooperation
- Establish ASEAN food reserve system 🏛️
- Harmonize food safety standards 📝
- Shared early warning systems ⚠️

2. Production Enhancements
- Invest in climate-resilient rice varieties 🌱
- Improve irrigation infrastructure 💧
- Support smallholder farmers 👩‍🌾

3. Distribution Systems
- Strengthen rural-urban supply chains 🚚
- Reduce food loss and waste ♻️
- Develop strategic reserves 🏭

4. Nutrition Focus
- Fortified food programs 🍎
- School feeding initiatives 🏫
- Maternal and child nutrition 👶

5. Gender Equity
- Women's agricultural training ♀️
- Female-led cooperatives 👩‍🌾
- Nutrition education 📚

6. Data & Monitoring
- Real-time food security monitoring 📊
- Vulnerability mapping 🗺️
- Impact evaluation of programs 🔍`;
        }
        
        // Gender questions
        else if (lowerMessage.includes('gender') || lowerMessage.includes('female') || 
                 lowerMessage.includes('women') || lowerMessage.includes('gender differences')) {
            response = `♀️♂️ Gender Disparities in ASEAN Food Security:

Most Affected Countries:
1. Cambodia: 54.0% female vs 48.5% male food insecurity 🚨
2. Timor-Leste: 53.7% female vs 50.2% male
3. Philippines: 43.8% female vs 40.1% male

Key Factors:
- Women often eat last and least in households 🍽️
- Female-headed households have less access to resources 💰
- Cultural norms prioritize male nutrition 👨
- Women have less access to agricultural inputs 🌾

Recommendations:
1. Gender-sensitive nutrition programs ♀️
2. Women's agricultural training 👩‍🌾
3. Female-focused social protection 🛡️
4. Education on gender equity in food distribution 📚`;
        }
        
        // Normal conversation
        else if (lowerMessage.includes('how are you') || lowerMessage.includes("how's it going")) {
            response = "I'm just a chatbot, but I'm functioning perfectly! 😊 How can I assist you with ASEAN food security data today?";
        }
        else if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
            response = "I'm the ASEAN Data Assistant, here to help you explore food security data across Southeast Asia! 🌏 You can call me ADA for short. 😊";
        }
        else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            response = `I can help you with: 
            
1. Country-specific food security data 🌏
2. Rice production and trade statistics 📊
3. Nutrition and undernourishment indicators 🥗
4. Gender disparities in food access ♀️♂️
5. Policy recommendations and solutions 💡

Try asking about specific countries or topics, or click the suggestion buttons below!`;
        }
        else {
            // For unrecognized questions, provide helpful guidance
            response = `I'm not sure I understand your question about "${userMessage}". 🤔 Here are some topics I can help with:

1. Country-specific data (e.g., "Tell me about Vietnam's rice production") 🇻🇳
2. Comparative analysis (e.g., "Compare Indonesia and Philippines") ↔️
3. Food security indicators (e.g., "What's the undernourishment rate in Cambodia?") 📊
4. Trends and forecasts (e.g., "How has rice production changed over time?") 📈
5. Policy recommendations (e.g., "What solutions exist for food insecurity?") 💡

Could you try rephrasing your question or click one of the suggestion buttons below?`;
        }
        
        return response;
    }
    
    // Sample questions for first-time users
    if (!localStorage.getItem('chatbotGreeted')) {
        setTimeout(() => {
            addBotMessage("Here are some things you can ask me:");
            
            setTimeout(() => {
                addBotMessage("• What are the top rice producing countries? 🌾");
            }, 500);
            
            setTimeout(() => {
                addBotMessage("• Which country has the highest food insecurity? 🚨");
            }, 1000);
            
            setTimeout(() => {
                addBotMessage("• Tell me about nutrition in Indonesia 🇮🇩");
            }, 1500);
            
            setTimeout(() => {
                addBotMessage("• What are the key findings from the data? 🔍");
            }, 2000);
            
            localStorage.setItem('chatbotGreeted', 'true');
        }, 2000);
    }
});


