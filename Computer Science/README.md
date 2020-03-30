# Big O

Describes the complexity of an algorithm. To know how complex an algorithm is, we assess the worst case scenario for that algorithm. Big O is about how well a program scales.

| Notation     | O(_)    | Examples                                                     |
| ------------ | ------- | ------------------------------------------------------------ |
| constant     | 1       | Stack, pop, insert node into linked list                     |
| Logarithmic  | log n   | Sorted list binary search, binary tree search                |
| Linear       | n       | Count items, compare lists                                   |
| Linearithmic | n log n | Merge sort, quicksort                                        |
| Quadratic    | n^2     | Bubble sort, selection sort, insertion sort, transverse a 2D array |
| Polynomial   | n^k     |                                                              |
| Exponential  | k^n     | n-Queens problem, travelling salesman                        |

Logarithmic notation means that duplicating the sample amount will result in one more iteration.

# Algorithms

## Sort

### Bubble sort - O(n^2)

1. Compare first and second items.
2. If they are not ordered => order
3. Compare second and third items.
4. ...
5. Once the end of the list is reached, go back to 1. and repeat.
6. The loop will finish only when all pairs are compared without any swap taking place.

#### 	Enhanced bubble sort  O(n^2)

Notice that after the first loop, the largest number will be at the right of the list. This means that, for the next loop, it's not necessary to go the whole way until the element (n-1), but until the element (n-2).

### Insertion sort

### Merge sort - O(n log n)

1. Split the list into 2 lists
2. Split each of the sub-lists into 2 other sub-lists
3. Continue until there are only 'lists' of 1 item
4. Merge back each sub-list into an ordered list

### Median Values

### Quicksort 

+ Time - O(n^2) - for the worst pivot selection
+ Spacious complexity - O(n) - it's space efficient, since the data is sorted in place i.e. the data is put into the original list that it came from, but in a sorted way.

Since it's  recursive, the worst case scenario is building a stack as big as the number of items in the list.

1. Select an item from the list (the pivot). It can be the left-most item of the list.
2. Loop through the rest of the list, sending the smaller items to the left of the pivot and the bigger ones to the right
3. For both sub-lists, repeat from 1. (recursive)
4. Finish when all sub-list have length = 1.

The worst-case scenario is sorting an ordered list and always taking the left-most element as pivot.



## Search

### Binary search - O(log n)

If the data is already sorted:

1. Take the element in the middle of the list and compare it with ours.
   + If the element is smaller than ours, discard all elements to its left.
   + Discard all the elements to its right otherwise.
2. Repeat until the list is just one element.

### Breadth-First Search

Search for the closest path between 2 nodes by looping through all neighbors of one node first, inserting them on a queue, so that their neighbors are search after.

**Pseudocode**

```
procedure BFS(G, start_v) is  
  let Q be a queue
  label start_v as discovered
  Q.enqueue(start_v)
  while Q is not empty do
    v := Q.dequeue()
    if v is the goal then
      return v
    for all edges from v to w in G.adjacentEdges(v) do
      if w is not labeled as discovered then
        label w as discovered
        w.parent := v
        Q.enqueue(w)
```

+ **Input**: A graph *Graph* and a *starting vertex* *root* of *Graph*
+ **Output**: Goal state. The *parent* links trace the shortest path back to *root*

### Depth-First Search

Opposite strategy as breadth-first search. It explores the node branch as far as possible before being forced to backtrack and expand other nodes.

**Pseudocode**

<u>Recursive</u>

```
procedure DFS(G, v) is
  label v as discovered
  for all directed edges from v to w that are in G.adjacentEdges(v) do
    if vertex w is not labeled as discovered then
      recursively call DFS(G, w)
```

<u>Non-recursive</u>

```
procedure DFS-iterative(G, v) is
  let S be a stack
  S.push(v)
  while S is not empty do
    v = S.pop()
    if v is not labeled as discovered then
      label v as discovered
      for all edges from v to w in G.adjacentEdges(v) do 
        S.push(w)
```

+ **Input**: A graph G and a vertex v of G
+ **Output**: All vertices reachable from v labeled as discovered



## Shortest path

### Dijkstra’s Algorithm

+ Greedy algorithm because it visits the next vertex with the smallest known distance from the start vertex (we could select any, but selecting the closest one to the start we will presumably get to the end more quickly). This is desirable if we intend to find the shortest path from a starting point to all of the others.

[This](https://www.youtube.com/watch?v=pVfj6mxhdMw&list=PLTd6ceoshprdS7HVI-Yus4rAHtrqNzH0j&index=20) video explains how to apply this algorithm.

### A* Pathfinding Algorithm

+ Best to find best path between **2 particular vertices**.
+ Enhancement of Dijkstra’s algorithm, albeit potentially more efficient.
+ Ideally won't visit all vertices
+ Picks the most promising node based on heuristics i.e. a previous estimation of how far that node is to the destination node
+ The better the heuristics for all nodes, the faster the path is going to be found
+ The heuristic is problem specific
+ Will always find a solution, if it exists

[This](https://www.youtube.com/watch?v=eSOJ3ARN5FM&list=PLTd6ceoshprdS7HVI-Yus4rAHtrqNzH0j&index=22) video explains how to apply this algorithm.

## String matching algorithms

### Basic/Naive algorithm

Will compare both pattern and string characters until they both match completely. Every time there's a mismatch, a new set of comparisons is started between the very first character of the pattern and the character after the first one on the previous string comparison.

### KMP (Knuth-Morris-Pratt)

Builds a table called π or lps (longest prefix [that matches a] sufix). For example:

| **a** |  b   |  c   |  d   | <u>a</u> | <u>b</u> |  e   | <u>a</u> | <u>b</u> | f    |
| :---: | :--: | :--: | :--: | :------: | :------: | :--: | :------: | :------: | ---- |
|   0   |  0   |  0   |  0   |    1     |    2     |  0   |    1     |    2     | 0    |

|  a   |  b   |  c   |  d   |  e   |  a   |  b   |  f   |  a   |  b   |  c   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  0   |  0   |  0   |  0   |  0   |  1   |  2   |  0   |  1   |  2   |  3   |

|  a   |  a   |  a   |  a   |  b   |  a   |  a   |  c   |  d   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  0   |  1   |  2   |  3   |  0   |  1   |  2   |  0   |  0   |



[How to apply this algorithm](https://youtu.be/V5-7GzOfADQ?t=750)

### Rabin-Karp algorithm

This algorithm numerically sums all the characters in the pattern and compares that sum with the one of sections of the reference string. This is benefitial because it is not necessary to compare each character, one by one. 

To avoid unfortunate mismatches (technically called spurious hits) i.e. `if a=1, b=2, c=3 => ac ≡ bb ≡ 4` one can make a weighted sum `ac ≡ 10¹⋅1 + 10⁰⋅3 = 13 ≢ bb ≡ 10¹⋅2 + 10⁰⋅2 = 22`.

The base of the formula was `10` in this example for simplicity. It should be as big as the number of characters that there are in both the pattern and reference string.

+ If all the characters (lowercase) ⇒ `26`,
+ lowercase + uppercase ⇒ `52`,
+ all algarisms ⇒ `10`
+ All of the above ⇒ `62`
+ With symbols ⇒ `Phew`

This method can get get quite expensive, as seen in the last 2 examples of the above list. It can be the case that the resulting sum will be bigger than what the computer can deal with. In such cases, you might want to apply `mod` upon the obtained sum `sum % x`, where `x` is the maximum size of your data type. Be wary that mod might increase the amount of sporious hits.

As a final note, it is not necessary to sum on each iteration over the reference string. It is only necessary to:

1. subtract the weighted value of the first characther
2. multiply the result of the subtration by the weight factor (so that each element gets an increased weight)
3. add the next element

# Data Structures

## Array list

## Linked list

## Binary Tree

It's a dynamic data structure that allows efficient sorting and searching. Each of the items in the tree is known as node.

Types of nodes:

+ Root node - the first one i.e. the one at the top
+ Terminal / leaf node - have no children

There is an interesting relation between the nodes and their position in the sorted array. For an item with index `i`:

+ its left child node has index `2i`
+ its right child node has index `2i + 1`
+ its parent node has index `i / 2` 

In OOP, each node will be built as `{ node_id, { left_child_id, right_child_id } }`. If the node has no left / right child, their ids will be 0.

### Binary Search Tree

How to construct a tree:

1. Place the first element at the top.
2. Take the second element and compare it to the first.
   + If bigger - place it to the right
   + Put it to left otherwise
3. Take third element and repeat 2
   + If it goes to an empty position, place it there
   + Recursive if otherwise

### Heap

It's possible to organize a tree in a way that a node is bigger (max heap) or smaller (min heap) than both children. There is no rule as to which child should be placed on the left / right.

#### Heap creation

For each item of the array:

1. Insert the leaf at t (leafs are inserted from left to right)

#### Node deletion

The standard element to be deleted on heap is the element at the root node. That means that the element being deleted will be the maximum if it's a max heap, and the minimum element if it's a min heap.

The last element of the tree will be put into the root. Then, if necessary, it will be swapped by one of the childs so that it continues being max / min heap. Continue swapping with the new children until it is the heap it originally was.

### AVL Tree

![img](https://camo.githubusercontent.com/fa696e8874d67cb7b8a4af1bf8ea37d4f27106ce/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f662f66642f41564c5f547265655f4578616d706c652e676966)

+ named after Adelson-Velsky and Landis
+ self-balancing binary search tree
+ the heights of the two child subtrees of any node differ by at most one
+ if they differ by more than one, rebalancing is done. Lookup, insertion, and deletion all take `O(log n)` time in both the average and worst cases, where n is the number of nodes in the tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.



#### Rotations

##### LL

![Left-Left Rotation](https://camo.githubusercontent.com/3478d784c4f30116de0b370dd24e4add6706814f/687474703a2f2f6274656368736d617274636c6173732e636f6d2f646174615f737472756374757265732f64735f696d616765732f4c4c253230526f746174696f6e2e706e67)

##### RR

![Right-Right Rotation](https://camo.githubusercontent.com/13537dc13be798a9fc6450dd576ae1ce3af9e5ba/687474703a2f2f6274656368736d617274636c6173732e636f6d2f646174615f737472756374757265732f64735f696d616765732f5252253230526f746174696f6e2e706e67)

##### RL

![Right-Right Rotation](https://camo.githubusercontent.com/7aa5ad4d208218243223ef54a68d1496cd14cc6e/687474703a2f2f6274656368736d617274636c6173732e636f6d2f646174615f737472756374757265732f64735f696d616765732f524c253230526f746174696f6e2e706e67)



[Video illustrating how to apply rotations](https://www.youtube.com/watch?v=jDM6_TnYIqE)

### Red-Black Tree

### Segment Tree

Fenwick Tree



Not as strict as AVL tree.

## Hash table

# Programming Paradigms

+ Imperative programming (C, C++, Java, Fortran)
  + Procedural programming
  + Object-oriented programmSSWing
  + Parallel computing
    + Bit-level parallelism
+ Declarative programming (HTML, React, Regex)
+ Functional programming
+ Logic programming
+ Structured programming
+ Generic programming
+ Encapsulation
+ Modular programming
  + Concurrent computing
    + Actor model
+ Event-driven programming
+ Comparison of multi-paradigm programming languages
+ Reactive programming
+ Aspect-oriented programming
+ Data-driven programming
+ Visual programming language
+ Lazy evaluation
+ Prototype-based programming
+ Dynamic programming language
+ Function-level programming
+ Stack-oriented programming
+ Role-oriented programming
+ Concatenative programming language
+ Array programming
+ Agent-oriented programming
+ Type inference
+ Dataflow programming
+ Markup language
+ Multi-agent system
+ Interpreted language
+ Compiled language
+ Design by contract
+ Dependent type
+ Combinatory logic
+ Stream processing
+ Self-modifying code
+ Strong typing
+ Knowledge-based systems
+ Educational programming language
+ Operator
+ Web framework

## OOP vs. FP

One main difference between functional programming (FP) and object-oriented programming (OOP) is the way abstraction is applied. A common practice in OOP is to limit abstraction to the strict useful minimum for the problem at hand. In OOP, premature abstraction is often considered a fault, much as premature optimization.

In FP, on the other hand, abstraction is generally pushed as far as possible. Every problem is broken into a series of the simplest possible functions, which are then composed to build the problem solution. Identifying these abstractions is generally the most important part of problem resolution. In fact, FP programmers often spend more time trying to find what problem they should solve than solving them. And of course, it generally appears that these functions are the same from one problem to the next. Only the way they are composed is different. This is the reason why abstraction is one of the most valued techniques used by FP programmers.

## FP

A subset of declarative programming. Uses functions like `.map`, `.reduce` and `.filter`.

## Declarative vs. Imperative programming

Imperative programming is like *how* you do something, and declarative programming is more like *what* you do.

**An imperative approach (HOW)**: “I see that table located under the Gone Fishin’ sign is empty. My husband and I are going to walk over there and sit down.”

**A declarative approach (WHAT)**: “Table for two, please.”

The imperative approach is concerned with **HOW** you’re actually going to get a seat. You need to list out the steps to be able to show **HOW** you’re going to get a table. The declarative approach is more concerned with **WHAT** you want, a table for two.

“I’m right next to Wal-Mart. How do I get to your house from here?”

**Imperative response**: Go out of the north exit of the parking lot and take a left. Get on I-15 North until you get to the 12th street exit. Take a right off the exit like you’re going to Ikea. Go straight and take a right at the first light. Continue through the next light then take your next left. My house is #298.

**Declarative response**: My address is 298 West Immutable Alley, Eden, Utah 84310

For the declarative paradigm, it was assumed that the one receiving instructions knows what to do and has the right tools for it. Declarative approaches have an underlying imperative abstraction.

###### References

+ [tylermcginnis.com/imperative-vs-declarative-programming/](https://tylermcginnis.com/imperative-vs-declarative-programming/)

## Parallel Computing

Type of computation in which many calculations are carried out simultaneously whose results are combined upon completion. Large problems can often be divided into smaller ones, which can then be solved at the same time. As power consumption (and consequently heat generation) by computers has become a concern in recent years, parallel computing has become the dominant paradigm in computer architecture, mainly in the form of multi-core processors.

Closely related to concurrent computing. They are frequently used together, and often conflated, though the two are distinct (it's possible to have one without the other e.g.  bit-level parallelism or multitasking by time-sharing on a single-core CPU). The major contrast with concurrent computing is that, in the latter, the various processes often do not address related tasks. When they do, as is typical in distributed computing, the separate tasks may have a varied nature and often require some inter-process communication during execution.

## Modular Programming

Emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality. A module interface expresses the elements that are required (input) and provided (output) by the module. The elements defined in the interface are detectable by other modules. 

Closely related to structured programming and OOP (same goal of facilitating construction of large software programs and systems by decomposition into smaller pieces).

### Concurrent Computing

A form of computing in which several computations are executed concurrently i.e. during overlapping time periods; instead of sequentially i.e. with one completing before the next starts. A concurrent system is one where a computation can advance without waiting for all other computations to complete.

# Design Patterns



# Prime numbers search

Prime Sieves are algorithms that find all prime numbers lower than a given number N.

## Sieve of Eratosthenes

1. i = 2
2. Add i to the list of prime numbers
3. Cross out all multiples of i < N
4. i++
5. Take the first number that isn't crossed out
6. Go back to 3

## Sieve of Sundaram

1. i = 1
2. x = i; y = i
3. Cross out `res = x + y + 2xy`
   + if `res > N`
     + `if x == y` go to 4
     + else `i++` ; repeat 2
   + `else x++`; repeat 3
4. For every number, n, that isn't crossed out: `new prime nr = 2n + 1`

## Sieve of Atkin



