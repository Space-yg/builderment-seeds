# SelfMap

Create a map that maps a unique property in objects to the objects themselves.

## Installation

Using `npm`:

```cmd
npm install selfmap
```

Using `pnpm`:

```cmd
pnpm add selfmap
```

Using `yarn`:

```cmd
yarn add selfmap
```

## Example

```typescript
import SelfMap from "selfmap"

type User = {
	id: number // Always unique
	name: string
	age: number
}

const ahmed: User = { id: 1, name: "Ahmed", age: 18 }
const sara: User = { id: 2, name: "Sara", age: 20 }
const bob: User = { id: 3, name: "Bob", age: 25 }

const Users = new SelfMap<User, "id">([ahmed, sara, bob], "id")
```

Now that we created the map, we can do stuff with it like this:

```typescript
console.log(Users.get(2))
// -> { id: 2, name: 'Sara', age: 20 }

sara.id = 4

console.log(Users.get(2))
// -> undefined
console.log(Users.get(4))
// -> { id: 4, name: 'Sara', age: 20 }
```

As you can see, the key of `sara` changed automatically when the Sara's `id` changed. This is what makes this map unique.

Everything else though, we can do pretty much the same things as with a normal JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):

```typescript

const yousef: User = { id: 4, name: "Yousef", age: 30 }

Users.add(yousef) // Adds an object to the map
Users.print() // Prints the map
// SelfMap(3) {
//   1 => { id: 1, name: 'Ahmed', age: 18 }
//   4 => { id: 4, name: 'Yousef', age: 30 }
//   3 => { id: 3, name: 'Bob', age: 25 }
// }

Users.delete(1) // Deletes a user from the object
Users.print()
// SelfMap(3) {
//   4 => { id: 4, name: 'Yousef', age: 30 }
//   3 => { id: 3, name: 'Bob', age: 25 }
// }

console.log(Users.has(2)) // Check if the key 2 is in the map
// -> false
console.log(Users.has(yousef)) // Checks if the object yousef is in the map
// -> true

console.log(Users.size) // Size of the map
// -> 2

console.log(Users.uniqueProperty); // Get the unique property used as the keys in the map
// -> "id"

Users.clear() // Clears the map
Users.print()
// SelfMap(0) {}

// Others
Users.entries() // Gets all entries of the map
Users.values() // Gets all values of the map
Users.keys() // Gets all keys of the map
Users.forEach(ele => console.log(ele)) // Loop over all values in the map
Users.toString() // Converts the map to string
Users.log() // Alias to print method
```