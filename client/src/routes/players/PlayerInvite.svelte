<script>
    import { currentPlayerStore } from "../stores.js";
    export let email;

    // call the API route to email the invite
    async function invitePlayer() {
        // if the currentPlayerStore is null, then the user is not logged in, hence they cannot invite a player - throw a popup error message asking them to login
        if ($currentPlayerStore == null) {
            alert("Please login to invite a player to a match");
            return;
        }
        else if ($currentPlayerStore.player.email == email) {
            alert("You cannot invite yourself to a match");
            return;
        }
        else {
            try {
            const response = await fetch(
                `http://localhost:6003/casual-match-invite-notification/${encodeURIComponent(email)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ currentPlayer: $currentPlayerStore.player }), // send the player object in the request body
                }
            );
            const data = await response.json();
            console.log(data);
            alert("Email sent to " + email);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
        }
    }
</script>

<div>
    <button on:click={invitePlayer}>✉️</button>
</div>

<style>
    div {
        position: absolute;
        left:60%;
        top:68%;
        z-index: 1;
    }

    button {
        background-color: rgba(255, 255, 255, 0);
        border: none;
        color: black;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 50px;
        cursor: pointer;
    }
</style>
