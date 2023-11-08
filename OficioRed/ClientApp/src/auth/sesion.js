function getAcceso() {
  const local = window.localStorage.getItem("acceso")

  if (local === "undefined") {
    return null
  }

  const data = JSON.parse(local)

  return data
}

function getToken() {
  const local = window.localStorage.getItem("acceso")

  if (local === "undefined") {
    return null
  }
  const data = JSON.parse(local)

  return data?.token
}

async function getConfig() {
  const token = await getToken();
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  }

  return config
}

function removeSesion(){
  window.localStorage.removeItem("acceso");
}

export const sesionService = {
  getAcceso,
  getToken,
  getConfig,
  removeSesion
}