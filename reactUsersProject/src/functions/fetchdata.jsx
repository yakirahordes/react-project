import { API_URL } from "./API_URL";

export async function fetchData(url, sectionType, setSection, setError) {
  try {
    const response = await fetch(`${API_URL}/${url}`);
    console.log("`${API_URL}/${url}`: ", `${API_URL}/${url}`);
    if (!response.ok) throw Error("Did not receive expected data");
    const data = await response.json();
    if (data.length === 0) setError(`You have no ${sectionType}`);
    else {
      setSection(data);
      setError(null);
    }
  } catch (err) {
    setError(err.message);
  }
}
