<script lang="ts">
  import { solve } from '$lib/solving';
  import { serialise } from '$lib/shared';
  import { DateTime, Duration } from 'luxon';
  import Section from '$cmp/Section.svelte';
  import Button from '$cmp/Button.svelte';
  import Select from '$cmp/Select.svelte';

  const CHALLENGE_URL = '/challenge';

  let timing: Duration;
  let solution: string;
  let solving: Promise<void>;
  let nonce: number;
  let challenge: string;
  let difficulty: string;
  let hashesPerMillisecond: string;
  let calling: Promise<Response>;
  let binaryhash: string;

  const goGetIt = async () => {
    const url = new URL(CHALLENGE_URL, window.location.href);
    url.searchParams.set('u', '123');
    url.searchParams.set('d', difficulty);
    calling = fetch(url.toString(), {
      headers: { Hashcash: solution }
    });
    const getChallenge = await calling;
    challenge = getChallenge.headers.get('Hashcash-Challenge');
  };

  const startSolving = () => {
    solving = (async () => {
      calling = undefined;
      const start = DateTime.now();
      const [sol, hash] = await solve(challenge);
      binaryhash = hash;
      nonce = parseInt(sol.solution, 10);
      solution = serialise(sol);
      timing = DateTime.now().diff(start);
      const hashCount = nonce + 1;

      const milliseconds = timing.as('milliseconds');
      if (milliseconds > 1) {
        hashesPerMillisecond = `${Math.round(hashCount / milliseconds).toString(
          10
        )} hashes per millisecond`;
      } else {
        hashesPerMillisecond = `More than ${hashCount} per millisecond`;
      }
    })();
  };

  const reset = () => {
    challenge = undefined;
    solution = undefined;
    binaryhash = undefined;
    timing = undefined;
    calling = undefined;
    hashesPerMillisecond = undefined;
  };
</script>

<svelte:head>
  <title>Hashcash!</title>
</svelte:head>

<main
  class="max-w-3xl grid grid-rows-[repeat(3,_8rem)] gap-2 w-10/12 mx-auto mt-2 p-3 items-center"
>
  <Section>
    <label for="difficulty">
      Difficulty:
      <Select id="difficulty" bind:value={difficulty} on:change={reset}>
        {#each Array.from({ length: 20 }).map((_, i) => i++) as i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </Select>
    </label>
    <Button on:click={goGetIt}>Get the thing</Button>
    {#if challenge}
      <Button on:click={startSolving}>Solve</Button>
    {/if}
  </Section>
  <Section>
    <dl class="grid grid-cols-3 gap-x-2">
      <dt>Challenge</dt>
      <dd class="col-span-2 font-bold underline underline-offset-4">{challenge ?? '-'}</dd>
      {#await solving}
        <dt>Solving...</dt>
        <dd class="col-span-2" />
      {:then}
        <dt>Solution</dt>
        <dd class="col-span-2 font-bold underline underline-offset-4">{solution ?? '-'}</dd>
        <dt>Hash (binary; first 25 digits)</dt>
        <dd class="col-span-2">{binaryhash?.substring(0, 25) ?? '-'}</dd>
        <dt>Timing</dt>
        <dd class="col-span-2 font-bold underline underline-offset-4">
          {timing?.toHuman({ useGrouping: true }) ?? '-'}
          {#if hashesPerMillisecond}({hashesPerMillisecond}){/if}
        </dd>
      {/await}
    </dl>
  </Section>
  <Section>
    {#if calling !== undefined}
      {#await calling}
        Requesting...
      {:then response}
        <dl class="grid grid-cols-3 gap-x-2">
          <dt>Status</dt>
          <dd class="col-span-2 font-bold underline underline-offset-4">{response.status}</dd>
          <dt>Message</dt>
          <dd class="col-span-2 font-bold underline underline-offset-4">
            {#await response.json() then body}
              {body.message ?? '-'}
            {/await}
          </dd>
        </dl>
      {:catch error}
        {error}
      {/await}
    {/if}
  </Section>
</main>

<style>
  dt::after {
    content: ': ';
  }
</style>
