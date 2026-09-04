// 시험 구조 (고정값) — 문제 번호마다 배점이 정해져 있음
export const EXAM_STRUCTURE = {
  A: [
    { no: 1, max: 2 }, { no: 2, max: 2 }, { no: 3, max: 2 }, { no: 4, max: 2 },
    { no: 5, max: 4 }, { no: 6, max: 4 }, { no: 7, max: 4 }, { no: 8, max: 4 },
    { no: 9, max: 4 }, { no: 10, max: 4 }, { no: 11, max: 4 }, { no: 12, max: 4 },
  ],
  B: [
    { no: 1, max: 2 }, { no: 2, max: 2 },
    { no: 3, max: 4 }, { no: 4, max: 4 }, { no: 5, max: 4 },
    { no: 6, max: 4 }, { no: 7, max: 4 }, { no: 8, max: 4 },
    { no: 9, max: 4 }, { no: 10, max: 4 }, { no: 11, max: 4 },
  ],
};

// 태깅용 세부과목 목록 (고정값)
export const SUBTOPICS = [
  '학교도서관',
  '분류',
  '목록',
  '독서교육',
  '정보검색',
  '디지털도서관',
  '정보봉사',
  '교수매체',
];

// 전체 만점 (자동 계산되지만 참고용으로 export)
export const TOTAL_MAX = [...EXAM_STRUCTURE.A, ...EXAM_STRUCTURE.B]
  .reduce((sum, q) => sum + q.max, 0); // 80