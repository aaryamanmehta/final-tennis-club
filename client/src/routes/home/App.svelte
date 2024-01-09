<!-- App.svelte -->
<script>
  import tennisCourtImage from "../../images/tennis-court-no-left.jpeg";
  import RightTopContainer from "../RightTopContainer.svelte";
  import RightBottomContainer from "../RightBottomContainer.svelte";
  import RightMostContainer from "../RightMostContainer.svelte";
  import LeftHalfContainer from "../LeftHalfContainer.svelte";
  import HeaderContainer from "../HeaderContainer.svelte";
  import FooterContainer from "../FooterContainer.svelte";
  const customDescriptionStyle = `
        font-size: 20px;
        width: 60%;
        top: 55%;
    `;
  const customTextStyle = `
        top: 23%;
    `;
  const customTextStyle2 = `
        top: 39%;
        left: 62%;
        width: 100%;
    `;
  const customDescriptionStyle2 = `
        font-size: 20px;
        top: 55%;
    `;
</script>

<main>
  <img class="tennis-court" src={tennisCourtImage} alt="Tennis Court" />
  <RightTopContainer text="" href="" />
  <RightBottomContainer text="" href="" />
  <RightMostContainer
    text="PRACTICE TIMES"
    textStyle={customTextStyle2}
    href=""
    description="Recreational Team Practice Times: Monday & Thursday 4:00-6:00pm. Travel Team Practice Times: Tuesday & Friday 4:00-6:00pm
        "
    descriptionStyle={customDescriptionStyle2}
  />
  <LeftHalfContainer
    text="WELCOME"
    textStyle={customTextStyle}
    href=""
    description="Welcome to the UMass Tennis Club website. We are a registered student organization at the University of Massachusetts Amherst and are devoted to providing opportunities for competitive intercollegiate play and for those trying to improve and play in low-stress environments! Anyone can join this group, and all are encouraged to do so. We field a competitive travel team, for which tryouts will be at the start of the Fall semester, and a recreational team, open to everyone! We also host a number of tournaments throughout the year, details of which can be found on our website. We hope to see you on the courts!
        "
    descriptionStyle={customDescriptionStyle}
  />
  <HeaderContainer />
  <FooterContainer />
  <script
    src="https://cdn.jsdelivr.net/npm/publicalbum@latest/embed-ui.min.js"
    async
  ></script>
  <div
    class="pa-carousel-widget"
    style="width:20.4%; height:220px; display:none;"
    data-link="https://photos.app.goo.gl/u8fdULwnF8bNx2rL9"
    data-title="tennis-club-umass-project"
    data-description="11 new items added to shared album"
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV86O1pwC1_42ShfizMNyymZmAyK2kPnmSAGQvuv_ueSiH0ZoGaFxsrAnnIG2J3yr6aZUaVsE2DakoVO4AGqnFXfHOXcc_huhqztYU4OYLb3DT9OFm80=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->
    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV86ttoYCgfnxdKlIpg0OMnUptpnhxBgLVJZkLveJEzF2_lgcJ1Mz9uMLHbS5Ab7hHOF7205Mwzv9IEgdb-mfwz6Rb6COh35CLdt9O1_jAda1ikHc8io=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV84dwdgwvOnChaMU_1nmjOSvzYJ_ytS7HraAg3XqTSaafqJUORxGkLPEwz-Cbb1SVYewC89ppR-AAidRhCGoL39EH4av6ryharqOgesznAxtMucX2HE=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV87g1f_zZgKSoO78K2rEYWCcYGmVRXVyNzm3IljUplKk6nVkOVpV1bn8OUJa1O5faFbzNY5zMRCbhGEEUCIjbMSoK7k1gEelbW74zBgs5rbp-rIES3Y=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->
    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV849VpcYtT7_h-wE9Kd45PT-68QYfm3dyr1UFcOLl7-THCTTF2-oQdMAER0Ob06Dumaqp-WkrQ7R3_KQMSiV9duEK3UZE7-RVK8u5B-TbByoLX-_Lig=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV87PRY_S4R9w0o132udTs1HkhewEYY-SW6yiby6HdmX6bH6FSIdI4U0drnzrFv4A81mZttU7yCUOSt302FN3ETyUJNOTM77Q-VjGD-SE20If_-9mnqo=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV868AFY13PobyRUzw_QNASR33LlYLXuKkollBDODHfcyQ1VncMOxEI2_H4uhFdYsslqqoQWlgRoT0h6tVq3JJaXesFispAH72do2AIAPxNWXG9GJJ2g=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV87NyunTLTukkrG12Kia9VA38Ryd8iqCsLITtLlMZVBMR6UjD5TNOFILKpOm8m-657xDWTlUzO9KkIHHvQCUYHgT1B3YBn21trVH2RHwChZzQh1v3wg=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV86FK4KXcrCepeNNXg3b8YJ-jQCOv_w4Efdiwx4sLhQqh0GzwjxEV71l1EuK7lt2FNKt7rUTNZvHW5ShuFb8i0cuwNJT_-K_cDDW_EfHLD1V_hHiurY=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV872khdM5UGufpc1vfxSHaX-ylWrnDt59pVKcos9jvt9-xI14yRTl292GcHMtFYvyt1RoH2UxtNBFei331FNh52ToB1RTjNApJahpHHkv7K3iKcyTvA=w1920-h1080"
    ></object>
    <!-- svelte-ignore a11y-missing-attribute -->

    <object
      data="https://lh3.googleusercontent.com/pw/ABLVV84Z4tTRRft_zuD7r3VG6tgWCCqx7W9jTP3fxWlonbg9Nxp72_8KFAeTJJ1ut8GmZ9Lr9eZbbODUAfOuBS2DJbp7ueawLfv1XRoPGsH4nVUrX6Y1ys8=w1920-h1080"
    ></object>
  </div>

  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.8299824006026!2d-72.53832767388921!3d42.38876822119024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6d26c2d8bfb61%3A0xe991b4ef897c7698!2sMullins%20Tennis%20Courts%2C%20Amherst%2C%20MA%2001003!5e0!3m2!1sen!2sus!4v1702460619650!5m2!1sen!2sus"
    width="400"
    height="250"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</main>

<style>
  .tennis-court {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  iframe {
    position: absolute;
    top: 21%;
    left: 51.5%;
    z-index: 1;
  }

  .pa-carousel-widget {
    position: absolute;
    top: 54%;
    left: 51.8%;
    z-index: 1;
  }
</style>
