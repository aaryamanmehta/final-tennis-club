<script>
  import { leagueStore, currentPlayerStore } from "../stores.js";
  import LeagueMatches from "./LeagueMatches.svelte";
  import { onMount, onDestroy } from "svelte";

  let currentPlayerEmail;
  let selectedDate;
  let leagueMatches;
  let matchData;
  let ntrpProp;
  onMount(() => {
    currentPlayerEmail = $currentPlayerStore.player.email;
  });

  async function displayLeague(ntrp) {
    try {
      const response = await fetch(`http://localhost:6002/tournaments-${ntrp}`);
      const leagueData = await response.json();
      matchData = leagueData;
      ntrpProp = ntrp;
      console.log(matchData);
      leagueStore.set(leagueData);
    } catch (error) {
      console.error(`Error displaying ${ntrp} NTRP league:`, error);
    }
  }

  async function signUpForLeague(ntrp) {
    // Display a popup asking the user to confirm their signup
    const confirmed = window.confirm(
      `Are you sure you want to sign up for the ${ntrp} NTRP league?`
    );
    if (!confirmed) {
      return;
    }
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!currentPlayerEmail) {
      alert("Please login to sign up for a league");
      return;
    }
    if (ntrp === "3.5") {
        if ($currentPlayerStore.player.ranking !== 3.5) {
            alert("You are not eligible to sign up for this league");
            return;
        }
    }
    if (ntrp === "4.0") {
      if ($currentPlayerStore.player.ranking !== 4) {
        alert("You are not eligible to sign up for this league");
        return;
      }
    }
    if (ntrp === "4.5") {
      if ($currentPlayerStore.player.ranking !== 4.5) {
        alert("You are not eligible to sign up for this league");
        return;
      }
    }
    if (ntrp === "5.0") {
      if ($currentPlayerStore.player.ranking !== 5) {
        alert("You are not eligible to sign up for this league");
        return;
      }
    }
    // if current player . ismember is false, then they cannot sign up for a league
    if ($currentPlayerStore.player.ismember === false) {
      alert("You are not eligible to sign up for a league. Please purchase a membership.");
      return;
    }    
    try {
      await fetch(
        `http://localhost:6002/create-tournament-${ntrp}/${currentPlayerEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match_deadline: selectedDate,
            result: "incomplete",
          }),
        }
      );
      await fetch(
        `http://localhost:6003/tournament-signup-notification/${currentPlayerEmail}/${ntrp}`,
        {
          method: "POST",
        }
      );
      // Refresh the league data after signing up
      displayLeague(ntrp);
    } catch (error) {
      console.error(`Error signing up for ${ntrp} NTRP league:`, error);
    }
  }

  $: if (matchData) {
    if (leagueMatches) {
      leagueMatches.$destroy();
    }
    leagueMatches = new LeagueMatches({
      target: document.body,
      props: {
        tournaments: matchData,
        ntrp: ntrpProp,
      },
    });
  }

  onDestroy(() => {
    // Destroy the PlayerMatches component on component destroy
    if (leagueMatches) {
      leagueMatches.$destroy();
    }
  });
</script>

<main>
  <section>
    <button class="display35" on:click={() => displayLeague("3.5")}
      >Display</button
    >
    <button class="display40" on:click={() => displayLeague("4.0")}
      >Display</button
    >
    <button class="display45" on:click={() => displayLeague("4.5")}
      >Display</button
    >
    <button class="display50" on:click={() => displayLeague("5.0")}
      >Display</button
    >
  </section>

  <section>
    <input type="date" id="date-picker" bind:value={selectedDate} />

    <button class="signup35" on:click={() => signUpForLeague("3.5")}
      >Sign up</button
    >
    <button class="signup40" on:click={() => signUpForLeague("4.0")}
      >Sign up</button
    >
    <button class="signup45" on:click={() => signUpForLeague("4.5")}
      >Sign up</button
    >
    <button class="signup50" on:click={() => signUpForLeague("5.0")}
      >Sign up</button
    >
  </section>
</main>

<style>
  /* Add your styles here */
  main {
    text-align: center;
    margin: 20px;
  }

  section {
    margin-bottom: 15px;
  }

  button {
    text-align: center;
    position: absolute;
    width: 9%;
    color: rgba(30, 30, 30, 1);
    z-index: 1;
    cursor: pointer;
    margin-top: 10px;
    font-family: Arial;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    border: 2px solid rgba(30, 30, 30, 1);
    font-style: italic;
  }

    .display35 {
        left: 28.5%;
        top: 34%;
    }

    .display40 {
        left: 28.5%;
        top: 65.5%;
    }

    .display45 {
        left: 52.5%;
        top: 34%
    }

    .display50 {
        left: 52.5%;
        top: 65.5%;
    }

    .signup35 {
        left: 38.5%;
        top: 34%
    }

    .signup40 {
        left: 38.5%;
        top: 65.5%;
    }

    .signup45 {
        left: 62.5%;
        top: 34%
    }

    .signup50 {
        left: 62.5%;
        top: 65.5%;
    }

    #date-picker {
        position: absolute;
        left: 50%;
        top:47%;
        transform: translateX(-50%);
        color: rgba(30, 30, 30, 1);
        z-index: 1;
        cursor: pointer;
        margin-top: 10px;
        font-family: Arial;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        border: 2px solid rgba(30, 30, 30, 1);
        font-style: italic;
    }

</style>
