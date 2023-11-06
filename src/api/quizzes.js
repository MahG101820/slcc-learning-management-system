const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

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

const updateQuizScore = async (id, quizId, score) => {
  try {
    const url = new URL(`${baseUrl}/insert-score`);

    formData.append("user_id", id);
    formData.append("quiz_header_id", quizId);
    formData.append("scores", score);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData
    });

    const answeredQuizzes = JSON.parse(localStorage.getItem("answered-quizzes"));

    if (response.ok) {
      if (answeredQuizzes) {
        localStorage.setItem("answered-quizzes", JSON.stringify([...answeredQuizzes, quizId]));
      } else {
        localStorage.setItem("answered-quizzes", JSON.stringify([quizId]));
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { readQuizzes, readQuizItems, updateQuizScore };
