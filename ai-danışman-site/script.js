document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatBody = document.getElementById("chat-body");

  const API_URL = "http://localhost:4000/api/analiz";

  function addBubble(text, type) {
    const div = document.createElement("div");
    div.classList.add("chat-bubble", type);
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function sendToBackend(message) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      addBubble(data.advice, "ai");
    } catch (err) {
      addBubble("Backend kapalı mı? Bağlanamadım.", "ai");
    }
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addBubble(text, "user");
    chatInput.value = "";
    sendToBackend(text);
  }

  chatSendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});