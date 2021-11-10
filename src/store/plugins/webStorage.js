export default function saveToLocalStorage(store) {
  store.subscribe((mutation) => {

    const payload = mutation.payload

    switch (mutation.type) {
      case "auth/loginSuccess": {
        localStorage.setItem("user", JSON.stringify(payload))
        break;
      }
      case "auth/profileSaveSuccess": {
        localStorage.setItem("user", JSON.stringify(payload))
        break;
      }
      case "auth/updateUser": {
        localStorage.setItem("user", JSON.stringify(payload))
        break;
      }
    }

  })
}

