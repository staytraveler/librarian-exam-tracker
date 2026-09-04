import { getRounds, saveRounds, uid } from './storage.js';
import { SUBTOPICS } from './config.js';

export function addRound(label, date, answersA, answersB) {
  const rounds = getRounds();
  const round = { id: uid(), label, date, entries: { A: answersA, B: answersB } };
  rounds.push(round);
  saveRounds(rounds);
  return round;
}

export function deleteRound(id) {
  const rounds = getRounds().filter((r) => r.id !== id);
  saveRounds(rounds);
  return rounds;
}

function allEntries(round) {
  return [...round.entries.A, ...round.entries.B];
}

export function roundTotal(round) {
  const entries = allEntries(round);
  const score = entries.reduce((a, e) => a + e.score, 0);
  const max = entries.reduce((a, e) => a + e.max, 0);
  return { score, max, pct: max ? Math.round((score / max) * 1000) / 10 : 0 };
}

export function subtopicBreakdown(round) {
  const entries = allEntries(round);
  return SUBTOPICS.map((subtopic) => {
    const matched = entries.filter((e) => e.subtopic === subtopic);
    const score = matched.reduce((a, e) => a + e.score, 0);
    const max = matched.reduce((a, e) => a + e.max, 0);
    return { subtopic, score, max, pct: max ? Math.round((score / max) * 1000) / 10 : 0 };
  });
}

// 회차를 거듭하며 총점이 어떻게 변했는지
export function totalSeries() {
  return getRounds().map((r) => {
    const t = roundTotal(r);
    return { id: r.id, label: r.label, date: r.date, score: t.score, max: t.max, pct: t.pct };
  });
}

// 세부과목별로, 회차를 거듭하며 정답률이 어떻게 변했는지
export function subtopicSeries() {
  const rounds = getRounds();
  const series = {};
  SUBTOPICS.forEach((s) => { series[s] = []; });
  rounds.forEach((r) => {
    subtopicBreakdown(r).forEach((b) => {
      series[b.subtopic].push({ label: r.label, date: r.date, pct: b.pct });
    });
  });
  return series;
}