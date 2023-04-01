import { writable, type Writable } from "svelte/store";

export interface Key {
  key: string;
  repeat: boolean;
}

export const currentKey: Writable<Key> = writable({ key: "", repeat: false });

export const metaPressed: Writable<boolean> = writable(false);
export const ctrlPressed: Writable<boolean> = writable(false);
export const shftPressed: Writable<boolean> = writable(false);

export function onKeyUp(event: KeyboardEvent) {
  event.preventDefault();

  let key = event.key.toLowerCase();
  switch (key) {
    case "alt": {
      metaPressed.set(false);
      return;
    }
    case "control": {
      ctrlPressed.set(false);
      return;
    }
    case "shift": {
      shftPressed.set(false);
      return;
    }
  }
}

export function onKeyDown(event: KeyboardEvent) {
  event.preventDefault();

  let key = event.key.toLowerCase();
  switch (key) {
    // Ignore these for now
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
    case "pause": {
      break;
    }
    case "alt": {
      metaPressed.set(true);
      break;
    }
    case "control": {
      ctrlPressed.set(true);
      break;
    }
    case "shift": {
      shftPressed.set(true);
      break;
    }
    default: {
      currentKey.set({
        key: key,
        repeat: event.repeat,
      });
    }
  }
}
