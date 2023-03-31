import { writable, type Writable } from "svelte/store";

export enum Mode {
  Normal = "normal",
  Insert = "insert",
  Command = "command",
}

export const mode: Writable<Mode> = writable(Mode.Normal);
