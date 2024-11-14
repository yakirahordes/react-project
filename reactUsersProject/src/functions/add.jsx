import apiRequest from "./apiRequest";
import { API_URL } from "../functions/API_URL";

export async function addItem(
  e,
  newObj,
  sectionType,
  setError,
  setSection,
  setAdd
) {
  e.preventDefault();
  const randomId = Math.floor(Math.random() * (1000000 - 5000)) + 5000;
  newObj.id = randomId.toString();
  const postOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newObj),
  };
  const result = await apiRequest(`${API_URL}/${sectionType}`, postOption);
  setError(result.errMsg);
  setSection((prev) => [...prev, result.data]);
  setAdd(false);
}
