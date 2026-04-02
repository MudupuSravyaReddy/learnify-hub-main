export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
  avatar?: string;
}

const USERS_KEY = "lms_users";
const CURRENT_USER_KEY = "lms_current_user";

export function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUser(user: User) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export function setCurrentUser(user: Omit<User, "password">) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): Omit<User, "password"> | null {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateUserPassword(email: string, newPassword: string) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx !== -1) {
    users[idx].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}
