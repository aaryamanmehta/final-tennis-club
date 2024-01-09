<script>
    import tennisCourtImage from "../../images/tennis-court-no-left-no-right.jpeg";
    import LeftHalfContainer from "../LeftHalfContainer.svelte";
    import RightHalfContainer from "../RightHalfContainer.svelte";
    import HeaderContainer from "../HeaderContainer.svelte";
    import FooterContainer from "../FooterContainer.svelte";
    import Login from "./Login.svelte";
    const customTextStyle = `
        top: 12%;
    `;
  </script>
  
  <main>
    <img src={tennisCourtImage} alt="Tennis Court" />
    <LeftHalfContainer text="LOGIN" textStyle="{customTextStyle}" />
    <RightHalfContainer text="SIGN UP" textStyle="{customTextStyle}"/>
    <HeaderContainer />
    <FooterContainer />
    <Login />
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
  