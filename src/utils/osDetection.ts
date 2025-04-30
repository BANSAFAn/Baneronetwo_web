
export type OperatingSystem = 'Windows' | 'MacOS' | 'Linux' | 'Android' | 'iOS' | 'Unknown';

export function detectOS(): OperatingSystem {
  const userAgent = window.navigator.userAgent;
  
  // Detect Android
  if (/Android/i.test(userAgent)) {
    return 'Android';
  }
  
  // Detect iOS
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'iOS';
  }
  
  // Detect MacOS
  if (/Mac OS X/i.test(userAgent)) {
    return 'MacOS';
  }
  
  // Detect Linux
  if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) {
    return 'Linux';
  }
  
  // Detect Windows
  if (/Windows NT|Win64/i.test(userAgent)) {
    return 'Windows';
  }
  
  return 'Unknown';
}
