const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();

headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const readQuizzes = async (id) => {
  try {
    const url = new URL(`${baseUrl}/get-quiz-header/${id}`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const readQuizItems = async (id) => {
  try {
    const url = new URL(`${baseUrl}/get-quiz-header-detail/${id}`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { readQuizzes, readQuizItems };
