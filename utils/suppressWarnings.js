// Suppress development warnings
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Override console.warn to filter out React warnings we can't fix
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    
    // Skip React fetchPriority warnings
    if (typeof message === 'string' && message.includes('fetchPriority')) {
      return;
    }
    
    // Skip other React DOM warnings about props
    if (typeof message === 'string' && message.includes('React does not recognize')) {
      return;
    }
    
    // Skip Three.js warnings in development
    if (typeof message === 'string' && message.includes('THREE.')) {
      return;
    }
    
    // Call original warn for everything else
    originalWarn.apply(console, args);
  };
}