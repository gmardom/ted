import { writable, type Writable } from "svelte/store";

export interface Key {
  key: string;
  down: boolean;
  repeat: boolean;
}

export const current: Writable<Key> = writable({ key: "", down: false, repeat: false });

export const metaPressed: Writable<boolean> = writable(false);
export const ctrlPressed: Writable<boolean> = writable(false);
export const shftPressed: Writable<boolean> = writable(false);

export function handle_keyboard(
  event: KeyboardEvent,
  keyDown: boolean
) {
  let key = event.key.toLowerCase();
  switch (key) {
    // Ignore these
    case "tab":
    case "super":
    case "numlock":
    case "capslock":
    case "scrolllock":
    case "contextmenu":
    case "insert":
    case "delete":
    case "home":
    case "end":
    case "pageup":
    case "pagedown":
    case "printscreen":
    case "pause":
      break;
    // Reload
    case "f5":
      window.location.reload();
      break;
    // Set Meta state
    case "alt":
      metaPressed.set(keyDown);
      break;
    // Set Ctrl state
    case "control":
      ctrlPressed.set(keyDown);
      break;
    // Set Shft state
    case "shift":
      shftPressed.set(keyDown);
      break;
    // Set current key
    default:
      current.set({
        key: key,
        down: keyDown,
        repeat: event.repeat,
      });
  }
}
