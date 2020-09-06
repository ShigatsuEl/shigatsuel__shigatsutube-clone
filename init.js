import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅Listening on: https://localhost:${4000}`);

app.listen(PORT, handleListening);
