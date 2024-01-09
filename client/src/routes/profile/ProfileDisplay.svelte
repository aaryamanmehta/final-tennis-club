<script>
  import { onDestroy, onMount } from "svelte";
  import { currentPlayerStore } from "../stores.js";
  import PlayerMatches from "../players/PlayerMatches.svelte";
  let playerData = {
    email: "",
    ismember: "",
    ranking: "",
    fname: "",
    lname: "",
  };

  let isEditable = false;
  let playerMatches;
  let matchData;
  let playerMatchesCSS = `
        max-width: 700px; /* Set a maximum width for the container */
        width: 100%;
        position: absolute;
        left: 54%;
        top: 31%;
    `;
  async function updatePlayer() {
    try {
      // Update the player on the server
      await fetch(
        `http://localhost:6001/players/${encodeURIComponent(playerData.email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ismember: playerData.ismember,
            ranking: playerData.ranking,
            fname: playerData.fname,
            lname: playerData.lname,
          }),
        }
      );

      await fetch(
        `http://localhost:6003/update-player-notification/${encodeURIComponent(
          playerData.email
        )}`,
        {
          method: "POST",
        }
      );

      // Fetch the updated player data from the server
      const response = await fetch(
        `http://localhost:6001/players/${encodeURIComponent(playerData.email)}`
      );
      const updatedData = await response.json();
      console.log(updatedData);

      // Update currentPlayerStore with the fetched updated player data
      currentPlayerStore.set(updatedData);
      // Disable editing after update
      isEditable = false;
    } catch (error) {
      console.error("Error updating player:", error);
    }
  }

  onMount(async () => {
    // Retrieve data from currentPlayerStore on component mount
    playerData = $currentPlayerStore.player;
    try {
      const response = await fetch(
        `http://localhost:6002/tournaments/${playerData.email}`
      );
      const data = await response.json();
      matchData = data;
      console.log(matchData);
    } catch (error) {
      console.error("Error fetching player matches:", error);
    }
  });

  $: if (matchData) {
    playerMatches = new PlayerMatches({
      target: document.body,
      props: {
        filteredTournaments: matchData,
        customCSS: playerMatchesCSS,
      },
    });
  }

  onDestroy(() => {
    // Destroy the PlayerMatches component on component destroy
    if (playerMatches) {
      playerMatches.$destroy();
    }
  });
</script>

<main>
  <section>
    <div class="email">
      <p>Email: {playerData.email}</p>
    </div>

    {#if !isEditable}
      <div class="name">
        <p>Name: {playerData.fname} {playerData.lname}</p>
      </div>

      <div class="ranking">
        <p>NTRP: {playerData.ranking}</p>
      </div>

      <div class="membership">
        <p>Membership: {playerData.ismember ? "Yes" : "No"}</p>
      </div>
    {/if}
  </section>

  {#if isEditable}
    <section>
      <div class="edit-fname">
        <input bind:value={playerData.fname} />
      </div>

      <div class="edit-lname">
        <input bind:value={playerData.lname} />
      </div>

      <div class="edit-ranking">
        <input bind:value={playerData.ranking} />
      </div>

      <div class="edit-membership">
        <input bind:value={playerData.ismember} />
      </div>

      <button on:click={updatePlayer}>Update Profile</button>
    </section>
  {/if}

  {#if !isEditable}
    <button on:click={() => (isEditable = true)}>Edit Profile</button>
  {/if}
</main>

<style>
  .email {
    margin: 0 auto;
    width: 50%;
    text-align: center;
    position: absolute;
    left: -9.2%;
    top: 46%;
    color: rgba(30, 30, 30, 1);
  }
  p {
    margin-top: 0;
    font-family: "Arial";
    text-align: center;
  }
  .name {
    margin: 0 auto;
    width: 50%;
    text-align: center;
    position: absolute;
    left: -9.2%;
    top: 51%;
    color: rgba(30, 30, 30, 1);
  }

  .ranking {
    margin: 0 auto;
    width: 50%;
    text-align: center;
    position: absolute;
    left: 12.7%;
    top: 36%;
    color: rgba(30, 30, 30, 1);
  }

  .membership {
    margin: 0 auto;
    width: 50%;
    text-align: center;
    position: absolute;
    left: 12.7%;
    top: 68%;
    color: rgba(30, 30, 30, 1);
  }

  .edit-fname {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    left: 7%;
    top: 51%;
    color: rgba(30, 30, 30, 1);
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    resize: vertical;
    font-family: Arial;
    border: 2px solid rgba(30, 30, 30, 1);
    z-index: 1;
  }

  .edit-lname {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    left: 16%;
    top: 51%;
    color: rgba(30, 30, 30, 1);
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    resize: vertical;
    font-family: Arial;
    border: 2px solid rgba(30, 30, 30, 1);
    z-index: 1;
  }

  .edit-ranking {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    left: 33.9%;
    top: 36%;
    color: rgba(30, 30, 30, 1);
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    resize: vertical;
    font-family: Arial;
    border: 2px solid rgba(30, 30, 30, 1);
    z-index: 1;
  }

  .edit-membership {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    left: 33.9%;
    top: 68%;
    color: rgba(30, 30, 30, 1);
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    resize: vertical;
    font-family: Arial;
    border: 2px solid rgba(30, 30, 30, 1);
    z-index: 1;
  }
  button {
    text-align: center;
    position: absolute;
    width: 9%;
    left: 11.2%;
    top: 55%;
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
