const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  let data = null;
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Something went wrong");
    data = await response.json();
  } catch (err) {
    errMsg = err.message;
  } finally {
    return { data, errMsg };
  }
};

export default apiRequest;
