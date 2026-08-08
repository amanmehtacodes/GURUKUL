# ORIENTING YOURSELF: THE USE OF COORDINATES — Complete Study Notes
### (Grade 9 Ganita Manjari, Part I — Chapter 1)

---

## 📑 TABLE OF CONTENTS

1. [Introduction — What is a Coordinate System?](#1-introduction--what-is-a-coordinate-system)
2. [History of Coordinates — India's Contribution](#2-history-of-coordinates--indias-contribution)
3. [Settling In — Reiaan's Room (Motivating Story)](#3-settling-in--reiaans-room-motivating-story)
4. [The 2-D Cartesian Coordinate System — Axes & Origin](#4-the-2-d-cartesian-coordinate-system--axes--origin)
5. [Coordinates of Points on the Axes](#5-coordinates-of-points-on-the-axes)
6. [Quadrants of the Cartesian Plane](#6-quadrants-of-the-cartesian-plane)
7. [Coordinates of a General Point (x, y)](#7-coordinates-of-a-general-point-x-y)
8. [Distance Between Two Points — Same Axis or Parallel Lines](#8-distance-between-two-points--same-axis-or-parallel-lines)
9. [Distance Formula — Using the Baudhāyana-Pythagoras Theorem](#9-distance-formula--using-the-baudhāyana-pythagoras-theorem)
10. [Distance Formula with Negative Coordinates & Reflections](#10-distance-formula-with-negative-coordinates--reflections)
11. [Figure It Out / Exercise Sets — All Solved Questions](#11-figure-it-out--exercise-sets--all-solved-questions)
12. [End-of-Chapter Exercises — All Solved Questions](#12-end-of-chapter-exercises--all-solved-questions)
13. [Chapter Summary](#13-chapter-summary)
14. [Extra Practice Questions (Self-made)](#14-extra-practice-questions-self-made)

---

## 1. INTRODUCTION — WHAT IS A COORDINATE SYSTEM?

### 🔑 Definition
A **system of coordinates** is a structured framework (like grid lines on a map or graph paper) that lets us use **numbers** to describe the **exact physical location** of points or objects.

### 📖 Explanation
Just as grid lines on a city map let you find a location by counting blocks in two directions, a coordinate system lets us pinpoint any location in space using a pair (or more) of numbers, once we fix a reference point and reference directions.

### ❓ Q&A
**Q1. In your own words, what problem does a coordinate system solve?**
A. It solves the problem of **precisely describing where something is located**, using numbers instead of vague descriptions, by measuring distances from fixed reference lines/points.

**Q2 (own). Why do we need TWO numbers (not just one) to describe a location on a flat surface like a floor or a map?**
A. Because a flat surface is **two-dimensional** — one number alone (like a single number line) can only describe position along one direction; a second number is needed to capture the perpendicular direction, together pinning down an exact point on the surface.

---

## 2. HISTORY OF COORDINATES — INDIA'S CONTRIBUTION

### 🔑 Key Facts (Timeline)
| Approx. Date | Development |
|---|---|
| Thousands of years ago | **Sindhu-Sarasvatī Civilisation** builds cities with streets in precise North-South/East-West grids, ~10m apart — an early practical coordinate system |
| c. 800 CE (Note: likely a typo in source for BCE) | **Baudhāyana** uses East-West and North-South lines for geometric constructions, developing the **Baudhāyana-Pythagoras Theorem** |
| ≥4th century BCE | **Ujjayinī** (Ujjain) established as the reference **central longitude meridian** in early Siddhāntas |
| c. 150 BCE (Note: Ptolemy is usually dated c. 150 CE) | **Ptolemy** (building on Hipparchus) describes latitudes/longitudes of thousands of locations, including 'Ozine' (Ujjayinī) |
| c. 499 CE | **Āryabhaṭa** replaces Greek "chords" with "sines," simplifying coordinate calculations for stars/cities; maps the sky using **Celestial Coordinates** measured from the ecliptic |
| c. 628 CE | **Brahmagupta** formalises **zero** and **negative numbers** as algebraic entities — essential for the origin and negative axes in modern coordinate systems |
| — | Brahmagupta's work translated into Arabic (**Sindhind**); Ujjayinī meridian becomes 'Arin' in Arabic geography |
| c. 1000 CE | **Al-Bīrūnī** travels to India, studies the Siddhāntas, uses Indian trigonometry to calculate city coordinates; later perfects the **astrolabe** for navigation by stars |
| c. 1100 CE | **Ömar Khayyām**, expert in the Indian decimal system, first solves algebraic problems using geometric/coordinate interpretation |
| 12th century | These concepts reach Europe |
| 1636 CE | **Fermat** does related work |
| 1637 CE | **René Descartes** formalises that any point in a 2-D plane can be defined using just two numbers (distances from two perpendicular axes) |

### ✅ Key Insight
> **Without Brahmagupta's formalisation of zero and negative numbers, the four-quadrant Cartesian plane would be impossible** — the "origin" is zero, and the "negative axes" represent values less than zero.

### ❓ Q&A
**Q1. Which ancient Indian civilisation used the first large-scale practical coordinate system, and how?**
A. The **Sindhu-Sarasvatī Civilisation**, which built city streets in precise North-South and East-West directions at uniform ~10m spacing, allowing locations to be found by counting units of distance from the city centre.

**Q2. What foundational theorem did Baudhāyana develop, and why is it important for coordinate geometry?**
A. The **Baudhāyana-Pythagoras Theorem** — it's the basis for the **distance formula** used throughout coordinate geometry.

**Q3. Why was Ujjayinī historically significant in the context of coordinates?**
A. It was used as the **reference central longitude meridian** from which other locations were measured, as early as the 4th century BCE.

**Q4. What did Āryabhaṭa contribute to coordinate-related mathematics?**
A. He replaced Greek "chords" with "**sines**," making it easier to calculate coordinates of stars/cities, and used **Celestial Coordinates** to map the sky relative to the ecliptic.

**Q5. Why was Brahmagupta's work on zero and negative numbers essential for the modern Cartesian plane?**
A. Because the **origin** represents zero, and the **negative axes** represent values less than zero — without a formal concept of zero and negative numbers, a four-quadrant coordinate plane couldn't exist.

**Q6. Who finally formalised the modern 2-D coordinate system using two perpendicular axes, and when?**
A. **René Descartes**, in **1637 CE** (building on related work by Fermat in 1636 CE).

**Q7 (own). Trace the path by which Indian coordinate ideas reached Europe, based on the timeline given.**
A. India (Brahmagupta, Āryabhaṭa) → translated into **Arabic** (Sindhind) → studied and extended by **Al-Bīrūnī** and **Ömar Khayyām** in the Arab world → reached **Europe** by the 12th century → formalised by **Fermat and Descartes** in the 1630s.

---

## 3. SETTLING IN — REIAAN'S ROOM (MOTIVATING STORY)

### 🔑 Context
Reiaan (who cannot see) and his sister Shalini use a **rectangular grid with pins and thread** to create a tactile floor map of Reiaan's new room, using a scale of **1 cm : 1 foot**. Points (corners of objects) are marked with pins, and connected with wool so Reiaan can feel their positions.

### 📖 Explanation
This story motivates *why* coordinates are useful: they let us describe a physical space precisely enough that even someone who cannot see the room can understand its layout by "feeling" the marked coordinate positions.

### ❓ Q&A
**Q1. What scale does Shalini use for her sketch of Reiaan's room?**
A. **1 cm : 1 foot**.

**Q2. Why can't the positions of the windows be marked on this floor map?**
A. Because the sketch is a **map of the floor only** (a 2-D horizontal plan) — windows are located on the **walls** (vertical surfaces), which aren't part of a floor plan; representing them would require a different view (e.g., a wall elevation or a 3-D representation).

**Q3 (own). Why is a tactile (touchable) coordinate map particularly useful for someone who is visually impaired, compared to a purely verbal description of the room?**
A. Because it lets the person **directly feel exact relative positions and distances** with their fingers, building an accurate mental spatial map, rather than relying on possibly ambiguous or hard-to-remember verbal descriptions.

---
## 4. THE 2-D CARTESIAN COORDINATE SYSTEM — AXES & ORIGIN

### 🔑 Definitions
- **x-axis:** The horizontal reference line.
- **y-axis:** The vertical reference line, perpendicular to the x-axis.
- **Origin (O):** The point where the x-axis and y-axis intersect; its coordinates are **(0, 0)**.
- **Coordinate axes:** The plural term for the x-axis and y-axis together.

### 📖 Explanation
- Distances from O are marked off in **equal units** on both axes.
- **Rightward** (along x-axis) or **upward** (along y-axis) from O = **positive** distances.
- **Leftward** (along x-axis) or **downward** (along y-axis) from O = **negative** distances.

### 🔑 ASCII Diagram — The Coordinate Plane
```
                    y-axis
                      5
                      4
                H=(0,4) •
                      3
                      2
                      1
  ──────────────────────────────────────────── x-axis
 -7  -6  -5  -4  -3  -2  -1  0  1  2  3  4  5  6  7
              E=(-2.9,0)•       O=(0,0)    •B=(4.5,0)
                     -1
                     -2
                     -3
                     -4
                     -5  •G=(0,-4.5)
```

### 📖 Explanation — Reading Points on the Axes
- **Point B**: on the x-axis, 4.5 units **right** of O → **B = (4.5, 0)**
- **Point G**: on the y-axis, 4.5 units **downward** from O → **G = (0, −4.5)**
- **Point H**: on the y-axis, 4 units **above** O → **H = (0, 4)**

### 🔑 Notation Convention
Writing "P = (x, y)" is often shortened to just **"P (x, y)"** (dropping the "=" sign), especially when marking points on a graph.

### ❓ Q&A
**Q1. What are the coordinates of the origin?**
A. **(0, 0)**.

**Q2. Which axis is horizontal, and which is vertical?**
A. **x-axis** is horizontal; **y-axis** is vertical.

**Q3. If a point is 6 units to the left of O on the x-axis, what are its coordinates?**
A. **(−6, 0)**.

**Q4. If a point is 3 units above O on the y-axis, what are its coordinates?**
A. **(0, 3)**.

**Q5 (own). If a point has coordinates (0, −7), where is it located relative to O?**
A. It is on the **y-axis**, **7 units below** O.

**Q6 (own). Can a single point have two different valid coordinate representations, like (5,0) and (0,5), for the same location? Explain.**
A. **No** — each distinct location corresponds to exactly **one unique ordered pair** of coordinates; (5,0) and (0,5) represent two DIFFERENT points (one on the x-axis, one on the y-axis, unless both are the origin).

---

## 5. COORDINATES OF POINTS ON THE AXES

### 🔑 Rule
- A point **P = (x, 0)** always lies **on the x-axis**.
  - If **x is positive** → P lies to the **right** of O.
  - If **x is negative** → P lies to the **left** of O.
- A point **P = (0, y)** always lies **on the y-axis**.
  - If **y is positive** → P lies **above** O.
  - If **y is negative** → P lies **below** O.

### ❓ Q&A
**Q1. What must be true about the y-coordinate of any point lying on the x-axis?**
A. The **y-coordinate must be 0**.

**Q2. What must be true about the x-coordinate of any point lying on the y-axis?**
A. The **x-coordinate must be 0**.

**Q3. Where is the point (−8, 0) located?**
A. On the **x-axis**, **8 units to the left** of the origin.

**Q4. Where is the point (0, 12) located?**
A. On the **y-axis**, **12 units above** the origin.

**Q5 (own). A point has coordinates (0, 0). Is it on the x-axis, the y-axis, or both?**
A. **Both** — the origin lies on both axes simultaneously, since it satisfies x=0 AND y=0.

---

## 6. QUADRANTS OF THE CARTESIAN PLANE

### 🔑 Definition
The **Cartesian plane** (also called the **coordinate plane** or **xy-plane**) is the flat plane containing the x-axis and y-axis. The two axes divide this plane into **four quadrants**, numbered as follows.

### 🔑 ASCII Diagram — The Four Quadrants
```
                    y-axis
                      4
       Quadrant II    3         Quadrant I
                      2
            Q(-5,3) • 1
  ──────────────────────────────────────────── x-axis
 -8  -7  -6  -5  -4  -3  -2  -1  0  1  2  3  4  5  6  7
                     -1
                     -2
                     -3
      Quadrant III   -4         Quadrant IV
                     -5   • S(3,-5)
```

### 🔑 Sign Convention Table
| Quadrant | x-coordinate | y-coordinate |
|---|---|---|
| **I** | Positive (+) | Positive (+) |
| **II** | Negative (−) | Positive (+) |
| **III** | Negative (−) | Negative (−) |
| **IV** | Positive (+) | Negative (−) |

### ❓ Q&A
**Q1. In Fig. 1.4, point S(3, −5) is in which quadrant?**
A. **Quadrant IV** (x is positive, y is negative).

**Q2. In Fig. 1.4, point Q(−5, 3) is in which quadrant?**
A. **Quadrant II** (x is negative, y is positive).

**Q3. Mark any point P in Quadrant I and write its coordinates (example).**
A. *(Sample)* **P(2, 5)** — both coordinates positive, so it's in Quadrant I.

**Q4. Mark any point R in Quadrant III and write its coordinates (example).**
A. *(Sample)* **R(−4, −3)** — both coordinates negative, so it's in Quadrant III.

**Q5. What are the signs of the coordinates of a point in Quadrant II?**
A. **x is negative, y is positive** — i.e., (−, +).

**Q6 (own). A point has coordinates (−6, −9). Which quadrant is it in?**
A. **Quadrant III** (both x and y are negative).

**Q7 (own). A point has coordinates (7, −2). Which quadrant is it in?**
A. **Quadrant IV** (x positive, y negative).

---

## 7. COORDINATES OF A GENERAL POINT (x, y)

### 🔑 Definition
For any point P in 2-D space with coordinates **(x, y)**:
- **x** (the **x-coordinate**) = the perpendicular distance of P from the **y-axis**, measured along the x-axis direction.
- **y** (the **y-coordinate**) = the perpendicular distance of P from the **x-axis**, measured along the y-axis direction.

### 📖 Think and Reflect — Solved
**Q1. What is the x-coordinate of a point on the y-axis?**
A. **0** (since any point on the y-axis has the form (0, y)).

**Q2. Is there a similar generalisation for a point on the x-axis?**
A. **Yes** — the y-coordinate of any point on the x-axis is always **0** (points on the x-axis have the form (x, 0)).

**Q3. Does point Q(y, x) ever coincide with point P(x, y)? Justify your answer.**
A. **Only when x = y.** If x≠y, then swapping the coordinates gives a genuinely different point (e.g., (2,5) and (5,2) are different locations). They coincide only in the special case where the x-coordinate and y-coordinate happen to be equal to begin with.

**Q4. If x ≠ y, then (x,y) ≠ (y,x); and (x,y) = (y,x) if and only if x=y. Is this claim true?**
A. **Yes, this is true.** This follows directly from the definition of coordinates as an **ordered pair** — the order in which x and y appear matters, so unless the two values are actually equal, swapping them changes which point is being described.

### ❓ Q&A
**Q1. What does the x-coordinate of a point actually measure (in terms of distance)?**
A. The **perpendicular distance from the y-axis**, measured along the x-direction.

**Q2. What does the y-coordinate of a point actually measure?**
A. The **perpendicular distance from the x-axis**, measured along the y-direction.

**Q3. Why is the term "ordered pair" important when describing coordinates like (x, y)?**
A. Because the **order matters** — (x,y) and (y,x) generally represent two different points (unless x=y), so we can't treat coordinates as an unordered collection of two numbers.

**Q4 (own). If a point P has coordinates (4, 9), what is the coordinate of the point obtained by swapping its x and y values? Are P and this new point the same location?**
A. Swapped point = **(9, 4)**. Since 4≠9, this is a **different point** from P(4,9) — they do NOT coincide.

**Q5 (own). For what type of point (in terms of its coordinates) will swapping x and y always give back the exact same point?**
A. Any point where **x = y** (e.g., (3,3), (−5,−5), or the origin (0,0)) — since swapping equal values changes nothing.

---
