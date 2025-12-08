const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/api/analiz", (req, res) => {
  const { message } = req.body || {};

  let advice = "Analiz yapılıyor (DEMO)...";

  if (!message) advice = "Mesaj gelmedi. Tekrar dener misin?";
  else if (message.toLowerCase().includes("su"))
    advice = "Sulamada %12 tasarruf için gece sulamasını öneriyoruz. (DEMO)";
  else if (message.toLowerCase().includes("gübre"))
    advice = "Gübre kullanımını azaltmak için toprak analizine dönelim. (DEMO)";
  else if (message.toLowerCase().includes("buğday"))
    advice = "Buğday için ekim sıklığını düşürmek verimi artırabilir. (DEMO)";

  res.json({ ok: true, advice });
});

app.listen(PORT, () => {
  console.log("Agrivia backend çalışıyor: http://localhost:" + PORT);
});