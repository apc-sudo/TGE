import React, { useState, useRef, useEffect } from 'react';
import chatIcon from '../assets/chat.png';

const ChatbotFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to The Glitter Export! 👋 How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        'Product Information',
        'Custom Orders',
        'Shipping & Delivery',
        'Pricing',
        'Talk to Human'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    'product information': {
      text: "We specialize in handcrafted apparels including:\n\n🎀 Headbands & Hair Accessories\n👜 Clutches & Bags\n💍 Jewelry & Earrings\n👒 Hats & Caps\n🎭 Eye Masks & More\n\nWhich category interests you most?",
      options: ['Headbands', 'Bags & Clutches', 'Jewelry', 'View All Products']
    },
    'custom orders': {
      text: "We love creating custom pieces! 🎨\n\nOur custom services include:\n• Design consultation\n• Sample creation\n• Bulk production (MOQ: 50+ pieces)\n• Private labeling\n\nWould you like to discuss your custom project?",
      options: ['Start Custom Project', 'View Samples', 'MOQ Information', 'Talk to Designer']
    },
    'shipping & delivery': {
      text: "We ship worldwide! 🌍\n\n📦 Shipping Options:\n• Standard: 7-14 business days\n• Express: 3-7 business days\n• Premium: 1-3 business days\n\n✅ Free shipping on orders over $100\n📍 We deliver to 30+ countries\n\nWhere are you located?",
      options: ['Track My Order', 'Shipping Rates', 'International Shipping']
    },
    'pricing': {
      text: "Our pricing is competitive and transparent! 💰\n\n💡 Factors affecting price:\n• Design complexity\n• Materials used\n• Order quantity\n• Customization level\n\n📋 We provide detailed quotes for all custom work.\n\nWould you like a quote?",
      options: ['Get Quote', 'Bulk Pricing', 'Payment Methods']
    },
    'talk to human': {
      text: "I'll connect you with our team! 👥\n\nYou can reach us through:\n📞 Phone: +91-XXXXXXXXXX\n📧 Email: info@apcuratedcouture.com\n💬 WhatsApp: Click the green button\n\nOr book a consultation call:",
      options: ['Book Consultation', 'Send Email', 'WhatsApp Now']
    }
  };

  const handleOptionClick = (option) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const response = botResponses[option.toLowerCase()];
      if (response) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          options: response.options
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Default response for unmatched options
        const defaultMessage = {
          id: Date.now() + 1,
          text: "Thank you for your interest! Our team will get back to you soon. In the meantime, feel free to explore our website or contact us directly.",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Start Over', 'Contact Us', 'Browse Products']
        };
        setMessages(prev => [...prev, defaultMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simple keyword-based responses
    setTimeout(() => {
      let botResponse = "Thank you for your message! Our team will review it and get back to you soon. For immediate assistance, please use the quick options or contact us directly.";

      const lowerInput = inputValue.toLowerCase();
      if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponse = "For pricing information, please share your requirements and we'll provide a detailed quote. Our prices vary based on design complexity and quantity.";
      } else if (lowerInput.includes('custom') || lowerInput.includes('design')) {
        botResponse = "We'd love to help with your custom design! Please share your ideas, and our design team will create something special for you.";
      } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
        botResponse = "We offer worldwide shipping with various speed options. Standard shipping takes 7-14 days, while express delivery is 3-7 days.";
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        options: ['Get Quote', 'Custom Design', 'Contact Team']
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '170px',
            right: '24px',
            width: '350px',
            height: '500px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            zIndex: 1002,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #514747 0%, #6B5B5B 100%)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                The Glitter Export
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                Usually replies instantly
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#f8f9fa'
            }}
          >
            {messages.map((message) => (
              <div key={message.id} style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      backgroundColor: message.sender === 'user' ? '#514747' : '#fff',
                      color: message.sender === 'user' ? 'white' : '#333',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      whiteSpace: 'pre-line',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {message.text}
                  </div>
                </div>

                {/* Quick Reply Options */}
                {message.options && (
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #514747',
                          backgroundColor: 'transparent',
                          color: '#514747',
                          borderRadius: '20px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          alignSelf: 'flex-start'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#514747';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#514747';
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ccc', animation: 'pulse 1.5s infinite' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ccc', animation: 'pulse 1.5s infinite 0.5s' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ccc', animation: 'pulse 1.5s infinite 1s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '8px',
              backgroundColor: 'white'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '24px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '12px 16px',
                backgroundColor: '#514747',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '94px',
          right: '24px',
          zIndex: 1001,
          background: isOpen ? '#666' : '#514747',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          transition: 'all 0.3s ease'
        }}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? (
          <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>×</span>
        ) : (
          <img src={chatIcon} alt="Chat" style={{ width: 32, height: 32 }} />
        )}
      </button>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatbotFloat; 