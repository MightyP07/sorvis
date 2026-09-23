const DEFILLAMA_API = "https://api.llama.fi";

export async function fetchProtocols() {
  const response = await fetch(`${DEFILLAMA_API}/protocols`);

  if (!response.ok) {
    throw new Error(`DeFiLlama request failed: ${response.status}`);
  }

  return response.json();
}