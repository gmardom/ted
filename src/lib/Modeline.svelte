<script lang="ts">
  import { mode } from "../stores/mode";
  import { time, formatter } from "../stores/time";
</script>

<div id="modeline">
  <div class="left">
    <div class="module" id="mode">{$mode.toUpperCase()}</div>
  </div>

  <div class="right">
    <div class="module" id="time">{formatter.format($time)}</div>
  </div>
</div>

<style lang="scss">
  #modeline {
    $font-size: var(--font-size);
    $line-height: var(--line-height);

    background-color: #181818;
    color: white;
    font-family: monospace;

    font-size: var(--font-size);
    line-height: var(--line-height);
    min-height: var(--line-height);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .module {
    background-color: rgba(red, .25);
    padding: .1em .5em;
  }
</style>
