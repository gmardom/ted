<script lang="ts">
  import Cursor from "./Cursor.svelte";

  import { mode, Mode } from "../stores/mode";
  import { current, shftPressed } from "../stores/keyboard";

  let lines: string[] = [""];
  let posLine: number = 0;
  let posChar: number = 0;

  let typing: boolean = false;
  let typingTimer;
  
  function isEndOfLine(): boolean {
    return posChar == lines[posLine].length;
  }
  function isStartOfLine(): boolean {
    return posChar == 0;
  }
  function isLastLine(): boolean {
    return posLine == lines.length - 1;
  }
  function isFirstLine(): boolean {
    return posLine == 0;
  }
  function isLineEmpty(): boolean {
    return lines[posLine].length == 0;
  }

  function lineEnd(): number {
    return lines[posLine].length;
  }

  function insertChar(char: string) {
    if (char.search(/\r?\n/) > 0) {
      console.log("TODO: inserting multiple lines");
      return;
    }
    let start = lines[posLine].substring(0, posChar);
    let end = lines[posLine].substring(posChar);
    lines[posLine] = start + char + end;
    posChar += 1;
  }

  function deleteBackwardChar() {
    if (isStartOfLine() && isFirstLine()) {
      return;
    }
    if (isLineEmpty()) {
      posLine -= 1;
      posChar = lineEnd();
      lines.splice(posLine+1, 1);
      return;
    }
    if (isStartOfLine()) {
      posLine -= 1;
      posChar = lineEnd();
      lines[posLine] += lines[posLine+1];
      lines.splice(posLine+1, 1);
      return;
    }

    let lead = lines[posLine].substring(0, posChar-1);
    let trail = lines[posLine].substring(posChar);
    posChar -= 1;
    lines[posLine] = lead + trail;
  }

  function insertNewLine() {
    let lead = lines[posLine].substring(0, posChar);
    let trail = lines[posLine].substring(posChar);
    lines[posLine] = lead;
    lines.splice(posLine+1, 0, trail);
    posLine += 1;
    posChar = 0;
  }

  function cursorMoveLeft(wrap: boolean = false) {
    if (isStartOfLine() && isFirstLine()) return;
    if (isStartOfLine() && wrap) {
      posLine -= 1;
      posChar = lineEnd();
      return;
    }
    
    posChar -= 1;
  }

  function cursorMoveRight(wrap: boolean = false) {
    if (isEndOfLine() && isLastLine()) return;
    if (isEndOfLine() && wrap) {
      posLine += 1;
      posChar = 0;
      return;
    }
    
    posChar += 1;
  }

  function cursorMoveUp() {
    if (isFirstLine()) return;
    posLine -= 1;
    if (posChar > lineEnd()) {
      posChar = lineEnd();
    }
  }

  function cursorMoveDown() {
    if (isLastLine()) return;
    posLine += 1;
    if (posChar > lineEnd()) {
      posChar = lineEnd();
    }
  }

  current.subscribe((key) => {
    if (key.down == false) { return; }
    if ($mode == Mode.Insert) {
      switch (key.key) {
        case "escape": {
          mode.set(Mode.Normal);
          break;
        }
        case "enter": {
          insertNewLine();
          break;
        }
        case "backspace": {
          deleteBackwardChar();
          break;
        }
        case "arrowleft": {
          cursorMoveLeft(true);
          break;
        }
        case "arrowright": {
          cursorMoveRight(true);
          break;
        }
        case "arrowup": {
          cursorMoveUp();
          break;
        }
        case "arrowdown": {
          cursorMoveDown();
          break;
        }
        default: {
          let char = key.key;
          if ($shftPressed) {
            char = char.toUpperCase();
          }
          insertChar(char);
          break;
        }
      }
    } else if ($mode == Mode.Normal) {
      switch (key.key) {
        case "i": {
          mode.set(Mode.Insert);
          break;
        }
        case "h": {
          cursorMoveLeft(false);
          break;
        }
        case "j": {
          cursorMoveDown();
          break;
        }
        case "k": {
          cursorMoveUp();
          break;
        }
        case "l": {
          cursorMoveRight(false);
          break;
        }
      }
    }

    typing = true;
    clearInterval(typingTimer);
    typingTimer = setTimeout(() => typing = false, 1000);
  });

</script>

<div class="editor">
  <Cursor line={posLine} char={posChar} focus={true} {typing} />
  <div class="editor__lines">
    {#each lines as line}
      <div class="editor__line">{line}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  .editor {
    $font-size: var(--font-size);
    $line-height: var(--line-height);

    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;

    background-color: black;
    color: white;

    &__line {
      white-space: pre;
      font-family: monospace;
      font-size: $font-size;
      line-height: $line-height;
      min-height: $line-height;
    }
  }
</style>
