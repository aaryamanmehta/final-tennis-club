<script>
    import twitterIcon from '../images/twitter-icon.png';
    import facebookIcon from '../images/facebook-icon.png';
    import instagramIcon from '../images/instagram-icon.png';
    import { currentPlayerStore } from './stores.js';
  
    function handleLogout() {
      currentPlayerStore.set(null);
    }
  </script>
  
  <main>
    <div class="header-container">
      <div class="icon-container">
        <a href="https://www.instagram.com/">
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
      <div class="icon-container">
        <a href="https://www.facebook.com/">
          <img src={facebookIcon} alt="Facebook" />
        </a>
      </div>
      <div class="icon-container">
        <a href="https://twitter.com/">
          <img src={twitterIcon} alt="Twitter" />
        </a>
      </div>
      <a href="/" on:click={handleLogout}>
        <p>RETURN/LOG OUT</p>
      </a>
    </div>
  </main>

<style>
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 34%;
        margin-left: 7%;
        width: 50%;
        height: 100%;
    }

    .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 4%;
        height: 100%;
    }

    .icon-container img {
        width: 100%;
        height: 100%;
        transition: transform 0.5s ease;
    }

    .icon-container img:hover {
        transform: scale(1.1);
        transition: transform 0.5s ease;
    }

    p {
        text-decoration: none;
      color: rgba(30, 30, 30, 1); 
      font-family: 'Arial';
      font-size: 24px;
      position: absolute;
        top: 84.25%;
        left: 72%;
        transform: translate(-50%, -50%);
        transition: color 0.5s ease;
    }

    p:hover {
      color: rgba(77, 0, 0, 1);
    }
</style>