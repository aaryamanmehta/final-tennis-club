<script>
    export let text = "";
    export let textStyle = ""; // new prop for custom style
    export let href = "";
    export let description = "";
    export let descriptionStyle = ""; // new prop for custom style
    </script>

<div class="right-most-container">
    <a href="{href}" class="right-most" style="{textStyle}">{text}</a>
    <div class="description" style="{descriptionStyle}">{description}</div>
  </div>


    <style>
        .right-most-container {
        position: absolute;
        top: 18vh;
        left: 74vw;
        width: 21vw;
        height: 64vh;
        background: rgba(255, 255, 255, 0.1); /* Black background with transparency */
        color: #ffffff;
        font-family: 'Arial';
        z-index: 1;
        transition: background 0.5s ease;
    }

    .right-most-container:hover {
        background: none;
    }

    .right-most {
      text-decoration: none;
      color: rgba(30, 30, 30, 1); 
      font-size: 36px;
      position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: color 0.5s ease;
    }

    .right-most:hover {
      background: none; /* no background */
      color: rgb(144,180,193);
      transition: color 0.5s ease;

    }

    .description {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      color: rgba(30, 30, 30, 1); 
      text-align: center;
      width: 80%;
    }
    </style>