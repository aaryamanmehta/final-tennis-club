<!-- App.svelte -->
<script>
    import tennisCourtImage from "../../images/tennis-court-no-left.jpeg";
    import RightTopContainer from "../RightTopContainer.svelte";
    import RightBottomContainer from "../RightBottomContainer.svelte";
    import RightMostContainer from "../RightMostContainer.svelte";
    import LeftHalfContainer from "../LeftHalfContainer.svelte";
    import HeaderContainer from "../HeaderContainer.svelte";
    import FooterContainer from "../FooterContainer.svelte";
    import PlayerList from "./PlayerList.svelte"
    const customTextStyle = `
        top: 11%;
    `;
    const customTextStyle2 = `
        top: 22%;
    `;
    const customTextStyle3 = `
        top: 11%;
    `;
    const customTextStyle4 = `
        top: 30%;
        width: 100%;
        position: absolute;
        text-align: center;
    `;
    const customDescriptionStyle = `
        top:50%;
        font-size: 20px;
    `;

  </script>
  
  <main>
    <img src={tennisCourtImage} alt="Tennis Court" />
    <RightTopContainer text="PLAYER" textStyle="{customTextStyle2}" />
    <RightBottomContainer text="CASUAL MATCH" textStyle="{customTextStyle4}" description="E-mail an invitation to a casual match!" descriptionStyle="{customDescriptionStyle}"/>
    <RightMostContainer text="MATCHES" textStyle="{customTextStyle3}" />
    <LeftHalfContainer text="PLAYER LIST" textStyle="{customTextStyle}" />
    <HeaderContainer />
    <FooterContainer />
    <PlayerList />
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
  