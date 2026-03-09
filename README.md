# JavaScript Concepts

## 1️⃣ Difference between `var`, `let`, and `const`

|               | `var`    | `let`       | `const`     |
| ------------- | -------- | ----------- | ----------- |
| **Scope**     | Function | Block `{ }` | Block `{ }` |
| **Redeclare** | ✅ Yes   | ❌ No       | ❌ No       |
| **Update**    | ✅ Yes   | ✅ Yes      | ❌ No       |

- **`var`** — Old way to declare variables. Function scoped. Can be redeclared and updated.
- **`let`** — Modern way to declare variables. Block scoped (`{ }`). Can be updated but cannot be redeclared in the same scope.
- **`const`** — Used for values that should not change. Block scoped. Cannot be updated or redeclared.

**Example:**

```js
var a = 10;
let b = 20;
const c = 30;
```

---

## 2️⃣ What is the Spread Operator (`...`)?

The spread operator (`...`) is used to expand elements of an array or object.

**Example:**

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];

console.log(arr2); // [1, 2, 3, 4]
```

It is commonly used for:

- Copying arrays
- Merging arrays
- Copying objects

---

## 3️⃣ Difference between `map()`, `filter()`, and `forEach()`

- **`map()`** — Creates a new array and transforms each element.

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);
```

- **`filter()`** — Creates a new array with elements that pass a condition.

```js
const nums = [1, 2, 3, 4];
const even = nums.filter((n) => n % 2 === 0);
```

- **`forEach()`** — Loops through the array. Does **not** return a new array.

```js
nums.forEach((n) => console.log(n));
```

---

## 4️⃣ What is an Arrow Function?

An arrow function is a shorter way to write functions in JavaScript.

**Normal function:**

```js
function add(a, b) {
  return a + b;
}
```

**Arrow function:**

```js
const add = (a, b) => a + b;
```

It makes the code shorter and cleaner.

---

## 5️⃣ What are Template Literals?

Template literals allow you to insert variables inside strings using backticks `` ` ``.

**Example:**

```js
const name = "Khalid";
const message = `Hello ${name}`;
```

**Output:**

```
Hello Khalid
```

They make string formatting easier.
