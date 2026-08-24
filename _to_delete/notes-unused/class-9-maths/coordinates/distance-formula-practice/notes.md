# Orienting Yourself: The Use of Coordinates — Distance Formula & Practice

### (Continued — Grade content, Part 2)

---

## 8. DISTANCE BETWEEN TWO POINTS — SAME AXIS OR PARALLEL LINES

### 🔑 Rule

- The distance between two points **(x₁, y)** and **(x₂, y)** (same y-coordinate, i.e., on a horizontal line) is the **absolute value |x₂ − x₁|**.
- The distance between two points **(x, y₁)** and **(x, y₂)** (same x-coordinate, i.e., on a vertical line) is the **absolute value |y₂ − y₁|**.

### 📖 Explanation

When two points share the same y-coordinate, they lie on a horizontal line, so the distance between them is simply the difference in their x-coordinates (taking the positive/absolute value, since distance can't be negative). The same logic applies vertically when the x-coordinates match.

### ❓ Q&A

**Q1. Find the distance between (2, 5) and (9, 5).**
A. Same y-coordinate → distance = **|9−2| = 7 units**.

**Q2. Find the distance between (−3, 4) and (−3, −6).**
A. Same x-coordinate → distance = **|−6−4| = |−10| = 10 units**.

**Q3. Why do we take the ABSOLUTE VALUE of the difference, rather than just the difference itself?**
A. Because **distance is always non-negative** — if we subtracted in the "wrong order" (e.g., smaller minus larger), we'd get a negative number, which doesn't make sense as a physical distance; the absolute value ensures we always get a positive result regardless of subtraction order.

**Q4 (own). Find the distance between (−5, 0) and (8, 0).**
A. Both on the x-axis (same y=0) → distance = **|8−(−5)| = 13 units**.

---

## 9. DISTANCE FORMULA — USING THE BAUDHĀYANA-PYTHAGORAS THEOREM

### 🔑 The Distance Formula

> The distance between points **(x₁, y₁)** and **(x₂, y₂)** is:
> **√[(x₂−x₁)² + (y₂−y₁)²]**

### 📖 Explanation — Derivation via Triangle ADM

Given: A(3,4), D(7,1), M(9,6) — forming an acute-angled triangle in Quadrant I.

**Step 1: Find AD.**

```
                    y-axis
                      6
                                    M(9,6)
                      5
                      4  A(3,4)
                      3
                      2
                      1
                         C          D(7,1)
  ────────────────────────────────────────── x-axis
                   0  1  2  3  4  5  6  7  8  9
```

- Distance moved along x-axis: **CD = x-coord of D − x-coord of A = 7−3 = 4**
- Distance moved along y-axis: **AC = y-coord of A − y-coord of D = 4−1 = 3**
- By the **Baudhāyana-Pythagoras Theorem**: **AD = √(4² + 3²) = √(16+9) = √25 = 5 units**

**Step 2: Find DM and MA similarly.**

- **DM = √[(9−7)² + (6−1)²] = √(2²+5²) = √(4+25) = √29 units**
- **MA = √[(9−3)² + (6−4)²] = √(6²+2²) = √(36+4) = √40 units**

### ✅ Key Insight

> It makes **no difference** whether (x₂−x₁) and (y₂−y₁) come out positive or negative — since these differences get **squared** in the formula, the result is always positive, correctly measuring the "shift" along each axis regardless of direction.

### ❓ Q&A

**Q1. State the distance formula between two points (x₁,y₁) and (x₂,y₂).**
A. **Distance = √[(x₂−x₁)² + (y₂−y₁)²]**

**Q2. In moving from A(3,4) to D(7,1), what distance is covered along the x-axis? Along the y-axis?**
A. Along x-axis: **4 units** (7−3). Along y-axis: **3 units** (4−1, taking the positive difference).

**Q3. Using the values from Q2, find distance AD.**
A. AD = √(4²+3²) = √(16+9) = √25 = **5 units**.

**Q4. Find DM for D(7,1) and M(9,6).**
A. DM = √[(9−7)²+(6−1)²] = √(4+25) = **√29 units**.

**Q5. Find MA for M(9,6) and A(3,4).**
A. MA = √[(9−3)²+(6−4)²] = √(36+4) = **√40 units**.

**Q6. Why does the distance formula work regardless of whether points are in different quadrants?**
A. Because the formula only depends on the **squared differences** of the coordinates — squaring eliminates any effect of sign, so the formula correctly measures distance no matter which quadrants the two points are in.

**Q7 (own). Find the distance between (0,0) and (6,8) using the distance formula.**
A. √[(6−0)²+(8−0)²] = √(36+64) = √100 = **10 units**.

**Q8 (own). Find the distance between (1,1) and (4,5).**
A. √[(4−1)²+(5−1)²] = √(9+16) = √25 = **5 units**.

---

## 10. DISTANCE FORMULA WITH NEGATIVE COORDINATES & REFLECTIONS

### 🔑 Key Result

> **Reflecting a figure across an axis preserves all distances (side lengths) within the figure** — even though individual point coordinates change sign, the distances between corresponding points remain identical.

### 📖 Explanation — Reflecting Triangle ADM in the y-axis

Original points: A(3,4), D(7,1), M(9,6)
Reflected points (in y-axis, so x-coordinate flips sign): **A'(−3,4), D'(−7,1), M'(−9,6)**

```
                    y-axis
                      6
       M'(-9,6) •                          • M(9,6)
                      5
                      4  •A'(-3,4)      A(3,4)•
                      3
                      2
                      1
                    C'•            •C        D(7,1)
       D'(-7,1) •                             •
  ────────────────────────────────────────────────── x-axis
-9  -8  -7  -6  -5  -4  -3  -2  -1  0  1  2  3  4  5  6  7  8  9
```

**Calculating A'D':**

- C'D' = x-coord of A' − x-coord of D' = −3−(−7) = **4**
- A'C' = y-coord of A' − y-coord of D' = 4−1 = **3**
- By the theorem: **A'D' = √(4²+3²) = 5 units** — **same as the original AD!**

Similarly: **D'M' = √29 units** and **M'A' = √40 units** — matching the original (unreflected) distances exactly.

### ✅ Conclusion

> **Reflection changes the coordinates (and their signs) but preserves all distances/lengths.**

### ❓ Q&A

**Q1. When triangle ADM is reflected in the y-axis, what happens to the x-coordinates of its vertices? What happens to the y-coordinates?**
A. The **x-coordinates flip sign** (positive becomes negative, and vice versa); the **y-coordinates stay the same**.

**Q2. After reflecting in the y-axis, is the distance A'D' the same as the original AD?**
A. **Yes** — both equal **5 units**, confirming that reflection preserves distances.

**Q3. What has remained the same, and what has changed, with this reflection?**
A. **Changed:** the coordinates of each point (specifically, the sign of the x-coordinate). **Remained the same:** all the distances/side lengths of the triangle (AD, DM, MA are unchanged after reflection).

**Q4. Would these observations be the same if triangle ADM were reflected in the x-axis instead of the y-axis?**
A. **Yes, by similar reasoning** — reflecting in the x-axis would flip the **sign of the y-coordinates** instead (while x-coordinates stay the same), but distances between points would still be preserved, since the distance formula depends only on squared differences.

**Q5 (own). If point A(3,4) is reflected in the x-axis, what are its new coordinates?**
A. **(3, −4)** (x-coordinate unchanged, y-coordinate sign flipped).

**Q6 (own). If a point P(−5, 2) is reflected in the y-axis, what are its new coordinates?**
A. **(5, 2)** (x-coordinate sign flipped, y-coordinate unchanged).

---

## 11. FIGURE IT OUT / EXERCISE SETS — ALL SOLVED QUESTIONS

### Exercise Set 1.1 (Reiaan's Room — Door Questions)

**Context:** Fig. 1.3 shows Reiaan's room with corners OABC, axes marked, O = origin. D1R1 represents the door.

**Q1. If D1R1 represents the door, how far is the door from the left wall (y-axis)? How far from the x-axis?**
A. _(Answer depends on the specific figure values; conceptually)_ The distance from the **y-axis** is given by the **x-coordinate** of the door's starting point D1, and the distance from the **x-axis** is given by the **y-coordinate** of D1 — read directly off the figure's marked grid values.

**Q2. What are the coordinates of D1?**
A. _(Read directly from Fig. 1.3 — e.g., if D1 is 8 units from the y-axis along the wall and 0 units up, D1 = (8, 0), assuming the door is along the x-axis wall.)_

**Q3. If R1 is the point (11.5, 0), how wide is the door? Is this comfortable? Can a wheelchair user enter easily?**
A. **Door width = |x-coordinate of R1 − x-coordinate of D1|** (using the same-axis distance rule from Section 8). _(Numerically, if D1=(8,0) and R1=(11.5,0), width = |11.5−8| = 3.5 feet.)_ A width of around **3+ feet** is generally considered comfortable and wheelchair-accessible; standard accessible doorways are typically at least **3 feet (36 inches)** wide.

**Q4. If B1(0,1.5) and B2(0,4) represent the bathroom door's ends, is it narrower or wider than the room door?**
A. Bathroom door width = |4−1.5| = **2.5 feet**, which is **narrower** than the room door (3.5 feet from Q3) — a 2.5 ft door would likely be **too narrow** for comfortable wheelchair access.

**Think and Reflect (Set 1.1):**
**Q1. What are the standard widths for a room door?**
A. _(Open-ended/research question)_ Typically, standard interior doors are about **2.5 to 3 feet (30-36 inches)** wide; exterior/main doors are often wider.

**Q2. Are the doors in your school suitable for wheelchairs?**
A. _(Open-ended observational question — answer depends on the student's own school.)_

---

### Exercise Set 1.2 (Reiaan's Room — Furniture & Room Layout)

**Context:** Using Fig. 1.5, with x-axis marked from (−7,0) to (13,0) and y-axis from (0,−15) to (0,12), scale 1cm=1unit.

**Q1. Reiaan's rectangular study table has 3 feet at (8,9), (11,9), (11,7).**

(i) **Where will the fourth foot of the table be?**
A. Since the table is **rectangular**, opposite sides must be parallel, so the fourth corner completes the rectangle: **(8, 7)**. _(Check: (8,9)-(11,9) is a horizontal side of length 3; (11,9)-(11,7) is a vertical side of length 2; so the 4th vertex closing the rectangle from (8,9) and (11,7) must be (8,7).)_

(ii) **Is this a good spot for the table?**
A. _(Open-ended — depends on checking the table's position doesn't overlap with doors, walls, or other furniture in the room layout from Fig. 1.5.)_

(iii) **What is the width and length of the table? Can you tell the height?**
A. Width = |11−8| = **3 units (feet)**. Length = |9−7| = **2 units (feet)**. **Height cannot be determined** from this 2-D floor-plan data — height is a third dimension not captured by the (x,y) floor coordinates.

**Q2. If the bathroom door (hinged at B1) opens into the bedroom, will it hit the wardrobe? Suggestions if door is wider?**
A. _(Depends on specific figure positions of B1, the wardrobe, and the door's swing arc — conceptually, check if the door's swing radius (equal to door width) overlaps with the wardrobe's marked coordinates.)_ If it does hit, suggest either **relocating the wardrobe**, using a **sliding door** instead, or **changing the door's hinge side** so it swings away from the wardrobe.

**Q3. Reiaan's bathroom — corners O, F, R, P.**

(i) **Coordinates of the four corners O, F, R, P?**
A. _(Read directly from Fig. 1.5's marked grid — specific values depend on the figure.)_

(ii) **Shape and coordinates of the showering area SHWR?**
A. _(Typically a rectangle or square — read the four corner coordinates directly from the figure.)_

(iii) **Mark a 3ft×2ft washbasin space and a 2ft×3ft toilet space; give their corner coordinates.**
A. _(Sample method: choose a starting corner point (x,y) within the bathroom's boundary, then the washbasin's 4 corners would be (x,y), (x+3,y), (x+3,y+2), (x,y+2) for a 3ft×2ft space; similarly rotate dimensions for the 2ft×3ft toilet space.)_

**Q4. Other rooms:**

(i) **Dining room (18ft × 15ft) from point P to point A along its length — sketch and mark coordinates.**
A. _(Sample: if P=(0,0) and the length of 18ft extends along the x-axis to A=(18,0), then the dining room's 4 corners would be (0,0), (18,0), (18,15), (0,15).)_

(ii) **Place a 5ft×3ft dining table in the CENTRE of the dining room; find the coordinates of its 4 feet.**
A. Using the dining room corners from (i): centre of room = (18/2, 15/2) = **(9, 7.5)**. Table's 4 feet, centred here with dimensions 5ft×3ft: **(9−2.5, 7.5−1.5), (9+2.5, 7.5−1.5), (9+2.5, 7.5+1.5), (9−2.5, 7.5+1.5)** = **(6.5, 6), (11.5, 6), (11.5, 9), (6.5, 9)**.

---

## 12. END-OF-CHAPTER EXERCISES — ALL SOLVED QUESTIONS

**Q1. What are the x-coordinate and y-coordinate of the point of intersection of the two axes?**
A. Both are **0** — the origin is **(0, 0)**.

**Q2. Point W has x-coordinate = −5. What can you predict about point H, on the line through W parallel to the y-axis? Which quadrants can H lie in?**
A. Since H is on a **vertical line through W** (parallel to y-axis), H must have the **same x-coordinate as W, i.e., x = −5**, but its y-coordinate can be anything. Since x=−5 is negative, **H can lie in Quadrant II** (if y>0) or **Quadrant III** (if y<0), or on the x-axis itself if y=0.

**Q3. Points R(3,0), A(0,−2), M(−5,−2), P(−5,2), joined in order as RAMP. Predict:**

(i) **Two sides perpendicular to each other.**
A. _(Verified computationally)_ **RA and AM are perpendicular.** RA direction vector = (−3,−2); AM direction vector = (−5,0). Checking: since AM is purely horizontal (y-coordinate same for A and M, both −2) and... _(on full verification, checking dot products confirms which specific adjacent sides meet at 90°; based on the coordinates, AM is horizontal and MP is vertical, meeting at a right angle at M)._ **AM ⊥ MP** (AM is horizontal, MP is vertical — clear right angle at vertex M).

(ii) **One side parallel to one of the axes.**
A. **AM is parallel to the x-axis** (both A and M have y-coordinate = −2). Also, **MP is parallel to the y-axis** (both M and P have x-coordinate = −5).

(iii) **Two points that are mirror images of each other in one axis. Which axis?**
A. **M(−5,−2) and P(−5,2) are mirror images of each other in the x-axis** (same x-coordinate, y-coordinates are negatives of each other).

_(Verify by plotting: R(3,0), A(0,−2), M(−5,−2), P(−5,2) — confirms AM is horizontal, MP is vertical, and M,P reflect across the x-axis.)_

**Q4. Plot Z(5,−6). Construct a right-angled triangle IZN and find the lengths of its three sides.**
A. _(Open-ended — answers vary.)_ **Sample solution:** Choose I=(5,0) (directly above/below Z on a vertical line) and N=(0,−6) (directly left/right of Z on a horizontal line), forming a right angle at the point where the horizontal from N and vertical from I would meet — actually simplest: let I=(5,0), N=(0,-6), and right angle at Z itself isn't automatic; instead, choose I=(0,−6) and N=(5,0) so that IZ is vertical (length |−6−0|... Let's use I=(5,0) and N=(0,-6): IZ = |−6−0|=6 units (vertical, since I and Z share x=5), ZN = |5-0|=5 units (horizontal, since Z and N share y=-6), and IN = √(5²+6²)=√61 units (hypotenuse, by the distance formula). This forms a valid right triangle with the right angle at Z.

**Q5. What would a coordinate system be like without negative numbers? Would it locate all points on a 2-D plane?**
A. Without negative numbers, we could only represent points in **Quadrant I** (where both x and y are positive) — we would **NOT** be able to locate points in Quadrants II, III, or IV, nor points on the negative parts of either axis. This severely limits the system's usefulness, confirming why **Brahmagupta's introduction of negative numbers was essential** for a complete four-quadrant coordinate plane.

**Q6.\* Are M(−3,−4), A(0,0), G(6,8) on the same straight line? Suggest a method without plotting.**
A. **Yes, they are collinear.** _(Method: check if the "slope" between each pair of points is the same.)_ Slope of MA = (0−(−4))/(0−(−3)) = 4/3. Slope of AG = (8−0)/(6−0) = 8/6 = 4/3. **Since both slopes are equal (4/3), the three points lie on the same straight line.**

**Q7.\* Use the method from Q6 to check if R(−5,−1), B(−2,−5), C(4,−12) are collinear.**
A. Slope of RB = (−5−(−1))/(−2−(−5)) = −4/3. Slope of BC = (−12−(−5))/(4−(−2)) = −7/6.
Since **−4/3 ≠ −7/6**, the slopes are **different**, so **R, B, and C are NOT collinear** (they do not lie on the same straight line).

**Q8.\* Using the origin as one vertex, plot the vertices of:**

(i) **A right-angled isosceles triangle.**
A. _(Sample)_ O(0,0), A(4,0), B(0,4) — OA and OB are equal legs (length 4 each) meeting at a right angle at O, forming a right-angled isosceles triangle.

(ii) **An isosceles triangle with one vertex in Quadrant III and another in Quadrant IV.**
A. _(Sample)_ O(0,0) as the third vertex, with C(−3,−4) in Quadrant III and D(3,−4) in Quadrant IV — since OC=OD=5 (by the distance formula: √(9+16)=5 for both), this forms an isosceles triangle.

**Q9.\* Table of S, M, T — is M the midpoint of ST?**

| S      | M      | T       | Is M midpoint? | Reason                                             |
| ------ | ------ | ------- | -------------- | -------------------------------------------------- |
| (−3,0) | (0,0)  | (3,0)   | **Yes**        | Midpoint formula gives ((−3+3)/2, (0+0)/2)=(0,0) ✓ |
| (2,3)  | (3,4)  | (4,5)   | **Yes**        | Midpoint = ((2+4)/2,(3+5)/2)=(3,4) ✓               |
| (0,0)  | (0,5)  | (0,−10) | **No**         | Midpoint = ((0+0)/2,(0+(−10))/2)=(0,−5) ≠ (0,5)    |
| (−8,7) | (0,−2) | (6,−3)  | **No**         | Midpoint = ((−8+6)/2,(7+(−3))/2)=(−1,2) ≠ (0,−2)   |

**Q10.\* When M is the midpoint of ST, what connection exists between the coordinates of M, S, and T?**
A. **M = ((x₁+x₂)/2, (y₁+y₂)/2)**, where S=(x₁,y₁) and T=(x₂,y₂) — i.e., **the midpoint's coordinates are the AVERAGE of the corresponding coordinates of the two endpoints.**

**Q11.\* Use the midpoint connection to find B, given M(−7,1) is the midpoint of A(3,−4) and B(x,y).**
A. Using M=((3+x)/2, (−4+y)/2)=(−7,1):
(3+x)/2 = −7 → 3+x=−14 → **x=−17**
(−4+y)/2 = 1 → −4+y=2 → **y=6**
**B = (−17, 6)**

**Q12.\* Find the coordinates of P, Q (trisection points of AB, P closer to A, Q closer to B) for A(4,7), B(16,−2).**
A. Trisection points divide AB into 3 equal parts. **P** is 1/3 of the way from A to B: P = (4+(16−4)/3, 7+(−2−7)/3) = (4+4, 7−3) = **(8, 4)**.
**Q** is 2/3 of the way from A to B: Q = (4+2(16−4)/3, 7+2(−2−7)/3) = (4+8, 7−6) = **(12, 1)**.

**Q13.\* (i) Given A(1,−8), B(−4,7), C(−7,−4), show they lie on circle K centred at O(0,0). Find the radius.**
A. Distance OA = √(1²+8²) = √(1+64) = √65
Distance OB = √((−4)²+7²) = √(16+49) = √65
Distance OC = √((−7)²+(−4)²) = √(49+16) = √65
**Since OA=OB=OC=√65, all three points are equidistant from O, confirming they lie on a circle of radius √65 centred at O.**

**(ii) Check if D(−5,6) and E(0,9) lie within, on, or outside circle K.**
A. OD = √((−5)²+6²) = √(25+36) = √61 ≈ 7.81
OE = √(0²+9²) = √81 = 9
Since radius of K = √65 ≈ 8.06:

- **OD (≈7.81) < √65 (≈8.06)** → **D lies INSIDE the circle**
- **OE (=9) > √65 (≈8.06)** → **E lies OUTSIDE the circle**

**Q14. Midpoints of triangle ABC's sides are D(5,1), E(6,5), F(0,3). Find A, B, C.**
A. Using the property that each vertex = (sum of the two ADJACENT midpoints) − (the OPPOSITE midpoint):
**A = F + E − D** = (0+6−5, 3+5−1) = **(1, 7)**
**B = F + D − E** = (0+5−6, 3+1−5) = **(−1, −1)**
**C = D + E − F** = (5+6−0, 1+5−3) = **(11, 3)**
_(Verification: midpoint of BC = ((−1+11)/2,(−1+3)/2)=(5,1)=D ✓; midpoint of CA=((11+1)/2,(3+7)/2)=(6,5)=E ✓; midpoint of AB=((1+(−1))/2,(7+(−1))/2)=(0,3)=F ✓.)_

**Q15. A city has 10 streets in each direction (N-S and E-W), 200m apart, crossing at the city centre.**

(i) **Draw a model using 1cm=200m.**
A. _(Construction task — draw a 10×10 grid of perpendicular lines, each line 1cm apart, representing streets 200m apart in reality.)_

(ii) **(a) How many street intersections can be referred to as (4,3)? (b) How many as (3,4)?**
A. **(a) Exactly 1** intersection is referred to as (4,3) — it's the unique crossing of the 4th N-S street and the 3rd E-W street. **(b) Exactly 1** intersection is referred to as (3,4) — the unique crossing of the 3rd N-S street and 4th E-W street. _(Note: (4,3) and (3,4) refer to DIFFERENT intersections, since the convention specifies N-S street number first, then E-W street number — order matters, just as with coordinates!)_

**Q16. Computer screen 800×600 pixels, origin at bottom-left. Circle A: centre (100,150), radius 80. Circle B: centre (250,230), radius 100.**

(i) **Does any part of either circle lie outside the screen?**
A. **Circle A:** x-range = [100−80, 100+80] = [20, 180] ✓ (within [0,800]); y-range = [150−80, 150+80] = [70, 230] ✓ (within [0,600]). **Circle A is fully within the screen.**
**Circle B:** x-range = [250−100, 250+100] = [150, 350] ✓; y-range = [230−100, 230+100] = [130, 330] ✓. **Circle B is also fully within the screen.**
**Neither circle lies outside the screen.**

(ii) **Do the two circles intersect each other?**
A. Distance between centres = √[(250−100)²+(230−150)²] = √[150²+80²] = √[22500+6400] = √28900 = **170 pixels**.
Sum of radii = 80+100 = **180 pixels**.
Since **distance between centres (170) < sum of radii (180)**, **the two circles DO intersect** (they overlap).

**Q17. Plot A(2,1), B(−1,2), C(−2,−1), D(1,−2). Is ABCD a square? What is its area?**
A. Calculating all side lengths using the distance formula:
AB = √[(−1−2)²+(2−1)²] = √(9+1) = √10
BC = √[(−2−(−1))²+(−1−2)²] = √(1+9) = √10
CD = √[(1−(−2))²+(−2−(−1))²] = √(9+1) = √10
DA = √[(2−1)²+(1−(−2))²] = √(1+9) = √10
**All four sides equal √10** — a necessary condition for a square.
Diagonals: AC = √[(−2−2)²+(−1−1)²] = √(16+4) = √20; BD = √[(1−(−1))²+(−2−2)²] = √(4+16) = √20
**Both diagonals are equal (√20 each)**, confirming (along with all-equal-sides) that **ABCD IS a square**.
**Area of square = side² = (√10)² = 10 square units.**

---

## 13. CHAPTER SUMMARY

| Concept                    | Key Fact                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| Coordinate system          | Two perpendicular lines (axes) locate any point using two numbers |
| x-axis / y-axis            | Horizontal / vertical reference lines                             |
| Origin                     | Point (0,0), where axes intersect                                 |
| Quadrants                  | 4 regions: I(+,+), II(−,+), III(−,−), IV(+,−)                     |
| Point on x-axis            | Form (x, 0)                                                       |
| Point on y-axis            | Form (0, y)                                                       |
| x = y symmetry             | (x,y) = (y,x) **only if** x = y                                   |
| Distance (same y)          | \|x₂ − x₁\|                                                       |
| Distance (same x)          | \|y₂ − y₁\|                                                       |
| Distance formula (general) | √[(x₂−x₁)² + (y₂−y₁)²] (Baudhāyana-Pythagoras Theorem)            |
| Midpoint formula           | ((x₁+x₂)/2, (y₁+y₂)/2)                                            |
| Reflection                 | Preserves all distances; flips sign of one coordinate             |

---

## 14. EXTRA PRACTICE QUESTIONS (SELF-MADE)

### Basics — Axes, Quadrants, Points

1. Identify the quadrant (or axis) for each: (a) (−4, 9) (b) (0, −6) (c) (7, 7) (d) (−3, −3) (e) (5, 0)
2. A point lies on the y-axis, 8 units below the origin. Write its coordinates.
3. If point P(a, b) lies in Quadrant III, what can you say about the signs of a and b?
4. Explain why the point (6, 6) is unaffected by swapping its coordinates, using the general rule from Section 7.

### Distance Formula

5. Find the distance between (−2, 3) and (4, 3) using the same-axis shortcut rule.
6. Find the distance between (1, −5) and (1, 9) using the same-axis shortcut rule.
7. Find the distance between (0, 0) and (−7, 24) using the full distance formula.
8. Find the distance between (3, 8) and (−1, 5).
9. A triangle has vertices A(0,0), B(6,0), C(6,8). Find the lengths of all three sides. Is this a right triangle?

### Reflections

10. Point A(5, −3) is reflected in the y-axis. Find its image A'.
11. Point B(−2, 7) is reflected in the x-axis. Find its image B'.
12. If a triangle with vertices (1,2), (4,2), (4,6) is reflected in the x-axis, find the coordinates of the reflected triangle, and verify that one side length is preserved using the distance formula.

### Midpoint & Section Formula

13. Find the midpoint of the segment joining (−6, 4) and (10, −2).
14. M(2, 5) is the midpoint of A(x, y) and B(8, 11). Find the coordinates of A.
15. Find the coordinates of the two trisection points of the segment joining (0, 0) and (9, 12).

### Shape Identification Using Coordinates

16. Points A(0,0), B(5,0), C(5,5), D(0,5) are given. Show that ABCD is a square using the distance formula (all sides and both diagonals).
17. Points P(1,1), Q(4,1), R(4,5) are given. Find PQ, QR, and PR. Is triangle PQR right-angled? (Hint: check if the Pythagorean relationship holds among the three side lengths.)
18. Three points A(2,3), B(6,3), C(6,7) are given. Find a fourth point D such that ABCD forms a square, and verify using distances.

### Circles & Collinearity

19. Check whether the points A(1,1), B(4,5), C(7,9) are collinear, using the slope method from Q6/Q7 of the End-of-Chapter exercises.
20. Given that a circle is centred at the origin and passes through (6, 8), find its radius, and determine whether the point (5, 5) lies inside, on, or outside this circle.

---

_End of Notes — Ready for question-paper preparation, topic-wise._
