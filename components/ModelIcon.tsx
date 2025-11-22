
import React from 'react';
import { Provider } from '../types';

interface Props {
  provider: Provider;
  className?: string;
  color?: string;
}

export const ModelIcon: React.FC<Props> = ({ provider, className = "w-6 h-6", color = "currentColor" }) => {
  switch (provider) {
    case Provider.GOOGLE:
      // Google 'G' logo path
      return (
        <svg viewBox="0 0 24 24" className={className} fill={color}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
        </svg>
      );
    case Provider.OPENAI:
      // OpenAI Swirl approximation
      return (
        <svg viewBox="0 0 24 24" className={className} fill={color}>
           <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9891 4.1414a6.0268 6.0268 0 0 0-2.0729 7.704 5.973 5.973 0 0 0-.5146 4.9126 6.0493 6.0493 0 0 0 6.5098 2.9 6.0645 6.0645 0 0 0 10.2667-2.1294 6.0263 6.0263 0 0 0 2.0729-7.7063l.0017-.0022ZM11.45 7.71a3.01 3.01 0 0 1 1.88.76l-1.4 2.43a1.25 1.25 0 1 0 1.74 1.73l2.43-1.4a3 3 0 0 1 .75 1.87h-2.8a1.25 1.25 0 0 0 0 2.5h2.8a3 3 0 0 1-.75 1.87l-2.43-1.4a1.25 1.25 0 1 0-1.74 1.73l1.4 2.43a3 3 0 0 1-1.88.76v-2.8a1.25 1.25 0 0 0-2.5 0v2.8a3 3 0 0 1-1.87-.76l1.4-2.43a1.25 1.25 0 1 0-1.74-1.73l-2.43 1.4a3 3 0 0 1-.75-1.87h2.8a1.25 1.25 0 0 0 0-2.5h-2.8a3 3 0 0 1 .75-1.87l2.43 1.4a1.25 1.25 0 1 0 1.74-1.73l-1.4-2.43a3.02 3.02 0 0 1 1.87-.76v2.8a1.25 1.25 0 0 0 2.5 0V7.71Z" />
        </svg>
      );
    case Provider.ANTHROPIC:
       // A styled 'A' shape
       return (
         <svg viewBox="0 0 24 24" className={className} fill={color}>
            <path d="M12 2L2 22h4l2-4h8l2 4h4L12 2zm0 3.5L15.5 15h-7L12 5.5z" />
         </svg>
       );
    case Provider.META:
      // Infinity loop
      return (
        <svg viewBox="0 0 24 24" className={className} fill={color}>
          <path d="M12 6.5c-3.5 0-5.5 2.5-5.5 5.5s2 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2-5.5-5.5-5.5zm0 9c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5 3.5 1.5 3.5 3.5-1.5 3.5-3.5 3.5z M22 12c0 3.31-2.69 6-6 6-2.5 0-4.5-1.5-5.5-3.5 1-2 3-3.5 5.5-3.5 3.31 0 6 2.69 6 6z M2 12c0-3.31 2.69-6 6-6 2.5 0 4.5 1.5 5.5 3.5-1 2-3 3.5-5.5 3.5-3.31 0-6-2.69-6-6z" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      );
    case Provider.MISTRAL:
       // Wave / M shape
       return (
         <svg viewBox="0 0 24 24" className={className} fill={color}>
            <path d="M2 12c0-4.4 3.6-8 8-8s8 3.6 8 8 3.6 8 8 8-8-3.6-8-8-8-3.6-8-8zm2 0c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6-6 2.7-6 6zm10 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
            <path d="M4 18l8-12 8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
         </svg>
       );
    case Provider.XAI:
       // X shape
       return (
         <svg viewBox="0 0 24 24" className={className} fill={color}>
           <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
       );
    case Provider.DEEPSEEK:
       // Stylized Whale/Fish shape
       return (
         <svg viewBox="0 0 24 24" className={className} fill={color}>
           <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" fillOpacity="0.2"/>
           <path d="M17 10c-2-2-5-2-7 0-1 1-1 3 0 4 2 2 5 2 7 0 1-1 1-3 0-4zM8 14c0-2 2-4 4-4s4 2 4 4H8z" />
         </svg>
       );
    default:
       return (
         <svg viewBox="0 0 24 24" className={className} fill={color}>
           <circle cx="12" cy="12" r="10" />
         </svg>
       );
  }
};
