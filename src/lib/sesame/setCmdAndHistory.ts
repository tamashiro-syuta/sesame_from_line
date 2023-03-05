import { LockType } from "./types"

// toggle: 88
// lock: 82
// unlock: 83
export const setCmdAndHistory = (cmd: LockType) => {
  if (cmd === "unlocked") return { cmd: 83, history: 'unlocked by web api' }
  if (cmd === 'locked') return { cmd: 82, history: 'locked by web api' }
  return { cmd: 88, history: 'toggled by web api' } // == toggle the key
}
