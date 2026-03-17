export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("swiftAidUser");
  return user ? JSON.parse(user) : null;
}

export function saveUser(user: any) {
  localStorage.setItem("swiftAidUser", JSON.stringify(user));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("authChange"));
  }
}

export function logout() {
  localStorage.removeItem("swiftAidUser");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("authChange"));
  }
}
