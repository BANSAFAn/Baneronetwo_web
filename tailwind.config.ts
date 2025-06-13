
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk colors
				neon: {
					green: '#39FF14',
					purple: '#B222FF',
					blue: '#00F3FF',
					pink: '#FF10F0',
					orange: '#FF4500'
				},
				cyber: {
					dark: '#000000',
					darker: '#0a0a0a',
					gray: '#111111',
					'gray-light': '#1a1a1a'
				}
			},
			fontFamily: {
				orbitron: ['Orbitron', 'sans-serif'],
				mono: ['Share Tech Mono', 'monospace']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' }
				},
				'glitch-bg': {
					'0%': { transform: 'translateX(0)' },
					'10%': { transform: 'translateX(-2px)' },
					'20%': { transform: 'translateX(2px)' },
					'30%': { transform: 'translateX(-2px)' },
					'40%': { transform: 'translateX(2px)' },
					'50%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(0)' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'pulse-neon': {
					'0%, 100%': { 
						boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor'
					},
					'50%': { 
						boxShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor, 0 0 12px currentColor'
					}
				},
				'scan-lines': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'terminal-cursor': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'typewriter': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'slide-up': {
					'from': { 
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'to': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100vh)' },
					'100%': { transform: 'translateY(100vh)' }
				}
			},
			animation: {
				'glitch': 'glitch 0.3s linear infinite',
				'glitch-bg': 'glitch-bg 0.5s linear infinite',
				'flicker': 'flicker 1.5s linear infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'scan-lines': 'scan-lines 2s linear infinite',
				'terminal-cursor': 'terminal-cursor 1s infinite',
				'typewriter': 'typewriter 3s steps(40, end)',
				'slide-up': 'slide-up 0.5s ease-out',
				'matrix-rain': 'matrix-rain 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
