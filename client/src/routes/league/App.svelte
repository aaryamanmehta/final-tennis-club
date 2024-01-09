<script>
  import tennisCourtImage from "../../images/tennis-court.jpeg";
  import LeftMostContainer from "../LeftMostContainer.svelte";
  import LeftTopContainer from "../LeftTopContainer.svelte";
  import LeftBottomContainer from "../LeftBottomContainer.svelte";
  import RightTopContainer from "../RightTopContainer.svelte";
  import RightBottomContainer from "../RightBottomContainer.svelte";
  import RightMostContainer from "../RightMostContainer.svelte";
  import HeaderContainer from "../HeaderContainer.svelte";
  import FooterContainer from "../FooterContainer.svelte";
  import LeagueDisplay from "./LeagueDisplay.svelte";
  const customDescriptionStyle = `
        font-size: 16px;
        width: 80%;
        top: 55%;
    `;
  const customTextStyle = `
        top: 26%;
        width: 100%;
        left: 69%;
    `;
  const customTextStyle2 = `
        top: 10%;
        width: 100%;
        left: 62%;
    `;
  const customTextStyle3 = `
        top: 37%;
    `;
</script>

<main>
  <img src={tennisCourtImage} alt="Tennis Court" />
  <LeftMostContainer
    text="LEAGUE INFO"
    textStyle={customTextStyle}
    description="We host 3 tournaments per semester, one per month. Our tournaments are divided into 4 divisions, depending on your skill level. You may only sign up for one division per tournament, and each player is responsible for completing their match before the deadline.
        Each tournament is a single elimination bracket, and the winner of each division will receive a prize! Please note that you must be an official member of the club to participate in our tournaments, and that each tournament has an entry fee of $5. This is to help us organize the tournament and provide prizes for the winners. 
       "
    descriptionStyle={customDescriptionStyle}
    href=""
  />
  <LeftTopContainer text="NTRP 3.5" textStyle={customTextStyle3} />
  <LeftBottomContainer text="NTRP 4.0" textStyle={customTextStyle3} />
  <RightTopContainer text="NTRP 4.5" textStyle={customTextStyle3} />
  <RightBottomContainer text="NTRP 5.0" textStyle={customTextStyle3} />
  <RightMostContainer text="LEAGUE DETAILS" textStyle={customTextStyle2} />
  <HeaderContainer />
  <FooterContainer />
  <LeagueDisplay />
</main>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
