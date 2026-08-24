/**
 * CURRICULUM DATA
 * ----------------
 * Reflects the NCERT 2026-27 revised curriculum (NEP 2020 / NCF 2023).
 * This site is English-only, classes 8 through 12 — every other subject
 * (Maths, Science, Physics, Chemistry, Biology, Computer) has been removed
 * from this data file. Each class entry below has a single `subjects`
 * entry: English.
 *
 * TEST STRUCTURE: each chapter with real content has up to two tests:
 *   - kind: "mcq"   — pure multiple choice, graded instantly in the
 *                      browser (no network call), with an optional
 *                      answerKeyFile shown after submission.
 *   - kind: "mixed" — MCQ + theory questions together. The MCQ portion
 *                      is graded instantly the same way; theory answers
 *                      are NOT currently submitted anywhere (Google
 *                      Sheets integration is disabled for now).
 *
 * SUBJECT TRACKS: English has `tracks` instead of `sections` directly, so
 * it shows a track-picker screen before the sidebar tree. The shape of
 * English's tracks differs by class: classes 8-10 split into Language vs
 * Literature (each itself book-based); classes 11-12 skip that split and
 * go straight to one track per book (e.g. Hornbill / Snapshots / Woven
 * Words for XI), since those grades don't have a separate language/grammar
 * textbook.
 *
 * The IELTS entry below is a placeholder tile only — it reuses the same
 * `type: "exam"` treatment JEE/NEET used to (a permanently-disabled
 * "Premium · Coming soon" badge card in ClassPicker) until real IELTS
 * content is built out. Give it a real `years`/`subjects` tree (see how
 * JEE/NEET used to be structured, in version control history) when that
 * content is ready.
 *
 * A subject/track with ready:false (or no `sections`) automatically
 * renders "Coming Soon" — no need to build out its tree yet.
 */

const CLASSES = [
  {
    id: "class-8",
    label: "VIII",
    name: "Class 8",
    subjects: [
      {
        id: "english",
        title: "English",
        icon: "english",
        ready: true,
        tracks: [
          {
            id: "language",
            title: "Language",
            ready: true,
            sections: [
              {
                id: "class-8-lang-writing-skills",
                title: "01 · Writing Skills",
                subsections: [
                  {
                    id: "class-8-lang-writing-skills-notice",
                    title: "Lesson 1 — Notice",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-notice-notes",
                        title: "Lesson 1 — Notice",
                        file: "notes/class-8/language/writing-skills/01-notice.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-notice-quiz",
                        title: "Quiz 1 — Notice",
                        file: "notes/class-8/language/writing-skills/01-notice-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                ],
              },
            ],
          },
          {
            id: "literature",
            title: "Literature",
            ready: true,
            tracks: [
              {
                id: "honeydew",
                title: "Honeydew",
                ready: true,
                sections: [
                  {
                    id: "class-8-lit-honeydew-prose",
                    title: "01 · Honeydew — Prose",
                    subsections: [
                      {
                        id: "class-8-lit-honeydew-prose-core",
                        title: "Honeydew — Prose",
                        notes: [
                          {
                            id: "class-8-lit-honeydew-prose-notes",
                            title: "Honeydew — Prose",
                            file: "notes/class-8/literature/honeydew-prose/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-8-lit-honeydew-poetry",
                    title: "02 · Honeydew — Poetry",
                    subsections: [
                      {
                        id: "class-8-lit-honeydew-poetry-core",
                        title: "Honeydew — Poetry",
                        notes: [
                          {
                            id: "class-8-lit-honeydew-poetry-notes",
                            title: "Honeydew — Poetry",
                            file: "notes/class-8/literature/honeydew-poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "it-so-happened",
                title: "It So Happened (Supplementary Reader)",
                ready: true,
                sections: [
                  {
                    id: "class-8-lit-it-so-happened-supplementary-reader",
                    title: "01 · It So Happened (Supplementary Reader)",
                    subsections: [
                      {
                        id: "class-8-lit-it-so-happened-supplementary-reader-core",
                        title: "It So Happened (Supplementary Reader)",
                        notes: [
                          {
                            id: "class-8-lit-it-so-happened-supplementary-reader-notes",
                            title: "It So Happened (Supplementary Reader)",
                            file: "notes/class-8/literature/it-so-happened-supplementary-reader/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-9",
    label: "IX",
    name: "Class 9",
    subjects: [
      {
        id: "english",
        title: "English",
        icon: "english",
        ready: true,
        tracks: [
          {
            id: "language",
            title: "Language",
            ready: false,
          },
          {
            id: "literature",
            title: "Literature",
            ready: true,
            tracks: [
              {
                id: "beehive",
                title: "Beehive",
                ready: true,
                sections: [
                  {
                    id: "class-9-lit-beehive-prose",
                    title: "01 · Beehive — Prose",
                    subsections: [
                      {
                        id: "class-9-lit-beehive-prose-core",
                        title: "Beehive — Prose",
                        notes: [
                          {
                            id: "class-9-lit-beehive-prose-notes",
                            title: "Beehive — Prose",
                            file: "notes/class-9/literature/beehive-prose/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-9-lit-beehive-poetry",
                    title: "02 · Beehive — Poetry",
                    subsections: [
                      {
                        id: "class-9-lit-beehive-poetry-core",
                        title: "Beehive — Poetry",
                        notes: [
                          {
                            id: "class-9-lit-beehive-poetry-notes",
                            title: "Beehive — Poetry",
                            file: "notes/class-9/literature/beehive-poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "moments",
                title: "Moments (Supplementary Reader)",
                ready: true,
                sections: [
                  {
                    id: "class-9-lit-moments-supplementary-reader",
                    title: "01 · Moments (Supplementary Reader)",
                    subsections: [
                      {
                        id: "class-9-lit-moments-supplementary-reader-core",
                        title: "Moments (Supplementary Reader)",
                        notes: [
                          {
                            id: "class-9-lit-moments-supplementary-reader-notes",
                            title: "Moments (Supplementary Reader)",
                            file: "notes/class-9/literature/moments-supplementary-reader/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-10",
    label: "X",
    name: "Class 10",
    subjects: [
      {
        id: "english",
        title: "English",
        icon: "english",
        ready: true,
        tracks: [
          {
            id: "language",
            title: "Language",
            ready: false,
          },
          {
            id: "literature",
            title: "Literature",
            ready: true,
            tracks: [
              {
                id: "first-flight",
                title: "First Flight",
                ready: true,
                sections: [
                  {
                    id: "class-10-lit-first-flight-prose",
                    title: "01 · First Flight — Prose",
                    subsections: [
                      {
                        id: "class-10-lit-first-flight-prose-core",
                        title: "First Flight — Prose",
                        notes: [
                          {
                            id: "class-10-lit-first-flight-prose-notes",
                            title: "First Flight — Prose",
                            file: "notes/class-10/literature/first-flight-prose/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-10-lit-first-flight-poetry",
                    title: "02 · First Flight — Poetry",
                    subsections: [
                      {
                        id: "class-10-lit-first-flight-poetry-core",
                        title: "First Flight — Poetry",
                        notes: [
                          {
                            id: "class-10-lit-first-flight-poetry-notes",
                            title: "First Flight — Poetry",
                            file: "notes/class-10/literature/first-flight-poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "footprints-without-feet",
                title: "Footprints Without Feet (Supplementary Reader)",
                ready: true,
                sections: [
                  {
                    id: "class-10-lit-footprints-without-feet-supplementary-reader",
                    title:
                      "01 · Footprints Without Feet (Supplementary Reader)",
                    subsections: [
                      {
                        id: "class-10-lit-footprints-without-feet-supplementary-reader-core",
                        title: "Footprints Without Feet (Supplementary Reader)",
                        notes: [
                          {
                            id: "class-10-lit-footprints-without-feet-supplementary-reader-notes",
                            title:
                              "Footprints Without Feet (Supplementary Reader)",
                            file: "notes/class-10/literature/footprints-without-feet-supplementary-reader/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-11",
    label: "XI",
    name: "Class 11",
    subjects: [
      {
        id: "english",
        title: "English",
        icon: "english",
        ready: true,
        tracks: [
          {
            id: "language",
            title: "Language",
            ready: false,
          },
          {
            id: "literature",
            title: "Literature",
            ready: true,
            tracks: [
              {
                id: "hornbill",
                title: "Hornbill",
                ready: true,
                sections: [
                  {
                    id: "class-11-lit-hornbill-prose",
                    title: "01 · Hornbill — Prose",
                    subsections: [
                      {
                        id: "class-11-lit-hornbill-prose-core",
                        title: "Hornbill — Prose",
                        notes: [
                          {
                            id: "class-11-lit-hornbill-prose-notes",
                            title: "Hornbill — Prose",
                            file: "notes/class-11/literature/hornbill-prose/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-11-lit-hornbill-poetry",
                    title: "02 · Hornbill — Poetry",
                    subsections: [
                      {
                        id: "class-11-lit-hornbill-poetry-core",
                        title: "Hornbill — Poetry",
                        notes: [
                          {
                            id: "class-11-lit-hornbill-poetry-notes",
                            title: "Hornbill — Poetry",
                            file: "notes/class-11/literature/hornbill-poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "snapshots",
                title: "Snapshots (Supplementary Reader)",
                ready: true,
                sections: [
                  {
                    id: "class-11-lit-snapshots-supplementary-reader",
                    title: "01 · Snapshots (Supplementary Reader)",
                    subsections: [
                      {
                        id: "class-11-lit-snapshots-supplementary-reader-core",
                        title: "Snapshots (Supplementary Reader)",
                        notes: [
                          {
                            id: "class-11-lit-snapshots-supplementary-reader-notes",
                            title: "Snapshots (Supplementary Reader)",
                            file: "notes/class-11/literature/snapshots-supplementary-reader/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "elective",
                title: "Woven Words (Elective)",
                ready: true,
                sections: [
                  {
                    id: "class-11-elective-short-stories",
                    title: "01 · Woven Words — Short Stories",
                    subsections: [
                      {
                        id: "class-11-elective-short-stories-core",
                        title: "Woven Words — Short Stories",
                        notes: [
                          {
                            id: "class-11-elective-short-stories-notes",
                            title: "Woven Words — Short Stories",
                            file: "notes/class-11/elective/short-stories/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-11-elective-poetry",
                    title: "02 · Woven Words — Poetry",
                    subsections: [
                      {
                        id: "class-11-elective-poetry-core",
                        title: "Woven Words — Poetry",
                        notes: [
                          {
                            id: "class-11-elective-poetry-notes",
                            title: "Woven Words — Poetry",
                            file: "notes/class-11/elective/poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-11-elective-essays",
                    title: "03 · Woven Words — Essays",
                    subsections: [
                      {
                        id: "class-11-elective-essays-core",
                        title: "Woven Words — Essays",
                        notes: [
                          {
                            id: "class-11-elective-essays-notes",
                            title: "Woven Words — Essays",
                            file: "notes/class-11/elective/essays/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-12",
    label: "XII",
    name: "Class 12",
    subjects: [
      {
        id: "english",
        title: "English",
        icon: "english",
        ready: true,
        tracks: [
          {
            id: "language",
            title: "Language",
            ready: false,
          },
          {
            id: "literature",
            title: "Literature",
            ready: true,
            tracks: [
              {
                id: "flamingo",
                title: "Flamingo",
                ready: true,
                sections: [
                  {
                    id: "class-12-lit-flamingo-prose",
                    title: "01 · Flamingo — Prose",
                    subsections: [
                      {
                        id: "class-12-lit-flamingo-prose-core",
                        title: "Flamingo — Prose",
                        notes: [
                          {
                            id: "class-12-lit-flamingo-prose-notes",
                            title: "Flamingo — Prose",
                            file: "notes/class-12/literature/flamingo-prose/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-12-lit-flamingo-poetry",
                    title: "02 · Flamingo — Poetry",
                    subsections: [
                      {
                        id: "class-12-lit-flamingo-poetry-core",
                        title: "Flamingo — Poetry",
                        notes: [
                          {
                            id: "class-12-lit-flamingo-poetry-notes",
                            title: "Flamingo — Poetry",
                            file: "notes/class-12/literature/flamingo-poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "vistas",
                title: "Vistas (Supplementary Reader)",
                ready: true,
                sections: [
                  {
                    id: "class-12-lit-vistas-supplementary-reader",
                    title: "01 · Vistas (Supplementary Reader)",
                    subsections: [
                      {
                        id: "class-12-lit-vistas-supplementary-reader-core",
                        title: "Vistas (Supplementary Reader)",
                        notes: [
                          {
                            id: "class-12-lit-vistas-supplementary-reader-notes",
                            title: "Vistas (Supplementary Reader)",
                            file: "notes/class-12/literature/vistas-supplementary-reader/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "elective",
                title: "Kaleidoscope (Elective)",
                ready: true,
                sections: [
                  {
                    id: "class-12-elective-short-stories",
                    title: "01 · Kaleidoscope — Short Stories",
                    subsections: [
                      {
                        id: "class-12-elective-short-stories-core",
                        title: "Kaleidoscope — Short Stories",
                        notes: [
                          {
                            id: "class-12-elective-short-stories-notes",
                            title: "Kaleidoscope — Short Stories",
                            file: "notes/class-12/elective/short-stories/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-12-elective-poetry",
                    title: "02 · Kaleidoscope — Poetry",
                    subsections: [
                      {
                        id: "class-12-elective-poetry-core",
                        title: "Kaleidoscope — Poetry",
                        notes: [
                          {
                            id: "class-12-elective-poetry-notes",
                            title: "Kaleidoscope — Poetry",
                            file: "notes/class-12/elective/poetry/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                  {
                    id: "class-12-elective-drama",
                    title: "03 · Kaleidoscope — Drama",
                    subsections: [
                      {
                        id: "class-12-elective-drama-core",
                        title: "Kaleidoscope — Drama",
                        notes: [
                          {
                            id: "class-12-elective-drama-notes",
                            title: "Kaleidoscope — Drama",
                            file: "notes/class-12/elective/drama/notes.md",
                          },
                        ],
                        tests: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ielts",
    type: "exam",
    label: "IELTS",
    name: "IELTS Preparation",
    years: [],
  },
];

window.CLASSES = CLASSES;
