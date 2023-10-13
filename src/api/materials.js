const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

headers.append("Content-Type", "multipart/form-data");
headers.append("Accept", "application/json");
headers.append("Authorization", "token");

const createMaterials = async (material) => {
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

const readMaterials = async (material) => {
  try {
    const url = new URL(`${baseUrl}/get-${material}`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      if (data.status_code === 200) {
        const filteredData = data[`${material}s`];
        return filteredData;
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
