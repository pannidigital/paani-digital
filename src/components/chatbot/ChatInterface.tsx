import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContainer = styled(Paper)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  overflow: 'hidden',
  position: 'relative'
});

const MessagesBox = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
  backgroundColor: '#FAF6F1',
  backgroundImage: 'radial-gradient(circle at center, #F0E6DB 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#C8A27C',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#8B6B4F',
  }
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.background.paper,
  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)'
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser'
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
  marginBottom: theme.spacing(1),
  wordWrap: 'break-word',
  animation: 'fadeIn 0.3s ease-out',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  backgroundColor: isUser ? '#C8A27C' : '#FFFFFF',
  color: isUser ? '#FFFFFF' : '#4A4A4A',
  boxShadow: isUser
    ? '0 4px 12px rgba(200, 162, 124, 0.2)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  width: 36,
  height: 36,
  boxShadow: theme.shadows[2],
  fontSize: 14,
  fontWeight: 600,
  backgroundColor: '#8B6B4F',
  '&.user-avatar': {
    backgroundColor: '#C8A27C',
  }
}));

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'initial',
    text: "Hello! I'm Paani's digital marketing assistant. How can I help you with our services today?",
    isUser: false,
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => {
    return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const chatContext = `You are Paani Digital Marketing's AI assistant. Help users with our services:

Services:
1. Social Media Management (NPR 500/platform)
   • Content creation & management
   • Social media strategy
   • Community engagement

2. Brand Video Production (NPR 3000/video)
   • Professional quality videos
   • Custom branding
   • Creative storytelling

3. Digital Gateway Board (NPR 2500-6500)
   • Custom digital solutions
   • Strategic implementation

Plans:
1. Basic Plan - NPR 3,500/month
   ✓ FB/Insta Boost ($5)
   ✓ 12 Social Media Posts
   ✓ All Festival Contents

2. Standard Plan - NPR 6,060/month
   ✓ FB/Insta boost ($15)
   ✓ 16 Social Media Posts
   ✓ All Festival Contents
   ✓ Social Media Handling

3. Premium Plan - NPR 13,460/month
   ✓ 16 Custom Posts
   ✓ Social Media Handling
   ✓ Social Media Boost ($26)
   ✓ Brand Video Content

Response Guidelines:
• Keep responses focused on user questions
• Use numbered lists for plans
• Format prices clearly
• Be concise and professional
• End with relevant follow-up questions

Current conversation: ${updatedMessages.map(m => `${m.isUser ? 'User' : 'Assistant'}: ${m.text}`).join('\n')}`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: input,
          context: chatContext
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: generateId(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorText = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';

      const errorMessage: Message = {
        id: generateId(),
        text: `I apologize, but I encountered an error: ${errorText}`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer elevation={0}>
      <MessagesBox>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              mb: 3,
              opacity: isLoading && message.isUser ? 0.7 : 1,
              transition: 'opacity 0.3s'
            }}
          >
            {!message.isUser && (
              <StyledAvatar>
                A
              </StyledAvatar>
            )}
            <MessageBubble isUser={message.isUser}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {message.text}
              </Typography>
            </MessageBubble>
            {message.isUser && (
              <StyledAvatar className="user-avatar">
                U
              </StyledAvatar>
            )}
          </Box>
        ))}
        {isLoading && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mb: 2,
            pl: 2
          }}>
            <CircularProgress
              size={24}
              thickness={4}
              sx={{ color: 'primary.light' }}
            />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </MessagesBox>

      <InputContainer>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#FAF6F1',
                },
                '&.Mui-focused': {
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(200, 162, 124, 0.15)',
                },
                '& fieldset': {
                  borderColor: '#C8A27C',
                },
                '&:hover fieldset': {
                  borderColor: '#8B6B4F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8B6B4F',
                }
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            sx={{
              bgcolor: '#C8A27C',
              color: 'white',
              width: 40,
              height: 40,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: '#8B6B4F',
                transform: 'scale(1.1)',
              },
              '&.Mui-disabled': {
                bgcolor: '#E5D5C5',
                color: '#8B6B4F'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
