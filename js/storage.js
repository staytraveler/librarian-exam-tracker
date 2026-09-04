// localStorage 읽기/쓰기만 담당하는 모듈.
const ROUNDS_KEY = 'librarianExam.rounds';

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getRounds() {
  return JSON.parse(localStorage.getItem(ROUNDS_KEY) || '[]');
}

export function saveRounds(rounds) {
  localStorage.setItem(ROUNDS_KEY, JSON.stringify(rounds));
}