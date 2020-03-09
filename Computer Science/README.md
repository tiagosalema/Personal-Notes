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

## Shortest path

### Dijkstra’s Algorithm

+ Greedy algorithm because it visits the next vertex with the smallest known distance from the start vertex (we could select any, but selecting the closest one to the start we will presumably get to the end more quickly). This is desirable if we intend to find the shortest path from a starting point to all of the others.

[This](https://www.youtube.com/watch?v=pVfj6mxhdMw&list=PLTd6ceoshprdS7HVI-Yus4rAHtrqNzH0j&index=20) video explains how to apply this algorithm.

### A* Pathfinding Algorithm

+ It's an enhancement of Dijkstra’s algorithm, but potentially more efficient.
+ Better choice when we want to find the closest path between **2 particular vertices**.
+ Ideally won't visit all vertices
+ Picks the most promising node based on heuristics i.e. a previous estimation of how far that node is to the destination node
+ The better the heuristics for all nodes, the faster the path is going to be found
+ The heuristic is problem specific
+ Will always find a solution, if it exists

[This](https://www.youtube.com/watch?v=eSOJ3ARN5FM&list=PLTd6ceoshprdS7HVI-Yus4rAHtrqNzH0j&index=22) video explains how to apply this algorithm.

# Data Structures

## Array list

## Linked list

## Binary Tree

It's a dynamic data structure that allows efficient sorting and searching. Each of the items in the tree is known as node.

Types of nodes:

+ Root node - the first one i.e. the one at the top
+ Terminal / leaf node - have no children

How to construct a tree:

1. Place the first element at the top.
2. Take the second element and compare it to the first.
   + If bigger - place it to the right
   + Put it to left otherwise
3. Take third element and repeat 2
   + If it goes to an empty position, place it there
   + Recursive if otherwise

Each node will have an id and a pair of numbers:

+ `{ 0, 0 }` if it has no children

+ `{ id_left, 0 }` if it has a left child with id `id_left` 

+ etc.

  

### AVL Tree

[How to apply rotations.](https://www.youtube.com/watch?v=jDM6_TnYIqE)

### Red-Black Tree

Not as strict as AVL tree.

## Hash table

# Programming Paradigms

## Object Oriented Programming (OOP)

## Functional Programming

### Map

### Reduce

### Filter



# Design Patterns

