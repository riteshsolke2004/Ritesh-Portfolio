import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG Icon Components for Skills
const HtmlIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
    <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
    <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
    <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696H63.952zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692H63.952z"/>
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
    <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
    <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
    <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/>
    <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/>
    <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/>
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
    <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <g fill="#61DAFB">
      <circle cx="64" cy="64" r="11.4"/>
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5.1 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5.1-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/>
    </g>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <path fill="#007acc" d="M2 63.91v62.5h125v-125H2z"/>
    <path fill="#fff" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.17c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/>
  </svg>
);

const ThreeJSIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <g fill="none">
      <path fill="#000" d="M0 0h128v128H0z"/>
      <path fill="#fff" d="M64 9.68L25.65 25.65l38.35 15.97L102.35 25.65 64 9.68zm-38.35 32l38.35 15.97L102.35 41.62 64 25.65 25.65 41.62zm0 16l38.35 15.97L102.35 57.62 64 41.65 25.65 57.62zm0 16l38.35 15.97L102.35 73.62 64 57.65 25.65 73.62zm0 16l38.35 15.97L102.35 89.62 64 73.65 25.65 89.62zm0 16l38.35 15.97L102.35 105.62 64 89.65 25.65 105.62z"/>
    </g>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/>
  </svg>
);

const GsapIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <defs>
      <linearGradient id="gsap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#88CE02"/>
        <stop offset="100%" stopColor="#0F7B0F"/>
      </linearGradient>
    </defs>
    <circle cx="64" cy="64" r="60" fill="url(#gsap-gradient)"/>
    <path fill="#fff" d="M32 42h12v44H32V42zm20 0h12v44H52V42zm20 0h12v44H72V42z"/>
    <path fill="#fff" d="M96 50c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-16 20c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8z"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
      <stop offset="0" stopColor="#5A9FD4"/>
      <stop offset="1" stopColor="#306998"/>
    </linearGradient>
    <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
      <stop offset="0" stopColor="#FFD43B"/>
      <stop offset="1" stopColor="#FFE873"/>
    </linearGradient>
    <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
    <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521H91.682zm-13.632 64.181c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
    <radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#B8B8B8" stopOpacity=".498"/>
      <stop offset="1" stopColor="#7F7F7F" stopOpacity="0"/>
    </radialGradient>
    <path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416s14.816-6.417 33.092-6.417c18.275 0 33.091 2.874 33.091 6.417z"/>
  </svg>
);

const FastApiIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <defs>
      <linearGradient id="fastapi-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#05998B"/>
        <stop offset="100%" stopColor="#009485"/>
      </linearGradient>
      <linearGradient id="fastapi-lightning" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="100%" stopColor="#F0F0F0"/>
      </linearGradient>
    </defs>
    
    {/* Background circle */}
    <circle cx="64" cy="64" r="56" fill="url(#fastapi-bg)"/>
    
    {/* Main lightning bolt */}
    <path 
      fill="url(#fastapi-lightning)" 
      d="M76 28L44 64H56L48 100L80 64H68L76 28Z"
    />
    
    {/* Lightning bolt shadow for depth */}
    <path 
      fill="rgba(0,0,0,0.1)" 
      d="M78 30L46 66H58L50 102L82 66H70L78 30Z"
    />
    
    {/* Inner highlight on lightning */}
    <path 
      fill="#FFFFFF" 
      d="M72 32L48 60H58L52 92L76 60H66L72 32Z"
      opacity="0.9"
    />
    
    {/* Additional small lightning accents */}
    <path 
      fill="rgba(255,255,255,0.6)" 
      d="M68 36L68 42L72 42L68 48L68 54L64 54L68 36Z"
    />
    <path 
      fill="rgba(255,255,255,0.6)" 
      d="M60 74L60 80L64 80L60 86L60 92L56 92L60 74Z"
    />
  </svg>
);


const MongoDbIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <defs>
      <linearGradient id="mongodb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4DB33D"/>
        <stop offset="50%" stopColor="#6CC04A"/>
        <stop offset="100%" stopColor="#589636"/>
      </linearGradient>
      <linearGradient id="mongodb-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3F6F21"/>
        <stop offset="100%" stopColor="#2D4A1A"/>
      </linearGradient>
    </defs>
    
    {/* Main leaf shape */}
    <path 
      fill="url(#mongodb-gradient)" 
      d="M64 8C64 8 48 28 48 52C48 72 56 88 64 96C72 88 80 72 80 52C80 28 64 8 64 8Z"
    />
    
    {/* Leaf shadow/depth */}
    <path 
      fill="url(#mongodb-shadow)" 
      d="M64 8C64 8 68 28 68 52C68 72 66 88 64 96C66 88 72 72 72 52C72 28 64 8 64 8Z"
    />
    
    {/* Central vein */}
    <path 
      fill="#3F6F21" 
      d="M64 8L64 96C64 96 64.5 88 64.5 52C64.5 28 64 8 64 8Z"
      strokeWidth="0.5"
    />
    
    {/* Stem */}
    <rect 
      x="62" 
      y="96" 
      width="4" 
      height="16" 
      fill="#8B4513" 
      rx="2"
    />
    
    {/* Small highlight on leaf */}
    <ellipse 
      cx="58" 
      cy="35" 
      rx="3" 
      ry="8" 
      fill="#7ED321" 
      opacity="0.6"
    />
  </svg>
);



const SqlIcon = () => (
  <svg viewBox="0 0 128 128" className="w-16 h-16">
    <defs>
      <linearGradient id="sql-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A90E2"/>
        <stop offset="100%" stopColor="#2E5F8F"/>
      </linearGradient>
      <linearGradient id="sql-light-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7BB3F0"/>
        <stop offset="100%" stopColor="#4A90E2"/>
      </linearGradient>
    </defs>
    
    {/* Background rounded rectangle */}
    <rect width="128" height="128" fill="url(#sql-blue)" rx="16"/>
    
    {/* Database cylinder top */}
    <ellipse 
      cx="64" 
      cy="35" 
      rx="35" 
      ry="12" 
      fill="url(#sql-light-blue)"
    />
    
    {/* Database cylinder body */}
    <rect 
      x="29" 
      y="35" 
      width="70" 
      height="45" 
      fill="url(#sql-blue)"
    />
    
    {/* Database cylinder segments */}
    <ellipse 
      cx="64" 
      cy="50" 
      rx="35" 
      ry="12" 
      fill="url(#sql-light-blue)"
      opacity="0.8"
    />
    <ellipse 
      cx="64" 
      cy="65" 
      rx="35" 
      ry="12" 
      fill="url(#sql-light-blue)"
      opacity="0.6"
    />
    <ellipse 
      cx="64" 
      cy="80" 
      rx="35" 
      ry="12" 
      fill="url(#sql-light-blue)"
    />
    
    {/* SQL text */}
    <text 
      x="64" 
      y="108" 
      textAnchor="middle" 
      fill="#FFFFFF" 
      fontSize="20" 
      fontWeight="bold" 
      fontFamily="Arial, sans-serif"
    >
  
    </text>
    
    {/* Database highlight */}
    <ellipse 
      cx="50" 
      cy="30" 
      rx="8" 
      ry="3" 
      fill="#FFFFFF" 
      opacity="0.4"
    />
    
    {/* Side highlight line */}
    <rect 
      x="95" 
      y="40" 
      width="2" 
      height="35" 
      fill="#FFFFFF" 
      opacity="0.3"
      rx="1"
    />
  </svg>
);




const frontendSkills = [
  { name: 'HTML', Icon: HtmlIcon },
  { name: 'CSS', Icon: CssIcon },
  { name: 'JavaScript', Icon: JavaScriptIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'TypeScript', Icon: TypeScriptIcon },
  { name: 'Three.js', Icon: ThreeJSIcon },
  { name: 'Tailwind CSS', Icon: TailwindIcon },
  { name: 'GSAP', Icon: GsapIcon },
];

const backendSkills = [
  { name: 'Python', Icon: PythonIcon },
  { name: 'FastAPI', Icon: FastApiIcon },
  { name: 'MongoDB', Icon: MongoDbIcon },
  { name: 'SQL', Icon: SqlIcon },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const frontendSkillsRef = useRef<HTMLDivElement>(null);
  const backendSkillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(frontendSkillsRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: frontendSkillsRef.current,
          start: "top 80%",
        }
      }
    );
    
    gsap.fromTo(backendSkillsRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: backendSkillsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Skills & Expertise
        </h2>
        
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-primary">Frontend</h3>
            <div ref={frontendSkillsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {frontendSkills.map((skill) => (
                <Card 
                key={skill.name}
                className="glass-card p-6 flex flex-col items-center justify-center text-center hover-glow transition-all duration-300 hover:scale-110 group"
                >
                <skill.Icon />
                <p className="mt-4 text-sm font-semibold text-foreground">{skill.name}</p>
                </Card>
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-3xl font-bold text-center mb-8 text-primary">Backend</h3>
            <div ref={backendSkillsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
            {backendSkills.map((skill) => (
                <Card 
                key={skill.name}
                className="glass-card p-6 flex flex-col items-center justify-center text-center hover-glow transition-all duration-300 hover:scale-110 group"
                >
                <skill.Icon />
                <p className="mt-4 text-sm font-semibold text-foreground">{skill.name}</p>
                </Card>
            ))}
            </div>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-glow rounded-full opacity-10 animate-pulse-glow" />
        <div className="absolute bottom-1/4 -left-32 w-48 h-48 bg-gradient-secondary rounded-full opacity-10 animate-float" />
      </div>
    </section>
  );
};