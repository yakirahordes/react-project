import { API_URL } from "./API_URL";
import apiRequest from "./apiRequest";

export async function handleDelete(
  sections,
  item,
  setSections,
  sectionType,
  setError
) {
  const newList = sections.filter((section) => section.id !== item.id);
  setSections(newList);
  const deleteOption = {
    method: "DELETE",
  };
  const url = `${API_URL}/${sectionType}/${item.id}`;
  const result = await apiRequest(url, deleteOption);
  setError(result.errMsg);
}
