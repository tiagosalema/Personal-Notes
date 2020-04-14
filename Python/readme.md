# Lists

## Create



```python
range(6)	   																				# [0, 1, 2, 3, 4, 5]
[4:14:2]																						# [4, 6, 8, 10, 12]
```

### List comprehension

```python
[x for x in range(1, 6)] 														# [1, 2, 3, 4, 5]
[x * 2 for x in range(1, 6)]												# [2, 4, 6, 8, 10]
[x * 2 for x in range(1, 6) if (x * 2) % 3 == 0]		# [6]
```

### List Slicing

```python
my_list = [i ** 2 for i in range(1, 11)]				# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
my_list[2:9:2]																	# [9, 25, 49, 81]

new_list = range(10)														# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
new_list[3:]																		# [3, 4, 5, 6, 7, 8, 9]
new_list[:2]																		# [0, 1]
new_list[::2]																		# [0, 2, 4, 6, 8]
new_list[::-1]																	# [9, 8, 7, 6, 5, 4, 3, 2, 1]
```



---

# Anonymous Functions

```python
filter(lambda x: x % 3 == 0, range(16))					# [0, 3, 6, 9, 12, 15]
```

The lambda function we see above is the equivalent of a function declaration that returns the the result of what's to the right of the colon, being the argument `x` the value passed by each item in the list to the right of the lambda function. Lambda functions allow, then, the direct use of a function as an argument without having to declare it. That's why they are called anonymous functions (because they weren't declared).



# Dictionaries

```python
movies = {
  "007": 10,
  "X-Men": 6,
  300: "Okay"
}

movies.items()								# [(300, 'Okay'), ('X-Men', 6), ('007', 10)]
movies.keys()									# [300, 'X-Men', '007']
movies.values() 							# ['Okay', 6, 10]
```

The values aren't printed in any specific order. Note that what was returned from `items()` is a tuple i.e. an unmuttable list.k



# Classes

```python
class Point3D(object):
  def __init__(self,x,y,z):
    self.x = x
    self.y = y
    self.z = z
  def __repr__(self):
    return "(%d, %d, %d)" % (self.x, self.y, self.z)

my_point = Point3D(1,2,3)

print my_point 											# (1,2,3)
```



Class attributes:

```python
class Sample:
    pass
dir(Sample())
```

```
[
 '__class__',
 '__delattr__',
 '__dict__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__gt__',
 '__hash__',
 '__init__',
 '__init_subclass__',
 '__le__',
 '__lt__',
 '__module__',
 '__ne__',
 '__new__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__setattr__',
 '__sizeof__',
 '__str__',
 '__subclasshook__',
 '__weakref__'
]
```



# File Input and Output (I/O)

```python
f = open("output.txt", "w")
f.write("hello world")
f.close()
```

This code creates the file `output.txt` and writes in it `hello world`.

+ `"w"` write-only mode
+ `"r"` read only mode
+ `"r+"` read and write mode
+ `"a"` append mode

```python
f.read()
```

will read what's in the file.

```python
f.readline()
```

Will read the first line of the file `f`. If called again, it will read again (and so on).

## with /as

There's a way that we implicitly close a file when we're done. That is by just temporarily opening it by using the `with` / `as` statement:

```python
with open("text.txt", "w") as textfile:
  textfile.write("Success!")
  
# It's not necessary to call textfile.close()		:)
```

# Start a web server

This snippet will serve the contents of the current directory

```bash
python3 -m http.server
```



# Ternary operator

```python
x = "Success!" if (y == 2) else "Failed!"
```



# Libraries

  ## Itertools

### groupby

`for list1,list2 in groupby(list,function)`

+ `list1` contains all the returned values of `function` applied to each element of `list` (not repeated, naturally)
+ ` list2` is a "modified `list`". The only difference, really, is that its elements are now grouped into lists. All the elements inside `list2[i]` will have in common the value `list1[i]`.

```python
arr = [(1, "A"), (1, "B"), (1, "C"), (2, "D"), (2, "E"), (3, "F")]

for k,g in groupby(arr, lambda x: x[0]):
    print("--", k, "--")
    for tup in g:
        print(tup[1])  # tup[0] == k
```

```
-- 1 --
A
B
C
-- 2 --
D
E
-- 3 --
F
```

