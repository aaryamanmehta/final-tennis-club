<script>
    export let filteredTournaments;
    export let customCSS;
  </script>
  
  <style>

  div::-webkit-scrollbar {
    height: 4px; 
  }

  div::-webkit-scrollbar-thumb {
    background-color: #fff; 
    border-radius: 2px; 
  }

    div {
    max-width: 315px; 
    overflow-x: auto; 
    position: absolute;
    left: 76.2%;
    top: 30%;
    z-index: 1;
    
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Arial';
    color: rgba(30, 30, 30, 1); 
  }

  th, td {
    padding: 8px;
    text-align: center;
    border: 2px solid #000000;
  }

  tr {
      height: 20px;
    }
  </style>
  
  <div style="{customCSS}">
    <table>
      <thead>
        <tr>
          <th>League</th>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>Deadline</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(filteredTournaments.filteredTournaments) as key}
          {#each filteredTournaments.filteredTournaments[key] as match}
            <tr>
              <td>{key}</td>
              <td>{match.player1_email}</td>
              <td>{match.player2_email}</td>
              <td>{match.match_deadline}</td>
              <td>{match.result}</td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
  