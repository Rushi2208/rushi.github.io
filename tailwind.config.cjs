module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        phosphor: '#00FF41',
        cyan: '#00F0FF'
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Oswald', 'Impact', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
