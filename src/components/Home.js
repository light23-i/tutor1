import React, { useState } from 'react';
import { FaPaperPlane, FaCode, FaLaptopCode, FaBrain, FaDatabase, FaRobot, FaChartLine } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      content: 'What do you want to learn today?'
    }
  ]);

  const courses = [
    {
      id: 1,
      title: 'Programming Fundamentals',
      description: 'Learn the basics of programming with Python',
      icon: <FaCode />,
      color: '#4C51BF'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Master HTML, CSS, and JavaScript',
      icon: <FaLaptopCode />,
      color: '#2B6CB0'
    },
    {
      id: 3,
      title: 'Machine Learning',
      description: 'Introduction to AI and ML concepts',
      icon: <FaBrain />,
      color: '#805AD5'
    },
    {
      id: 4,
      title: 'Data Structures',
      description: 'Essential computer science concepts',
      icon: <FaDatabase />,
      color: '#319795'
    },
    {
      id: 5,
      title: 'Artificial Intelligence',
      description: 'Deep dive into AI technologies',
      icon: <FaRobot />,
      color: '#D53F8C'
    },
    {
      id: 6,
      title: 'Algorithm Design',
      description: 'Learn problem-solving strategies',
      icon: <FaChartLine />,
      color: '#DD6B20'
    }
  ];

  const handleCourseClick = (course) => {
    const newMessage = {
      type: 'user',
      content: `I want to learn about ${course.title}`
    };

    setChatMessages([...chatMessages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: `Great choice! ${course.title} is an excellent topic. Let's start with the fundamentals of ${course.description.toLowerCase()}`
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      type: 'user',
      content: message
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: 'I understand you want help with that. Let me assist you with your question.'
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="chat-page">
      <div className="chat-messages-container">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          
          {/* Course suggestions shown after the first bot message */}
          {chatMessages.length === 1 && (
            <div className="course-suggestions">
              <div className="courses-container">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="course-card" 
                    onClick={() => handleCourseClick(course)}
                    style={{ borderLeftColor: course.color }}
                  >
                    <div className="course-icon" style={{ backgroundColor: course.color }}>
                      {course.icon}
                    </div>
                    <div className="course-info">
                      <h3 style={{ color: course.color }}>{course.title}</h3>
                      <p>{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="chat-input-container">
        <form className="chat-form" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
