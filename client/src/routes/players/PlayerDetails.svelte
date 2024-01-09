<script>
    export let player;
  </script>
  
  <div>
    <p>Name: {player.fname} {player.lname}</p>
    <p>Email: {player.email}</p>
    <p>NTRP: {player.ranking}</p>
    <p>Membership: {player.ismember ? 'Yes' : 'No'}</p>
  </div>
  
  <style>
    div {
      margin: 0 auto;
      width: 50%;
      text-align: center;
      position: absolute;
        left: 37%;
        top: 30%;
        color: rgba(30, 30, 30, 1); 
    }

    p {
      margin-top: 0;
      font-family: 'Arial';
    }
  </style>