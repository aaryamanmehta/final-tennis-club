<script>
    import PlayerDetails from "./PlayerDetails.svelte";
    import PlayerMatches from "./PlayerMatches.svelte";
    import PlayerInvite from "./PlayerInvite.svelte";
    import { playerStore } from "../stores.js";
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
  
    let players = writable([]);
    let selectedPlayer;
    let playerDetails;
    let playerMatches;
    let playerInvite;
    let matchData;
  
    // Fetch players when the component is mounted
    onMount(async () => {
      try {
        const response = await fetch("http://localhost:6001/players");
        const data = await response.json();
        playerStore.set(data);
        // access playerStore data
        console.log($playerStore.players);
        // set players data
        players.set($playerStore.players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    });
  
    // Create PlayerDetails component once on mount. if selectedPlayer changes, delete the old component and create a new one
    $: if (selectedPlayer) {
      if (playerDetails) {
        playerDetails.$destroy();
      }
      if (playerMatches) {
        playerMatches.$destroy();
      }
      if (playerInvite) {
        // create a popup window informing the user that they have sent an email
        playerInvite.$destroy();
      }
      // create player invite component

      playerInvite = new PlayerInvite({
            target: document.body,
            props: {
            email: selectedPlayer.email,
            },
        });
      playerDetails = new PlayerDetails({
        target: document.body,
        props: {
          player: selectedPlayer,
        },
      });
      if (matchData) {
        playerMatches = new PlayerMatches({
          target: document.body,
          props: {
            filteredTournaments: matchData,
          },
        });
      }     
    }
  
    // Function to update the selectedPlayer
    async function showPlayerDetails(player) {
      selectedPlayer = player; 
        try {
            const response = await fetch(
            `http://localhost:6002/tournaments/${player.email}`
            );
            const data = await response.json();
            matchData = data;
            console.log(matchData);
        } catch (error) {
            console.error("Error fetching player matches:", error);
        }
    }
  
    // Cleanup function to destroy PlayerDetails component when MainComponent is destroyed
    onDestroy(() => {
      if (playerDetails) {
        playerDetails.$destroy();
      }
        if (playerMatches) {
            playerMatches.$destroy();
        }
        if (playerInvite) {
            playerInvite.$destroy();
        }
    });
  </script>
  
  <div class="table-container">
    <table>
      <tr>
        <th>Name</th>
        <th>NTRP</th>
      </tr>
      {#each $players as player}
        <tr on:click={() => showPlayerDetails(player)}>
          <td>{player.fname} {player.lname}</td>
          <td>{player.ranking}</td>
        </tr>
      {/each}
    </table>
  </div>
  
  <style>

.table-container {
    position: absolute;
    left: 9.5%;
    top: 30%;
    width: 35%;
    max-height: 460px; /* Set your desired max-height */
    overflow-y: auto; /* Add scrollbars if content exceeds max-height */
    z-index: 1;
  }

div::-webkit-scrollbar {
    width: 4px;
  }

  div::-webkit-scrollbar-thumb {
    background-color: #fff; 
    border-radius: 2px; 
  }
    table {
      width: 100%; /* Make the table take up 100% of the container width */
      border-collapse: collapse; 
      border: 2px solid black; 
      font-family: 'Arial';
      color: rgba(30, 30, 30, 1);
    }
  
    td,
    th {
      border: 2px solid black;
      padding: 8px; 
    }
  
    td:nth-child(1) {
      text-align: left;
      cursor: pointer;
    }
  
    td:nth-child(2) {
      text-align: right;
      cursor: pointer;
    }
  
    th:nth-child(1) {
      text-align: left;
    }
  
    th:nth-child(2) {
      text-align: right;
    }
  
    tr {
      height: 20px;
    }
  </style>
  