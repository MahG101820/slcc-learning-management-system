const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

// headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const createMaterials = async (material, form) => {
  try {
    const { description, image } = form;

    formData.append("user_id", 1);
    formData.append("description", description);
    formData.append("image", image);

    const url = new URL(`${baseUrl}/insert-${material}`);
    const response = await fetch(url, { method: "POST", body: formData });

    if (response.ok) {
      for (const key of formData.keys()) {
        formData.delete(key);
      }

      const result = await response.json();
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

const updateMaterials = async (material, form) => {
  try {
    const { id, description, image } = form;

    formData.append("user_id", 0);
    formData.append("description", description);
    formData.append("image", image);

    const url = new URL(`${baseUrl}/update-${material}/id=${id}`);
    const response = await fetch(url, { method: "POST", headers, body: formData });

    if (response.ok) {
      for (const key of formData.keys()) {
        formData.delete(key);
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteMaterials = async (material, id) => {
  try {
    const url = new URL(`${baseUrl}/delete/${material}/${id}`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { createMaterials, readMaterials, updateMaterials, deleteMaterials };
