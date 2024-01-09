<script>
    import { currentPlayerStore } from "../stores.js";
  
    // Player data object
    let playerData = {
      email: "",
      ismember: "",
      ranking: "",
      fname: "",
      lname: ""
    };
  
    function signIn() {
      if (playerData.email.trim() !== "") {
        // Making a GET request to retrieve player data based on email
        fetch(`http://localhost:6001/players/${encodeURIComponent(playerData.email)}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              currentPlayerStore.set(data);
            } else {
              alert("Player not found. Please check your email or sign up.");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        alert("Please provide a valid email for sign in.");
      }
    }
  
    function signUp() {
      if (playerData.email.trim() !== "") {
        // Sending playerData to the backend for player creation
        fetch('http://localhost:6001/create-player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        })
        .then(response => response.json())
        .then(data => {
          currentPlayerStore.set(data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
        // Sending playerData to the backend for player creation use POST
        fetch(`http://localhost:6003/create-player-notification/${encodeURIComponent(playerData.email)} `, {
          method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        alert("Please provide a valid email for sign up.");
      }
    }
  </script>
  
  <div class="signin">
    <label for="signin-email">Email:</label>
    <input id="signin-email" bind:value={playerData.email} type="email">
    <button class="signin-button" on:click={signIn}>Sign In</button>
    </div>


  <div class="signup">
    <label for="signup-email">Email:</label>
    <input id="signup-email" bind:value={playerData.email} type="email">
    
    <label for="signup-ismember">Membership (true/false):</label>
    <input id="signup-ismember" bind:value={playerData.ismember}>
  
    <label for="signup-ranking">NTRP Ranking (decimal):</label>
    <input id="signup-ranking" bind:value={playerData.ranking}>
  
    <label for="signup-fname">First Name:</label>
    <input id="signup-fname" bind:value={playerData.fname}>
  
    <label for="signup-lname">Last Name:</label>
    <input id="signup-lname" bind:value={playerData.lname}>
  
    <button class="signup-button" on:click={signUp}>Sign Up</button>
  </div>

  <div class="current-player">
        
    <!-- Display current player data -->
    {#if $currentPlayerStore}
      <p>Current Player: {$currentPlayerStore.player.fname} {$currentPlayerStore.player.lname}</p>
    {/if}
  </div>
    
  <style>
    div {
      margin: 0 auto;
      width: 50%;
      text-align: center;
      position: absolute;
        top: 30%;
        color: rgba(30, 30, 30, 1); 
        font-family: Arial;
        z-index: 1;
    }

    .signin {
      left: 2.5%;
    }

    .signup {
      left: 47.5%;
    }

    .current-player {
      left: 2.5%;
      top: 47%;
      font-family: Arial;
    }
    label {
      display: block;
      margin-bottom: 5px;
      margin-top: 5px;
    }

    button {
      margin-top: 10px;
      display: block;
      position: relative;
        color: rgba(30, 30, 30, 1);
        font-family: Arial;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        border: 2px solid rgba(30, 30, 30, 1);
        font-style: italic;
    }

    .signin-button {
      left: 50%;
      transform: translateX(-50%);
    }

    .signup-button {
      left: 50%;
      transform: translateX(-50%);
    }
  
    input {
      width: 20%;
      box-sizing: border-box;
      margin-bottom: 15px;
      margin-top: 5px;
        padding: 5px;
        text-align: center;
        border-radius: 4px;
        resize: vertical;
        font-family: Arial;
        border: 2px solid rgba(30, 30, 30, 1);

    }
  </style>
  