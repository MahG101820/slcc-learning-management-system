const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

headers.append("Content-Type", "multipart/form-data");
headers.append("Accept", "application/json");
headers.append("Authorization", "token");

const createMaterials = async (material, form) => {
  try {
    formData.append("description", form.description);
    formData.append("image", form.image);

    const url = new URL(`${baseUrl}/get-${material}`);
    const response = await fetch(url, { method: "POST", headers: headers, body: formData });

    if (response.ok) {
      formData.clear();

      const result = await response.json();
      console.log(response);
      console.log(result);
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

const readMaterials = async (material) => {
  try {
    const url = new URL(`${baseUrl}/get-${material}`);
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();

      if (result.status_code === 200) {
        const data = result[`${material}s`];
        return data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const updateMaterials = async (material) => {
  try {
    const url = new URL(`${baseUrl}/get-${material}`);
    const response = await fetch(url, { method: "POST", headers, body: formData });

    if (response.ok) {
      formData.clear();
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteMaterials = async (material) => {
  try {
    const url = new URL(`${baseUrl}/get-${material}`);
    const response = await fetch(url, { method: "POST", headers, body: formData });

    if (response.ok) {
      formData.clear();
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { createMaterials, readMaterials, updateMaterials, deleteMaterials };
