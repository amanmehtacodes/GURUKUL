/**
 * CURRICULUM DATA
 * ----------------
 * Reflects the NCERT 2026-27 revised curriculum (NEP 2020 / NCF 2023).
 * Class 8 (Ganita Prakash) and Class 9 (Ganita Manjari) are entirely new
 * books. Classes 10-12 are the rationalised editions.
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
 * SUBJECT TRACKS: a subject can have `sections` directly (most subjects)
 * OR `tracks` (currently just English). A subject with `tracks` shows a
 * track-picker screen before the sidebar tree. The shape of English's
 * tracks differs by class: classes 8-10 split into Language vs Literature
 * (each itself book-based); classes 11-12 skip that split and go straight
 * to one track per book (e.g. Hornbill / Snapshots / Woven Words for XI),
 * since those grades don't have a separate language/grammar textbook.
 *
 * Physics, Chemistry, and Biology for a given class are populated from
 * that subject's NCERT textbook(s) — where a subject ships as two parts
 * (e.g. Chemistry Part I/II), both parts' chapters are merged into one
 * flat, continuously-numbered `sections` list rather than split further.
 *
 * Two kinds of top-level entries in CLASSES: regular classes (VIII-XII)
 * with `subjects` directly, and exam tracks (JEE/NEET) with `type: "exam"`
 * and a `years` array instead, each year shaped like a mini class.
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
              id: "maths",
              title: "Mathematics",
              icon: "maths",
              ready: true,
              sections: [
          {
            id: "squares-and-cubes",
            title: "01 \u00b7 A Square and A Cube",
            subsections: [
              {
                id: "squares-cubes-squares",
                title: "Squares & Square Roots",
                notes: [
                  { id: "squares-notes", title: "Squares & Square Roots", file: "notes/class-8-maths/squares-and-cubes/squares-square-roots/notes.md" },
                  { id: "squares-cubes-qbank", title: "Question Bank (150 Qs + Answer Key)", file: "notes/class-8-maths/squares-and-cubes/question-bank.md" }
                ],
                tests: []
              },
              {
                id: "squares-cubes-cubes",
                title: "Cubes & Cube Roots",
                notes: [
                  { id: "cubes-notes", title: "Cubes & Cube Roots", file: "notes/class-8-maths/squares-and-cubes/cubes-cube-roots/notes.md" }
                ],
                tests: [
                  {
                    id: "squares-cubes-mcq-test",
                    title: "MCQ Quiz: Squares & Cubes",
                    kind: "mcq",
                    answerKeyFile: "notes/class-8-maths/squares-and-cubes/answer-keys/mcq-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", topic: "Perfect Squares", prompt: "What is 12²?", options: ["124", "144", "142", "164"], answerIndex: 1 },
                      { id: "q2", type: "mcq", topic: "Perfect Cubes", prompt: "Which of these is a perfect cube?", options: ["128", "216", "150", "200"], answerIndex: 1 },
                      { id: "q3", type: "mcq", topic: "Square Roots", prompt: "The square root of 289 is:", options: ["15", "16", "17", "18"], answerIndex: 2 },
                      { id: "q4", type: "mcq", topic: "Perfect Squares", prompt: "A number ending in 2 can never be a perfect:", options: ["Cube", "Square", "Even number", "Multiple of 2"], answerIndex: 1 },
                      { id: "q5", type: "mcq", topic: "Perfect Cubes", prompt: "6³ equals:", options: ["36", "108", "216", "196"], answerIndex: 2 },
                      { id: "q6", type: "mcq", topic: "Perfect Squares", prompt: "How many zeros does the square of 400 end with?", options: ["1", "2", "3", "4"], answerIndex: 3 },
                      { id: "q7", type: "mcq", topic: "Square Roots", prompt: "Which method finds a square root by pairing prime factors?", options: ["Long division", "Prime factorisation", "Repeated subtraction", "Estimation"], answerIndex: 1 },
                      { id: "q8", type: "mcq", topic: "Perfect Cubes", prompt: "512 is a perfect cube because 512 =", options: ["7³", "8³", "9³", "6³"], answerIndex: 1 }
                    ]
                  },
                  {
                    id: "squares-cubes-mixed-test",
                    title: "MCQ + Theory: Squares & Cubes",
                    kind: "mixed",
                    answerKeyFile: "notes/class-8-maths/squares-and-cubes/answer-keys/mixed-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", topic: "Perfect Squares", prompt: "The number of digits in the square of a 3-digit number is always:", options: ["Exactly 6", "5 or 6", "Exactly 5", "4 or 5"], answerIndex: 1 },
                      { id: "q2", type: "mcq", topic: "Perfect Squares & Cubes", prompt: "Which of these numbers is both a perfect square and a perfect cube?", options: ["36", "64", "100", "125"], answerIndex: 1 },
                      { id: "q3", type: "mcq", topic: "Cube Roots", prompt: "The cube root of a negative number is:", options: ["Always positive", "Always negative", "Undefined", "Zero"], answerIndex: 1 },
                      {
                        id: "t1", type: "short", topic: "Prime Factorisation",
                        prompt: "Explain, using prime factorisation, why 180 is not a perfect square. What is the smallest number you'd need to multiply it by to make it one?",
                        referenceAnswer: "$180 = 2^2 \\times 3^2 \\times 5$. Every prime factor of a perfect square must appear an even number of times — here $5$ appears only once (an odd power), so $180$ is not a perfect square. Multiplying by $5$ gives $2^2 \\times 3^2 \\times 5^2 = 900 = 30^2$, which is a perfect square."
                      },
                      {
                        id: "t2", type: "short", topic: "Perfect Squares",
                        prompt: "Describe the pattern in the units digits of square numbers (1², 2², 3², ... 10²). Which digits never appear as the units digit of a perfect square?",
                        referenceAnswer: "The units digits of $1^2$ through $10^2$ are $1, 4, 9, 6, 5, 6, 9, 4, 1, 0$ — they only ever land on $\\{0, 1, 4, 5, 6, 9\\}$. The digits $2, 3, 7, 8$ never appear as the units digit of a perfect square."
                      },
                      {
                        id: "t3", type: "short", topic: "Perfect Cubes",
                        prompt: "1729 is called the Hardy-Ramanujan number. Explain what makes it mathematically special, using the two sums of cubes that define it.",
                        referenceAnswer: "$1729 = 1^3 + 12^3 = 9^3 + 10^3$ — it's the smallest number expressible as the sum of two positive cubes in two different ways, which is what makes it mathematically special."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "power-play",
            title: "02 \u00b7 Power Play",
            subsections: [
              {
                id: "power-play-fundamentals",
                title: "Exponent Fundamentals",
                notes: [
                  { id: "power-play-fund-notes", title: "Exponent Fundamentals", file: "notes/class-8-maths/power-play/exponent-fundamentals/notes.md" },
                  { id: "power-play-qbank", title: "Question Bank (150 Qs + Answer Key)", file: "notes/class-8-maths/power-play/question-bank.md" }
                ],
                tests: []
              },
              {
                id: "power-play-scale",
                title: "Scale, Growth & History",
                notes: [
                  { id: "power-play-scale-notes", title: "Scale, Growth & History", file: "notes/class-8-maths/power-play/scale-growth-history/notes.md" }
                ],
                tests: [
                  {
                    id: "power-play-mcq-test",
                    title: "MCQ Quiz: Power Play",
                    kind: "mcq",
                    answerKeyFile: "notes/class-8-maths/power-play/answer-keys/mcq-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "2⁵ × 2² equals:", options: ["2³", "2⁷", "2¹⁰", "4⁷"], answerIndex: 1 },
                      { id: "q2", type: "mcq", prompt: "(5³)² simplifies to:", options: ["5⁵", "5⁶", "5⁹", "25³"], answerIndex: 1 },
                      { id: "q3", type: "mcq", prompt: "10⁻² is equal to:", options: ["-100", "-0.01", "0.01", "100"], answerIndex: 2 },
                      { id: "q4", type: "mcq", prompt: "Which is the correct standard form of 6,300,000?", options: ["6.3 × 10⁵", "6.3 × 10⁶", "63 × 10⁵", "0.63 × 10⁷"], answerIndex: 1 },
                      { id: "q5", type: "mcq", prompt: "3⁴ ÷ 3⁴ equals:", options: ["0", "1", "3", "3⁸"], answerIndex: 1 },
                      { id: "q6", type: "mcq", prompt: "Which of these has the greatest value?", options: ["2¹⁰", "10²", "5³", "3⁴"], answerIndex: 0 },
                      { id: "q7", type: "mcq", prompt: "x⁶ ÷ x² simplifies to:", options: ["x³", "x⁴", "x⁸", "x¹²"], answerIndex: 1 },
                      { id: "q8", type: "mcq", prompt: "A quantity that doubles every hour starting at 1 can be written after n hours as:", options: ["n²", "2n", "2ⁿ", "n×2"], answerIndex: 2 }
                    ]
                  },
                  {
                    id: "power-play-mixed-test",
                    title: "MCQ + Theory: Power Play",
                    kind: "mixed",
                    answerKeyFile: "notes/class-8-maths/power-play/answer-keys/mixed-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "(2⁻¹)⁻¹ equals:", options: ["-2", "-1/2", "1/2", "2"], answerIndex: 3 },
                      { id: "q2", type: "mcq", prompt: "Which expression is NOT equal to 1 (for any nonzero a)?", options: ["a⁰", "a¹÷a¹", "a⁻¹×a", "a¹×a⁰"], answerIndex: 3 },
                      { id: "q3", type: "mcq", prompt: "The mass of an electron is about 9.1 × 10⁻³¹ kg. This number, written in full, would have how many zeros right after the decimal point before the first nonzero digit?", options: ["28", "29", "30", "31"], answerIndex: 2 },
                      { id: "t1", type: "short", prompt: "Explain in your own words why any nonzero number raised to the power 0 equals 1, using the quotient rule (aᵐ ÷ aⁿ) as your reasoning." },
                      { id: "t2", type: "short", prompt: "A sheet of paper 0.01 cm thick is folded in half repeatedly. Write an expression for its thickness after n folds, and explain why exponential growth like this gets large so quickly." },
                      { id: "t3", type: "short", prompt: "Convert 0.0000521 into standard (scientific) form, and explain the rule you used for the sign of the exponent." }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "c8-ch3-a-story-of-numbers",
            title: "03 \u00b7 A Story of Numbers",
            subsections: [
              {
                id: "c8-ch3-a-story-of-numbers-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch3-a-story-of-numbers-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/a-story-of-numbers/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch3-a-story-of-numbers-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch3-a-story-of-numbers-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/a-story-of-numbers/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "quadrilaterals",
            title: "04 \u00b7 Quadrilaterals",
            subsections: [
              {
                id: "quad-rectangles-squares",
                title: "Rectangles, Squares & Angle Sum",
                notes: [
                  { id: "quad-rect-notes", title: "Rectangles, Squares & Angle Sum", file: "notes/class-8-maths/quadrilaterals/rectangles-squares-angle-sum/notes.md" }
                ],
                tests: []
              },
              {
                id: "quad-parallelograms",
                title: "Parallelograms & Rhombus",
                notes: [
                  { id: "quad-para-notes", title: "Parallelograms & Rhombus", file: "notes/class-8-maths/quadrilaterals/parallelograms-rhombus/notes.md" }
                ],
                tests: []
              },
              {
                id: "quad-kite-trapezium",
                title: "Kite, Trapezium & Practice",
                notes: [
                  { id: "quad-kite-notes", title: "Kite, Trapezium & Practice", file: "notes/class-8-maths/quadrilaterals/kite-trapezium-practice/notes.md" }
                ],
                tests: [
                  {
                    id: "quadrilaterals-mcq-test",
                    title: "MCQ Quiz: Quadrilaterals",
                    kind: "mcq",
                    answerKeyFile: "notes/class-8-maths/quadrilaterals/answer-keys/mcq-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "The sum of the interior angles of any quadrilateral is:", options: ["180°", "270°", "360°", "540°"], answerIndex: 2 },
                      { id: "q2", type: "mcq", prompt: "A parallelogram with all sides equal is called a:", options: ["Rectangle", "Rhombus", "Trapezium", "Kite"], answerIndex: 1 },
                      { id: "q3", type: "mcq", prompt: "In a rectangle, the diagonals are:", options: ["Perpendicular", "Unequal", "Equal and bisect each other", "Never equal"], answerIndex: 2 },
                      { id: "q4", type: "mcq", prompt: "A quadrilateral with exactly one pair of parallel sides is a:", options: ["Parallelogram", "Trapezium", "Rhombus", "Square"], answerIndex: 1 },
                      { id: "q5", type: "mcq", prompt: "Every square is also a:", options: ["Trapezium only", "Rhombus and a rectangle", "Kite only", "None of these"], answerIndex: 1 },
                      { id: "q6", type: "mcq", prompt: "The diagonals of a kite are:", options: ["Equal in length", "Perpendicular to each other", "Parallel to each other", "Always equal and perpendicular"], answerIndex: 1 },
                      { id: "q7", type: "mcq", prompt: "If three angles of a quadrilateral are 70°, 80°, and 100°, the fourth angle is:", options: ["100°", "110°", "120°", "130°"], answerIndex: 1 },
                      { id: "q8", type: "mcq", prompt: "Which quadrilateral has exactly two pairs of adjacent equal sides?", options: ["Rhombus", "Rectangle", "Kite", "Trapezium"], answerIndex: 2 }
                    ]
                  },
                  {
                    id: "quadrilaterals-mixed-test",
                    title: "MCQ + Theory: Quadrilaterals",
                    kind: "mixed",
                    answerKeyFile: "notes/class-8-maths/quadrilaterals/answer-keys/mixed-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "Opposite angles of a parallelogram are always:", options: ["Complementary", "Supplementary", "Equal", "90° each"], answerIndex: 2 },
                      { id: "q2", type: "mcq", prompt: "A rhombus is always a parallelogram, but a parallelogram is:", options: ["Always a rhombus", "Never a rhombus", "Not always a rhombus", "Always a rectangle"], answerIndex: 2 },
                      { id: "q3", type: "mcq", prompt: "The exterior angle sum of any convex polygon is always:", options: ["180°", "270°", "360°", "Depends on the number of sides"], answerIndex: 2 },
                      { id: "t1", type: "short", prompt: "Draw the hierarchy of quadrilaterals in words: explain how a square relates to both a rectangle and a rhombus, and why the reverse relationship doesn't hold." },
                      { id: "t2", type: "short", prompt: "A quadrilateral has all four sides equal but is not a square. What shape must it be, and what property distinguishes it from a square?" },
                      { id: "t3", type: "short", prompt: "Explain why the sum of the interior angles of any quadrilateral is always 360°, using the idea of splitting it into two triangles." }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "c8-ch5-number-play",
            title: "05 \u00b7 Number Play",
            subsections: [
              {
                id: "c8-ch5-number-play-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch5-number-play-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/number-play/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch5-number-play-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch5-number-play-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/number-play/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch6-we-distribute-yet-things-multiply",
            title: "06 \u00b7 We Distribute, Yet Things Multiply",
            subsections: [
              {
                id: "c8-ch6-we-distribute-yet-things-multiply-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch6-we-distribute-yet-things-multiply-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/we-distribute-yet-things-multiply/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch6-we-distribute-yet-things-multiply-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch6-we-distribute-yet-things-multiply-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/we-distribute-yet-things-multiply/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch7-proportional-reasoning-1",
            title: "07 \u00b7 Proportional Reasoning-1",
            subsections: [
              {
                id: "c8-ch7-proportional-reasoning-1-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch7-proportional-reasoning-1-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/proportional-reasoning-1/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch7-proportional-reasoning-1-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch7-proportional-reasoning-1-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/proportional-reasoning-1/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch8-fractions-in-disguise",
            title: "08 \u00b7 Fractions in Disguise",
            subsections: [
              {
                id: "c8-ch8-fractions-in-disguise-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch8-fractions-in-disguise-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/fractions-in-disguise/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch8-fractions-in-disguise-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch8-fractions-in-disguise-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/fractions-in-disguise/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch9-the-baudhayanapythagoras-theorem",
            title: "09 \u00b7 The Baudhayana–Pythagoras Theorem",
            subsections: [
              {
                id: "c8-ch9-the-baudhayanapythagoras-theorem-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch9-the-baudhayanapythagoras-theorem-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/the-baudhayanapythagoras-theorem/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch9-the-baudhayanapythagoras-theorem-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch9-the-baudhayanapythagoras-theorem-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/the-baudhayanapythagoras-theorem/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch10-proportional-reasoning-2",
            title: "10 \u00b7 Proportional Reasoning-2",
            subsections: [
              {
                id: "c8-ch10-proportional-reasoning-2-s1",
                title: "Proportional Reasoning-2",
                notes: [
                  { id: "c8-ch10-proportional-reasoning-2-s1-notes", title: "Chapter Notes", file: "notes/class-8-maths-placeholders/proportional-reasoning-2/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch11-exploring-some-geometric-themes",
            title: "11 \u00b7 Exploring Some Geometric Themes",
            subsections: [
              {
                id: "c8-ch11-exploring-some-geometric-themes-s1",
                title: "Exploring Some Geometric Themes",
                notes: [
                  { id: "c8-ch11-exploring-some-geometric-themes-s1-notes", title: "Chapter Notes", file: "notes/class-8-maths-placeholders/exploring-some-geometric-themes/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch12-tales-by-dots-and-lines",
            title: "12 \u00b7 Tales by Dots and Lines",
            subsections: [
              {
                id: "c8-ch12-tales-by-dots-and-lines-s1",
                title: "Tales by Dots and Lines",
                notes: [
                  { id: "c8-ch12-tales-by-dots-and-lines-s1-notes", title: "Chapter Notes", file: "notes/class-8-maths-placeholders/tales-by-dots-and-lines/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch13-algebra-play",
            title: "13 \u00b7 Algebra Play",
            subsections: [
              {
                id: "c8-ch13-algebra-play-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch13-algebra-play-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/algebra-play/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch13-algebra-play-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch13-algebra-play-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/algebra-play/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8-ch14-area",
            title: "14 \u00b7 Area",
            subsections: [
              {
                id: "c8-ch14-area-s1",
                title: "Part 1",
                notes: [
                  { id: "c8-ch14-area-s1-notes", title: "Part 1", file: "notes/class-8-maths-placeholders/area/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c8-ch14-area-s2",
                title: "Part 2",
                notes: [
                  { id: "c8-ch14-area-s2-notes", title: "Part 2", file: "notes/class-8-maths-placeholders/area/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "science",
              title: "Science",
              icon: "science",
              ready: true,
              sections: [
          {
            id: "c8sci-ch1-exploring-the-investigative-world-of-science",
            title: "01 · Exploring the Investigative World of Science",
            subsections: [
              {
                id: "c8sci-ch1-exploring-the-investigative-world-of-science-s1",
                title: "Exploring the Investigative World of Science",
                notes: [
                  { id: "c8sci-ch1-exploring-the-investigative-world-of-science-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/exploring-the-investigative-world-of-science/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch2-the-invisible-living-world-beyond-our-naked-eye",
            title: "02 · The Invisible Living World: Beyond Our Naked Eye",
            subsections: [
              {
                id: "c8sci-ch2-the-invisible-living-world-beyond-our-naked-eye-s1",
                title: "The Invisible Living World: Beyond Our Naked Eye",
                notes: [
                  { id: "c8sci-ch2-the-invisible-living-world-beyond-our-naked-eye-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/the-invisible-living-world-beyond-our-naked-eye/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch3-health-the-ultimate-treasure",
            title: "03 · Health: The Ultimate Treasure",
            subsections: [
              {
                id: "c8sci-ch3-health-the-ultimate-treasure-s1",
                title: "Health: The Ultimate Treasure",
                notes: [
                  { id: "c8sci-ch3-health-the-ultimate-treasure-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/health-the-ultimate-treasure/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch4-electricity-magnetic-and-heating-effects",
            title: "04 · Electricity: Magnetic and Heating Effects",
            subsections: [
              {
                id: "c8sci-ch4-electricity-magnetic-and-heating-effects-s1",
                title: "Electricity: Magnetic and Heating Effects",
                notes: [
                  { id: "c8sci-ch4-electricity-magnetic-and-heating-effects-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/electricity-magnetic-and-heating-effects/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch5-exploring-forces",
            title: "05 · Exploring Forces",
            subsections: [
              {
                id: "c8sci-ch5-exploring-forces-s1",
                title: "Exploring Forces",
                notes: [
                  { id: "c8sci-ch5-exploring-forces-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/exploring-forces/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch6-pressure-winds-storms-and-cyclones",
            title: "06 · Pressure, Winds, Storms, and Cyclones",
            subsections: [
              {
                id: "c8sci-ch6-pressure-winds-storms-and-cyclones-s1",
                title: "Pressure, Winds, Storms, and Cyclones",
                notes: [
                  { id: "c8sci-ch6-pressure-winds-storms-and-cyclones-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/pressure-winds-storms-and-cyclones/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch7-particulate-nature-of-matter",
            title: "07 · Particulate Nature of Matter",
            subsections: [
              {
                id: "c8sci-ch7-particulate-nature-of-matter-s1",
                title: "Particulate Nature of Matter",
                notes: [
                  { id: "c8sci-ch7-particulate-nature-of-matter-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/particulate-nature-of-matter/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch8-nature-of-matter-elements-compounds-and-mixtures",
            title: "08 · Nature of Matter: Elements, Compounds, and Mixtures",
            subsections: [
              {
                id: "c8sci-ch8-nature-of-matter-elements-compounds-and-mixtures-s1",
                title: "Nature of Matter: Elements, Compounds, and Mixtures",
                notes: [
                  { id: "c8sci-ch8-nature-of-matter-elements-compounds-and-mixtures-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/nature-of-matter-elements-compounds-and-mixtures/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch9-the-amazing-world-of-solutes-solvents-and-solutions",
            title: "09 · The Amazing World of Solutes, Solvents, and Solutions",
            subsections: [
              {
                id: "c8sci-ch9-the-amazing-world-of-solutes-solvents-and-solutions-s1",
                title: "The Amazing World of Solutes, Solvents, and Solutions",
                notes: [
                  { id: "c8sci-ch9-the-amazing-world-of-solutes-solvents-and-solutions-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/the-amazing-world-of-solutes-solvents-and-solutions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch10-light-mirrors-and-lenses",
            title: "10 · Light: Mirrors and Lenses",
            subsections: [
              {
                id: "c8sci-ch10-light-mirrors-and-lenses-s1",
                title: "Light: Mirrors and Lenses",
                notes: [
                  { id: "c8sci-ch10-light-mirrors-and-lenses-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/light-mirrors-and-lenses/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch11-keeping-time-with-the-skies",
            title: "11 · Keeping Time with the Skies",
            subsections: [
              {
                id: "c8sci-ch11-keeping-time-with-the-skies-s1",
                title: "Keeping Time with the Skies",
                notes: [
                  { id: "c8sci-ch11-keeping-time-with-the-skies-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/keeping-time-with-the-skies/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch12-how-nature-works-in-harmony",
            title: "12 · How Nature Works in Harmony",
            subsections: [
              {
                id: "c8sci-ch12-how-nature-works-in-harmony-s1",
                title: "How Nature Works in Harmony",
                notes: [
                  { id: "c8sci-ch12-how-nature-works-in-harmony-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/how-nature-works-in-harmony/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c8sci-ch13-our-home-earth-a-unique-life-sustaining-planet",
            title: "13 · Our Home: Earth, a Unique Life Sustaining Planet",
            subsections: [
              {
                id: "c8sci-ch13-our-home-earth-a-unique-life-sustaining-planet-s1",
                title: "Our Home: Earth, a Unique Life Sustaining Planet",
                notes: [
                  { id: "c8sci-ch13-our-home-earth-a-unique-life-sustaining-planet-s1-notes", title: "Chapter Notes", file: "notes/class-8-science-placeholders/our-home-earth-a-unique-life-sustaining-planet/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "english",
              title: "English",
              icon: "english",
              ready: true,
tracks: [
          {
            id: "language",
            title: "Language",
            ready: false
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
                title: "01 \u00b7 Honeydew — Prose",
                subsections: [
                  {
                    id: "class-8-lit-honeydew-prose-core",
                    title: "Honeydew — Prose",
                    notes: [ { id: "class-8-lit-honeydew-prose-notes", title: "Honeydew — Prose", file: "notes/class-8/literature/honeydew-prose/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-8-lit-honeydew-poetry",
                title: "02 \u00b7 Honeydew — Poetry",
                subsections: [
                  {
                    id: "class-8-lit-honeydew-poetry-core",
                    title: "Honeydew — Poetry",
                    notes: [ { id: "class-8-lit-honeydew-poetry-notes", title: "Honeydew — Poetry", file: "notes/class-8/literature/honeydew-poetry/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "it-so-happened",
            title: "It So Happened (Supplementary Reader)",
            ready: true,
            sections: [
              {
                id: "class-8-lit-it-so-happened-supplementary-reader",
                title: "01 \u00b7 It So Happened (Supplementary Reader)",
                subsections: [
                  {
                    id: "class-8-lit-it-so-happened-supplementary-reader-core",
                    title: "It So Happened (Supplementary Reader)",
                    notes: [ { id: "class-8-lit-it-so-happened-supplementary-reader-notes", title: "It So Happened (Supplementary Reader)", file: "notes/class-8/literature/it-so-happened-supplementary-reader/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          }
            ]
          }
              ]
            }
    ]
  },
  {
    id: "class-9",
    label: "IX",
    name: "Class 9",
    subjects: [
            {
              id: "maths",
              title: "Mathematics",
              icon: "maths",
              ready: true,
              sections: [
          {
            id: "coordinates",
            title: "01 \u00b7 Orienting Yourself: The Use of Coordinates",
            subsections: [
              {
                id: "coordinates-plane",
                title: "The Coordinate Plane",
                notes: [
                  { id: "coordinates-plane-notes", title: "The Coordinate Plane", file: "notes/class-9-maths/coordinates/the-coordinate-plane/notes.md" }
                ],
                tests: []
              },
              {
                id: "coordinates-distance",
                title: "Distance Formula & Practice",
                notes: [
                  { id: "coordinates-distance-notes", title: "Distance Formula & Practice", file: "notes/class-9-maths/coordinates/distance-formula-practice/notes.md" }
                ],
                tests: [
                  {
                    id: "coordinates-mcq-test",
                    title: "MCQ Quiz: Coordinates",
                    kind: "mcq",
                    answerKeyFile: "notes/class-9-maths/coordinates/answer-keys/mcq-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "The point (0, 0) is called the:", options: ["Vertex", "Origin", "Axis", "Quadrant"], answerIndex: 1 },
                      { id: "q2", type: "mcq", prompt: "The point (3, -5) lies in which quadrant?", options: ["I", "II", "III", "IV"], answerIndex: 3 },
                      { id: "q3", type: "mcq", prompt: "The x-coordinate of any point on the y-axis is always:", options: ["1", "-1", "0", "Undefined"], answerIndex: 2 },
                      { id: "q4", type: "mcq", prompt: "The distance between (2, 3) and (2, 9) is:", options: ["3 units", "6 units", "9 units", "11 units"], answerIndex: 1 },
                      { id: "q5", type: "mcq", prompt: "Which quadrant has both coordinates negative?", options: ["I", "II", "III", "IV"], answerIndex: 2 },
                      { id: "q6", type: "mcq", prompt: "The reflection of (4, -2) in the x-axis is:", options: ["(-4, -2)", "(4, 2)", "(-4, 2)", "(-2, 4)"], answerIndex: 1 },
                      { id: "q7", type: "mcq", prompt: "Two axes of the Cartesian plane intersect at:", options: ["A right angle", "45°", "60°", "They never intersect"], answerIndex: 0 },
                      { id: "q8", type: "mcq", prompt: "The point (-6, 0) lies on the:", options: ["y-axis", "x-axis", "Origin", "Quadrant II"], answerIndex: 1 }
                    ]
                  },
                  {
                    id: "coordinates-mixed-test",
                    title: "MCQ + Theory: Coordinates",
                    kind: "mixed",
                    answerKeyFile: "notes/class-9-maths/coordinates/answer-keys/mixed-answer-key.md",
                    questions: [
                      { id: "q1", type: "mcq", prompt: "The distance formula between (x₁,y₁) and (x₂,y₂) is derived using:", options: ["The Midpoint Theorem", "The Pythagoras Theorem", "The Angle Sum Property", "Similar Triangles only"], answerIndex: 1 },
                      { id: "q2", type: "mcq", prompt: "A point equidistant from both axes with positive coordinates satisfies:", options: ["x = 0", "y = 0", "x = y", "x = -y"], answerIndex: 2 },
                      { id: "q3", type: "mcq", prompt: "The point (7, 7) reflected in the origin becomes:", options: ["(7, -7)", "(-7, 7)", "(-7, -7)", "(7, 7)"], answerIndex: 2 },
                      { id: "t1", type: "short", prompt: "Find the distance between the points (1, 2) and (4, 6), showing your use of the distance formula step by step." },
                      { id: "t2", type: "short", prompt: "Explain how you would determine, just by looking at the signs of a point's coordinates, which quadrant it lies in — cover all four cases." },
                      { id: "t3", type: "short", prompt: "A point A(3, 4) is reflected first in the x-axis to get point B, then B is reflected in the y-axis to get point C. Find the coordinates of B and C, and describe C's relationship to A." }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "c9-ch2-introduction-to-linear-polynomials",
            title: "02 \u00b7 Introduction to Linear Polynomials",
            subsections: [
              {
                id: "c9-ch2-introduction-to-linear-polynomials-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch2-introduction-to-linear-polynomials-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/introduction-to-linear-polynomials/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch2-introduction-to-linear-polynomials-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch2-introduction-to-linear-polynomials-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/introduction-to-linear-polynomials/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch2-introduction-to-linear-polynomials-s3",
                title: "Part 3",
                notes: [
                  { id: "c9-ch2-introduction-to-linear-polynomials-s3-notes", title: "Part 3", file: "notes/class-9-maths-placeholders/introduction-to-linear-polynomials/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch3-the-world-of-numbers",
            title: "03 \u00b7 The World of Numbers",
            subsections: [
              {
                id: "c9-ch3-the-world-of-numbers-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch3-the-world-of-numbers-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/the-world-of-numbers/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch3-the-world-of-numbers-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch3-the-world-of-numbers-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/the-world-of-numbers/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch3-the-world-of-numbers-s3",
                title: "Part 3",
                notes: [
                  { id: "c9-ch3-the-world-of-numbers-s3-notes", title: "Part 3", file: "notes/class-9-maths-placeholders/the-world-of-numbers/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch4-exploring-algebraic-identities",
            title: "04 \u00b7 Exploring Algebraic Identities",
            subsections: [
              {
                id: "c9-ch4-exploring-algebraic-identities-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch4-exploring-algebraic-identities-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/exploring-algebraic-identities/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch4-exploring-algebraic-identities-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch4-exploring-algebraic-identities-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/exploring-algebraic-identities/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch5-im-up-and-down-and-round-and-round-circles",
            title: "05 \u00b7 I'm Up and Down, and Round and Round (Circles)",
            subsections: [
              {
                id: "c9-ch5-im-up-and-down-and-round-and-round-circles-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch5-im-up-and-down-and-round-and-round-circles-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/im-up-and-down-and-round-and-round-circles/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch5-im-up-and-down-and-round-and-round-circles-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch5-im-up-and-down-and-round-and-round-circles-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/im-up-and-down-and-round-and-round-circles/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch6-measuring-space-perimeter-and-area",
            title: "06 \u00b7 Measuring Space: Perimeter and Area",
            subsections: [
              {
                id: "c9-ch6-measuring-space-perimeter-and-area-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch6-measuring-space-perimeter-and-area-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/measuring-space-perimeter-and-area/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch6-measuring-space-perimeter-and-area-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch6-measuring-space-perimeter-and-area-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/measuring-space-perimeter-and-area/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch7-the-mathematics-of-maybe-introduction-to-probability",
            title: "07 \u00b7 The Mathematics of Maybe: Introduction to Probability",
            subsections: [
              {
                id: "c9-ch7-the-mathematics-of-maybe-introduction-to-probability-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch7-the-mathematics-of-maybe-introduction-to-probability-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/the-mathematics-of-maybe-introduction-to-probability/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch7-the-mathematics-of-maybe-introduction-to-probability-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch7-the-mathematics-of-maybe-introduction-to-probability-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/the-mathematics-of-maybe-introduction-to-probability/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9-ch8-predicting-what-comes-next-exploring-sequences-and-progressions",
            title: "08 \u00b7 Predicting What Comes Next: Exploring Sequences and Progressions",
            subsections: [
              {
                id: "c9-ch8-predicting-what-comes-next-exploring-sequences-and-progressions-s1",
                title: "Part 1",
                notes: [
                  { id: "c9-ch8-predicting-what-comes-next-exploring-sequences-and-progressions-s1-notes", title: "Part 1", file: "notes/class-9-maths-placeholders/predicting-what-comes-next-exploring-sequences-and-progressions/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c9-ch8-predicting-what-comes-next-exploring-sequences-and-progressions-s2",
                title: "Part 2",
                notes: [
                  { id: "c9-ch8-predicting-what-comes-next-exploring-sequences-and-progressions-s2-notes", title: "Part 2", file: "notes/class-9-maths-placeholders/predicting-what-comes-next-exploring-sequences-and-progressions/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "science",
              title: "Science",
              icon: "science",
              ready: true,
              sections: [
          {
            id: "c9sci-ch1-exploration-entering-the-world-of-secondary-science",
            title: "01 · Exploration: Entering the World of Secondary Science",
            subsections: [
              {
                id: "c9sci-ch1-exploration-entering-the-world-of-secondary-science-s1",
                title: "Exploration: Entering the World of Secondary Science",
                notes: [
                  { id: "c9sci-ch1-exploration-entering-the-world-of-secondary-science-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/exploration-entering-the-world-of-secondary-science/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch2-cell-the-building-block-of-life",
            title: "02 · Cell: The Building Block of Life",
            subsections: [
              {
                id: "c9sci-ch2-cell-the-building-block-of-life-s1",
                title: "Cell: The Building Block of Life",
                notes: [
                  { id: "c9sci-ch2-cell-the-building-block-of-life-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/cell-the-building-block-of-life/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch3-tissues-in-action",
            title: "03 · Tissues in Action",
            subsections: [
              {
                id: "c9sci-ch3-tissues-in-action-s1",
                title: "Tissues in Action",
                notes: [
                  { id: "c9sci-ch3-tissues-in-action-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/tissues-in-action/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch4-describing-motion-around-us",
            title: "04 · Describing Motion Around Us",
            subsections: [
              {
                id: "c9sci-ch4-describing-motion-around-us-s1",
                title: "Describing Motion Around Us",
                notes: [
                  { id: "c9sci-ch4-describing-motion-around-us-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/describing-motion-around-us/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch5-exploring-mixtures-and-their-separation",
            title: "05 · Exploring Mixtures and their Separation",
            subsections: [
              {
                id: "c9sci-ch5-exploring-mixtures-and-their-separation-s1",
                title: "Exploring Mixtures and their Separation",
                notes: [
                  { id: "c9sci-ch5-exploring-mixtures-and-their-separation-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/exploring-mixtures-and-their-separation/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch6-how-forces-affect-motion",
            title: "06 · How Forces Affect Motion",
            subsections: [
              {
                id: "c9sci-ch6-how-forces-affect-motion-s1",
                title: "How Forces Affect Motion",
                notes: [
                  { id: "c9sci-ch6-how-forces-affect-motion-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/how-forces-affect-motion/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch7-work-energy-and-simple-machines",
            title: "07 · Work, Energy, and Simple Machines",
            subsections: [
              {
                id: "c9sci-ch7-work-energy-and-simple-machines-s1",
                title: "Work, Energy, and Simple Machines",
                notes: [
                  { id: "c9sci-ch7-work-energy-and-simple-machines-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/work-energy-and-simple-machines/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch8-journey-inside-the-atom",
            title: "08 · Journey Inside the Atom",
            subsections: [
              {
                id: "c9sci-ch8-journey-inside-the-atom-s1",
                title: "Journey Inside the Atom",
                notes: [
                  { id: "c9sci-ch8-journey-inside-the-atom-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/journey-inside-the-atom/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch9-atomic-foundations-of-matter",
            title: "09 · Atomic Foundations of Matter",
            subsections: [
              {
                id: "c9sci-ch9-atomic-foundations-of-matter-s1",
                title: "Atomic Foundations of Matter",
                notes: [
                  { id: "c9sci-ch9-atomic-foundations-of-matter-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/atomic-foundations-of-matter/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch10-sound-waves-characteristics-and-applications",
            title: "10 · Sound Waves: Characteristics and Applications",
            subsections: [
              {
                id: "c9sci-ch10-sound-waves-characteristics-and-applications-s1",
                title: "Sound Waves: Characteristics and Applications",
                notes: [
                  { id: "c9sci-ch10-sound-waves-characteristics-and-applications-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/sound-waves-characteristics-and-applications/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch11-reproduction-how-life-continues",
            title: "11 · Reproduction: How Life Continues",
            subsections: [
              {
                id: "c9sci-ch11-reproduction-how-life-continues-s1",
                title: "Reproduction: How Life Continues",
                notes: [
                  { id: "c9sci-ch11-reproduction-how-life-continues-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/reproduction-how-life-continues/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch12-patterns-in-life-diversity-and-classification",
            title: "12 · Patterns in Life: Diversity and Classification",
            subsections: [
              {
                id: "c9sci-ch12-patterns-in-life-diversity-and-classification-s1",
                title: "Patterns in Life: Diversity and Classification",
                notes: [
                  { id: "c9sci-ch12-patterns-in-life-diversity-and-classification-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/patterns-in-life-diversity-and-classification/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c9sci-ch13-earth-as-a-system-energy-matter-and-life",
            title: "13 · Earth as a System: Energy, Matter, and Life",
            subsections: [
              {
                id: "c9sci-ch13-earth-as-a-system-energy-matter-and-life-s1",
                title: "Earth as a System: Energy, Matter, and Life",
                notes: [
                  { id: "c9sci-ch13-earth-as-a-system-energy-matter-and-life-s1-notes", title: "Chapter Notes", file: "notes/class-9-science-placeholders/earth-as-a-system-energy-matter-and-life/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "english",
              title: "English",
              icon: "english",
              ready: true,
tracks: [
          {
            id: "language",
            title: "Language",
            ready: false
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
                title: "01 \u00b7 Beehive — Prose",
                subsections: [
                  {
                    id: "class-9-lit-beehive-prose-core",
                    title: "Beehive — Prose",
                    notes: [ { id: "class-9-lit-beehive-prose-notes", title: "Beehive — Prose", file: "notes/class-9/literature/beehive-prose/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-9-lit-beehive-poetry",
                title: "02 \u00b7 Beehive — Poetry",
                subsections: [
                  {
                    id: "class-9-lit-beehive-poetry-core",
                    title: "Beehive — Poetry",
                    notes: [ { id: "class-9-lit-beehive-poetry-notes", title: "Beehive — Poetry", file: "notes/class-9/literature/beehive-poetry/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "moments",
            title: "Moments (Supplementary Reader)",
            ready: true,
            sections: [
              {
                id: "class-9-lit-moments-supplementary-reader",
                title: "01 \u00b7 Moments (Supplementary Reader)",
                subsections: [
                  {
                    id: "class-9-lit-moments-supplementary-reader-core",
                    title: "Moments (Supplementary Reader)",
                    notes: [ { id: "class-9-lit-moments-supplementary-reader-notes", title: "Moments (Supplementary Reader)", file: "notes/class-9/literature/moments-supplementary-reader/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          }
            ]
          }
              ]
            }
    ]
  },
  {
    id: "class-10",
    label: "X",
    name: "Class 10",
    subjects: [
            {
              id: "maths",
              title: "Mathematics",
              icon: "maths",
              ready: true,
              sections: [
          {
            id: "c10-ch1-real-numbers",
            title: "01 \u00b7 Real Numbers",
            subsections: [
              {
                id: "c10-ch1-real-numbers-s1",
                title: "Real Numbers",
                notes: [
                  { id: "c10-ch1-real-numbers-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/real-numbers/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch2-polynomials",
            title: "02 \u00b7 Polynomials",
            subsections: [
              {
                id: "c10-ch2-polynomials-s1",
                title: "Polynomials",
                notes: [
                  { id: "c10-ch2-polynomials-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/polynomials/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch3-pair-of-linear-equations-in-two-variables",
            title: "03 \u00b7 Pair of Linear Equations in Two Variables",
            subsections: [
              {
                id: "c10-ch3-pair-of-linear-equations-in-two-variables-s1",
                title: "Part 1",
                notes: [
                  { id: "c10-ch3-pair-of-linear-equations-in-two-variables-s1-notes", title: "Part 1", file: "notes/class-10-maths-placeholders/pair-of-linear-equations-in-two-variables/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c10-ch3-pair-of-linear-equations-in-two-variables-s2",
                title: "Part 2",
                notes: [
                  { id: "c10-ch3-pair-of-linear-equations-in-two-variables-s2-notes", title: "Part 2", file: "notes/class-10-maths-placeholders/pair-of-linear-equations-in-two-variables/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch4-quadratic-equations",
            title: "04 \u00b7 Quadratic Equations",
            subsections: [
              {
                id: "c10-ch4-quadratic-equations-s1",
                title: "Quadratic Equations",
                notes: [
                  { id: "c10-ch4-quadratic-equations-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/quadratic-equations/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch5-arithmetic-progressions",
            title: "05 \u00b7 Arithmetic Progressions",
            subsections: [
              {
                id: "c10-ch5-arithmetic-progressions-s1",
                title: "Arithmetic Progressions",
                notes: [
                  { id: "c10-ch5-arithmetic-progressions-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/arithmetic-progressions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch6-triangles",
            title: "06 \u00b7 Triangles",
            subsections: [
              {
                id: "c10-ch6-triangles-s1",
                title: "Triangles",
                notes: [
                  { id: "c10-ch6-triangles-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/triangles/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch7-coordinate-geometry",
            title: "07 \u00b7 Coordinate Geometry",
            subsections: [
              {
                id: "c10-ch7-coordinate-geometry-s1",
                title: "Coordinate Geometry",
                notes: [
                  { id: "c10-ch7-coordinate-geometry-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/coordinate-geometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch8-introduction-to-trigonometry",
            title: "08 \u00b7 Introduction to Trigonometry",
            subsections: [
              {
                id: "c10-ch8-introduction-to-trigonometry-s1",
                title: "Introduction to Trigonometry",
                notes: [
                  { id: "c10-ch8-introduction-to-trigonometry-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/introduction-to-trigonometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch9-some-applications-of-trigonometry",
            title: "09 \u00b7 Some Applications of Trigonometry",
            subsections: [
              {
                id: "c10-ch9-some-applications-of-trigonometry-s1",
                title: "Some Applications of Trigonometry",
                notes: [
                  { id: "c10-ch9-some-applications-of-trigonometry-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/some-applications-of-trigonometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch10-circles",
            title: "10 \u00b7 Circles",
            subsections: [
              {
                id: "c10-ch10-circles-s1",
                title: "Circles",
                notes: [
                  { id: "c10-ch10-circles-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/circles/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch11-areas-related-to-circles",
            title: "11 \u00b7 Areas Related to Circles",
            subsections: [
              {
                id: "c10-ch11-areas-related-to-circles-s1",
                title: "Areas Related to Circles",
                notes: [
                  { id: "c10-ch11-areas-related-to-circles-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/areas-related-to-circles/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch12-surface-areas-and-volumes",
            title: "12 \u00b7 Surface Areas and Volumes",
            subsections: [
              {
                id: "c10-ch12-surface-areas-and-volumes-s1",
                title: "Surface Areas and Volumes",
                notes: [
                  { id: "c10-ch12-surface-areas-and-volumes-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/surface-areas-and-volumes/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch13-statistics",
            title: "13 \u00b7 Statistics",
            subsections: [
              {
                id: "c10-ch13-statistics-s1",
                title: "Statistics",
                notes: [
                  { id: "c10-ch13-statistics-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/statistics/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch14-probability",
            title: "14 \u00b7 Probability",
            subsections: [
              {
                id: "c10-ch14-probability-s1",
                title: "Probability",
                notes: [
                  { id: "c10-ch14-probability-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/probability/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch15-appendix-a1-proofs-in-mathematics",
            title: "15 \u00b7 Appendix A1: Proofs in Mathematics",
            subsections: [
              {
                id: "c10-ch15-appendix-a1-proofs-in-mathematics-s1",
                title: "Part 1",
                notes: [
                  { id: "c10-ch15-appendix-a1-proofs-in-mathematics-s1-notes", title: "Part 1", file: "notes/class-10-maths-placeholders/appendix-a1-proofs-in-mathematics/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c10-ch15-appendix-a1-proofs-in-mathematics-s2",
                title: "Part 2",
                notes: [
                  { id: "c10-ch15-appendix-a1-proofs-in-mathematics-s2-notes", title: "Part 2", file: "notes/class-10-maths-placeholders/appendix-a1-proofs-in-mathematics/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10-ch16-appendix-a2-mathematical-modelling",
            title: "16 \u00b7 Appendix A2: Mathematical Modelling",
            subsections: [
              {
                id: "c10-ch16-appendix-a2-mathematical-modelling-s1",
                title: "Appendix A2: Mathematical Modelling",
                notes: [
                  { id: "c10-ch16-appendix-a2-mathematical-modelling-s1-notes", title: "Chapter Notes", file: "notes/class-10-maths-placeholders/appendix-a2-mathematical-modelling/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "science",
              title: "Science",
              icon: "science",
              ready: true,
              sections: [
          {
            id: "c10sci-ch1-chemical-reactions-and-equations",
            title: "01 · Chemical Reactions and Equations",
            subsections: [
              {
                id: "c10sci-ch1-chemical-reactions-and-equations-s1",
                title: "Chemical Reactions and Equations",
                notes: [
                  { id: "c10sci-ch1-chemical-reactions-and-equations-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/chemical-reactions-and-equations/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch2-acids-bases-and-salts",
            title: "02 · Acids, Bases and Salts",
            subsections: [
              {
                id: "c10sci-ch2-acids-bases-and-salts-s1",
                title: "Acids, Bases and Salts",
                notes: [
                  { id: "c10sci-ch2-acids-bases-and-salts-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/acids-bases-and-salts/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch3-metals-and-non-metals",
            title: "03 · Metals and Non-metals",
            subsections: [
              {
                id: "c10sci-ch3-metals-and-non-metals-s1",
                title: "Metals and Non-metals",
                notes: [
                  { id: "c10sci-ch3-metals-and-non-metals-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/metals-and-non-metals/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch4-carbon-and-its-compounds",
            title: "04 · Carbon and its Compounds",
            subsections: [
              {
                id: "c10sci-ch4-carbon-and-its-compounds-s1",
                title: "Carbon and its Compounds",
                notes: [
                  { id: "c10sci-ch4-carbon-and-its-compounds-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/carbon-and-its-compounds/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch5-life-processes",
            title: "05 · Life Processes",
            subsections: [
              {
                id: "c10sci-ch5-life-processes-s1",
                title: "Life Processes",
                notes: [
                  { id: "c10sci-ch5-life-processes-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/life-processes/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch6-control-and-coordination",
            title: "06 · Control and Coordination",
            subsections: [
              {
                id: "c10sci-ch6-control-and-coordination-s1",
                title: "Control and Coordination",
                notes: [
                  { id: "c10sci-ch6-control-and-coordination-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/control-and-coordination/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch7-how-do-organisms-reproduce",
            title: "07 · How do Organisms Reproduce?",
            subsections: [
              {
                id: "c10sci-ch7-how-do-organisms-reproduce-s1",
                title: "How do Organisms Reproduce?",
                notes: [
                  { id: "c10sci-ch7-how-do-organisms-reproduce-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/how-do-organisms-reproduce/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch8-heredity",
            title: "08 · Heredity",
            subsections: [
              {
                id: "c10sci-ch8-heredity-s1",
                title: "Heredity",
                notes: [
                  { id: "c10sci-ch8-heredity-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/heredity/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch9-light-reflection-and-refraction",
            title: "09 · Light – Reflection and Refraction",
            subsections: [
              {
                id: "c10sci-ch9-light-reflection-and-refraction-s1",
                title: "Light – Reflection and Refraction",
                notes: [
                  { id: "c10sci-ch9-light-reflection-and-refraction-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/light-reflection-and-refraction/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch10-the-human-eye-and-the-colourful-world",
            title: "10 · The Human Eye and the Colourful World",
            subsections: [
              {
                id: "c10sci-ch10-the-human-eye-and-the-colourful-world-s1",
                title: "The Human Eye and the Colourful World",
                notes: [
                  { id: "c10sci-ch10-the-human-eye-and-the-colourful-world-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/the-human-eye-and-the-colourful-world/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch11-electricity",
            title: "11 · Electricity",
            subsections: [
              {
                id: "c10sci-ch11-electricity-s1",
                title: "Electricity",
                notes: [
                  { id: "c10sci-ch11-electricity-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/electricity/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch12-magnetic-effects-of-electric-current",
            title: "12 · Magnetic Effects of Electric Current",
            subsections: [
              {
                id: "c10sci-ch12-magnetic-effects-of-electric-current-s1",
                title: "Magnetic Effects of Electric Current",
                notes: [
                  { id: "c10sci-ch12-magnetic-effects-of-electric-current-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/magnetic-effects-of-electric-current/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c10sci-ch13-our-environment",
            title: "13 · Our Environment",
            subsections: [
              {
                id: "c10sci-ch13-our-environment-s1",
                title: "Our Environment",
                notes: [
                  { id: "c10sci-ch13-our-environment-s1-notes", title: "Chapter Notes", file: "notes/class-10-science-placeholders/our-environment/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
            {
              id: "english",
              title: "English",
              icon: "english",
              ready: true,
tracks: [
          {
            id: "language",
            title: "Language",
            ready: false
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
                title: "01 \u00b7 First Flight — Prose",
                subsections: [
                  {
                    id: "class-10-lit-first-flight-prose-core",
                    title: "First Flight — Prose",
                    notes: [ { id: "class-10-lit-first-flight-prose-notes", title: "First Flight — Prose", file: "notes/class-10/literature/first-flight-prose/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-10-lit-first-flight-poetry",
                title: "02 \u00b7 First Flight — Poetry",
                subsections: [
                  {
                    id: "class-10-lit-first-flight-poetry-core",
                    title: "First Flight — Poetry",
                    notes: [ { id: "class-10-lit-first-flight-poetry-notes", title: "First Flight — Poetry", file: "notes/class-10/literature/first-flight-poetry/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "footprints-without-feet",
            title: "Footprints Without Feet (Supplementary Reader)",
            ready: true,
            sections: [
              {
                id: "class-10-lit-footprints-without-feet-supplementary-reader",
                title: "01 \u00b7 Footprints Without Feet (Supplementary Reader)",
                subsections: [
                  {
                    id: "class-10-lit-footprints-without-feet-supplementary-reader-core",
                    title: "Footprints Without Feet (Supplementary Reader)",
                    notes: [ { id: "class-10-lit-footprints-without-feet-supplementary-reader-notes", title: "Footprints Without Feet (Supplementary Reader)", file: "notes/class-10/literature/footprints-without-feet-supplementary-reader/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          }
            ]
          }
              ]
            }
    ]
  },
  {
    id: "class-11",
    label: "XI",
    name: "Class 11",
    subjects: [
            {
              id: "maths",
              title: "Mathematics",
              icon: "maths",
              ready: true,
              sections: [
          {
            id: "c11-ch1-sets",
            title: "01 \u00b7 Sets",
            subsections: [
              {
                id: "c11-ch1-sets-s1",
                title: "Part 1",
                notes: [
                  { id: "c11-ch1-sets-s1-notes", title: "Part 1", file: "notes/class-11-maths-placeholders/sets/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c11-ch1-sets-s2",
                title: "Part 2",
                notes: [
                  { id: "c11-ch1-sets-s2-notes", title: "Part 2", file: "notes/class-11-maths-placeholders/sets/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "c11-ch1-sets-s3",
                title: "Part 3",
                notes: [
                  { id: "c11-ch1-sets-s3-notes", title: "Part 3", file: "notes/class-11-maths-placeholders/sets/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch2-relations-and-functions",
            title: "02 \u00b7 Relations and Functions",
            subsections: [
              {
                id: "c11-ch2-relations-and-functions-s1",
                title: "Relations and Functions",
                notes: [
                  { id: "c11-ch2-relations-and-functions-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/relations-and-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch3-trigonometric-functions",
            title: "03 \u00b7 Trigonometric Functions",
            subsections: [
              {
                id: "c11-ch3-trigonometric-functions-s1",
                title: "Trigonometric Functions",
                notes: [
                  { id: "c11-ch3-trigonometric-functions-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/trigonometric-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch4-complex-numbers-and-quadratic-equations",
            title: "04 \u00b7 Complex Numbers and Quadratic Equations",
            subsections: [
              {
                id: "c11-ch4-complex-numbers-and-quadratic-equations-s1",
                title: "Part 1",
                notes: [
                  { id: "c11-ch4-complex-numbers-and-quadratic-equations-s1-notes", title: "Part 1", file: "notes/class-11-maths-placeholders/complex-numbers-and-quadratic-equations/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c11-ch4-complex-numbers-and-quadratic-equations-s2",
                title: "Part 2",
                notes: [
                  { id: "c11-ch4-complex-numbers-and-quadratic-equations-s2-notes", title: "Part 2", file: "notes/class-11-maths-placeholders/complex-numbers-and-quadratic-equations/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch5-linear-inequalities",
            title: "05 \u00b7 Linear Inequalities",
            subsections: [
              {
                id: "c11-ch5-linear-inequalities-s1",
                title: "Linear Inequalities",
                notes: [
                  { id: "c11-ch5-linear-inequalities-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/linear-inequalities/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch6-permutations-and-combinations",
            title: "06 \u00b7 Permutations and Combinations",
            subsections: [
              {
                id: "c11-ch6-permutations-and-combinations-s1",
                title: "Part 1",
                notes: [
                  { id: "c11-ch6-permutations-and-combinations-s1-notes", title: "Part 1", file: "notes/class-11-maths-placeholders/permutations-and-combinations/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c11-ch6-permutations-and-combinations-s2",
                title: "Part 2",
                notes: [
                  { id: "c11-ch6-permutations-and-combinations-s2-notes", title: "Part 2", file: "notes/class-11-maths-placeholders/permutations-and-combinations/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch7-binomial-theorem",
            title: "07 \u00b7 Binomial Theorem",
            subsections: [
              {
                id: "c11-ch7-binomial-theorem-s1",
                title: "Binomial Theorem",
                notes: [
                  { id: "c11-ch7-binomial-theorem-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/binomial-theorem/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch8-sequences-and-series",
            title: "08 \u00b7 Sequences and Series",
            subsections: [
              {
                id: "c11-ch8-sequences-and-series-s1",
                title: "Sequences and Series",
                notes: [
                  { id: "c11-ch8-sequences-and-series-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/sequences-and-series/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch9-straight-lines",
            title: "09 \u00b7 Straight Lines",
            subsections: [
              {
                id: "c11-ch9-straight-lines-s1",
                title: "Straight Lines",
                notes: [
                  { id: "c11-ch9-straight-lines-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/straight-lines/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch10-conic-sections",
            title: "10 \u00b7 Conic Sections",
            subsections: [
              {
                id: "c11-ch10-conic-sections-s1",
                title: "Part 1",
                notes: [
                  { id: "c11-ch10-conic-sections-s1-notes", title: "Part 1", file: "notes/class-11-maths-placeholders/conic-sections/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c11-ch10-conic-sections-s2",
                title: "Part 2",
                notes: [
                  { id: "c11-ch10-conic-sections-s2-notes", title: "Part 2", file: "notes/class-11-maths-placeholders/conic-sections/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch11-introduction-to-three-dimensional-geometry",
            title: "11 \u00b7 Introduction to Three Dimensional Geometry",
            subsections: [
              {
                id: "c11-ch11-introduction-to-three-dimensional-geometry-s1",
                title: "Introduction to Three Dimensional Geometry",
                notes: [
                  { id: "c11-ch11-introduction-to-three-dimensional-geometry-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/introduction-to-three-dimensional-geometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch12-limits-and-derivatives",
            title: "12 \u00b7 Limits and Derivatives",
            subsections: [
              {
                id: "c11-ch12-limits-and-derivatives-s1",
                title: "Limits and Derivatives",
                notes: [
                  { id: "c11-ch12-limits-and-derivatives-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/limits-and-derivatives/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch13-statistics",
            title: "13 \u00b7 Statistics",
            subsections: [
              {
                id: "c11-ch13-statistics-s1",
                title: "Statistics",
                notes: [
                  { id: "c11-ch13-statistics-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/statistics/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch14-probability",
            title: "14 \u00b7 Probability",
            subsections: [
              {
                id: "c11-ch14-probability-s1",
                title: "Probability",
                notes: [
                  { id: "c11-ch14-probability-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/probability/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch15-appendix-1-infinite-series",
            title: "15 \u00b7 Appendix 1: Infinite Series",
            subsections: [
              {
                id: "c11-ch15-appendix-1-infinite-series-s1",
                title: "Appendix 1: Infinite Series",
                notes: [
                  { id: "c11-ch15-appendix-1-infinite-series-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/appendix-1-infinite-series/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c11-ch16-appendix-2-mathematical-modelling",
            title: "16 \u00b7 Appendix 2: Mathematical Modelling",
            subsections: [
              {
                id: "c11-ch16-appendix-2-mathematical-modelling-s1",
                title: "Appendix 2: Mathematical Modelling",
                notes: [
                  { id: "c11-ch16-appendix-2-mathematical-modelling-s1-notes", title: "Chapter Notes", file: "notes/class-11-maths-placeholders/appendix-2-mathematical-modelling/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
                        {
              id: "physics",
              title: "Physics",
              icon: "physics",
              ready: true,
              sections: [
                {
                  id: "c11phy-ch1-units-and-measurements",
                  title: "01 · Units and Measurements",
                  subsections: [
                    {
                      id: "c11phy-ch1-units-and-measurements-s1",
                      title: "Units and Measurements",
                      notes: [
                        { id: "c11phy-ch1-units-and-measurements-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/units-and-measurements/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch2-motion-in-a-straight-line",
                  title: "02 · Motion in a Straight Line",
                  subsections: [
                    {
                      id: "c11phy-ch2-motion-in-a-straight-line-s1",
                      title: "Motion in a Straight Line",
                      notes: [
                        { id: "c11phy-ch2-motion-in-a-straight-line-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/motion-in-a-straight-line/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch3-motion-in-a-plane",
                  title: "03 · Motion in a Plane",
                  subsections: [
                    {
                      id: "c11phy-ch3-motion-in-a-plane-s1",
                      title: "Motion in a Plane",
                      notes: [
                        { id: "c11phy-ch3-motion-in-a-plane-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/motion-in-a-plane/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch4-laws-of-motion",
                  title: "04 · Laws of Motion",
                  subsections: [
                    {
                      id: "c11phy-ch4-laws-of-motion-s1",
                      title: "Laws of Motion",
                      notes: [
                        { id: "c11phy-ch4-laws-of-motion-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/laws-of-motion/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch5-work-energy-and-power",
                  title: "05 · Work, Energy and Power",
                  subsections: [
                    {
                      id: "c11phy-ch5-work-energy-and-power-s1",
                      title: "Work, Energy and Power",
                      notes: [
                        { id: "c11phy-ch5-work-energy-and-power-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/work-energy-and-power/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch6-system-of-particles-and-rotational-motion",
                  title: "06 · System of Particles and Rotational Motion",
                  subsections: [
                    {
                      id: "c11phy-ch6-system-of-particles-and-rotational-motion-s1",
                      title: "System of Particles and Rotational Motion",
                      notes: [
                        { id: "c11phy-ch6-system-of-particles-and-rotational-motion-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/system-of-particles-and-rotational-motion/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch7-gravitation",
                  title: "07 · Gravitation",
                  subsections: [
                    {
                      id: "c11phy-ch7-gravitation-s1",
                      title: "Gravitation",
                      notes: [
                        { id: "c11phy-ch7-gravitation-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/gravitation/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch8-mechanical-properties-of-solids",
                  title: "08 · Mechanical Properties of Solids",
                  subsections: [
                    {
                      id: "c11phy-ch8-mechanical-properties-of-solids-s1",
                      title: "Mechanical Properties of Solids",
                      notes: [
                        { id: "c11phy-ch8-mechanical-properties-of-solids-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/mechanical-properties-of-solids/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch9-mechanical-properties-of-fluids",
                  title: "09 · Mechanical Properties of Fluids",
                  subsections: [
                    {
                      id: "c11phy-ch9-mechanical-properties-of-fluids-s1",
                      title: "Mechanical Properties of Fluids",
                      notes: [
                        { id: "c11phy-ch9-mechanical-properties-of-fluids-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/mechanical-properties-of-fluids/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch10-thermal-properties-of-matter",
                  title: "10 · Thermal Properties of Matter",
                  subsections: [
                    {
                      id: "c11phy-ch10-thermal-properties-of-matter-s1",
                      title: "Thermal Properties of Matter",
                      notes: [
                        { id: "c11phy-ch10-thermal-properties-of-matter-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/thermal-properties-of-matter/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch11-thermodynamics",
                  title: "11 · Thermodynamics",
                  subsections: [
                    {
                      id: "c11phy-ch11-thermodynamics-s1",
                      title: "Thermodynamics",
                      notes: [
                        { id: "c11phy-ch11-thermodynamics-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/thermodynamics/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch12-kinetic-theory",
                  title: "12 · Kinetic Theory",
                  subsections: [
                    {
                      id: "c11phy-ch12-kinetic-theory-s1",
                      title: "Kinetic Theory",
                      notes: [
                        { id: "c11phy-ch12-kinetic-theory-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/kinetic-theory/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch13-oscillations",
                  title: "13 · Oscillations",
                  subsections: [
                    {
                      id: "c11phy-ch13-oscillations-s1",
                      title: "Oscillations",
                      notes: [
                        { id: "c11phy-ch13-oscillations-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/oscillations/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11phy-ch14-waves",
                  title: "14 · Waves",
                  subsections: [
                    {
                      id: "c11phy-ch14-waves-s1",
                      title: "Waves",
                      notes: [
                        { id: "c11phy-ch14-waves-s1-notes", title: "Chapter Notes", file: "notes/class-11-physics-placeholders/waves/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
                        {
              id: "chemistry",
              title: "Chemistry",
              icon: "chemistry",
              ready: true,
              sections: [
                {
                  id: "c11chem-ch1-some-basic-concepts-of-chemistry",
                  title: "01 · Some Basic Concepts of Chemistry",
                  subsections: [
                    {
                      id: "c11chem-ch1-some-basic-concepts-of-chemistry-s1",
                      title: "Some Basic Concepts of Chemistry",
                      notes: [
                        { id: "c11chem-ch1-some-basic-concepts-of-chemistry-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/some-basic-concepts-of-chemistry/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch2-structure-of-atom",
                  title: "02 · Structure of Atom",
                  subsections: [
                    {
                      id: "c11chem-ch2-structure-of-atom-s1",
                      title: "Structure of Atom",
                      notes: [
                        { id: "c11chem-ch2-structure-of-atom-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/structure-of-atom/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch3-classification-of-elements-and-periodicity-in-properties",
                  title: "03 · Classification of Elements and Periodicity in Properties",
                  subsections: [
                    {
                      id: "c11chem-ch3-classification-of-elements-and-periodicity-in-properties-s1",
                      title: "Classification of Elements and Periodicity in Properties",
                      notes: [
                        { id: "c11chem-ch3-classification-of-elements-and-periodicity-in-properties-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/classification-of-elements-and-periodicity-in-properties/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch4-chemical-bonding-and-molecular-structure",
                  title: "04 · Chemical Bonding and Molecular Structure",
                  subsections: [
                    {
                      id: "c11chem-ch4-chemical-bonding-and-molecular-structure-s1",
                      title: "Chemical Bonding and Molecular Structure",
                      notes: [
                        { id: "c11chem-ch4-chemical-bonding-and-molecular-structure-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/chemical-bonding-and-molecular-structure/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch5-thermodynamics",
                  title: "05 · Thermodynamics",
                  subsections: [
                    {
                      id: "c11chem-ch5-thermodynamics-s1",
                      title: "Thermodynamics",
                      notes: [
                        { id: "c11chem-ch5-thermodynamics-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/thermodynamics/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch6-equilibrium",
                  title: "06 · Equilibrium",
                  subsections: [
                    {
                      id: "c11chem-ch6-equilibrium-s1",
                      title: "Equilibrium",
                      notes: [
                        { id: "c11chem-ch6-equilibrium-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/equilibrium/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch7-redox-reactions",
                  title: "07 · Redox Reactions",
                  subsections: [
                    {
                      id: "c11chem-ch7-redox-reactions-s1",
                      title: "Redox Reactions",
                      notes: [
                        { id: "c11chem-ch7-redox-reactions-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/redox-reactions/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch8-organic-chemistry-some-basic-principles-and-techniques",
                  title: "08 · Organic Chemistry — Some Basic Principles and Techniques",
                  subsections: [
                    {
                      id: "c11chem-ch8-organic-chemistry-some-basic-principles-and-techniques-s1",
                      title: "Organic Chemistry — Some Basic Principles and Techniques",
                      notes: [
                        { id: "c11chem-ch8-organic-chemistry-some-basic-principles-and-techniques-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/organic-chemistry-some-basic-principles-and-techniques/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11chem-ch9-hydrocarbons",
                  title: "09 · Hydrocarbons",
                  subsections: [
                    {
                      id: "c11chem-ch9-hydrocarbons-s1",
                      title: "Hydrocarbons",
                      notes: [
                        { id: "c11chem-ch9-hydrocarbons-s1-notes", title: "Chapter Notes", file: "notes/class-11-chemistry-placeholders/hydrocarbons/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
                        {
              id: "biology",
              title: "Biology",
              icon: "biology",
              ready: true,
              sections: [
                {
                  id: "c11bio-ch1-the-living-world",
                  title: "01 · The Living World",
                  subsections: [
                    {
                      id: "c11bio-ch1-the-living-world-s1",
                      title: "The Living World",
                      notes: [
                        { id: "c11bio-ch1-the-living-world-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/the-living-world/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch2-biological-classification",
                  title: "02 · Biological Classification",
                  subsections: [
                    {
                      id: "c11bio-ch2-biological-classification-s1",
                      title: "Biological Classification",
                      notes: [
                        { id: "c11bio-ch2-biological-classification-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/biological-classification/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch3-plant-kingdom",
                  title: "03 · Plant Kingdom",
                  subsections: [
                    {
                      id: "c11bio-ch3-plant-kingdom-s1",
                      title: "Plant Kingdom",
                      notes: [
                        { id: "c11bio-ch3-plant-kingdom-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/plant-kingdom/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch4-animal-kingdom",
                  title: "04 · Animal Kingdom",
                  subsections: [
                    {
                      id: "c11bio-ch4-animal-kingdom-s1",
                      title: "Animal Kingdom",
                      notes: [
                        { id: "c11bio-ch4-animal-kingdom-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/animal-kingdom/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch5-morphology-of-flowering-plants",
                  title: "05 · Morphology of Flowering Plants",
                  subsections: [
                    {
                      id: "c11bio-ch5-morphology-of-flowering-plants-s1",
                      title: "Morphology of Flowering Plants",
                      notes: [
                        { id: "c11bio-ch5-morphology-of-flowering-plants-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/morphology-of-flowering-plants/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch6-anatomy-of-flowering-plants",
                  title: "06 · Anatomy of Flowering Plants",
                  subsections: [
                    {
                      id: "c11bio-ch6-anatomy-of-flowering-plants-s1",
                      title: "Anatomy of Flowering Plants",
                      notes: [
                        { id: "c11bio-ch6-anatomy-of-flowering-plants-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/anatomy-of-flowering-plants/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch7-structural-organisation-in-animals",
                  title: "07 · Structural Organisation in Animals",
                  subsections: [
                    {
                      id: "c11bio-ch7-structural-organisation-in-animals-s1",
                      title: "Structural Organisation in Animals",
                      notes: [
                        { id: "c11bio-ch7-structural-organisation-in-animals-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/structural-organisation-in-animals/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch8-cell-the-unit-of-life",
                  title: "08 · Cell: The Unit of Life",
                  subsections: [
                    {
                      id: "c11bio-ch8-cell-the-unit-of-life-s1",
                      title: "Cell: The Unit of Life",
                      notes: [
                        { id: "c11bio-ch8-cell-the-unit-of-life-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/cell-the-unit-of-life/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch9-biomolecules",
                  title: "09 · Biomolecules",
                  subsections: [
                    {
                      id: "c11bio-ch9-biomolecules-s1",
                      title: "Biomolecules",
                      notes: [
                        { id: "c11bio-ch9-biomolecules-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/biomolecules/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch10-cell-cycle-and-cell-division",
                  title: "10 · Cell Cycle and Cell Division",
                  subsections: [
                    {
                      id: "c11bio-ch10-cell-cycle-and-cell-division-s1",
                      title: "Cell Cycle and Cell Division",
                      notes: [
                        { id: "c11bio-ch10-cell-cycle-and-cell-division-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/cell-cycle-and-cell-division/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch11-photosynthesis-in-higher-plants",
                  title: "11 · Photosynthesis in Higher Plants",
                  subsections: [
                    {
                      id: "c11bio-ch11-photosynthesis-in-higher-plants-s1",
                      title: "Photosynthesis in Higher Plants",
                      notes: [
                        { id: "c11bio-ch11-photosynthesis-in-higher-plants-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/photosynthesis-in-higher-plants/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch12-respiration-in-plants",
                  title: "12 · Respiration in Plants",
                  subsections: [
                    {
                      id: "c11bio-ch12-respiration-in-plants-s1",
                      title: "Respiration in Plants",
                      notes: [
                        { id: "c11bio-ch12-respiration-in-plants-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/respiration-in-plants/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch13-plant-growth-and-development",
                  title: "13 · Plant Growth and Development",
                  subsections: [
                    {
                      id: "c11bio-ch13-plant-growth-and-development-s1",
                      title: "Plant Growth and Development",
                      notes: [
                        { id: "c11bio-ch13-plant-growth-and-development-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/plant-growth-and-development/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch14-breathing-and-exchange-of-gases",
                  title: "14 · Breathing and Exchange of Gases",
                  subsections: [
                    {
                      id: "c11bio-ch14-breathing-and-exchange-of-gases-s1",
                      title: "Breathing and Exchange of Gases",
                      notes: [
                        { id: "c11bio-ch14-breathing-and-exchange-of-gases-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/breathing-and-exchange-of-gases/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch15-body-fluids-and-circulation",
                  title: "15 · Body Fluids and Circulation",
                  subsections: [
                    {
                      id: "c11bio-ch15-body-fluids-and-circulation-s1",
                      title: "Body Fluids and Circulation",
                      notes: [
                        { id: "c11bio-ch15-body-fluids-and-circulation-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/body-fluids-and-circulation/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch16-excretory-products-and-their-elimination",
                  title: "16 · Excretory Products and their Elimination",
                  subsections: [
                    {
                      id: "c11bio-ch16-excretory-products-and-their-elimination-s1",
                      title: "Excretory Products and their Elimination",
                      notes: [
                        { id: "c11bio-ch16-excretory-products-and-their-elimination-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/excretory-products-and-their-elimination/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch17-locomotion-and-movement",
                  title: "17 · Locomotion and Movement",
                  subsections: [
                    {
                      id: "c11bio-ch17-locomotion-and-movement-s1",
                      title: "Locomotion and Movement",
                      notes: [
                        { id: "c11bio-ch17-locomotion-and-movement-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/locomotion-and-movement/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch18-neural-control-and-coordination",
                  title: "18 · Neural Control and Coordination",
                  subsections: [
                    {
                      id: "c11bio-ch18-neural-control-and-coordination-s1",
                      title: "Neural Control and Coordination",
                      notes: [
                        { id: "c11bio-ch18-neural-control-and-coordination-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/neural-control-and-coordination/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11bio-ch19-chemical-coordination-and-integration",
                  title: "19 · Chemical Coordination and Integration",
                  subsections: [
                    {
                      id: "c11bio-ch19-chemical-coordination-and-integration-s1",
                      title: "Chemical Coordination and Integration",
                      notes: [
                        { id: "c11bio-ch19-chemical-coordination-and-integration-s1-notes", title: "Chapter Notes", file: "notes/class-11-biology-placeholders/chemical-coordination-and-integration/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
            {
              id: "computer",
              title: "Computer Science",
              icon: "computer",
              ready: true,
              sections: [
                {
                  id: "c11cs-ch1-computer-system",
                  title: "01 · Computer System",
                  subsections: [
                    {
                      id: "c11cs-ch1-computer-system-s1",
                      title: "Computer System",
                      notes: [
                        { id: "c11cs-ch1-computer-system-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/computer-system/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch2-encoding-schemes-and-number-system",
                  title: "02 · Encoding Schemes and Number System",
                  subsections: [
                    {
                      id: "c11cs-ch2-encoding-schemes-and-number-system-s1",
                      title: "Encoding Schemes and Number System",
                      notes: [
                        { id: "c11cs-ch2-encoding-schemes-and-number-system-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/encoding-schemes-and-number-system/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch3-emerging-trends",
                  title: "03 · Emerging Trends",
                  subsections: [
                    {
                      id: "c11cs-ch3-emerging-trends-s1",
                      title: "Emerging Trends",
                      notes: [
                        { id: "c11cs-ch3-emerging-trends-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/emerging-trends/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch4-introduction-to-problem-solving",
                  title: "04 · Introduction to Problem Solving",
                  subsections: [
                    {
                      id: "c11cs-ch4-introduction-to-problem-solving-s1",
                      title: "Introduction to Problem Solving",
                      notes: [
                        { id: "c11cs-ch4-introduction-to-problem-solving-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/introduction-to-problem-solving/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch5-getting-started-with-python",
                  title: "05 · Getting Started with Python",
                  subsections: [
                    {
                      id: "c11cs-ch5-getting-started-with-python-s1",
                      title: "Getting Started with Python",
                      notes: [
                        { id: "c11cs-ch5-getting-started-with-python-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/getting-started-with-python/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch6-flow-of-control",
                  title: "06 · Flow of Control",
                  subsections: [
                    {
                      id: "c11cs-ch6-flow-of-control-s1",
                      title: "Flow of Control",
                      notes: [
                        { id: "c11cs-ch6-flow-of-control-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/flow-of-control/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch7-functions",
                  title: "07 · Functions",
                  subsections: [
                    {
                      id: "c11cs-ch7-functions-s1",
                      title: "Functions",
                      notes: [
                        { id: "c11cs-ch7-functions-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/functions/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch8-strings",
                  title: "08 · Strings",
                  subsections: [
                    {
                      id: "c11cs-ch8-strings-s1",
                      title: "Strings",
                      notes: [
                        { id: "c11cs-ch8-strings-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/strings/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch9-lists",
                  title: "09 · Lists",
                  subsections: [
                    {
                      id: "c11cs-ch9-lists-s1",
                      title: "Lists",
                      notes: [
                        { id: "c11cs-ch9-lists-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/lists/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch10-tuples-and-dictionaries",
                  title: "10 · Tuples and Dictionaries",
                  subsections: [
                    {
                      id: "c11cs-ch10-tuples-and-dictionaries-s1",
                      title: "Tuples and Dictionaries",
                      notes: [
                        { id: "c11cs-ch10-tuples-and-dictionaries-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/tuples-and-dictionaries/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c11cs-ch11-societal-impact",
                  title: "11 · Societal Impact",
                  subsections: [
                    {
                      id: "c11cs-ch11-societal-impact-s1",
                      title: "Societal Impact",
                      notes: [
                        { id: "c11cs-ch11-societal-impact-s1-notes", title: "Chapter Notes", file: "notes/class-11-computer-placeholders/societal-impact/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
            {
              id: "english",
              title: "English",
              icon: "english",
              ready: true,
              tracks: [
          {
            id: "language",
            title: "Language",
            ready: false
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
                title: "01 \u00b7 Hornbill \u2014 Prose",
                subsections: [
                  {
                    id: "class-11-lit-hornbill-prose-core",
                    title: "Hornbill \u2014 Prose",
                    notes: [ { id: "class-11-lit-hornbill-prose-notes", title: "Hornbill \u2014 Prose", file: "notes/class-11/literature/hornbill-prose/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-11-lit-hornbill-poetry",
                title: "02 \u00b7 Hornbill \u2014 Poetry",
                subsections: [
                  {
                    id: "class-11-lit-hornbill-poetry-core",
                    title: "Hornbill \u2014 Poetry",
                    notes: [ { id: "class-11-lit-hornbill-poetry-notes", title: "Hornbill \u2014 Poetry", file: "notes/class-11/literature/hornbill-poetry/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "snapshots",
            title: "Snapshots (Supplementary Reader)",
            ready: true,
            sections: [
              {
                id: "class-11-lit-snapshots-supplementary-reader",
                title: "01 \u00b7 Snapshots (Supplementary Reader)",
                subsections: [
                  {
                    id: "class-11-lit-snapshots-supplementary-reader-core",
                    title: "Snapshots (Supplementary Reader)",
                    notes: [ { id: "class-11-lit-snapshots-supplementary-reader-notes", title: "Snapshots (Supplementary Reader)", file: "notes/class-11/literature/snapshots-supplementary-reader/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "elective",
            title: "Woven Words (Elective)",
            ready: true,
            sections: [
              {
                id: "class-11-elective-short-stories",
                title: "01 \u00b7 Woven Words \u2014 Short Stories",
                subsections: [
                  {
                    id: "class-11-elective-short-stories-core",
                    title: "Woven Words \u2014 Short Stories",
                    notes: [ { id: "class-11-elective-short-stories-notes", title: "Woven Words \u2014 Short Stories", file: "notes/class-11/elective/short-stories/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-11-elective-poetry",
                title: "02 \u00b7 Woven Words \u2014 Poetry",
                subsections: [
                  {
                    id: "class-11-elective-poetry-core",
                    title: "Woven Words \u2014 Poetry",
                    notes: [ { id: "class-11-elective-poetry-notes", title: "Woven Words \u2014 Poetry", file: "notes/class-11/elective/poetry/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-11-elective-essays",
                title: "03 \u00b7 Woven Words \u2014 Essays",
                subsections: [
                  {
                    id: "class-11-elective-essays-core",
                    title: "Woven Words \u2014 Essays",
                    notes: [ { id: "class-11-elective-essays-notes", title: "Woven Words \u2014 Essays", file: "notes/class-11/elective/essays/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          }
              ]
          }
              ]
            }
    ]
  },
  {
    id: "class-12",
    label: "XII",
    name: "Class 12",
    subjects: [
            {
              id: "maths",
              title: "Mathematics",
              icon: "maths",
              ready: true,
              sections: [
          {
            id: "c12-ch1-relations-and-functions",
            title: "01 \u00b7 Relations and Functions",
            subsections: [
              {
                id: "c12-ch1-relations-and-functions-s1",
                title: "Relations and Functions",
                notes: [
                  { id: "c12-ch1-relations-and-functions-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/relations-and-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch2-inverse-trigonometric-functions",
            title: "02 \u00b7 Inverse Trigonometric Functions",
            subsections: [
              {
                id: "c12-ch2-inverse-trigonometric-functions-s1",
                title: "Inverse Trigonometric Functions",
                notes: [
                  { id: "c12-ch2-inverse-trigonometric-functions-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/inverse-trigonometric-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch3-matrices",
            title: "03 \u00b7 Matrices",
            subsections: [
              {
                id: "c12-ch3-matrices-s1",
                title: "Part 1",
                notes: [
                  { id: "c12-ch3-matrices-s1-notes", title: "Part 1", file: "notes/class-12-maths-placeholders/matrices/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch3-matrices-s2",
                title: "Part 2",
                notes: [
                  { id: "c12-ch3-matrices-s2-notes", title: "Part 2", file: "notes/class-12-maths-placeholders/matrices/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch4-determinants",
            title: "04 \u00b7 Determinants",
            subsections: [
              {
                id: "c12-ch4-determinants-s1",
                title: "Part 1",
                notes: [
                  { id: "c12-ch4-determinants-s1-notes", title: "Part 1", file: "notes/class-12-maths-placeholders/determinants/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch4-determinants-s2",
                title: "Part 2",
                notes: [
                  { id: "c12-ch4-determinants-s2-notes", title: "Part 2", file: "notes/class-12-maths-placeholders/determinants/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch5-continuity-and-differentiability",
            title: "05 \u00b7 Continuity and Differentiability",
            subsections: [
              {
                id: "c12-ch5-continuity-and-differentiability-s1",
                title: "Part 1",
                notes: [
                  { id: "c12-ch5-continuity-and-differentiability-s1-notes", title: "Part 1", file: "notes/class-12-maths-placeholders/continuity-and-differentiability/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch5-continuity-and-differentiability-s2",
                title: "Part 2",
                notes: [
                  { id: "c12-ch5-continuity-and-differentiability-s2-notes", title: "Part 2", file: "notes/class-12-maths-placeholders/continuity-and-differentiability/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch6-application-of-derivatives",
            title: "06 \u00b7 Application of Derivatives",
            subsections: [
              {
                id: "c12-ch6-application-of-derivatives-s1",
                title: "Application of Derivatives",
                notes: [
                  { id: "c12-ch6-application-of-derivatives-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/application-of-derivatives/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch7-integrals",
            title: "07 \u00b7 Integrals",
            subsections: [
              {
                id: "c12-ch7-integrals-s1",
                title: "Part 1",
                notes: [
                  { id: "c12-ch7-integrals-s1-notes", title: "Part 1", file: "notes/class-12-maths-placeholders/integrals/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch7-integrals-s2",
                title: "Part 2",
                notes: [
                  { id: "c12-ch7-integrals-s2-notes", title: "Part 2", file: "notes/class-12-maths-placeholders/integrals/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch7-integrals-s3",
                title: "Part 3",
                notes: [
                  { id: "c12-ch7-integrals-s3-notes", title: "Part 3", file: "notes/class-12-maths-placeholders/integrals/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch8-application-of-integrals",
            title: "08 \u00b7 Application of Integrals",
            subsections: [
              {
                id: "c12-ch8-application-of-integrals-s1",
                title: "Application of Integrals",
                notes: [
                  { id: "c12-ch8-application-of-integrals-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/application-of-integrals/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch9-differential-equations",
            title: "09 \u00b7 Differential Equations",
            subsections: [
              {
                id: "c12-ch9-differential-equations-s1",
                title: "Differential Equations",
                notes: [
                  { id: "c12-ch9-differential-equations-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/differential-equations/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch10-vector-algebra",
            title: "10 \u00b7 Vector Algebra",
            subsections: [
              {
                id: "c12-ch10-vector-algebra-s1",
                title: "Part 1",
                notes: [
                  { id: "c12-ch10-vector-algebra-s1-notes", title: "Part 1", file: "notes/class-12-maths-placeholders/vector-algebra/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "c12-ch10-vector-algebra-s2",
                title: "Part 2",
                notes: [
                  { id: "c12-ch10-vector-algebra-s2-notes", title: "Part 2", file: "notes/class-12-maths-placeholders/vector-algebra/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch11-three-dimensional-geometry",
            title: "11 \u00b7 Three Dimensional Geometry",
            subsections: [
              {
                id: "c12-ch11-three-dimensional-geometry-s1",
                title: "Three Dimensional Geometry",
                notes: [
                  { id: "c12-ch11-three-dimensional-geometry-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/three-dimensional-geometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch12-linear-programming",
            title: "12 \u00b7 Linear Programming",
            subsections: [
              {
                id: "c12-ch12-linear-programming-s1",
                title: "Linear Programming",
                notes: [
                  { id: "c12-ch12-linear-programming-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/linear-programming/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch13-probability",
            title: "13 \u00b7 Probability",
            subsections: [
              {
                id: "c12-ch13-probability-s1",
                title: "Probability",
                notes: [
                  { id: "c12-ch13-probability-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/probability/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch14-appendix-1-proofs-in-mathematics",
            title: "14 \u00b7 Appendix 1: Proofs in Mathematics",
            subsections: [
              {
                id: "c12-ch14-appendix-1-proofs-in-mathematics-s1",
                title: "Appendix 1: Proofs in Mathematics",
                notes: [
                  { id: "c12-ch14-appendix-1-proofs-in-mathematics-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/appendix-1-proofs-in-mathematics/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "c12-ch15-appendix-2-mathematical-modelling",
            title: "15 \u00b7 Appendix 2: Mathematical Modelling",
            subsections: [
              {
                id: "c12-ch15-appendix-2-mathematical-modelling-s1",
                title: "Appendix 2: Mathematical Modelling",
                notes: [
                  { id: "c12-ch15-appendix-2-mathematical-modelling-s1-notes", title: "Chapter Notes", file: "notes/class-12-maths-placeholders/appendix-2-mathematical-modelling/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
              ]
            },
                        {
              id: "physics",
              title: "Physics",
              icon: "physics",
              ready: true,
              sections: [
                {
                  id: "c12phy-ch1-electric-charges-and-fields",
                  title: "01 · Electric Charges and Fields",
                  subsections: [
                    {
                      id: "c12phy-ch1-electric-charges-and-fields-s1",
                      title: "Electric Charges and Fields",
                      notes: [
                        { id: "c12phy-ch1-electric-charges-and-fields-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/electric-charges-and-fields/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch2-electrostatic-potential-and-capacitance",
                  title: "02 · Electrostatic Potential and Capacitance",
                  subsections: [
                    {
                      id: "c12phy-ch2-electrostatic-potential-and-capacitance-s1",
                      title: "Electrostatic Potential and Capacitance",
                      notes: [
                        { id: "c12phy-ch2-electrostatic-potential-and-capacitance-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/electrostatic-potential-and-capacitance/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch3-current-electricity",
                  title: "03 · Current Electricity",
                  subsections: [
                    {
                      id: "c12phy-ch3-current-electricity-s1",
                      title: "Current Electricity",
                      notes: [
                        { id: "c12phy-ch3-current-electricity-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/current-electricity/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch4-moving-charges-and-magnetism",
                  title: "04 · Moving Charges and Magnetism",
                  subsections: [
                    {
                      id: "c12phy-ch4-moving-charges-and-magnetism-s1",
                      title: "Moving Charges and Magnetism",
                      notes: [
                        { id: "c12phy-ch4-moving-charges-and-magnetism-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/moving-charges-and-magnetism/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch5-magnetism-and-matter",
                  title: "05 · Magnetism and Matter",
                  subsections: [
                    {
                      id: "c12phy-ch5-magnetism-and-matter-s1",
                      title: "Magnetism and Matter",
                      notes: [
                        { id: "c12phy-ch5-magnetism-and-matter-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/magnetism-and-matter/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch6-electromagnetic-induction",
                  title: "06 · Electromagnetic Induction",
                  subsections: [
                    {
                      id: "c12phy-ch6-electromagnetic-induction-s1",
                      title: "Electromagnetic Induction",
                      notes: [
                        { id: "c12phy-ch6-electromagnetic-induction-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/electromagnetic-induction/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch7-alternating-current",
                  title: "07 · Alternating Current",
                  subsections: [
                    {
                      id: "c12phy-ch7-alternating-current-s1",
                      title: "Alternating Current",
                      notes: [
                        { id: "c12phy-ch7-alternating-current-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/alternating-current/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch8-electromagnetic-waves",
                  title: "08 · Electromagnetic Waves",
                  subsections: [
                    {
                      id: "c12phy-ch8-electromagnetic-waves-s1",
                      title: "Electromagnetic Waves",
                      notes: [
                        { id: "c12phy-ch8-electromagnetic-waves-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/electromagnetic-waves/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch9-ray-optics-and-optical-instruments",
                  title: "09 · Ray Optics and Optical Instruments",
                  subsections: [
                    {
                      id: "c12phy-ch9-ray-optics-and-optical-instruments-s1",
                      title: "Ray Optics and Optical Instruments",
                      notes: [
                        { id: "c12phy-ch9-ray-optics-and-optical-instruments-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/ray-optics-and-optical-instruments/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch10-wave-optics",
                  title: "10 · Wave Optics",
                  subsections: [
                    {
                      id: "c12phy-ch10-wave-optics-s1",
                      title: "Wave Optics",
                      notes: [
                        { id: "c12phy-ch10-wave-optics-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/wave-optics/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch11-dual-nature-of-radiation-and-matter",
                  title: "11 · Dual Nature of Radiation and Matter",
                  subsections: [
                    {
                      id: "c12phy-ch11-dual-nature-of-radiation-and-matter-s1",
                      title: "Dual Nature of Radiation and Matter",
                      notes: [
                        { id: "c12phy-ch11-dual-nature-of-radiation-and-matter-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/dual-nature-of-radiation-and-matter/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch12-atoms",
                  title: "12 · Atoms",
                  subsections: [
                    {
                      id: "c12phy-ch12-atoms-s1",
                      title: "Atoms",
                      notes: [
                        { id: "c12phy-ch12-atoms-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/atoms/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch13-nuclei",
                  title: "13 · Nuclei",
                  subsections: [
                    {
                      id: "c12phy-ch13-nuclei-s1",
                      title: "Nuclei",
                      notes: [
                        { id: "c12phy-ch13-nuclei-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/nuclei/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12phy-ch14-semiconductor-electronics-materials-devices-and-simple-circuits",
                  title: "14 · Semiconductor Electronics: Materials, Devices and Simple Circuits",
                  subsections: [
                    {
                      id: "c12phy-ch14-semiconductor-electronics-materials-devices-and-simple-circuits-s1",
                      title: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
                      notes: [
                        { id: "c12phy-ch14-semiconductor-electronics-materials-devices-and-simple-circuits-s1-notes", title: "Chapter Notes", file: "notes/class-12-physics-placeholders/semiconductor-electronics-materials-devices-and-simple-circuits/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
                        {
              id: "chemistry",
              title: "Chemistry",
              icon: "chemistry",
              ready: true,
              sections: [
                {
                  id: "c12chem-ch1-solutions",
                  title: "01 · Solutions",
                  subsections: [
                    {
                      id: "c12chem-ch1-solutions-s1",
                      title: "Solutions",
                      notes: [
                        { id: "c12chem-ch1-solutions-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/solutions/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch2-electrochemistry",
                  title: "02 · Electrochemistry",
                  subsections: [
                    {
                      id: "c12chem-ch2-electrochemistry-s1",
                      title: "Electrochemistry",
                      notes: [
                        { id: "c12chem-ch2-electrochemistry-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/electrochemistry/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch3-chemical-kinetics",
                  title: "03 · Chemical Kinetics",
                  subsections: [
                    {
                      id: "c12chem-ch3-chemical-kinetics-s1",
                      title: "Chemical Kinetics",
                      notes: [
                        { id: "c12chem-ch3-chemical-kinetics-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/chemical-kinetics/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch4-the-d-and-f-block-elements",
                  title: "04 · The d- and f-Block Elements",
                  subsections: [
                    {
                      id: "c12chem-ch4-the-d-and-f-block-elements-s1",
                      title: "The d- and f-Block Elements",
                      notes: [
                        { id: "c12chem-ch4-the-d-and-f-block-elements-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/the-d-and-f-block-elements/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch5-coordination-compounds",
                  title: "05 · Coordination Compounds",
                  subsections: [
                    {
                      id: "c12chem-ch5-coordination-compounds-s1",
                      title: "Coordination Compounds",
                      notes: [
                        { id: "c12chem-ch5-coordination-compounds-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/coordination-compounds/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch6-haloalkanes-and-haloarenes",
                  title: "06 · Haloalkanes and Haloarenes",
                  subsections: [
                    {
                      id: "c12chem-ch6-haloalkanes-and-haloarenes-s1",
                      title: "Haloalkanes and Haloarenes",
                      notes: [
                        { id: "c12chem-ch6-haloalkanes-and-haloarenes-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/haloalkanes-and-haloarenes/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch7-alcohols-phenols-and-ethers",
                  title: "07 · Alcohols, Phenols and Ethers",
                  subsections: [
                    {
                      id: "c12chem-ch7-alcohols-phenols-and-ethers-s1",
                      title: "Alcohols, Phenols and Ethers",
                      notes: [
                        { id: "c12chem-ch7-alcohols-phenols-and-ethers-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/alcohols-phenols-and-ethers/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch8-aldehydes-ketones-and-carboxylic-acids",
                  title: "08 · Aldehydes, Ketones and Carboxylic Acids",
                  subsections: [
                    {
                      id: "c12chem-ch8-aldehydes-ketones-and-carboxylic-acids-s1",
                      title: "Aldehydes, Ketones and Carboxylic Acids",
                      notes: [
                        { id: "c12chem-ch8-aldehydes-ketones-and-carboxylic-acids-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/aldehydes-ketones-and-carboxylic-acids/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch9-amines",
                  title: "09 · Amines",
                  subsections: [
                    {
                      id: "c12chem-ch9-amines-s1",
                      title: "Amines",
                      notes: [
                        { id: "c12chem-ch9-amines-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/amines/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12chem-ch10-biomolecules",
                  title: "10 · Biomolecules",
                  subsections: [
                    {
                      id: "c12chem-ch10-biomolecules-s1",
                      title: "Biomolecules",
                      notes: [
                        { id: "c12chem-ch10-biomolecules-s1-notes", title: "Chapter Notes", file: "notes/class-12-chemistry-placeholders/biomolecules/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
                        {
              id: "biology",
              title: "Biology",
              icon: "biology",
              ready: true,
              sections: [
                {
                  id: "c12bio-ch1-sexual-reproduction-in-flowering-plants",
                  title: "01 · Sexual Reproduction in Flowering Plants",
                  subsections: [
                    {
                      id: "c12bio-ch1-sexual-reproduction-in-flowering-plants-s1",
                      title: "Sexual Reproduction in Flowering Plants",
                      notes: [
                        { id: "c12bio-ch1-sexual-reproduction-in-flowering-plants-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/sexual-reproduction-in-flowering-plants/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch2-human-reproduction",
                  title: "02 · Human Reproduction",
                  subsections: [
                    {
                      id: "c12bio-ch2-human-reproduction-s1",
                      title: "Human Reproduction",
                      notes: [
                        { id: "c12bio-ch2-human-reproduction-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/human-reproduction/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch3-reproductive-health",
                  title: "03 · Reproductive Health",
                  subsections: [
                    {
                      id: "c12bio-ch3-reproductive-health-s1",
                      title: "Reproductive Health",
                      notes: [
                        { id: "c12bio-ch3-reproductive-health-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/reproductive-health/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch4-principles-of-inheritance-and-variation",
                  title: "04 · Principles of Inheritance and Variation",
                  subsections: [
                    {
                      id: "c12bio-ch4-principles-of-inheritance-and-variation-s1",
                      title: "Principles of Inheritance and Variation",
                      notes: [
                        { id: "c12bio-ch4-principles-of-inheritance-and-variation-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/principles-of-inheritance-and-variation/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch5-molecular-basis-of-inheritance",
                  title: "05 · Molecular Basis of Inheritance",
                  subsections: [
                    {
                      id: "c12bio-ch5-molecular-basis-of-inheritance-s1",
                      title: "Molecular Basis of Inheritance",
                      notes: [
                        { id: "c12bio-ch5-molecular-basis-of-inheritance-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/molecular-basis-of-inheritance/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch6-evolution",
                  title: "06 · Evolution",
                  subsections: [
                    {
                      id: "c12bio-ch6-evolution-s1",
                      title: "Evolution",
                      notes: [
                        { id: "c12bio-ch6-evolution-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/evolution/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch7-human-health-and-disease",
                  title: "07 · Human Health and Disease",
                  subsections: [
                    {
                      id: "c12bio-ch7-human-health-and-disease-s1",
                      title: "Human Health and Disease",
                      notes: [
                        { id: "c12bio-ch7-human-health-and-disease-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/human-health-and-disease/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch8-microbes-in-human-welfare",
                  title: "08 · Microbes in Human Welfare",
                  subsections: [
                    {
                      id: "c12bio-ch8-microbes-in-human-welfare-s1",
                      title: "Microbes in Human Welfare",
                      notes: [
                        { id: "c12bio-ch8-microbes-in-human-welfare-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/microbes-in-human-welfare/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch9-biotechnology-principles-and-processes",
                  title: "09 · Biotechnology: Principles and Processes",
                  subsections: [
                    {
                      id: "c12bio-ch9-biotechnology-principles-and-processes-s1",
                      title: "Biotechnology: Principles and Processes",
                      notes: [
                        { id: "c12bio-ch9-biotechnology-principles-and-processes-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/biotechnology-principles-and-processes/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch10-biotechnology-and-its-applications",
                  title: "10 · Biotechnology and its Applications",
                  subsections: [
                    {
                      id: "c12bio-ch10-biotechnology-and-its-applications-s1",
                      title: "Biotechnology and its Applications",
                      notes: [
                        { id: "c12bio-ch10-biotechnology-and-its-applications-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/biotechnology-and-its-applications/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch11-organisms-and-populations",
                  title: "11 · Organisms and Populations",
                  subsections: [
                    {
                      id: "c12bio-ch11-organisms-and-populations-s1",
                      title: "Organisms and Populations",
                      notes: [
                        { id: "c12bio-ch11-organisms-and-populations-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/organisms-and-populations/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch12-ecosystem",
                  title: "12 · Ecosystem",
                  subsections: [
                    {
                      id: "c12bio-ch12-ecosystem-s1",
                      title: "Ecosystem",
                      notes: [
                        { id: "c12bio-ch12-ecosystem-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/ecosystem/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12bio-ch13-biodiversity-and-conservation",
                  title: "13 · Biodiversity and Conservation",
                  subsections: [
                    {
                      id: "c12bio-ch13-biodiversity-and-conservation-s1",
                      title: "Biodiversity and Conservation",
                      notes: [
                        { id: "c12bio-ch13-biodiversity-and-conservation-s1-notes", title: "Chapter Notes", file: "notes/class-12-biology-placeholders/biodiversity-and-conservation/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
            {
              id: "computer",
              title: "Computer Science",
              icon: "computer",
              ready: true,
              sections: [
                {
                  id: "c12cs-ch1-exception-handling-in-python",
                  title: "01 · Exception Handling in Python",
                  subsections: [
                    {
                      id: "c12cs-ch1-exception-handling-in-python-s1",
                      title: "Exception Handling in Python",
                      notes: [
                        { id: "c12cs-ch1-exception-handling-in-python-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/exception-handling-in-python/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch2-file-handling-in-python",
                  title: "02 · File Handling in Python",
                  subsections: [
                    {
                      id: "c12cs-ch2-file-handling-in-python-s1",
                      title: "File Handling in Python",
                      notes: [
                        { id: "c12cs-ch2-file-handling-in-python-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/file-handling-in-python/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch3-stack",
                  title: "03 · Stack",
                  subsections: [
                    {
                      id: "c12cs-ch3-stack-s1",
                      title: "Stack",
                      notes: [
                        { id: "c12cs-ch3-stack-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/stack/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch4-queue",
                  title: "04 · Queue",
                  subsections: [
                    {
                      id: "c12cs-ch4-queue-s1",
                      title: "Queue",
                      notes: [
                        { id: "c12cs-ch4-queue-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/queue/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch5-sorting",
                  title: "05 · Sorting",
                  subsections: [
                    {
                      id: "c12cs-ch5-sorting-s1",
                      title: "Sorting",
                      notes: [
                        { id: "c12cs-ch5-sorting-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/sorting/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch6-searching",
                  title: "06 · Searching",
                  subsections: [
                    {
                      id: "c12cs-ch6-searching-s1",
                      title: "Searching",
                      notes: [
                        { id: "c12cs-ch6-searching-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/searching/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch7-understanding-data",
                  title: "07 · Understanding Data",
                  subsections: [
                    {
                      id: "c12cs-ch7-understanding-data-s1",
                      title: "Understanding Data",
                      notes: [
                        { id: "c12cs-ch7-understanding-data-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/understanding-data/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch8-database-concepts",
                  title: "08 · Database Concepts",
                  subsections: [
                    {
                      id: "c12cs-ch8-database-concepts-s1",
                      title: "Database Concepts",
                      notes: [
                        { id: "c12cs-ch8-database-concepts-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/database-concepts/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch9-structured-query-language-sql",
                  title: "09 · Structured Query Language (SQL)",
                  subsections: [
                    {
                      id: "c12cs-ch9-structured-query-language-sql-s1",
                      title: "Structured Query Language (SQL)",
                      notes: [
                        { id: "c12cs-ch9-structured-query-language-sql-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/structured-query-language-sql/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch10-computer-networks",
                  title: "10 · Computer Networks",
                  subsections: [
                    {
                      id: "c12cs-ch10-computer-networks-s1",
                      title: "Computer Networks",
                      notes: [
                        { id: "c12cs-ch10-computer-networks-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/computer-networks/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch11-data-communication",
                  title: "11 · Data Communication",
                  subsections: [
                    {
                      id: "c12cs-ch11-data-communication-s1",
                      title: "Data Communication",
                      notes: [
                        { id: "c12cs-ch11-data-communication-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/data-communication/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                },
                {
                  id: "c12cs-ch12-security-aspects",
                  title: "12 · Security Aspects",
                  subsections: [
                    {
                      id: "c12cs-ch12-security-aspects-s1",
                      title: "Security Aspects",
                      notes: [
                        { id: "c12cs-ch12-security-aspects-s1-notes", title: "Chapter Notes", file: "notes/class-12-computer-placeholders/security-aspects/overview/notes.md" }
                      ],
                      tests: []
                    }
                  ]
                }
              ]
            },
            {
              id: "english",
              title: "English",
              icon: "english",
              ready: true,
              tracks: [
          {
            id: "language",
            title: "Language",
            ready: false
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
                title: "01 \u00b7 Flamingo \u2014 Prose",
                subsections: [
                  {
                    id: "class-12-lit-flamingo-prose-core",
                    title: "Flamingo \u2014 Prose",
                    notes: [ { id: "class-12-lit-flamingo-prose-notes", title: "Flamingo \u2014 Prose", file: "notes/class-12/literature/flamingo-prose/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-12-lit-flamingo-poetry",
                title: "02 \u00b7 Flamingo \u2014 Poetry",
                subsections: [
                  {
                    id: "class-12-lit-flamingo-poetry-core",
                    title: "Flamingo \u2014 Poetry",
                    notes: [ { id: "class-12-lit-flamingo-poetry-notes", title: "Flamingo \u2014 Poetry", file: "notes/class-12/literature/flamingo-poetry/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "vistas",
            title: "Vistas (Supplementary Reader)",
            ready: true,
            sections: [
              {
                id: "class-12-lit-vistas-supplementary-reader",
                title: "01 \u00b7 Vistas (Supplementary Reader)",
                subsections: [
                  {
                    id: "class-12-lit-vistas-supplementary-reader-core",
                    title: "Vistas (Supplementary Reader)",
                    notes: [ { id: "class-12-lit-vistas-supplementary-reader-notes", title: "Vistas (Supplementary Reader)", file: "notes/class-12/literature/vistas-supplementary-reader/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          },
          {
            id: "elective",
            title: "Kaleidoscope (Elective)",
            ready: true,
            sections: [
              {
                id: "class-12-elective-short-stories",
                title: "01 \u00b7 Kaleidoscope \u2014 Short Stories",
                subsections: [
                  {
                    id: "class-12-elective-short-stories-core",
                    title: "Kaleidoscope \u2014 Short Stories",
                    notes: [ { id: "class-12-elective-short-stories-notes", title: "Kaleidoscope \u2014 Short Stories", file: "notes/class-12/elective/short-stories/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-12-elective-poetry",
                title: "02 \u00b7 Kaleidoscope \u2014 Poetry",
                subsections: [
                  {
                    id: "class-12-elective-poetry-core",
                    title: "Kaleidoscope \u2014 Poetry",
                    notes: [ { id: "class-12-elective-poetry-notes", title: "Kaleidoscope \u2014 Poetry", file: "notes/class-12/elective/poetry/notes.md" } ],
                    tests: []
                  }
                ]
              },
              {
                id: "class-12-elective-drama",
                title: "03 \u00b7 Kaleidoscope \u2014 Drama",
                subsections: [
                  {
                    id: "class-12-elective-drama-core",
                    title: "Kaleidoscope \u2014 Drama",
                    notes: [ { id: "class-12-elective-drama-notes", title: "Kaleidoscope \u2014 Drama", file: "notes/class-12/elective/drama/notes.md" } ],
                    tests: []
                  }
                ]
              }
            ]
          }
              ]
          }
              ]
            }
    ]
  },
  {
    id: "jee",
    type: "exam",
    label: "JEE",
    name: "JEE Preparation",
    years: [
      {
        id: "jee-xi",
        label: "XI",
        name: "Class 11 (JEE Track)",
        subjects: [
                {
                  id: "maths",
                  title: "Mathematics",
                  icon: "maths",
                  ready: true,
                  sections: [
          {
            id: "jee11-ch1-sets",
            title: "01 \u00b7 Sets",
            subsections: [
              {
                id: "jee11-ch1-sets-s1",
                title: "Part 1",
                notes: [
                  { id: "jee11-ch1-sets-s1-notes", title: "Part 1", file: "notes/jee11-maths-placeholders/sets/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee11-ch1-sets-s2",
                title: "Part 2",
                notes: [
                  { id: "jee11-ch1-sets-s2-notes", title: "Part 2", file: "notes/jee11-maths-placeholders/sets/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee11-ch1-sets-s3",
                title: "Part 3",
                notes: [
                  { id: "jee11-ch1-sets-s3-notes", title: "Part 3", file: "notes/jee11-maths-placeholders/sets/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch2-relations-and-functions",
            title: "02 \u00b7 Relations and Functions",
            subsections: [
              {
                id: "jee11-ch2-relations-and-functions-s1",
                title: "Relations and Functions",
                notes: [
                  { id: "jee11-ch2-relations-and-functions-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/relations-and-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch3-trigonometric-functions",
            title: "03 \u00b7 Trigonometric Functions",
            subsections: [
              {
                id: "jee11-ch3-trigonometric-functions-s1",
                title: "Trigonometric Functions",
                notes: [
                  { id: "jee11-ch3-trigonometric-functions-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/trigonometric-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch4-complex-numbers-and-quadratic-equations",
            title: "04 \u00b7 Complex Numbers and Quadratic Equations",
            subsections: [
              {
                id: "jee11-ch4-complex-numbers-and-quadratic-equations-s1",
                title: "Part 1",
                notes: [
                  { id: "jee11-ch4-complex-numbers-and-quadratic-equations-s1-notes", title: "Part 1", file: "notes/jee11-maths-placeholders/complex-numbers-and-quadratic-equations/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee11-ch4-complex-numbers-and-quadratic-equations-s2",
                title: "Part 2",
                notes: [
                  { id: "jee11-ch4-complex-numbers-and-quadratic-equations-s2-notes", title: "Part 2", file: "notes/jee11-maths-placeholders/complex-numbers-and-quadratic-equations/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch5-linear-inequalities",
            title: "05 \u00b7 Linear Inequalities",
            subsections: [
              {
                id: "jee11-ch5-linear-inequalities-s1",
                title: "Linear Inequalities",
                notes: [
                  { id: "jee11-ch5-linear-inequalities-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/linear-inequalities/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch6-permutations-and-combinations",
            title: "06 \u00b7 Permutations and Combinations",
            subsections: [
              {
                id: "jee11-ch6-permutations-and-combinations-s1",
                title: "Part 1",
                notes: [
                  { id: "jee11-ch6-permutations-and-combinations-s1-notes", title: "Part 1", file: "notes/jee11-maths-placeholders/permutations-and-combinations/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee11-ch6-permutations-and-combinations-s2",
                title: "Part 2",
                notes: [
                  { id: "jee11-ch6-permutations-and-combinations-s2-notes", title: "Part 2", file: "notes/jee11-maths-placeholders/permutations-and-combinations/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch7-binomial-theorem",
            title: "07 \u00b7 Binomial Theorem",
            subsections: [
              {
                id: "jee11-ch7-binomial-theorem-s1",
                title: "Binomial Theorem",
                notes: [
                  { id: "jee11-ch7-binomial-theorem-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/binomial-theorem/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch8-sequences-and-series",
            title: "08 \u00b7 Sequences and Series",
            subsections: [
              {
                id: "jee11-ch8-sequences-and-series-s1",
                title: "Sequences and Series",
                notes: [
                  { id: "jee11-ch8-sequences-and-series-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/sequences-and-series/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch9-straight-lines",
            title: "09 \u00b7 Straight Lines",
            subsections: [
              {
                id: "jee11-ch9-straight-lines-s1",
                title: "Straight Lines",
                notes: [
                  { id: "jee11-ch9-straight-lines-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/straight-lines/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch10-conic-sections",
            title: "10 \u00b7 Conic Sections",
            subsections: [
              {
                id: "jee11-ch10-conic-sections-s1",
                title: "Part 1",
                notes: [
                  { id: "jee11-ch10-conic-sections-s1-notes", title: "Part 1", file: "notes/jee11-maths-placeholders/conic-sections/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee11-ch10-conic-sections-s2",
                title: "Part 2",
                notes: [
                  { id: "jee11-ch10-conic-sections-s2-notes", title: "Part 2", file: "notes/jee11-maths-placeholders/conic-sections/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch11-introduction-to-three-dimensional-geometry",
            title: "11 \u00b7 Introduction to Three Dimensional Geometry",
            subsections: [
              {
                id: "jee11-ch11-introduction-to-three-dimensional-geometry-s1",
                title: "Introduction to Three Dimensional Geometry",
                notes: [
                  { id: "jee11-ch11-introduction-to-three-dimensional-geometry-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/introduction-to-three-dimensional-geometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch12-limits-and-derivatives",
            title: "12 \u00b7 Limits and Derivatives",
            subsections: [
              {
                id: "jee11-ch12-limits-and-derivatives-s1",
                title: "Limits and Derivatives",
                notes: [
                  { id: "jee11-ch12-limits-and-derivatives-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/limits-and-derivatives/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch13-statistics",
            title: "13 \u00b7 Statistics",
            subsections: [
              {
                id: "jee11-ch13-statistics-s1",
                title: "Statistics",
                notes: [
                  { id: "jee11-ch13-statistics-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/statistics/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch14-probability",
            title: "14 \u00b7 Probability",
            subsections: [
              {
                id: "jee11-ch14-probability-s1",
                title: "Probability",
                notes: [
                  { id: "jee11-ch14-probability-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/probability/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch15-appendix-1-infinite-series",
            title: "15 \u00b7 Appendix 1: Infinite Series",
            subsections: [
              {
                id: "jee11-ch15-appendix-1-infinite-series-s1",
                title: "Appendix 1: Infinite Series",
                notes: [
                  { id: "jee11-ch15-appendix-1-infinite-series-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/appendix-1-infinite-series/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee11-ch16-appendix-2-mathematical-modelling",
            title: "16 \u00b7 Appendix 2: Mathematical Modelling",
            subsections: [
              {
                id: "jee11-ch16-appendix-2-mathematical-modelling-s1",
                title: "Appendix 2: Mathematical Modelling",
                notes: [
                  { id: "jee11-ch16-appendix-2-mathematical-modelling-s1-notes", title: "Chapter Notes", file: "notes/jee11-maths-placeholders/appendix-2-mathematical-modelling/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
                  ]
                },
                {
                  id: "physics",
                  title: "Physics",
                  icon: "physics",
                  ready: false
                },
                {
                  id: "chemistry",
                  title: "Chemistry",
                  icon: "chemistry",
                  ready: false
                }
        ]
      },
      {
        id: "jee-xii",
        label: "XII",
        name: "Class 12 (JEE Track)",
        subjects: [
                {
                  id: "maths",
                  title: "Mathematics",
                  icon: "maths",
                  ready: true,
                  sections: [
          {
            id: "jee12-ch1-relations-and-functions",
            title: "01 \u00b7 Relations and Functions",
            subsections: [
              {
                id: "jee12-ch1-relations-and-functions-s1",
                title: "Relations and Functions",
                notes: [
                  { id: "jee12-ch1-relations-and-functions-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/relations-and-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch2-inverse-trigonometric-functions",
            title: "02 \u00b7 Inverse Trigonometric Functions",
            subsections: [
              {
                id: "jee12-ch2-inverse-trigonometric-functions-s1",
                title: "Inverse Trigonometric Functions",
                notes: [
                  { id: "jee12-ch2-inverse-trigonometric-functions-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/inverse-trigonometric-functions/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch3-matrices",
            title: "03 \u00b7 Matrices",
            subsections: [
              {
                id: "jee12-ch3-matrices-s1",
                title: "Part 1",
                notes: [
                  { id: "jee12-ch3-matrices-s1-notes", title: "Part 1", file: "notes/jee12-maths-placeholders/matrices/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch3-matrices-s2",
                title: "Part 2",
                notes: [
                  { id: "jee12-ch3-matrices-s2-notes", title: "Part 2", file: "notes/jee12-maths-placeholders/matrices/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch4-determinants",
            title: "04 \u00b7 Determinants",
            subsections: [
              {
                id: "jee12-ch4-determinants-s1",
                title: "Part 1",
                notes: [
                  { id: "jee12-ch4-determinants-s1-notes", title: "Part 1", file: "notes/jee12-maths-placeholders/determinants/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch4-determinants-s2",
                title: "Part 2",
                notes: [
                  { id: "jee12-ch4-determinants-s2-notes", title: "Part 2", file: "notes/jee12-maths-placeholders/determinants/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch5-continuity-and-differentiability",
            title: "05 \u00b7 Continuity and Differentiability",
            subsections: [
              {
                id: "jee12-ch5-continuity-and-differentiability-s1",
                title: "Part 1",
                notes: [
                  { id: "jee12-ch5-continuity-and-differentiability-s1-notes", title: "Part 1", file: "notes/jee12-maths-placeholders/continuity-and-differentiability/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch5-continuity-and-differentiability-s2",
                title: "Part 2",
                notes: [
                  { id: "jee12-ch5-continuity-and-differentiability-s2-notes", title: "Part 2", file: "notes/jee12-maths-placeholders/continuity-and-differentiability/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch6-application-of-derivatives",
            title: "06 \u00b7 Application of Derivatives",
            subsections: [
              {
                id: "jee12-ch6-application-of-derivatives-s1",
                title: "Application of Derivatives",
                notes: [
                  { id: "jee12-ch6-application-of-derivatives-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/application-of-derivatives/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch7-integrals",
            title: "07 \u00b7 Integrals",
            subsections: [
              {
                id: "jee12-ch7-integrals-s1",
                title: "Part 1",
                notes: [
                  { id: "jee12-ch7-integrals-s1-notes", title: "Part 1", file: "notes/jee12-maths-placeholders/integrals/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch7-integrals-s2",
                title: "Part 2",
                notes: [
                  { id: "jee12-ch7-integrals-s2-notes", title: "Part 2", file: "notes/jee12-maths-placeholders/integrals/part-2/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch7-integrals-s3",
                title: "Part 3",
                notes: [
                  { id: "jee12-ch7-integrals-s3-notes", title: "Part 3", file: "notes/jee12-maths-placeholders/integrals/part-3/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch8-application-of-integrals",
            title: "08 \u00b7 Application of Integrals",
            subsections: [
              {
                id: "jee12-ch8-application-of-integrals-s1",
                title: "Application of Integrals",
                notes: [
                  { id: "jee12-ch8-application-of-integrals-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/application-of-integrals/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch9-differential-equations",
            title: "09 \u00b7 Differential Equations",
            subsections: [
              {
                id: "jee12-ch9-differential-equations-s1",
                title: "Differential Equations",
                notes: [
                  { id: "jee12-ch9-differential-equations-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/differential-equations/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch10-vector-algebra",
            title: "10 \u00b7 Vector Algebra",
            subsections: [
              {
                id: "jee12-ch10-vector-algebra-s1",
                title: "Part 1",
                notes: [
                  { id: "jee12-ch10-vector-algebra-s1-notes", title: "Part 1", file: "notes/jee12-maths-placeholders/vector-algebra/part-1/notes.md" }
                ],
                tests: []
              },
              {
                id: "jee12-ch10-vector-algebra-s2",
                title: "Part 2",
                notes: [
                  { id: "jee12-ch10-vector-algebra-s2-notes", title: "Part 2", file: "notes/jee12-maths-placeholders/vector-algebra/part-2/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch11-three-dimensional-geometry",
            title: "11 \u00b7 Three Dimensional Geometry",
            subsections: [
              {
                id: "jee12-ch11-three-dimensional-geometry-s1",
                title: "Three Dimensional Geometry",
                notes: [
                  { id: "jee12-ch11-three-dimensional-geometry-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/three-dimensional-geometry/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch12-linear-programming",
            title: "12 \u00b7 Linear Programming",
            subsections: [
              {
                id: "jee12-ch12-linear-programming-s1",
                title: "Linear Programming",
                notes: [
                  { id: "jee12-ch12-linear-programming-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/linear-programming/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch13-probability",
            title: "13 \u00b7 Probability",
            subsections: [
              {
                id: "jee12-ch13-probability-s1",
                title: "Probability",
                notes: [
                  { id: "jee12-ch13-probability-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/probability/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch14-appendix-1-proofs-in-mathematics",
            title: "14 \u00b7 Appendix 1: Proofs in Mathematics",
            subsections: [
              {
                id: "jee12-ch14-appendix-1-proofs-in-mathematics-s1",
                title: "Appendix 1: Proofs in Mathematics",
                notes: [
                  { id: "jee12-ch14-appendix-1-proofs-in-mathematics-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/appendix-1-proofs-in-mathematics/overview/notes.md" }
                ],
                tests: []
              }
            ]
          },
          {
            id: "jee12-ch15-appendix-2-mathematical-modelling",
            title: "15 \u00b7 Appendix 2: Mathematical Modelling",
            subsections: [
              {
                id: "jee12-ch15-appendix-2-mathematical-modelling-s1",
                title: "Appendix 2: Mathematical Modelling",
                notes: [
                  { id: "jee12-ch15-appendix-2-mathematical-modelling-s1-notes", title: "Chapter Notes", file: "notes/jee12-maths-placeholders/appendix-2-mathematical-modelling/overview/notes.md" }
                ],
                tests: []
              }
            ]
          }
                  ]
                },
                {
                  id: "physics",
                  title: "Physics",
                  icon: "physics",
                  ready: false
                },
                {
                  id: "chemistry",
                  title: "Chemistry",
                  icon: "chemistry",
                  ready: false
                }
        ]
      }
    ]
  },
  {
    id: "neet",
    type: "exam",
    label: "NEET",
    name: "NEET Preparation",
    years: [
      {
        id: "neet-xi",
        label: "XI",
        name: "Class 11 (NEET Track)",
        subjects: [
                {
                  id: "physics",
                  title: "Physics",
                  icon: "physics",
                  ready: false
                },
                {
                  id: "chemistry",
                  title: "Chemistry",
                  icon: "chemistry",
                  ready: false
                },
                {
                  id: "biology",
                  title: "Biology",
                  icon: "biology",
                  ready: false
                }
        ]
      },
      {
        id: "neet-xii",
        label: "XII",
        name: "Class 12 (NEET Track)",
        subjects: [
                {
                  id: "physics",
                  title: "Physics",
                  icon: "physics",
                  ready: false
                },
                {
                  id: "chemistry",
                  title: "Chemistry",
                  icon: "chemistry",
                  ready: false
                },
                {
                  id: "biology",
                  title: "Biology",
                  icon: "biology",
                  ready: false
                }
        ]
      }
    ]
  }
];

window.CLASSES = CLASSES;
