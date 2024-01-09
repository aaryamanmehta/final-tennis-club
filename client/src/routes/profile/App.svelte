<script>
    import tennisCourtImage from "../../images/tennis-court-no-right.jpeg";
    import LeftTopContainer from "../LeftTopContainer.svelte";
    import LeftBottomContainer from "../LeftBottomContainer.svelte";
    import LeftMostContainer from "../LeftMostContainer.svelte";
    import RightHalfContainer from "../RightHalfContainer.svelte";
    import HeaderContainer from "../HeaderContainer.svelte";
    import FooterContainer from "../FooterContainer.svelte";
    import ProfileDisplay from "./ProfileDisplay.svelte";
    const customTextStyle1 = `
        top: 36%;
        width: 100%;
        position: absolute;
        text-align: center;
    `;
    const customTextStyle2 = `
        top: 42%;
        width: 100%;
        position: absolute;
        text-align: center;
    `;
    const customTextStyle3 = `
        top: 12%;
        width: 100%;
        position: absolute;
        text-align: center;
    `;
  </script>
  
  <main>
    <img src={tennisCourtImage} alt="Tennis Court" />
    <LeftMostContainer text="MY PROFILE" textStyle="{customTextStyle1}" />
    <LeftTopContainer text="MY RANK" textStyle="{customTextStyle2}" />
    <LeftBottomContainer text="MY MEMBERSHIP" textStyle="{customTextStyle2}" />
    <RightHalfContainer text="MY MATCHES" textStyle="{customTextStyle3}" />
    <HeaderContainer />
    <FooterContainer />
    <ProfileDisplay />
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
