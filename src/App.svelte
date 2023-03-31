<script lang="ts">
  import Editor from "./lib/Editor.svelte";
  import Modeline from "./lib/Modeline.svelte";

  import { mode, Mode } from "./stores/mode";
  import { handle_keyboard } from "./stores/keyboard";

  function on_key(event: KeyboardEvent, keyDown: boolean) {
    if ($mode == Mode.Normal) {
      event.preventDefault();
    }

    handle_keyboard(event, keyDown);
  }
</script>

<svelte:body
  on:keydown={(e) => on_key(e, true)}
  on:keyup={(e) => on_key(e, false)}
/>

<Editor />
<Modeline />
