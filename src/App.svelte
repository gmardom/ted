<script lang="ts">
  import Editor from "./lib/Editor.svelte";
  import Modeline from "./lib/Modeline.svelte";

  import { onKeyUp, onKeyDown } from "./stores/keys";
</script>

<svelte:body
  on:keyup={onKeyUp}
  on:keydown={onKeyDown}
/>

<Editor />
<Modeline />
