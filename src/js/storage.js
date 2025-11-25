export function checkLocalStorage(key, id) {
  const data = JSON.parse(localStorage.getItem(key));

  if (data === null) {
    return false;
  }

  return data.includes(id);
}

export function loadLocalStorage(key) {
  try {
    const serializedValues = localStorage.getItem(key);
    return JSON.parse(serializedValues);
  } catch (error) {
    console.log(error.message);
  }
}

export function saveLocalStorage(key, values) {
  try {
    const data = JSON.stringify(values);
    localStorage.setItem(key, data);
  } catch (error) {
    console.log(error.message);
  }
}
