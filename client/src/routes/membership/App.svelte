<script>
    import tennisCourtImage from "../../images/tennis-court-no-left-no-right.jpeg";
    import LeftHalfContainer from "../LeftHalfContainer.svelte";
    import RightHalfContainer from "../RightHalfContainer.svelte";
    import HeaderContainer from "../HeaderContainer.svelte";
    import FooterContainer from "../FooterContainer.svelte";
    const customDescriptionStyle = `
        font-size: 20px;
        width: 80%;
        top: 55%;
    `;
    const customTextStyle = `
        top: 29%;
    `;
    const customTextStyle2 = `
        top: 44%;
    `;
    const customDescriptionStyle2 = `
        font-size: 20px;
        width: 90%;
        top: 55%;
    `;
  </script>
  
  <main>
    <img src={tennisCourtImage} alt="Tennis Court" />
    <LeftHalfContainer
        text="SUPPORT THE CLUB"
        textStyle="{customTextStyle}"
        href=""
        description=" For those seeking a more competitive edge and an opportunity to participate in UMass Tennis Club events and tournaments, we invite you to become a club member. Your membership not only supports the growth of tennis on campus but also grants you access to exciting tournaments and events throughout the semester. A fee of $5 per semester is required to become a UMass Tennis Club member. This fee helps us organize and enhance the club's activities for everyone's enjoyment.

        Please note that the UMass Tennis Club remains free for all recreational players who simply want to play and have fun on the courts.

        "
        descriptionStyle={customDescriptionStyle} />
    <RightHalfContainer 
        text="WE ACCEPT"
        textStyle="{customTextStyle2}"
        href=""
        description="Cash, Venmo, and PayPal :)
        "
        descriptionStyle={customDescriptionStyle2} />
    <HeaderContainer />
    <FooterContainer />
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
  