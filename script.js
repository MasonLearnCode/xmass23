// script.js

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("snowCanvas");
  var ctx = canvas.getContext("2d");

  function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasDimensions();

  var snowflakes = [];
  var snowman = new Image();

  function generateSnowflakes() {
    snowflakes = [];
    var numberOfSnowflakes = Math.floor(window.innerWidth / 10);

    for (var i = 0; i < numberOfSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
      });
    }
  }

  generateSnowflakes();

  var colors = ["#B93C3F", "#3FB98D", "#593FB9", "#B93F8D"];
  var colorIndex = 0;

  function drawText() {
    var text = "Merry🎄Christmas";
    var baseFontSize = 60;
  
    // Calculate a responsive font size based on the canvas dimensions
    var fontSize = (canvas.width / 800) * baseFontSize;
  
    var x = canvas.width / 2;
    var y = canvas.height / 2;
  
    ctx.font = `${fontSize}px 'Comic Sans MS', cursive, sans-serif`;
    ctx.fillStyle = colors[colorIndex];
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
  
    colorIndex = (colorIndex + 1) % colors.length;
  }

  function drawSnowman() {
    // Vẽ chú người tuyết ở góc dưới bên phải
    var snowmanSize = 100; // Kích thước người tuyết
    ctx.drawImage(
      snowman,
      canvas.width - snowmanSize,
      canvas.height - snowmanSize,
      snowmanSize,
      snowmanSize
    );
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      ctx.fill();

      snowflake.y += snowflake.speed;

      if (snowflake.y > canvas.height) {
        snowflake.y = 0;
      }
    }

    drawText();
    drawSnowman(); // Gọi hàm vẽ chú người tuyết
    requestAnimationFrame(drawSnowflakes);
  }
 // Load hình ảnh người tuyết
 snowman.src = "./snowman.png";
 snowman.onload = function () {
   // Sau khi hình ảnh đã được tải, bắt đầu vẽ snowflakes và snowman
   generateSnowflakes();
 };
  drawSnowflakes();

  window.addEventListener("resize", function () {
    setCanvasDimensions();
    generateSnowflakes();
  });
});
