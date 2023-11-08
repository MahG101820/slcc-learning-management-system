import { useProfileStore } from "@/stores/profile";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

const store = useProfileStore();
const profile = store.profile;

headers.append("Accept", "application/json");
headers.append("Authorization", profile.token);

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

    console.log(id);
    console.log(quizId);
    console.log(score);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData
    });

    const answeredQuizzes = JSON.parse(localStorage.getItem("answered-quizzes"));

    console.log(answeredQuizzes);

    if (response.ok) {
      if (answeredQuizzes) {
        localStorage.setItem("answered-quizzes", JSON.stringify([...answeredQuizzes, quizId]));
      } else {
        localStorage.setItem("answered-quizzes", JSON.stringify([quizId]));
      }

      const data = await response.json();

      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteQuizHeader = async (id) => {
  try {
    const url = new URL(`${baseUrl}/delete/quizzes_header/${id}`);

    const response = await fetch(url, { headers: headers });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { readQuizzes, readQuizItems, updateQuizScore, deleteQuizHeader };
