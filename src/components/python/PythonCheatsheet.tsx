"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Code2,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Hash,
  Target,
  Zap,
  Brain,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

// =============================================================================
// PYTHON SYNTAX HIGHLIGHTER
// =============================================================================

const pythonKeywords = [
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
  'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  'True', 'False', 'None'
];

const pythonBuiltins = [
  'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set',
  'tuple', 'bool', 'type', 'input', 'open', 'file', 'abs', 'all', 'any',
  'bin', 'chr', 'ord', 'dir', 'divmod', 'enumerate', 'eval', 'exec',
  'filter', 'format', 'frozenset', 'getattr', 'setattr', 'delattr',
  'globals', 'locals', 'hasattr', 'hash', 'help', 'hex', 'id', 'isinstance',
  'issubclass', 'iter', 'map', 'max', 'min', 'next', 'object', 'oct',
  'pow', 'repr', 'reversed', 'round', 'slice', 'sorted', 'sum', 'super',
  'vars', 'zip', 'callable', 'classmethod', 'staticmethod', 'property',
  'compile', 'complex', 'memoryview', 'bytearray', 'bytes', 'ascii',
  'breakpoint', '__import__'
];

const highlightPythonCode = (code: string): React.ReactNode[] => {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let tokenIndex = 0;

    while (remaining.length > 0) {
      let matched = false;

      // Match comments (# ...)
      const commentMatch = remaining.match(/^(#.*)/);
      if (commentMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-slate-500 italic">
            {commentMatch[1]}
          </span>
        );
        remaining = remaining.slice(commentMatch[1].length);
        matched = true;
        continue;
      }

      // Match triple-quoted strings
      const tripleStringMatch = remaining.match(/^("""[\s\S]*?"""|'''[\s\S]*?''')/);
      if (tripleStringMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-amber-600">
            {tripleStringMatch[1]}
          </span>
        );
        remaining = remaining.slice(tripleStringMatch[1].length);
        matched = true;
        continue;
      }

      // Match f-strings
      const fstringMatch = remaining.match(/^(f["'][^"']*["'])/);
      if (fstringMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-amber-600">
            {fstringMatch[1]}
          </span>
        );
        remaining = remaining.slice(fstringMatch[1].length);
        matched = true;
        continue;
      }

      // Match strings
      const stringMatch = remaining.match(/^("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/);
      if (stringMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-amber-600">
            {stringMatch[1]}
          </span>
        );
        remaining = remaining.slice(stringMatch[1].length);
        matched = true;
        continue;
      }

      // Match numbers (including floats, negative, scientific notation)
      const numberMatch = remaining.match(/^(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/);
      if (numberMatch && !/^[a-zA-Z_]/.test(remaining.charAt(numberMatch[1].length))) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-cyan-700">
            {numberMatch[1]}
          </span>
        );
        remaining = remaining.slice(numberMatch[1].length);
        matched = true;
        continue;
      }

      // Match identifiers (keywords, builtins, variables)
      const identMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (identMatch) {
        const word = identMatch[1];
        let className = "text-slate-800"; // default for variables

        if (pythonKeywords.includes(word)) {
          className = "text-purple-700 font-semibold";
        } else if (pythonBuiltins.includes(word)) {
          className = "text-blue-700";
        }

        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className={className}>
            {word}
          </span>
        );
        remaining = remaining.slice(word.length);
        matched = true;
        continue;
      }

      // Match operators and punctuation
      const operatorMatch = remaining.match(/^([+\-*/%=<>!&|^~@:.,;()\[\]{}]+)/);
      if (operatorMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-pink-600">
            {operatorMatch[1]}
          </span>
        );
        remaining = remaining.slice(operatorMatch[1].length);
        matched = true;
        continue;
      }

      // Match whitespace
      const spaceMatch = remaining.match(/^(\s+)/);
      if (spaceMatch) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`}>
            {spaceMatch[1]}
          </span>
        );
        remaining = remaining.slice(spaceMatch[1].length);
        matched = true;
        continue;
      }

      // Fallback: single character
      if (!matched) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className="text-slate-800">
            {remaining[0]}
          </span>
        );
        remaining = remaining.slice(1);
      }
    }

    return (
      <React.Fragment key={lineIndex}>
        {tokens}
        {lineIndex < lines.length - 1 && '\n'}
      </React.Fragment>
    );
  });
};

// Syntax highlighted code block component
const PythonCodeBlock = ({ code }: { code: string }) => (
  <pre className="mt-3 overflow-x-auto rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-mono leading-relaxed text-slate-900 shadow-[var(--shadow-sm)] dark:border-slate-300">
    <code>{highlightPythonCode(code)}</code>
  </pre>
);

// =============================================================================
// DATA: All Python Functions
// =============================================================================

interface PythonFunction {
  id: number;
  name: string;
  title: string;
  description: string;
  example?: string;
}

// Section A: Fundamental Python Built-ins (1-35)
const fundamentalFunctions: PythonFunction[] = [
  {
    id: 1, name: 'len()', title: 'Get the number of items in an object', description: 'Returns the length (number of items) of an object. Works with strings, lists, tuples, dictionaries, and sets.', example: `# Examples of len()
name = "Python"
print(len(name))        # Output: 6

numbers = [1, 2, 3, 4, 5]
print(len(numbers))     # Output: 5

student = {"name": "John", "age": 20}
print(len(student))     # Output: 2` },
  {
    id: 2, name: 'max()', title: 'Return the largest item', description: 'Returns the largest item in an iterable or the largest of two or more arguments.', example: `# Examples of max()
numbers = [3, 1, 4, 1, 5, 9, 2]
print(max(numbers))     # Output: 9

print(max(10, 25, 5))   # Output: 25

words = ["apple", "banana", "cherry"]
print(max(words))       # Output: cherry (alphabetically)` },
  {
    id: 3, name: 'min()', title: 'Return the smallest item', description: 'Returns the smallest item in an iterable or the smallest of two or more arguments.', example: `# Examples of min()
numbers = [3, 1, 4, 1, 5, 9, 2]
print(min(numbers))     # Output: 1

print(min(10, 25, 5))   # Output: 5

words = ["apple", "banana", "cherry"]
print(min(words))       # Output: apple` },
  {
    id: 4, name: 'sum()', title: 'Return the sum of all items', description: 'Returns the sum of all items in an iterable. Optional start parameter adds to the sum.', example: `# Examples of sum()
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))         # Output: 15

print(sum(numbers, 10))     # Output: 25 (starts from 10)

# Sum of range
print(sum(range(1, 101)))   # Output: 5050` },
  {
    id: 5, name: 'sorted()', title: 'Return a sorted list', description: "Returns a new sorted list from the items in an iterable. Doesn't modify the original.", example: `# Examples of sorted()
numbers = [3, 1, 4, 1, 5, 9]
print(sorted(numbers))      # Output: [1, 1, 3, 4, 5, 9]

words = ["banana", "apple", "cherry"]
print(sorted(words))        # Output: ['apple', 'banana', 'cherry']

# Sort descending
print(sorted(numbers, reverse=True))  # Output: [9, 5, 4, 3, 1, 1]` },
  {
    id: 6, name: 'reversed()', title: 'Return a reversed iterator', description: 'Returns a reversed iterator. Convert to list to see the result.', example: `# Examples of reversed()
numbers = [1, 2, 3, 4, 5]
print(list(reversed(numbers)))  # Output: [5, 4, 3, 2, 1]

word = "Python"
print(''.join(reversed(word)))  # Output: nohtyP

# Using in a loop
for i in reversed(range(5)):
    print(i)  # 4, 3, 2, 1, 0` },
  {
    id: 7, name: 'enumerate()', title: 'Return index and value pairs', description: 'Returns an enumerate object that produces pairs of index and value when iterating.', example: `# Examples of enumerate()
fruits = ['apple', 'banana', 'cherry']

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana
# 2: cherry

# Start from 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")` },
  {
    id: 8, name: 'range()', title: 'Generate a sequence of numbers', description: 'Generates a sequence of numbers. Commonly used in for loops.', example: `# Examples of range()
print(list(range(5)))       # Output: [0, 1, 2, 3, 4]
print(list(range(2, 8)))    # Output: [2, 3, 4, 5, 6, 7]
print(list(range(0, 10, 2)))# Output: [0, 2, 4, 6, 8]

# Loop 5 times
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Countdown
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1` },
  {
    id: 9, name: 'all()', title: 'True if all items are True', description: 'Returns True if all elements in the iterable are true (or if the iterable is empty).', example: `# Examples of all()
print(all([True, True, True]))   # Output: True
print(all([True, False, True]))  # Output: False

numbers = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in numbers))  # True (all even)

# Check if all positive
nums = [1, 2, 3, 4]
print(all(n > 0 for n in nums))  # Output: True` },
  {
    id: 10, name: 'any()', title: 'True if any item is True', description: 'Returns True if any element in the iterable is true. Returns False if empty.', example: `# Examples of any()
print(any([False, False, True]))  # Output: True
print(any([False, False, False])) # Output: False

numbers = [1, 3, 5, 6, 7]
print(any(n % 2 == 0 for n in numbers))  # True (6 is even)

# Check if any negative
nums = [1, -2, 3, 4]
print(any(n < 0 for n in nums))  # Output: True` },
  {
    id: 11, name: 'zip()', title: 'Combine two iterables', description: 'Combines multiple iterables into tuples. Stops when the shortest iterable is exhausted.', example: `# Examples of zip()
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
# Alice: 85, Bob: 92, Charlie: 78

# Create dictionary
student_scores = dict(zip(names, scores))
print(student_scores)  # {'Alice': 85, 'Bob': 92, 'Charlie': 78}` },
  {
    id: 12, name: 'map()', title: 'Apply a function to each element', description: 'Applies a function to every item in an iterable and returns a map object.', example: `# Examples of map()
numbers = [1, 2, 3, 4, 5]

# Square each number
squared = list(map(lambda x: x**2, numbers))
print(squared)  # Output: [1, 4, 9, 16, 25]

# Convert strings to integers
str_nums = ['1', '2', '3', '4']
int_nums = list(map(int, str_nums))
print(int_nums)  # Output: [1, 2, 3, 4]` },
  {
    id: 13, name: 'filter()', title: 'Filter elements by condition', description: 'Filters elements from an iterable based on a function that returns True or False.', example: `# Examples of filter()
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # Output: [2, 4, 6, 8, 10]

# Filter positive numbers
nums = [-2, -1, 0, 1, 2]
positive = list(filter(lambda x: x > 0, nums))
print(positive)  # Output: [1, 2]` },
  {
    id: 14, name: 'abs()', title: 'Absolute value', description: 'Returns the absolute value of a number (distance from zero).', example: `# Examples of abs()
print(abs(-5))      # Output: 5
print(abs(5))       # Output: 5
print(abs(-3.14))   # Output: 3.14

# Distance between two numbers
a, b = 10, 25
distance = abs(a - b)
print(distance)     # Output: 15` },
  {
    id: 15, name: 'pow()', title: 'Power function', description: 'Returns x to the power of y. Optional third argument for modulo.', example: `# Examples of pow()
print(pow(2, 3))      # Output: 8 (2³)
print(pow(5, 2))      # Output: 25 (5²)
print(pow(2, 10))     # Output: 1024

# With modulo (for large numbers)
print(pow(2, 10, 100))  # Output: 24 (1024 % 100)

# Same as ** operator
print(2 ** 3)         # Output: 8` },
  {
    id: 16, name: 'round()', title: 'Round a floating point number', description: 'Rounds a number to a specified number of decimal places.', example: `# Examples of round()
print(round(3.14159))       # Output: 3
print(round(3.14159, 2))    # Output: 3.14
print(round(3.14159, 4))    # Output: 3.1416

# Round to nearest 10
print(round(125, -1))       # Output: 130
print(round(124, -1))       # Output: 120` },
  {
    id: 17, name: 'divmod()', title: 'Return quotient and remainder', description: 'Returns a tuple of quotient and remainder when dividing two numbers.', example: `# Examples of divmod()
quotient, remainder = divmod(17, 5)
print(f"17 ÷ 5 = {quotient} remainder {remainder}")
# Output: 17 ÷ 5 = 3 remainder 2

# Convert seconds to minutes:seconds
seconds = 185
mins, secs = divmod(seconds, 60)
print(f"{mins}:{secs}")  # Output: 3:5` },
  {
    id: 18, name: 'type()', title: 'Get the type of an object', description: 'Returns the type of an object.', example: `# Examples of type()
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type([1, 2, 3]))  # <class 'list'>
print(type({'a': 1}))   # <class 'dict'>

# Check type
x = 10
if type(x) == int:
    print("x is an integer")` },
  {
    id: 19, name: 'id()', title: 'Return memory address of object', description: 'Returns the unique identifier (memory address) of an object.', example: `# Examples of id()
x = 10
y = 10
print(id(x))  # Same id (Python caches small integers)
print(id(y))

a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(id(a) == id(b))  # False (different objects)
print(id(a) == id(c))  # True (same object)` },
  {
    id: 20, name: 'isinstance()', title: 'Check if object is instance of class', description: 'Checks if an object is an instance of a specified class or tuple of classes.', example: `# Examples of isinstance()
x = 10
print(isinstance(x, int))       # True
print(isinstance(x, float))     # False
print(isinstance(x, (int, float)))  # True

name = "Python"
print(isinstance(name, str))    # True

nums = [1, 2, 3]
print(isinstance(nums, list))   # True` },
  {
    id: 21, name: 'dir()', title: 'List available methods and attributes', description: 'Returns a list of valid attributes and methods for an object.', example: `# Examples of dir()
name = "Python"
print(dir(name))  # Lists all string methods

# Filter to show only public methods
methods = [m for m in dir(name) if not m.startswith('_')]
print(methods)  # ['capitalize', 'center', 'count', ...]

# Check available list methods
nums = [1, 2, 3]
print([m for m in dir(nums) if not m.startswith('_')])` },
  {
    id: 22, name: 'help()', title: 'Show documentation of object', description: 'Displays the documentation string for an object, module, or function.', example: `# Examples of help()
help(len)      # Shows documentation for len()
help(str)      # Shows all string methods
help([].append) # Shows list append documentation

# In interactive mode:
# >>> help(print)
# Shows complete documentation for print function` },
  {
    id: 23, name: 'list() / tuple() / set() / dict()', title: 'Convert types', description: 'Type conversion functions to convert between different data structures.', example: `# Type conversion examples
# String to list
print(list("hello"))      # ['h', 'e', 'l', 'l', 'o']

# List to tuple
nums = [1, 2, 3]
print(tuple(nums))        # (1, 2, 3)

# List to set (removes duplicates)
print(set([1, 2, 2, 3]))  # {1, 2, 3}

# List of pairs to dict
pairs = [('a', 1), ('b', 2)]
print(dict(pairs))        # {'a': 1, 'b': 2}` },
  {
    id: 24, name: 'int() / float() / str()', title: 'Type conversions', description: 'Convert between numeric types and strings.', example: `# Examples of type conversions
print(int("42"))        # 42
print(int(3.99))        # 3 (truncates)

print(float("3.14"))    # 3.14
print(float(42))        # 42.0

print(str(123))         # "123"
print(str(3.14))        # "3.14"

# Binary/Hex string to int
print(int("1010", 2))   # 10 (binary)
print(int("FF", 16))    # 255 (hex)` },
  {
    id: 25, name: 'eval()', title: 'Evaluate string as Python expression', description: 'Evaluates a string as a Python expression and returns the result.', example: `# Examples of eval()
result = eval("2 + 3 * 4")
print(result)           # Output: 14

x = 10
print(eval("x * 2"))    # Output: 20

# Evaluate list comprehension
nums = eval("[x**2 for x in range(5)]")
print(nums)             # [0, 1, 4, 9, 16]

# ⚠️ Warning: Never use eval with untrusted input!` },
  {
    id: 26, name: 'ord() / chr()', title: 'ASCII and character conversions', description: 'Convert between characters and their ASCII/Unicode values.', example: `# Examples of ord() and chr()
print(ord('A'))         # 65
print(ord('a'))         # 97
print(ord('0'))         # 48

print(chr(65))          # 'A'
print(chr(97))          # 'a'

# Get ASCII values of string
word = "Hello"
ascii_vals = [ord(c) for c in word]
print(ascii_vals)       # [72, 101, 108, 108, 111]

# Convert to next character
print(chr(ord('A') + 1))  # 'B'` },
  {
    id: 27, name: 'bin() / oct() / hex()', title: 'Convert to binary, octal, hexadecimal', description: 'Convert integers to different number bases.', example: `# Examples of bin(), oct(), hex()
n = 42

print(bin(n))    # '0b101010'
print(oct(n))    # '0o52'
print(hex(n))    # '0x2a'

# Remove prefix
print(bin(n)[2:])  # '101010'

# Convert back to int
print(int('101010', 2))   # 42
print(int('52', 8))       # 42
print(int('2a', 16))      # 42` },
  {
    id: 28, name: 'input()', title: 'Get user input', description: 'Reads a line of input from the user.', example: `# Examples of input()
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Get integer input
age = int(input("Enter your age: "))

# Get multiple values
a, b = map(int, input("Enter two numbers: ").split())
print(f"Sum: {a + b}")

# Get list of numbers
nums = list(map(int, input().split()))` },
  {
    id: 29, name: 'print()', title: 'Display output', description: 'Prints output to console with various formatting options.', example: `# Examples of print()
print("Hello, World!")

# Multiple values
print("Name:", "John", "Age:", 25)

# Custom separator
print("A", "B", "C", sep="-")  # A-B-C

# Custom end character
print("Hello", end=" ")
print("World")  # Hello World

# f-string formatting
name, score = "Alice", 95
print(f"{name} scored {score}%")` },
  {
    id: 30, name: 'sorted(..., reverse=True)', title: 'Sort descending', description: 'Sort in descending order using reverse parameter.', example: `# Sort descending examples
numbers = [3, 1, 4, 1, 5, 9, 2]

print(sorted(numbers, reverse=True))
# Output: [9, 5, 4, 3, 2, 1, 1]

words = ["apple", "Banana", "cherry"]
print(sorted(words, reverse=True))
# Output: ['cherry', 'apple', 'Banana']

# Sort by absolute value, descending
nums = [-5, 2, -8, 1]
print(sorted(nums, key=abs, reverse=True))
# Output: [-8, -5, 2, 1]` },
  {
    id: 31, name: 'zip() + enumerate() Combination', title: 'Complex looping', description: 'Combine multiple iteration techniques for complex looping.', example: `# Combining zip() and enumerate()
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

for idx, (name, score) in enumerate(zip(names, scores), 1):
    print(f"{idx}. {name}: {score}")
# Output:
# 1. Alice: 85
# 2. Bob: 92
# 3. Charlie: 78

# Create ranked list
ranked = list(enumerate(zip(names, scores), 1))` },
  {
    id: 32, name: 'any() + all() with Conditions', title: 'Logical functions', description: 'Use generator expressions with logical functions.', example: `# Examples with conditions
numbers = [2, 4, 6, 8, 10]

# Check if all are even
print(all(n % 2 == 0 for n in numbers))  # True

# Check if any is greater than 5
print(any(n > 5 for n in numbers))  # True

# Check password validity
password = "Secure123"
has_upper = any(c.isupper() for c in password)
has_digit = any(c.isdigit() for c in password)
print(has_upper and has_digit)  # True` },
  {
    id: 33, name: 'map(int, ...) with sum()', title: 'Convert and sum', description: 'Convert strings to integers and sum them in one line.', example: `# Convert and sum examples
str_nums = "1 2 3 4 5"
total = sum(map(int, str_nums.split()))
print(total)  # Output: 15

# From user input (simulated)
line = "10 20 30"
result = sum(map(int, line.split()))
print(result)  # Output: 60

# Sum of digits
num = "12345"
digit_sum = sum(map(int, num))
print(digit_sum)  # Output: 15` },
  {
    id: 34, name: 'lambda', title: 'Anonymous function', description: 'Create small, anonymous functions on the fly.', example: `# Examples of lambda
# Basic lambda
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Multiple arguments
add = lambda a, b: a + b
print(add(3, 4))  # Output: 7

# With sorted()
students = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
by_score = sorted(students, key=lambda x: x[1], reverse=True)
print(by_score)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]` },
  {
    id: 35, name: 'Combination Examples', title: 'Powerful one-liners', description: 'Powerful one-liners combining multiple built-in functions.', example: `# Powerful Python one-liners

# Sum of squares
n = 5
print(sum(x**2 for x in range(1, n+1)))  # 55

# Find max by length
words = ["apple", "banana", "cherry", "date"]
longest = max(words, key=len)
print(longest)  # banana

# Filter and transform
nums = [1, 2, 3, 4, 5, 6]
even_squares = list(map(lambda x: x**2, filter(lambda x: x%2==0, nums)))
print(even_squares)  # [4, 16, 36]

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = [x for sub in nested for x in sub]
print(flat)  # [1, 2, 3, 4, 5, 6]` },
];

// Section B: String and List Methods (36-45)
const stringListMethods: PythonFunction[] = [
  {
    id: 36, name: 'split()', title: 'Break String into List', description: 'Splits a string into a list of substrings based on a delimiter (default is whitespace).', example: `# Examples of split()
sentence = "Hello World Python"
words = sentence.split()
print(words)  # ['Hello', 'World', 'Python']

# Split by comma
data = "apple,banana,cherry"
fruits = data.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

# Split with max splits
text = "a-b-c-d"
print(text.split("-", 2))  # ['a', 'b', 'c-d']` },
  {
    id: 37, name: 'join()', title: 'Join Iterable into String', description: 'Joins elements of an iterable into a single string with a separator.', example: `# Examples of join()
words = ['Hello', 'World', 'Python']
sentence = " ".join(words)
print(sentence)  # 'Hello World Python'

# Join with comma
fruits = ['apple', 'banana', 'cherry']
print(",".join(fruits))  # 'apple,banana,cherry'

# Join characters
letters = ['P', 'y', 't', 'h', 'o', 'n']
print("".join(letters))  # 'Python'` },
  {
    id: 38, name: 'replace()', title: 'Replace Substring', description: 'Returns a string where all occurrences of a substring are replaced with another.', example: `# Examples of replace()
text = "Hello World"
new_text = text.replace("World", "Python")
print(new_text)  # 'Hello Python'

# Replace multiple occurrences
s = "banana"
print(s.replace("a", "o"))  # 'bonono'

# Replace with count limit
print(s.replace("a", "o", 1))  # 'bonana'` },
  {
    id: 39, name: 'startswith() / endswith()', title: 'Check Prefix or Suffix', description: 'Checks if a string starts or ends with a specified substring.', example: `# Examples of startswith() / endswith()
filename = "document.pdf"

print(filename.endswith(".pdf"))    # True
print(filename.endswith(".txt"))    # False

print(filename.startswith("doc"))   # True

# Check multiple options
print(filename.endswith((".pdf", ".doc")))  # True

# Useful for file validation
if filename.endswith((".jpg", ".png", ".gif")):
    print("Image file")` },
  {
    id: 40, name: 'strip()', title: 'Remove Whitespace or Specific Characters', description: 'Removes leading and trailing characters (default is whitespace).', example: `# Examples of strip()
text = "   Hello World   "
print(text.strip())   # 'Hello World'

# Remove specific characters
s = "###Python###"
print(s.strip("#"))   # 'Python'

# lstrip and rstrip
print(text.lstrip())  # 'Hello World   ' (left only)
print(text.rstrip())  # '   Hello World' (right only)` },
  {
    id: 41, name: 'count()', title: 'Count Occurrences in String/List', description: 'Counts how many times a value appears in a sequence.', example: `# Examples of count()
# In strings
text = "banana"
print(text.count("a"))   # 3
print(text.count("na"))  # 2

# In lists
numbers = [1, 2, 2, 3, 2, 4, 2]
print(numbers.count(2))  # 4

# Count with range
text = "abababab"
print(text.count("ab", 0, 4))  # 2` },
  {
    id: 42, name: 'index() / find()', title: 'Find Position of Substring or Item', description: 'Returns the index of first occurrence. index() raises error if not found, find() returns -1.', example: `# Examples of index() / find()
text = "Hello World"

# find() - returns -1 if not found
print(text.find("World"))  # 6
print(text.find("Python")) # -1

# index() - raises ValueError if not found
print(text.index("World"))  # 6
# text.index("Python")  # ValueError!

# In lists
fruits = ['apple', 'banana', 'cherry']
print(fruits.index('banana'))  # 1` },
  {
    id: 43, name: 'append() / pop() / insert()', title: 'Modify Lists', description: 'Common list modification methods.', example: `# Examples of append(), pop(), insert()
fruits = ['apple', 'banana']

# append - add to end
fruits.append('cherry')
print(fruits)  # ['apple', 'banana', 'cherry']

# insert - add at index
fruits.insert(1, 'orange')
print(fruits)  # ['apple', 'orange', 'banana', 'cherry']

# pop - remove and return
last = fruits.pop()
print(last)    # 'cherry'
print(fruits)  # ['apple', 'orange', 'banana']

# pop at index
fruits.pop(1)  # removes 'orange'` },
  {
    id: 44, name: 'splitlines()', title: 'Split Multiline String into Lines', description: 'Splits a string at line breaks into a list of lines.', example: `# Examples of splitlines()
text = """Line 1
Line 2
Line 3"""

lines = text.splitlines()
print(lines)  # ['Line 1', 'Line 2', 'Line 3']

# With keepends parameter
lines = text.splitlines(keepends=True)
print(lines)  # ['Line 1\\n', 'Line 2\\n', 'Line 3']

# Process each line
for i, line in enumerate(text.splitlines(), 1):
    print(f"{i}: {line}")` },
  {
    id: 45, name: 'format() / f-strings', title: 'String Formatting', description: 'Format strings with variables and expressions.', example: `# Examples of format() / f-strings
name = "Alice"
age = 25

# Using format()
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, Age: {1}".format(name, age))

# Using f-strings (Python 3.6+) - RECOMMENDED
print(f"Name: {name}, Age: {age}")

# Formatting numbers
pi = 3.14159
print(f"Pi: {pi:.2f}")     # Pi: 3.14
print(f"Score: {85:03d}")  # Score: 085

# Expressions in f-strings
print(f"Sum: {2 + 3}")     # Sum: 5` },
];

// Section C: Advanced Built-ins & IITM Functions (46-85)
const advancedFunctions: PythonFunction[] = [
  {
    id: 46, name: 'iter()', title: 'Create Iterator', description: 'Creates an iterator object from an iterable.', example: `# Examples of iter()
nums = [1, 2, 3]
it = iter(nums)
print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3` },
  {
    id: 47, name: 'next()', title: 'Get Next Value from Iterator', description: 'Retrieves the next item from an iterator.', example: `# Examples of next()
it = iter([10, 20, 30])
print(next(it))        # 10
print(next(it))        # 20
print(next(it, 'end')) # 30
print(next(it, 'end')) # 'end' (default)` },
  {
    id: 48, name: 'callable()', title: 'Check if an Object is Callable', description: 'Returns True if the object appears callable (like a function).', example: `# Examples of callable()
def greet():
    pass
print(callable(greet))   # True
print(callable(len))     # True
print(callable("hello")) # False
print(callable(42))      # False` },
  {
    id: 49, name: 'globals() / locals()', title: 'Access Current Namespace', description: 'Returns dictionary of global/local symbol table.', example: `# Examples of globals() / locals()
x = 10
def foo():
    y = 20
    print(locals())  # {'y': 20}
foo()
print('x' in globals())  # True` },
  {
    id: 50, name: 'getattr() / setattr() / delattr()', title: 'Manage Object Attributes', description: 'Get, set, or delete attributes of an object dynamically.', example: `# Examples of attribute functions
class Person:
    name = "John"
p = Person()
print(getattr(p, 'name'))       # John
setattr(p, 'age', 25)
print(p.age)                    # 25
delattr(p, 'age')` },
  {
    id: 51, name: 'hash()', title: 'Get Hash Value', description: 'Returns the hash value of an object (for sets/dict keys).', example: `# Examples of hash()
print(hash("hello"))    # Some integer
print(hash(42))         # 42
print(hash((1, 2, 3)))  # Tuple hash
# hash([1, 2])  # Error! Lists are unhashable` },
  {
    id: 52, name: 'open()', title: 'File Handling', description: 'Opens a file and returns a file object for reading/writing.', example: `# Examples of open()
# Reading file
with open('file.txt', 'r') as f:
    content = f.read()

# Writing file
with open('output.txt', 'w') as f:
    f.write("Hello World")

# Read lines
with open('file.txt') as f:
    lines = f.readlines()` },
  {
    id: 53, name: 'lower() / upper() / title()', title: 'Case Conversions', description: 'Convert string case.', example: `# Examples of case conversions
text = "Hello World"
print(text.lower())   # 'hello world'
print(text.upper())   # 'HELLO WORLD'
print(text.title())   # 'Hello World'

name = "jOHN DOE"
print(name.title())   # 'John Doe'` },
  {
    id: 54, name: 'islower() / isupper() / isalpha() / isdigit()', title: 'Character Checks', description: 'Check character types in strings.', example: `# Examples of character checks
print("hello".islower())   # True
print("HELLO".isupper())   # True
print("Python".isalpha())  # True
print("12345".isdigit())   # True
print("abc123".isalnum())  # True
print("  ".isspace())      # True` },
  {
    id: 55, name: 'sort() / reverse() / copy() / clear()', title: 'List Management', description: 'In-place list manipulation methods.', example: `# Examples of list methods
nums = [3, 1, 4, 1, 5]
nums.sort()      # [1, 1, 3, 4, 5]
nums.reverse()   # [5, 4, 3, 1, 1]

copy_nums = nums.copy()
nums.clear()     # []
print(copy_nums) # [5, 4, 3, 1, 1]` },
  {
    id: 56, name: 'get() / items() / keys() / values()', title: 'Dictionary Operations', description: 'Essential dictionary methods.', example: `# Examples of dict methods
d = {'a': 1, 'b': 2, 'c': 3}
print(d.get('a'))      # 1
print(d.get('x', 0))   # 0 (default)
print(list(d.keys()))  # ['a', 'b', 'c']
print(list(d.values())) # [1, 2, 3]
for k, v in d.items():
    print(f"{k}: {v}")` },
  {
    id: 57, name: 'set.union() / intersection() / difference()', title: 'Set Operations', description: 'Mathematical set operations.', example: `# Examples of set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.union(b))        # {1, 2, 3, 4, 5, 6}
print(a.intersection(b)) # {3, 4}
print(a.difference(b))   # {1, 2}
print(a - b)             # {1, 2} (same)` },
  {
    id: 58, name: 'zip_longest()', title: 'Combine Unequal Iterables', description: 'From itertools, zips unequal length iterables with fillvalue.', example: `# Examples of zip_longest()
from itertools import zip_longest
a = [1, 2, 3]
b = [4, 5]
print(list(zip_longest(a, b, fillvalue=0)))
# [(1, 4), (2, 5), (3, 0)]` },
  {
    id: 59, name: 'reduce()', title: 'Apply Function Cumulatively', description: 'From functools, applies function cumulatively to items.', example: `# Examples of reduce()
from functools import reduce
nums = [1, 2, 3, 4, 5]
# Sum: ((((1+2)+3)+4)+5)
total = reduce(lambda a, b: a + b, nums)
print(total)  # 15
# Product
prod = reduce(lambda a, b: a * b, nums)
print(prod)   # 120` },
  {
    id: 60, name: 'del Keyword', title: 'Delete Object or Variable', description: 'Deletes variables, list items, or dictionary keys.', example: `# Examples of del
x = 10
del x  # Variable deleted

nums = [1, 2, 3, 4, 5]
del nums[2]  # [1, 2, 4, 5]
del nums[1:3]  # [1, 5]

d = {'a': 1, 'b': 2}
del d['a']  # {'b': 2}` },
  {
    id: 61, name: 'sum(map(...))', title: 'Combine Iterables with Transformation', description: 'Convert and sum in one line.', example: `# Examples of sum(map(...))
line = "1 2 3 4 5"
total = sum(map(int, line.split()))
print(total)  # 15

# Sum of squares
nums = [1, 2, 3, 4]
sq_sum = sum(map(lambda x: x**2, nums))
print(sq_sum)  # 30` },
  {
    id: 62, name: 'max(..., key=...) / min(..., key=...)', title: 'Custom Comparisons', description: 'Find max/min based on custom key function.', example: `# Examples with key parameter
words = ["apple", "banana", "cherry"]
longest = max(words, key=len)
print(longest)  # 'banana'

students = [('Alice', 85), ('Bob', 92)]
best = max(students, key=lambda x: x[1])
print(best)  # ('Bob', 92)` },
  {
    id: 63, name: 'any() + all() with Conditions', title: 'Logical Checks', description: 'Test conditions across sequences.', example: `# Logical checks
nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))  # True

password = "Pass123"
valid = all([
    len(password) >= 6,
    any(c.isupper() for c in password),
    any(c.isdigit() for c in password)
])
print(valid)  # True` },
  {
    id: 64, name: 'chr() / ord()', title: 'Character Encoding', description: 'Essential for working with ASCII values.', example: `# Examples of chr()/ord()
print(chr(65))   # 'A'
print(ord('A'))  # 65

# Generate alphabet
alphabet = ''.join(chr(i) for i in range(65, 91))
print(alphabet)  # ABCDEFGHIJKLMNOPQRSTUVWXYZ` },
  {
    id: 65, name: 'bin() / oct() / hex()', title: 'Base Conversion', description: 'Convert between number bases.', example: `# Base conversions
n = 42
print(bin(n))  # '0b101010'
print(oct(n))  # '0o52'
print(hex(n))  # '0x2a'
print(bin(n)[2:])  # '101010'` },
  {
    id: 66, name: 'abs()', title: 'Absolute Value', description: 'Common in distance and difference problems.', example: `# Examples of abs()
print(abs(-10))  # 10
print(abs(10))   # 10
# Distance
a, b = 5, 12
dist = abs(a - b)
print(dist)  # 7` },
  {
    id: 67, name: 'divmod()', title: 'Division + Remainder', description: 'Get quotient and remainder simultaneously.', example: `# Examples of divmod()
q, r = divmod(17, 5)
print(f"{q} remainder {r}")  # 3 remainder 2

# Time conversion
secs = 3665
h, rem = divmod(secs, 3600)
m, s = divmod(rem, 60)
print(f"{h}h {m}m {s}s")  # 1h 1m 5s` },
  {
    id: 68, name: 'round()', title: 'Round Float', description: 'Round to specified decimal places.', example: `# Examples of round()
print(round(3.14159, 2))  # 3.14
print(round(3.5))         # 4
print(round(125, -1))     # 130
print(round(2.5))         # 2 (banker's rounding)` },
  {
    id: 69, name: 'sum(range(n))', title: 'Efficient Series Calculation', description: 'Calculate series sums efficiently.', example: `# Series calculations
n = 100
print(sum(range(1, n+1)))  # 5050

# Sum of even numbers
print(sum(range(0, 101, 2)))  # 2550

# Formula: n*(n+1)/2
print(n * (n+1) // 2)  # 5050` },
  {
    id: 70, name: 'reversed(range(...))', title: 'Reverse Sequence Iteration', description: 'Iterate in reverse without creating a list.', example: `# Reverse iteration
for i in reversed(range(5)):
    print(i)  # 4, 3, 2, 1, 0

# Same as
for i in range(4, -1, -1):
    print(i)  # 4, 3, 2, 1, 0` },
  {
    id: 71, name: 'copy()', title: 'Shallow Copy', description: 'Create a shallow copy of list or dict.', example: `# Shallow copy
a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)  # [1, 2, 3]
print(b)  # [1, 2, 3, 4]

d = {'x': 1}
d2 = d.copy()` },
  {
    id: 72, name: 'deepcopy()', title: 'Deep Copy for Nested Structures', description: 'Copy nested structures completely.', example: `# Deep copy
from copy import deepcopy
a = [[1, 2], [3, 4]]
b = deepcopy(a)
b[0][0] = 99
print(a)  # [[1, 2], [3, 4]]
print(b)  # [[99, 2], [3, 4]]` },
  {
    id: 73, name: 'sum(zip(*matrix))', title: 'Column-Wise Summation', description: 'Matrix column operations using zip.', example: `# Column operations
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]
col_sums = [sum(col) for col in zip(*matrix)]
print(col_sums)  # [12, 15, 18]` },
  {
    id: 74, name: 'format()', title: 'Number Formatting', description: 'Format numbers with precision control.', example: `# Number formatting
print(format(3.14159, '.2f'))  # 3.14
print(format(42, '05d'))       # 00042
print(format(255, 'x'))        # ff
print(format(0.25, '.0%'))     # 25%` },
  {
    id: 75, name: 'sorted(..., key=lambda x:...)', title: 'Sort by Custom Key', description: 'Advanced sorting with custom logic.', example: `# Custom sorting
data = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
by_score = sorted(data, key=lambda x: x[1], reverse=True)
print(by_score)
# [('Bob', 92), ('Alice', 85), ('Charlie', 78)]

words = ['banana', 'Apple', 'cherry']
print(sorted(words, key=str.lower))` },
  {
    id: 76, name: 'sum([x**2 for x in range(n)])', title: 'Comprehension Aggregation', description: 'Combine comprehensions with aggregation functions.', example: `# Comprehension + aggregation
n = 5
sq_sum = sum(x**2 for x in range(1, n+1))
print(sq_sum)  # 55 (1+4+9+16+25)

# Average
nums = [1, 2, 3, 4, 5]
avg = sum(nums) / len(nums)
print(avg)  # 3.0` },
  {
    id: 77, name: 'min(..., key=len) / max(..., key=len)', title: 'String Length Comparisons', description: 'Compare by string length.', example: `# Compare by length
words = ['cat', 'elephant', 'dog', 'butterfly']
shortest = min(words, key=len)
longest = max(words, key=len)
print(shortest)  # 'cat'
print(longest)   # 'butterfly'` },
  {
    id: 78, name: 'map() with Multiple Iterables', title: 'Multi-sequence mapping', description: 'Apply function to multiple sequences simultaneously.', example: `# map with multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [11, 22, 33]

# Multiply pairs
prods = list(map(lambda x, y: x * y, a, b))
print(prods)  # [10, 40, 90]` },
  {
    id: 79, name: 'filter(None, sequence)', title: 'Remove Falsy Values', description: 'Filter out all falsy values (0, \'\', None, False).', example: `# Remove falsy values
data = [0, 1, '', 'hello', None, 42, False]
clean = list(filter(None, data))
print(clean)  # [1, 'hello', 42]

# Same as
clean = [x for x in data if x]` },
  {
    id: 80, name: 'zip_longest()', title: 'Handle Unequal Lengths', description: 'Zip with padding for unequal iterables.', example: `# Handle unequal lengths
from itertools import zip_longest
a = [1, 2, 3, 4]
b = ['a', 'b']
result = list(zip_longest(a, b, fillvalue='-'))
print(result)
# [(1,'a'), (2,'b'), (3,'-'), (4,'-')]` },
  {
    id: 81, name: 'reduce()', title: 'Cumulative Operations', description: 'Apply function cumulatively from left to right.', example: `# reduce examples
from functools import reduce
# Find maximum
nums = [3, 1, 4, 1, 5, 9]
max_val = reduce(lambda a, b: a if a > b else b, nums)
print(max_val)  # 9

# Concatenate strings
words = ['Hello', ' ', 'World']
result = reduce(lambda a, b: a + b, words)
print(result)  # 'Hello World'` },
  {
    id: 82, name: 'round() and divmod() Combination', title: 'Combine operations', description: 'Combine rounding with division operations.', example: `# Combined operations
total = 1234.567
# Round then divide
whole, frac = divmod(round(total, 2), 1)
print(f"\\$\${int(whole)}.\${int(frac*100):02d}")

# Time calculation
mins, secs = divmod(round(125.7), 60)
print(f"{mins}:{secs:02d}")  # 2:06` },
  {
    id: 83, name: 'open() File Read/Write Patterns', title: 'File I/O', description: 'Common file handling patterns.', example: `# Common file patterns
# Read all at once
with open('data.txt') as f:
    content = f.read()

# Read line by line
with open('data.txt') as f:
    for line in f:
        print(line.strip())

# Write lines
lines = ['Line 1', 'Line 2']
with open('out.txt', 'w') as f:
    f.write('\\n'.join(lines))` },
  {
    id: 84, name: 'reversed() + join()', title: 'Reverse Strings', description: 'Elegant string reversal.', example: `# Reverse strings
word = "Python"
reversed_word = ''.join(reversed(word))
print(reversed_word)  # 'nohtyP'

# Or using slicing
print(word[::-1])  # 'nohtyP'

# Reverse words order
sentence = "Hello World"
print(' '.join(reversed(sentence.split())))
# 'World Hello'` },
  {
    id: 85, name: 'setdefault()', title: 'Initialize Dict Key with Default', description: "Get key value or set default if key doesn't exist.", example: `# Examples of setdefault()
d = {'a': 1}
# Get existing key
print(d.setdefault('a', 0))  # 1

# Set default for new key
print(d.setdefault('b', 2))  # 2
print(d)  # {'a': 1, 'b': 2}

# Count occurrences
word = "hello"
counts = {}
for c in word:
    counts.setdefault(c, 0)
    counts[c] += 1` },
];

// Type rules data
const typeRules = [
  { type: 'Integers (int)', desc: 'Whole numbers, positive or negative. Example: 10, -5, 0', examples: ['int(3.9) → 3', 'int(\'7\') → 7', 'int(\'abc\') → ValueError'] },
  { type: 'Floats (float)', desc: 'Numbers with decimals. Example: 3.14, -0.5', examples: ['float(4) → 4.0', 'float(\'2.5\') → 2.5', 'float(\'text\') → ValueError'] },
  { type: 'Strings (str)', desc: 'Characters enclosed in quotes. Example: \'hello\', "123"', examples: ['str(123) → \'123\'', 'str([1, 2]) → \'[1, 2]\'', 'str(True) → \'True\''] },
  { type: 'Lists (list)', desc: 'Mutable, ordered sequences. Example: [1, 2, 3]', examples: ['list(\'abc\') → [\'a\', \'b\', \'c\']', 'list((1, 2, 3)) → [1, 2, 3]'] },
  { type: 'Tuples (tuple)', desc: 'Immutable, ordered sequences. Example: (1, 2, 3)', examples: ['tuple([1, 2, 3]) → (1, 2, 3)', 'tuple(\'xyz\') → (\'x\', \'y\', \'z\')'] },
  { type: 'Sets (set)', desc: 'Unordered, no duplicates. Example: {1, 2, 3}', examples: ['set([1, 2, 2, 3]) → {1, 2, 3}', 'set(\'hello\') → {\'h\', \'e\', \'l\', \'o\'}'] },
];

// Pattern conditions
const patternConditions = [
  { condition: 'i == j', desc: 'Main diagonal (top-left to bottom-right)' },
  { condition: 'i + j == n - 1', desc: 'Anti-diagonal (top-right to bottom-left)' },
  { condition: 'i <= j', desc: 'Upper triangle' },
  { condition: 'i >= j', desc: 'Lower triangle' },
];

// Pattern examples with output and code
const patternExamples = [
  {
    name: 'Right Triangle',
    output: `*
* *
* * *
* * * *
* * * * *`,
    code: `n = 5
for i in range(1, n+1):
    print("* " * i)`
  },
  {
    name: 'Inverted Right Triangle',
    output: `* * * * *
* * * *
* * *
* *
*`,
    code: `n = 5
for i in range(n, 0, -1):
    print("* " * i)`
  },
  {
    name: 'Pyramid',
    output: `    *
   * *
  * * *
 * * * *
* * * * *`,
    code: `n = 5
for i in range(1, n+1):
    print(" " * (n-i) + "* " * i)`
  },
  {
    name: 'Inverted Pyramid',
    output: `* * * * *
 * * * *
  * * *
   * *
    *`,
    code: `n = 5
for i in range(n, 0, -1):
    print(" " * (n-i) + "* " * i)`
  },
  {
    name: 'Diamond',
    output: `    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *`,
    code: `n = 5
# Upper half
for i in range(1, n+1):
    print(" " * (n-i) + "* " * i)
# Lower half
for i in range(n-1, 0, -1):
    print(" " * (n-i) + "* " * i)`
  },
  {
    name: 'V Pattern',
    output: `*       *
 *     *
  *   *
   * *
    *`,
    code: `n = 5
for i in range(n):
    for j in range(2*n - 1):
        if j == i or j == 2*n - 2 - i:
            print("*", end="")
        else:
            print(" ", end="")
    print()`
  },
  {
    name: 'Inverted V (A Pattern)',
    output: `    *
   * *
  *   *
 *     *
*       *`,
    code: `n = 5
for i in range(n):
    for j in range(2*n - 1):
        if j == n - 1 - i or j == n - 1 + i:
            print("*", end="")
        else:
            print(" ", end="")
    print()`
  },
  {
    name: 'X Pattern',
    output: `*       *
 *     *
  *   *
   * *
    *
   * *
  *   *
 *     *
*       *`,
    code: `n = 5
for i in range(2*n - 1):
    for j in range(2*n - 1):
        # Main diagonal or anti-diagonal
        if j == i or j == 2*n - 2 - i:
            print("*", end="")
        else:
            print(" ", end="")
    print()`
  },
  {
    name: 'Hollow Square',
    output: `* * * * *
*       *
*       *
*       *
* * * * *`,
    code: `n = 5
for i in range(n):
    for j in range(n):
        if i == 0 or i == n-1 or j == 0 or j == n-1:
            print("*", end=" ")
        else:
            print(" ", end=" ")
    print()`
  },
  {
    name: 'Number Triangle',
    output: `1
1 2
1 2 3
1 2 3 4
1 2 3 4 5`,
    code: `n = 5
for i in range(1, n+1):
    for j in range(1, i+1):
        print(j, end=" ")
    print()`
  },
  {
    name: 'Alphabet Triangle',
    output: `A
A B
A B C
A B C D
A B C D E`,
    code: `n = 5
for i in range(1, n+1):
    for j in range(i):
        print(chr(65 + j), end=" ")
    print()`
  },
  {
    name: 'Butterfly Pattern',
    output: `*       *
* *   * *
* * * * *
* *   * *
*       *`,
    code: `n = 3
# Upper half
for i in range(1, n+1):
    print("* " * i + "  " * (n-i) * 2 + "* " * i)
# Lower half
for i in range(n, 0, -1):
    print("* " * i + "  " * (n-i) * 2 + "* " * i)`
  },
  {
    name: 'Arrow Pattern',
    output: `    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *`,
    code: `n = 5
# Upper part
for i in range(1, n+1):
    print(" " * (n-i) + "* " * i)
# Lower part
for i in range(n-1, 0, -1):
    print(" " * (n-i) + "* " * i)`
  },
  {
    name: 'Plus Pattern',
    output: `   
      *
      *
      *
* * * * * * *
      *
      *
      *`,
    code: `n = 7
mid = n // 2
for i in range(n):
    for j in range(n):
        if i == mid or j == mid:
            print("*", end=" ")
        else:
            print(" ", end=" ")
    print()`
  },
  {
    name: 'Cup / U Pattern',
    output: `       _
     _| |_
   _|     |_
 _|         |_
|_____________|`,
    code: `n = int(input())
for i in range(n+1):
    if i == 0:
        # Top line - single underscore
        spaces = " " * ((2*n) - 1)
        print(spaces + "_")
    elif i == n:
        # Bottom line - full underscore row
        underscores = "_" * ((4*n) - 3)
        print("|" + underscores + "|")
    else:
        # Middle rows
        initial_spaces = " " * ((2*n) - (2*i) - 1)
        mid_spaces = " " * ((4*i) - 3)
        print(initial_spaces + "_|" + mid_spaces + "|_")`
  },
  {
    name: 'Hourglass Pattern',
    output: `* * * * *
 * * * *
  * * *
   * *
    *
   * *
  * * *
 * * * *
* * * * *`,
    code: `n = 5
# Upper half (inverted pyramid)
for i in range(n, 0, -1):
    print(" " * (n-i) + "* " * i)
# Lower half (pyramid)
for i in range(2, n+1):
    print(" " * (n-i) + "* " * i)`
  },
  {
    name: 'Rhombus / Parallelogram',
    output: `    * * * * *
   * * * * *
  * * * * *
 * * * * *
* * * * *`,
    code: `n = 5
for i in range(n):
    print(" " * (n - i - 1) + "* " * n)`
  },
  {
    name: 'Christmas Tree',
    output: `    *
   ***
  *****
 *******
*********
    |
    |`,
    code: `n = 5
# Tree
for i in range(n):
    print(" " * (n-i-1) + "*" * (2*i+1))
# Trunk
for i in range(2):
    print(" " * (n-1) + "|")`
  },
];

// Exam tips
const examTips = [
  { title: 'Practice Core Functions', desc: 'Focus on len(), sum(), max(), min(), sorted(), enumerate(), and zip() - they appear in almost every exam.' },
  { title: 'Master List Comprehensions', desc: 'Combine with map() and filter() for powerful one-liners that save time in exams.' },
  { title: 'Know Your Type Conversions', desc: 'Understand when and how to convert between int, float, str, list, tuple, and set.' },
  { title: 'Pattern Recognition', desc: 'Identify the pattern type first, then apply the universal template with the right condition.' },
];

// TOC sections
const tocSections = [
  { id: 'fundamentals', title: '1-35: Fundamental Python Built-ins' },
  { id: 'string-list', title: '36-45: String and List Methods' },
  { id: 'advanced', title: '46-85: Advanced & IITM Functions' },
  { id: 'type-rules', title: 'Type Rules and Conversions' },
  { id: 'patterns', title: 'Pattern Printing Mastery' },
  { id: 'exam-tips', title: 'IITM Exam-Pro Tips' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

// Expandable Function Item
const FunctionItem = ({ func, isOpen, onToggle }: {
  func: PythonFunction;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={cn(
      "overflow-hidden rounded-[1.25rem] border border-border/80 transition-all duration-200",
      isOpen ? "bg-card shadow-[var(--shadow-sm)]" : "bg-card/85 hover:bg-secondary/60"
    )}
  >
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 flex items-center justify-between text-left"
    >
      <div className="flex items-center gap-3">
        <span className="w-6 font-mono text-sm text-primary">{func.id}.</span>
        <span className="font-semibold text-foreground">{func.name}</span>
        <span className="text-muted-foreground">—</span>
        <span className="text-muted-foreground">{func.title}</span>
      </div>
      <ChevronDown className={cn(
        "h-5 w-5 text-muted-foreground transition-transform duration-200",
        isOpen && "rotate-180"
      )} />
    </button>
    {isOpen && (
      <div className="border-t border-border/80 px-4 pb-4 pt-0">
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {func.description}
        </p>
        {func.example && (
          <PythonCodeBlock code={func.example} />
        )}
      </div>
    )}
  </div>
);

// Section Component
const Section = ({
  id,
  icon,
  title,
  subtitle,
  children,
  isOpen,
  onToggle
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <section id={id} className="scroll-mt-24">
    <div
      className="flex items-center gap-3 mb-4 cursor-pointer group"
      onClick={onToggle}
    >
      <div className="rounded-2xl bg-secondary p-2 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <ChevronDown className={cn(
        "h-6 w-6 text-muted-foreground transition-transform duration-200",
        isOpen && "rotate-180"
      )} />
    </div>
    {isOpen && (
      <div className="space-y-2 pl-0 sm:pl-4">
        {children}
      </div>
    )}
  </section>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PythonCheatsheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFunctions, setOpenFunctions] = useState<Set<number>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['fundamentals', 'string-list', 'advanced', 'type-rules', 'patterns', 'exam-tips']));
  const [showMobileToc, setShowMobileToc] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter functions based on search
  const allFunctions = useMemo(() => [
    ...fundamentalFunctions,
    ...stringListMethods,
    ...advancedFunctions,
  ], []);

  const filteredFundamentals = useMemo(() =>
    fundamentalFunctions.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredStringList = useMemo(() =>
    stringListMethods.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredAdvanced = useMemo(() =>
    advancedFunctions.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const toggleFunction = (id: number) => {
    setOpenFunctions(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpenSections(prev => new Set([...prev, id]));
    }
    setShowMobileToc(false);
  };

  const totalResults = filteredFundamentals.length + filteredStringList.length + filteredAdvanced.length;

  return (
    <div className="page-shell py-6 sm:py-8">
      {/* Header */}
      <div className="page-hero border-b-0">
        <div className="py-1 sm:py-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-2xl bg-[linear-gradient(135deg,#1a73e8_0%,#34a853_100%)] p-2 shadow-[var(--shadow-sm)]">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                    Python Reference Guide
                  </h1>
                  <p className="text-primary text-xs">IITM Exam Prep – Complete Edition</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  <Code2 className="w-3 h-3 mr-1" />
                  85+ Functions
                </Badge>
                <Badge className="border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <Target className="w-3 h-3 mr-1" />
                  IITM BS DS
                </Badge>
              </div>
            </div>

            {/* Search Bar */}
            <div className="lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search functions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Found {totalResults} result(s)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Content */}
          <div ref={contentRef} className="flex-1 space-y-8">
            {/* Section A: Fundamentals */}
            {(filteredFundamentals.length > 0 || !searchQuery) && (
              <Section
                id="fundamentals"
                icon={<Hash className="w-5 h-5" />}
                title="Fundamental Python Built-ins"
                subtitle="Universal Core - Functions 1-35"
                isOpen={openSections.has('fundamentals')}
                onToggle={() => toggleSection('fundamentals')}
              >
                {filteredFundamentals.map(func => (
                  <FunctionItem
                    key={func.id}
                    func={func}
                    isOpen={openFunctions.has(func.id)}
                    onToggle={() => toggleFunction(func.id)}
                  />
                ))}
                {filteredFundamentals.length === 0 && searchQuery && (
                  <p className="py-4 text-sm text-muted-foreground">No functions found in this section</p>
                )}
              </Section>
            )}

            {/* Section B: String & List Methods */}
            {(filteredStringList.length > 0 || !searchQuery) && (
              <Section
                id="string-list"
                icon={<Zap className="w-5 h-5" />}
                title="Common String and List Methods"
                subtitle="Functions 36-45"
                isOpen={openSections.has('string-list')}
                onToggle={() => toggleSection('string-list')}
              >
                {filteredStringList.map(func => (
                  <FunctionItem
                    key={func.id}
                    func={func}
                    isOpen={openFunctions.has(func.id)}
                    onToggle={() => toggleFunction(func.id)}
                  />
                ))}
                {filteredStringList.length === 0 && searchQuery && (
                  <p className="py-4 text-sm text-muted-foreground">No functions found in this section</p>
                )}
              </Section>
            )}

            {/* Section C: Advanced Functions */}
            {(filteredAdvanced.length > 0 || !searchQuery) && (
              <Section
                id="advanced"
                icon={<Brain className="w-5 h-5" />}
                title="Advanced Built-ins & IITM Common Functions"
                subtitle="Functions 46-85 - Essential for exam success"
                isOpen={openSections.has('advanced')}
                onToggle={() => toggleSection('advanced')}
              >
                {filteredAdvanced.map(func => (
                  <FunctionItem
                    key={func.id}
                    func={func}
                    isOpen={openFunctions.has(func.id)}
                    onToggle={() => toggleFunction(func.id)}
                  />
                ))}
                {filteredAdvanced.length === 0 && searchQuery && (
                  <p className="py-4 text-sm text-muted-foreground">No functions found in this section</p>
                )}
              </Section>
            )}

            {/* Section D: Type Rules */}
            {!searchQuery && (
              <Section
                id="type-rules"
                icon={<ArrowRight className="w-5 h-5" />}
                title="Python Type Rules and Conversions"
                subtitle="Understand how different types work together"
                isOpen={openSections.has('type-rules')}
                onToggle={() => toggleSection('type-rules')}
              >
                <div className="grid gap-4">
                  {typeRules.map((rule, idx) => (
                    <Card key={idx} className="border-border/80 bg-card/92">
                      <CardContent className="p-4">
                        <h4 className="mb-1 font-semibold text-primary">{idx + 1}. {rule.type}</h4>
                        <p className="mb-2 text-sm text-muted-foreground">{rule.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {rule.examples.map((ex, i) => (
                            <code key={i} className="rounded-full bg-secondary px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
                              {ex}
                            </code>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-primary/15 bg-primary/8">
                    <CardContent className="p-4">
                      <h4 className="mb-2 font-semibold text-foreground">Pro Tips</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• list, tuple, and str support indexing and slicing</li>
                        <li>• set and dict do not support indexing</li>
                        <li>• Tuples are immutable; lists are mutable</li>
                        <li>• Always check type using type(x) before operations</li>
                        <li>• Use isinstance(x, type) to validate types</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            )}

            {/* Section E: Pattern Printing */}
            {!searchQuery && (
              <Section
                id="patterns"
                icon={<Target className="w-5 h-5" />}
                title="Pattern Printing Mastery"
                subtitle="Master the universal pattern template with 14+ examples"
                isOpen={openSections.has('patterns')}
                onToggle={() => toggleSection('patterns')}
              >
                <Card className="mb-4 border-border/80 bg-card/92">
                  <CardContent className="p-4">
                    <p className="mb-4 text-muted-foreground">
                      Pattern printing looks tough, but 90% of patterns follow one simple template. Once you master it, every pattern becomes a remix with just spacing and symbol changes.
                    </p>
                    <h4 className="mb-2 font-semibold text-primary">The Universal Pattern Formula</h4>
                    <pre className="mb-4 overflow-x-auto rounded-[1rem] border border-slate-200 bg-white p-4 text-sm font-mono text-slate-800 dark:border-slate-300">
                      {`n = int(input("Enter size: "))

for i in range(n):          # Outer loop → rows
    for j in range(n):      # Inner loop → columns
        # condition for printing
        print("*", end=" ")
    print()                 # move to next line`}
                    </pre>
                    <h4 className="mb-3 font-semibold text-foreground">Common Pattern Conditions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {patternConditions.map((p, idx) => (
                        <div key={idx} className="rounded-[1rem] bg-secondary/80 p-3">
                          <code className="font-mono text-primary">{p.condition}</code>
                          <p className="mt-1 text-sm text-muted-foreground">→ {p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pattern Examples Grid */}
                <h4 className="mb-3 text-lg font-semibold text-foreground">Pattern Examples with Solutions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patternExamples.map((pattern, idx) => (
                    <Card key={idx} className="border-border/80 bg-card/92 transition-colors hover:border-primary/30">
                      <CardContent className="p-4">
                        <h5 className="mb-3 text-base font-semibold text-primary">{pattern.name}</h5>

                        {/* Pattern Output Preview */}
                        <div className="mb-3">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">Output:</span>
                          <pre className="mt-1 overflow-x-auto whitespace-pre rounded-[1rem] border border-slate-200 bg-white p-3 text-xs font-mono leading-relaxed text-slate-800 dark:border-slate-300">
                            {pattern.output}
                          </pre>
                        </div>

                        {/* Pattern Code */}
                        <div>
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">Python Code:</span>
                          <PythonCodeBlock code={pattern.code} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            )}

            {/* Section F: Exam Tips */}
            {!searchQuery && (
              <Section
                id="exam-tips"
                icon={<Lightbulb className="w-5 h-5" />}
                title="IITM Exam-Pro Tips"
                subtitle="Essential strategies for exam success"
                isOpen={openSections.has('exam-tips')}
                onToggle={() => toggleSection('exam-tips')}
              >
                <div className="grid gap-3">
                  {examTips.map((tip, idx) => (
                    <Card key={idx} className="border-border/80 bg-card/92 transition-colors hover:border-emerald-500/35">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                          <div>
                            <h4 className="font-semibold text-foreground">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground">{tip.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* TOC Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <Card className="border-border/80 bg-card/92">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-1">
                    {tocSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* TOC - Mobile Toggle */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowMobileToc(!showMobileToc)}
              className="rounded-full bg-primary p-4 text-white shadow-[var(--shadow)] hover:bg-primary/95"
            >
              <BookOpen className="w-6 h-6" />
            </button>
          </div>

          {/* TOC - Mobile Drawer */}
          {showMobileToc && (
            <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setShowMobileToc(false)}>
              <div
                className="absolute bottom-0 right-0 top-0 w-72 border-l border-border/80 bg-popover/98 p-4 shadow-[var(--shadow-lg)]"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {tocSections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
