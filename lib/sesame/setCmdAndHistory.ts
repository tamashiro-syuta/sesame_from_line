export const setCmdAndHistory = (cmd?: string) => {
  if (cmd === 'UNLOCK') return { cmd: 83, history: 'unlocked by web api' }
  if (cmd === 'LOCK') return { cmd: 82, history: 'locked by web api' }
  return { cmd: 88, history: 'toggled by web api' } // == toggle the key
}
