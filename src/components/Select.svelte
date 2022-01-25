<script lang="ts">
  export let value: any;
  export let id: string;
</script>

<select
  {id}
  class="px-3 ring-2 ring-zinc-800 rounded-sm h-8 font-bold bg-slate-100 text-black"
  on:change
  bind:value
>
  <slot />
</select>
