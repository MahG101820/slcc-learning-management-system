const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const readUser = async (type, email, password) => {
  try {
    formData.append("user_id", email);
    formData.append("password", password);

    const url = new URL(`${baseUrl}/login-${type}`);
    const response = await fetch(url, { method: "POST", headers: headers, body: formData });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { readUser };
