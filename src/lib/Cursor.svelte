<script lang="ts">
  export let line: number = 0;
  export let char: number = 0;
  export let focus: boolean = false;

  import { current } from "../stores/keyboard";

  let typing: boolean = false;
  let typingTimeout: NodeJS.Timeout;

  current.subscribe(() => {
    typing = true;
    clearInterval(typingTimeout);
    typingTimeout = setTimeout(() => typing = false, 1000);
  });
</script>

<div
  class:focus={focus}
  class:typing={typing}
  style="--x:{char};--y:{line};"
/>

<style lang="scss">
  div {
    // FIXME: I don't know why this need to be 1px bigger.
    $char-width: calc(1ch + 1px);
    $line-height: var(--line-height);

    position: absolute;
    top: calc($line-height * var(--y));
    left: calc($char-width * var(--x));
    height: $line-height;
    width: $char-width;

    box-sizing: border-box;
    border: 1px solid white;
    opacity: .5;

    &.focus {
      background-color: white;
    }

    &.focus:not(.typing) {
      animation-name: blink;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: steps(2);
    }
  }

  @keyframes blink {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
