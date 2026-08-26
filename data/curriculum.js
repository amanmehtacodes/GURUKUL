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
                  {
                    id: "class-8-lang-writing-skills-message",
                    title: "Lesson 2 — Message",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-message-notes",
                        title: "Lesson 2 — Message",
                        file: "notes/class-8/language/writing-skills/02-message.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-message-quiz",
                        title: "Quiz 2 — Message",
                        file: "notes/class-8/language/writing-skills/02-message-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-biosketch",
                    title: "Lesson 3 — Bio-Sketch",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-biosketch-notes",
                        title: "Lesson 3 — Bio-Sketch",
                        file: "notes/class-8/language/writing-skills/03-biosketch.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-biosketch-quiz",
                        title: "Quiz 3 — Bio-Sketch",
                        file: "notes/class-8/language/writing-skills/03-biosketch-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-diary",
                    title: "Lesson 4 — Diary Entry",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-diary-notes",
                        title: "Lesson 4 — Diary Entry",
                        file: "notes/class-8/language/writing-skills/04-diary-entry.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-diary-quiz",
                        title: "Quiz 4 — Diary Entry",
                        file: "notes/class-8/language/writing-skills/04-diary-entry-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-factual-description",
                    title: "Lesson 5 — Factual Description",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-factual-description-notes",
                        title: "Lesson 5 — Factual Description",
                        file: "notes/class-8/language/writing-skills/05-factual-description.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-factual-description-quiz",
                        title: "Quiz 5 — Factual Description",
                        file: "notes/class-8/language/writing-skills/05-factual-description-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-letter-informal",
                    title: "Lesson 6 — Letter Writing (Informal)",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-letter-informal-notes",
                        title: "Lesson 6 — Letter Writing (Informal)",
                        file: "notes/class-8/language/writing-skills/06-letter-writing-informal.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-letter-informal-quiz",
                        title: "Quiz 6 — Letter Writing (Informal)",
                        file: "notes/class-8/language/writing-skills/06-letter-writing-informal-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-letter-formal",
                    title: "Lesson 7 — Formal Letters",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-letter-formal-notes",
                        title: "Lesson 7 — Formal Letters",
                        file: "notes/class-8/language/writing-skills/07-letter-writing-formal.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-letter-formal-quiz",
                        title: "Quiz 7 — Formal Letters",
                        file: "notes/class-8/language/writing-skills/07-letter-writing-formal-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-email",
                    title: "Lesson 8 — E-mail",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-email-notes",
                        title: "Lesson 8 — E-mail",
                        file: "notes/class-8/language/writing-skills/08-email.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-email-quiz",
                        title: "Quiz 8 — E-mail",
                        file: "notes/class-8/language/writing-skills/08-email-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-article-writing",
                    title: "Lesson 9 — Article Writing",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-article-writing-notes",
                        title: "Lesson 9 — Article Writing",
                        file: "notes/class-8/language/writing-skills/09-article-writing.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-article-writing-quiz",
                        title: "Quiz 9 — Article Writing",
                        file: "notes/class-8/language/writing-skills/09-article-writing-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-speech",
                    title: "Lesson 10 — Speech",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-speech-notes",
                        title: "Lesson 10 — Speech",
                        file: "notes/class-8/language/writing-skills/10-speech.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-speech-quiz",
                        title: "Quiz 10 — Speech",
                        file: "notes/class-8/language/writing-skills/10-speech-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-writing-skills-short-stories",
                    title: "Lesson 11 — Short Stories",
                    notes: [
                      {
                        id: "class-8-lang-writing-skills-short-stories-notes",
                        title: "Lesson 11 — Short Stories",
                        file: "notes/class-8/language/writing-skills/11-short-stories.html",
                      },
                      {
                        id: "class-8-lang-writing-skills-short-stories-quiz",
                        title: "Quiz 11 — Short Stories",
                        file: "notes/class-8/language/writing-skills/11-short-stories-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                ],
              },
              {
                id: "class-8-lang-grammar",
                title: "02 · Grammar",
                subsections: [
                  {
                    id: "class-8-lang-grammar-noun",
                    title: "Lesson 12 — The Noun",
                    notes: [
                      {
                        id: "class-8-lang-grammar-noun-notes",
                        title: "Lesson 12 — The Noun",
                        file: "notes/class-8/language/grammar/12-the-noun.html",
                      },
                      {
                        id: "class-8-lang-grammar-noun-quiz",
                        title: "Quiz 12 — The Noun",
                        file: "notes/class-8/language/grammar/12-the-noun-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-pronoun",
                    title: "Lesson 13 — The Pronoun",
                    notes: [
                      {
                        id: "class-8-lang-grammar-pronoun-notes",
                        title: "Lesson 13 — The Pronoun",
                        file: "notes/class-8/language/grammar/13-the-pronoun.html",
                      },
                      {
                        id: "class-8-lang-grammar-pronoun-quiz",
                        title: "Quiz 13 — The Pronoun",
                        file: "notes/class-8/language/grammar/13-the-pronoun-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-adjective",
                    title: "Lesson 14 — The Adjective",
                    notes: [
                      {
                        id: "class-8-lang-grammar-adjective-notes",
                        title: "Lesson 14 — The Adjective",
                        file: "notes/class-8/language/grammar/14-the-adjective.html",
                      },
                      {
                        id: "class-8-lang-grammar-adjective-quiz",
                        title: "Quiz 14 — The Adjective",
                        file: "notes/class-8/language/grammar/14-the-adjective-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-determiners",
                    title: "Lesson 15 — Determiners",
                    notes: [
                      {
                        id: "class-8-lang-grammar-determiners-notes",
                        title: "Lesson 15 — Determiners",
                        file: "notes/class-8/language/grammar/15-determiners.html",
                      },
                      {
                        id: "class-8-lang-grammar-determiners-quiz",
                        title: "Quiz 15 — Determiners",
                        file: "notes/class-8/language/grammar/15-determiners-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-verb",
                    title: "Lesson 16 — The Verb",
                    notes: [
                      {
                        id: "class-8-lang-grammar-verb-notes",
                        title: "Lesson 16 — The Verb",
                        file: "notes/class-8/language/grammar/16-the-verb.html",
                      },
                      {
                        id: "class-8-lang-grammar-verb-quiz",
                        title: "Quiz 16 — The Verb",
                        file: "notes/class-8/language/grammar/16-the-verb-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-finite-nonfinite",
                    title: "Lesson 17 — Finite and Non-Finite Forms of Verbs",
                    notes: [
                      {
                        id: "class-8-lang-grammar-finite-nonfinite-notes",
                        title: "Lesson 17 — Finite and Non-Finite Forms of Verbs",
                        file: "notes/class-8/language/grammar/17-finite-and-non-finite-verbs.html",
                      },
                      {
                        id: "class-8-lang-grammar-finite-nonfinite-quiz",
                        title: "Quiz 17 — Finite and Non-Finite Forms of Verbs",
                        file: "notes/class-8/language/grammar/17-finite-and-non-finite-verbs-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-modal-auxiliaries",
                    title: "Lesson 18 — Modal Auxiliaries",
                    notes: [
                      {
                        id: "class-8-lang-grammar-modal-auxiliaries-notes",
                        title: "Lesson 18 — Modal Auxiliaries",
                        file: "notes/class-8/language/grammar/18-modal-auxiliaries.html",
                      },
                      {
                        id: "class-8-lang-grammar-modal-auxiliaries-quiz",
                        title: "Quiz 18 — Modal Auxiliaries",
                        file: "notes/class-8/language/grammar/18-modal-auxiliaries-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-tenses",
                    title: "Lesson 19 — Tenses",
                    notes: [
                      {
                        id: "class-8-lang-grammar-tenses-notes",
                        title: "Lesson 19 — Tenses",
                        file: "notes/class-8/language/grammar/19-tenses.html",
                      },
                      {
                        id: "class-8-lang-grammar-tenses-quiz",
                        title: "Quiz 19 — Tenses",
                        file: "notes/class-8/language/grammar/19-tenses-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-adverb",
                    title: "Lesson 20 — The Adverb",
                    notes: [
                      {
                        id: "class-8-lang-grammar-adverb-notes",
                        title: "Lesson 20 — The Adverb",
                        file: "notes/class-8/language/grammar/20-the-adverb.html",
                      },
                      {
                        id: "class-8-lang-grammar-adverb-quiz",
                        title: "Quiz 20 — The Adverb",
                        file: "notes/class-8/language/grammar/20-the-adverb-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-preposition",
                    title: "Lesson 21 — The Preposition",
                    notes: [
                      {
                        id: "class-8-lang-grammar-preposition-notes",
                        title: "Lesson 21 — The Preposition",
                        file: "notes/class-8/language/grammar/21-the-preposition.html",
                      },
                      {
                        id: "class-8-lang-grammar-preposition-quiz",
                        title: "Quiz 21 — The Preposition",
                        file: "notes/class-8/language/grammar/21-the-preposition-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-conjunction",
                    title: "Lesson 22 — The Conjunction",
                    notes: [
                      {
                        id: "class-8-lang-grammar-conjunction-notes",
                        title: "Lesson 22 — The Conjunction",
                        file: "notes/class-8/language/grammar/22-the-conjunction.html",
                      },
                      {
                        id: "class-8-lang-grammar-conjunction-quiz",
                        title: "Quiz 22 — The Conjunction",
                        file: "notes/class-8/language/grammar/22-the-conjunction-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-agreement",
                    title: "Lesson 23 — Agreement of the Verb with Subject",
                    notes: [
                      {
                        id: "class-8-lang-grammar-agreement-notes",
                        title: "Lesson 23 — Agreement of the Verb with Subject",
                        file: "notes/class-8/language/grammar/23-agreement-of-the-verb-with-subject.html",
                      },
                      {
                        id: "class-8-lang-grammar-agreement-quiz",
                        title: "Quiz 23 — Agreement of the Verb with Subject",
                        file: "notes/class-8/language/grammar/23-agreement-of-the-verb-with-subject-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-voice",
                    title: "Lesson 24 — Active and Passive Voice",
                    notes: [
                      {
                        id: "class-8-lang-grammar-voice-notes",
                        title: "Lesson 24 — Active and Passive Voice",
                        file: "notes/class-8/language/grammar/24-active-and-passive-voice.html",
                      },
                      {
                        id: "class-8-lang-grammar-voice-quiz",
                        title: "Quiz 24 — Active and Passive Voice",
                        file: "notes/class-8/language/grammar/24-active-and-passive-voice-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-narration",
                    title: "Lesson 25 — Narration",
                    notes: [
                      {
                        id: "class-8-lang-grammar-narration-notes",
                        title: "Lesson 25 — Narration",
                        file: "notes/class-8/language/grammar/25-narration.html",
                      },
                      {
                        id: "class-8-lang-grammar-narration-quiz",
                        title: "Quiz 25 — Narration",
                        file: "notes/class-8/language/grammar/25-narration-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-grammar-integrated-practice",
                    title: "Lesson 26 — Integrated Grammar Practice",
                    notes: [
                      {
                        id: "class-8-lang-grammar-integrated-practice-notes",
                        title: "Lesson 26 — Integrated Grammar Practice",
                        file: "notes/class-8/language/grammar/26-integrated-grammar-practice.html",
                      },
                      {
                        id: "class-8-lang-grammar-integrated-practice-quiz",
                        title: "Quiz 26 — Integrated Grammar Practice",
                        file: "notes/class-8/language/grammar/26-integrated-grammar-practice-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                ],
              },
              {
                id: "class-8-lang-vocabulary",
                title: "03 · Vocabulary",
                subsections: [
                  {
                    id: "class-8-lang-vocabulary-vocabulary",
                    title: "Lesson 28 — Vocabulary",
                    notes: [
                      {
                        id: "class-8-lang-vocabulary-vocabulary-notes",
                        title: "Lesson 28 — Vocabulary",
                        file: "notes/class-8/language/vocabulary/28-vocabulary.html",
                      },
                      {
                        id: "class-8-lang-vocabulary-vocabulary-quiz",
                        title: "Quiz 28 — Vocabulary",
                        file: "notes/class-8/language/vocabulary/28-vocabulary-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                  {
                    id: "class-8-lang-vocabulary-owsip",
                    title: "Lesson 29 — One Word Substitution, Idioms and Proverbs",
                    notes: [
                      {
                        id: "class-8-lang-vocabulary-owsip-notes",
                        title: "Lesson 29 — One Word Substitution, Idioms and Proverbs",
                        file: "notes/class-8/language/vocabulary/29-one-word-substitution-idioms-and-proverbs.html",
                      },
                      {
                        id: "class-8-lang-vocabulary-owsip-quiz",
                        title: "Quiz 29 — One Word Substitution, Idioms and Proverbs",
                        file: "notes/class-8/language/vocabulary/29-one-word-substitution-idioms-and-proverbs-quiz.html",
                      },
                    ],
                    tests: [],
                  },
                ],
              },
              {
                id: "class-8-lang-assessment-papers",
                title: "04 · Assessment Papers",
                subsections: [
                  {
                    id: "class-8-lang-assessment-papers-sample",
                    title: "Lesson 30 — Sample Assessment Papers",
                    notes: [
                      {
                        id: "class-8-lang-assessment-papers-sample-notes",
                        title: "Lesson 30 — Sample Assessment Papers",
                        file: "notes/class-8/language/assessment-papers/30-sample-assessment-papers.html",
                      },
                      {
                        id: "class-8-lang-assessment-papers-sample-quiz",
                        title: "Quiz 30 — Sample Assessment Paper (Practice)",
                        file: "notes/class-8/language/assessment-papers/30-sample-assessment-papers-quiz.html",
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
