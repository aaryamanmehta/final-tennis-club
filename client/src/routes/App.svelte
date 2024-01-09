<script>
    import tennisCourtImage from "../images/tennis-court.jpeg";
    import LeftMostContainer from "./LeftMostContainer.svelte";
    import LeftTopContainer from "./LeftTopContainer.svelte";
    import LeftBottomContainer from "./LeftBottomContainer.svelte";
    import RightTopContainer from "./RightTopContainer.svelte";
    import RightBottomContainer from "./RightBottomContainer.svelte";
    import RightMostContainer from "./RightMostContainer.svelte";
  </script>
  
  <main>
    <img src={tennisCourtImage} alt="Tennis Court" />
    <LeftMostContainer text="HOME" href="/home" />
    <LeftTopContainer text="MEMBERSHIP" href="/membership" />
    <LeftBottomContainer text="LEAGUE" href="/league" />
    <RightTopContainer text="PLAYERS" href="/players" />    
    <RightBottomContainer text="PROFILE" href="/profile" />
    <RightMostContainer text="LOGIN" href="/login" />
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
  