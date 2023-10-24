const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

// headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const readProfile = async () => {
  try {
    const url = new URL("");
  } catch (error) {
    console.error(error);
  }
};

export { readProfile };
