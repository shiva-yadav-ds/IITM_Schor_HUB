import { Book, Code, BrainCircuit, Network, PenTool, GitBranch, Boxes, Timer, ArrowDownUp, Share2, Workflow } from 'lucide-react';

export const dsaPythonRoadmap = {
  title: "Complete Roadmap to Master DSA in Python",
  description: "This comprehensive learning path will guide you through everything you need to know to become proficient in Data Structures and Algorithms using Python.",
  sections: [
    {
      id: "python-basics",
      title: "Python Programming Basics",
      description: "Master the fundamentals of Python programming before diving into DSA concepts.",
      color: "blue",
      icon: Code,
      modules: [
        {
          id: "python-basics-module1",
          title: "Module 1: Python Fundamentals",
          icon: Book,
          lectures: [
            "Introduction to Python and Setup",
            "Variables, Data Types, and Operators",
            "Input/Output Operations",
            "Control Flow: if-else, loops",
            "Functions and Modules",
            "String Manipulation",
            "Lists, Tuples, and Dictionaries",
            "Sets and List Comprehensions",
            "Exception Handling"
          ]
        },
        {
          id: "python-basics-module2",
          title: "Module 2: Intermediate Python",
          icon: Code,
          lectures: [
            "File Operations",
            "Object-Oriented Programming",
            "Classes and Objects",
            "Inheritance and Polymorphism",
            "Lambda Functions and Map/Reduce/Filter",
            "Regular Expressions",
            "Modules and Packages",
            "Working with External Libraries",
            "Virtual Environments"
          ]
        }
      ]
    },
    {
      id: "basic-dsa",
      title: "Basic Data Structures",
      description: "Learn the fundamental data structures that form the building blocks of algorithms.",
      color: "green",
      icon: Boxes,
      modules: [
        {
          id: "basic-dsa-module1",
          title: "Module 1: Arrays and Lists",
          icon: Boxes,
          lectures: [
            "Introduction to Arrays vs Lists in Python",
            "Array Operations and Time Complexity",
            "List Methods and Operations",
            "Multi-dimensional Arrays using NumPy",
            "Array Slicing and Manipulations",
            "In-place vs Out-of-place Operations",
            "Common Array/List Algorithms",
            "Array Problems and Solutions",
            "Implementing Custom Array Functions"
          ]
        },
        {
          id: "basic-dsa-module2",
          title: "Module 2: Linked Lists",
          icon: Share2,
          lectures: [
            "Introduction to Linked Lists",
            "Singly Linked Lists Implementation",
            "Doubly Linked Lists Implementation",
            "Circular Linked Lists",
            "Linked List Operations (Insertion, Deletion, Search)",
            "Reversing a Linked List",
            "Detecting Cycles in Linked Lists",
            "Merging Sorted Linked Lists",
            "Linked Lists vs Arrays: Pros and Cons"
          ]
        },
        {
          id: "basic-dsa-module3",
          title: "Module 3: Stacks and Queues",
          icon: ArrowDownUp,
          lectures: [
            "Stack Data Structure Introduction",
            "Implementing Stacks using Lists and Linked Lists",
            "Stack Operations and Applications",
            "Queue Data Structure Introduction",
            "Implementing Queues using Lists and Linked Lists",
            "Queue Operations and Applications",
            "Deques (Double-ended Queues)",
            "Priority Queues",
            "Solving Problems using Stacks and Queues"
          ]
        },
        {
          id: "basic-dsa-module4",
          title: "Module 4: Hash Tables & Sets",
          icon: Boxes,
          lectures: [
            "Hash Tables Concepts and Hash Functions",
            "Implementing Hash Tables in Python",
            "Dictionaries in Python as Hash Tables",
            "Handling Collisions",
            "Open vs Closed Addressing",
            "Sets in Python and Operations",
            "Common Hash Table Problems",
            "Time and Space Complexity Analysis",
            "Custom Hash Map Implementation"
          ]
        }
      ]
    },
    {
      id: "advanced-dsa",
      title: "Advanced Data Structures",
      description: "Explore more complex data structures essential for solving challenging problems.",
      color: "purple",
      icon: Network,
      modules: [
        {
          id: "advanced-dsa-module1",
          title: "Module 1: Trees",
          icon: GitBranch,
          lectures: [
            "Introduction to Trees",
            "Binary Trees and Their Implementation",
            "Binary Search Trees (BST)",
            "Tree Traversals (In-order, Pre-order, Post-order, Level-order)",
            "AVL Trees and Self-balancing Trees",
            "Red-Black Trees",
            "B-Trees and B+ Trees",
            "Trie Data Structure",
            "Heap Data Structure and Implementation"
          ]
        },
        {
          id: "advanced-dsa-module2",
          title: "Module 2: Graphs",
          icon: Network,
          lectures: [
            "Introduction to Graphs",
            "Graph Representations (Adjacency Matrix, Adjacency List)",
            "Graph Traversals (BFS, DFS)",
            "Shortest Path Algorithms (Dijkstra's, Bellman-Ford)",
            "Minimum Spanning Tree (Prim's, Kruskal's)",
            "Strongly Connected Components",
            "Topological Sort",
            "Graph Coloring",
            "Network Flow and Bipartite Matching"
          ]
        },
        {
          id: "advanced-dsa-module3",
          title: "Module 3: Advanced Data Structures",
          icon: BrainCircuit,
          lectures: [
            "Disjoint Set Union (Union-Find)",
            "Segment Trees",
            "Fenwick Tree (Binary Indexed Tree)",
            "Sparse Tables",
            "Suffix Arrays and Suffix Trees",
            "Skip Lists",
            "Bloom Filters",
            "Rope Data Structure",
            "Persistent Data Structures"
          ]
        }
      ]
    },
    {
      id: "algorithms",
      title: "Algorithms",
      description: "Master core algorithmic techniques and approaches to problem-solving.",
      color: "rose",
      icon: Workflow,
      modules: [
        {
          id: "algorithms-module1",
          title: "Module 1: Sorting Algorithms",
          icon: ArrowDownUp,
          lectures: [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Merge Sort",
            "Quick Sort",
            "Heap Sort",
            "Counting Sort and Radix Sort",
            "Bucket Sort",
            "Comparison of Sorting Algorithms"
          ]
        },
        {
          id: "algorithms-module2",
          title: "Module 2: Searching Algorithms",
          icon: PenTool,
          lectures: [
            "Linear Search",
            "Binary Search",
            "Jump Search",
            "Interpolation Search",
            "Exponential Search",
            "Searching in Rotated Sorted Arrays",
            "Ternary Search",
            "String Searching Algorithms (KMP, Rabin-Karp)",
            "Searching in 2D Arrays"
          ]
        },
        {
          id: "algorithms-module3",
          title: "Module 3: Algorithmic Paradigms",
          icon: BrainCircuit,
          lectures: [
            "Brute Force Approach",
            "Divide and Conquer",
            "Greedy Algorithms",
            "Dynamic Programming",
            "Memoization vs Tabulation",
            "Backtracking",
            "Branch and Bound",
            "Randomized Algorithms",
            "Approximation Algorithms"
          ]
        },
        {
          id: "algorithms-module4",
          title: "Module 4: String Algorithms",
          icon: Code,
          lectures: [
            "String Manipulation in Python",
            "Pattern Matching Algorithms",
            "Knuth-Morris-Pratt Algorithm",
            "Rabin-Karp Algorithm",
            "Longest Common Subsequence",
            "Longest Palindromic Substring",
            "Levenshtein Distance",
            "Suffix Trees and Arrays",
            "Regular Expressions in Python"
          ]
        }
      ]
    },
    {
      id: "problem-solving",
      title: "Problem Solving Techniques",
      description: "Develop strategies to approach and solve algorithmic problems effectively.",
      color: "indigo",
      icon: PenTool,
      modules: [
        {
          id: "problem-solving-module1",
          title: "Module 1: Problem-Solving Methodology",
          icon: PenTool,
          lectures: [
            "Understanding the Problem",
            "Breaking Down Complex Problems",
            "Pattern Recognition in Problems",
            "Developing Multiple Solutions",
            "Time and Space Complexity Analysis",
            "Optimizing Solutions",
            "Testing and Edge Cases",
            "Problem-Solving Templates",
            "Common Tricks and Techniques"
          ]
        },
        {
          id: "problem-solving-module2",
          title: "Module 2: Common Problem Patterns",
          icon: Workflow,
          lectures: [
            "Two Pointers",
            "Sliding Window",
            "Fast and Slow Pointers",
            "Merge Intervals",
            "Cyclic Sort",
            "In-place Reversal of Linked Lists",
            "Tree Breadth First Search",
            "Tree Depth First Search",
            "Subsets, Permutations, and Combinations"
          ]
        },
        {
          id: "problem-solving-module3",
          title: "Module 3: Advanced Problem Types",
          icon: BrainCircuit,
          lectures: [
            "Graph Problems",
            "Dynamic Programming Patterns",
            "Bit Manipulation",
            "Mathematical Problems",
            "Geometric Problems",
            "Game Theory Problems",
            "System Design",
            "NP-Complete Problems",
            "Heuristic Approaches"
          ]
        }
      ]
    },
    {
      id: "optimization",
      title: "Algorithm Analysis & Optimization",
      description: "Learn to analyze and optimize your algorithms for better performance.",
      color: "amber",
      icon: Timer,
      modules: [
        {
          id: "optimization-module1",
          title: "Module 1: Algorithm Analysis",
          icon: Timer,
          lectures: [
            "Introduction to Algorithm Analysis",
            "Big O, Omega, and Theta Notations",
            "Best, Worst, and Average Case Analysis",
            "Space Complexity Analysis",
            "Amortized Analysis",
            "Recurrence Relations",
            "Master Theorem",
            "Python Performance Profiling Tools",
            "Benchmarking Algorithms"
          ]
        },
        {
          id: "optimization-module2",
          title: "Module 2: Optimization Techniques",
          icon: BrainCircuit,
          lectures: [
            "Code Optimization in Python",
            "Memory Optimization",
            "Algorithmic Optimizations",
            "Using Built-in Python Functions Effectively",
            "Choosing the Right Data Structure",
            "Precomputation and Caching",
            "Parallel Processing in Python",
            "NumPy and Vectorization",
            "Case Studies in Optimization"
          ]
        },
        {
          id: "optimization-module3",
          title: "Module 3: Practical Applications",
          icon: Code,
          lectures: [
            "Real-world DSA Applications",
            "Leetcode Problem Solving Strategies",
            "Interview Problem Patterns",
            "Building a DSA Project",
            "DSA in Web Development",
            "DSA in Data Science",
            "DSA in Machine Learning Pipelines",
            "System Design using DSA",
            "Career Paths in DSA"
          ]
        }
      ]
    }
  ]
}; 