<script lang="ts">
  import { mode } from "../stores/mode";
  import { time, formatter } from "../stores/time";
</script>

<div id="modeline">
  <div class="left">
    <div class="module" id="mode">{$mode}</div>
  </div>

  <div class="right">
    <div class="module" id="time">{formatter.format($time)}</div>
  </div>
</div>

<style lang="scss">
  #modeline {
    background-color: #181818;
    color: white;
    font-family: monospace;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .module {
    background-color: red;
    padding: .1em .3rem;
  }
</style>
