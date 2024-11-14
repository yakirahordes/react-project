import { API_URL } from "../functions/API_URL";
import apiRequest from "./apiRequest";

export async function edit(sectionType, item, title, setError, setIsEdited) {
  const url = `${API_URL}/${sectionType}/${item.id}`;
  const updateOption = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  };
  const result = await apiRequest(url, updateOption);
  setError(result.errMsg);
  setIsEdited(false);
}
