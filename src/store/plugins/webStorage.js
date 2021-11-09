export default function saveToLocalStorage(store) {
  store.subscribe((mutation) => {
    if (mutation.type === 'loginSuccess' || mutation.type === 'profileSaveSuccess' || mutation.type === 'updateUser') {
      const payload = mutation.payload;
      localStorage.setItem("user", JSON.stringify(payload))
    }
  })
}

