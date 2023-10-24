const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();

headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const readLeaderboard = async () => {
  try {
    const url = new URL(`${baseUrl}/get-score`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { readLeaderboard };
