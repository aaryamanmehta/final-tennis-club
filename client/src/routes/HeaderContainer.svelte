<script>
    import homeIcon from '../images/home-icon.png';
    import loginIcon from '../images/login-icon.png';
    import membershipIcon from '../images/membership-icon.png';
    import peopleIcon from '../images/people-icon.png';
    import personIcon from '../images/person-icon.png';
    import tournamentIcon from '../images/tournament-icon.png';
</script>

<main>
    <div class="header-container">
        <div class="icon-container">
            <a href="/home">
                <img src={homeIcon} alt="Home Icon" />
            </a>
        </div>
        <div class="icon-container">
            <a href="/membership">
                <img src={membershipIcon} alt="Membership Icon" />
            </a>
        </div>
        <div class="icon-container">
            <a href="/league">
                <img src={tournamentIcon} alt="Tournament Icon" />
            </a>
        </div>
        <div class="icon-container">
            <a href="/players">
                <img src={peopleIcon} alt="People Icon" />
            </a>
        </div>
        <div class="icon-container">
            <a href="/profile">
                <img src={personIcon} alt="Person Icon" />
            </a>
        </div>
        <div class="icon-container">
            <a href="/login">
                <img src={loginIcon} alt="Login Icon" />
            </a>
        </div>
    </div>
</main>

<style>
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 5%;
        width: 100%;
        height: 100%;
    }

    .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 5%;
        height: 100%;
    }

    .icon-container img {
        width: 50%;
        height: 50%;
        transition: transform 0.5s ease;
    }

    .icon-container img:hover {
        transform: scale(1.1);
        transition: transform 0.5s ease;
    }
</style>