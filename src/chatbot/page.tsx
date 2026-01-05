"use client";

import React, { useState, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Zoom,
  Slide,
  styled,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import("../components/chatbot/ChatInterface"), {
  ssr: false,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 32,
  right: 32,
  zIndex: theme.zIndex.drawer + 1,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  padding: '12px 24px',
  borderRadius: '50px',
  background: `linear-gradient(135deg, #2196F3, #1976D2)`, 
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(33, 150, 243, 0.25)', 
    background: `linear-gradient(135deg, #1976D2, #2196F3)`, 
  },
  '& .MuiSvgIcon-root': {
    marginRight: 8,
    fontSize: '1.5rem',
  }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    height: '80vh',
    maxHeight: 650,
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 12px 40px rgba(33, 150, 243, 0.15)',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    border: '1px solid rgba(33, 150, 243, 0.1)',
    '@media (max-width: 600px)': {
      margin: 0,
      maxHeight: '100vh',
      borderRadius: 0,
      width: '100%',
    }
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    backdropFilter: 'blur(8px)'
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(135deg, #2196F3, #1976D2)`, 
  color: '#FFFFFF',
  padding: theme.spacing(2.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 2px 10px rgba(33, 150, 243, 0.15)',
}));

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Zoom in={mounted} timeout={500}>
        <StyledFab
          color="primary"
          aria-label="chat"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant="extended"
          sx={{
            transform: isHovered ? 'translateY(-4px)' : 'none',
            transition: 'transform 0.3s ease',
            '&.MuiButtonBase-root': {
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976D2'
              }
            }
          }}
        >
          <ChatIcon />
          <Typography 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.95rem',
              opacity: isHovered ? 1 : 0.95,
              transition: 'all 0.3s',
              letterSpacing: '0.3px',
              color: '#FFFFFF'
            }}
          >
            Chat with Me
          </Typography>
        </StyledFab>
      </Zoom>

      {mounted && (
        <StyledDialog
          open={isOpen}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Transition}
        >
          <StyledDialogTitle>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              pl: 1 
            }}>
              <ChatIcon sx={{ 
                fontSize: 28,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }} />
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                letterSpacing: '0.3px',
                fontSize: '1.25rem'
              }}>
                AI Assistant
              </Typography>
            </Box>
            <IconButton 
              onClick={handleClose}
              size="medium"
              sx={{ 
                color: 'inherit',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'rotate(90deg) scale(1.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              <CloseIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </StyledDialogTitle>
          <DialogContent sx={{ 
            p: 0, 
            height: 'calc(100% - 72px)', 
            overflow: 'hidden',
            bgcolor: '#F0F7FF', 
            position: 'relative'
          }}>
            <ChatInterface />
          </DialogContent>
        </StyledDialog>
      )}
    </>
  );
};

export default ChatBot;