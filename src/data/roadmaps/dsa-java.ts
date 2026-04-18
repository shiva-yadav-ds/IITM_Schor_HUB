import { Book, Code, BrainCircuit, Network, PenTool, GitBranch, Boxes, Timer, ArrowDownUp, Share2, Workflow, Coffee } from 'lucide-react';

export const dsaJavaRoadmap = {
  title: "Complete Roadmap to Master DSA in Java",
  description: "This comprehensive learning path will guide you through everything you need to know to become proficient in Data Structures and Algorithms using Java.",
  sections: [
    {
      id: "java-basics",
      title: "Java Programming Basics",
      description: "Master the fundamentals of Java programming before diving into DSA concepts.",
      color: "blue",
      icon: Coffee,
      modules: [
        {
          id: "java-basics-module1",
          title: "Module 1: Java Fundamentals",
          icon: Book,
          lectures: [
            "Introduction to Java and JDK Setup",
            "Variables, Data Types, and Operators",
            "Input/Output Operations",
            "Control Flow Statements (if-else, switch)",
            "Loops (for, while, do-while)",
            "Methods and Method Overloading",
            "Arrays and String Manipulation",
            "Exception Handling",
            "Java Collections Framework Overview"
          ]
        },
        {
          id: "java-basics-module2",
          title: "Module 2: Object-Oriented Programming",
          icon: Code,
          lectures: [
            "OOP Concepts in Java",
            "Classes and Objects",
            "Constructors and 'this' Keyword",
            "Inheritance and 'super' Keyword",
            "Polymorphism and Method Overriding",
            "Abstraction and Abstract Classes",
            "Interfaces and Default Methods",
            "Encapsulation and Access Modifiers",
            "Static and Final Keywords",
            "Packages and Import Statements",
            "Java Documentation Comments"
          ]
        },
        {
          id: "java-basics-module3",
          title: "Module 3: Advanced Java Features",
          icon: Coffee,
          lectures: [
            "Generic Classes and Methods",
            "Lambda Expressions",
            "Functional Interfaces",
            "Stream API Basics",
            "Collections Utility Methods",
            "I/O Operations and Files",
            "Java Memory Management",
            "Multithreading Basics",
            "Annotations",
            "Reflection API",
            "Java 8+ Features Overview"
          ]
        }
      ]
    },
    {
      id: "basic-dsa",
      title: "Basic Data Structures",
      description: "Learn the fundamental data structures that form the building blocks of algorithms in Java.",
      color: "green",
      icon: Boxes,
      modules: [
        {
          id: "basic-dsa-module1",
          title: "Module 1: Arrays and Lists",
          icon: Boxes,
          lectures: [
            "Java Arrays and Their Operations",
            "ArrayList Implementation and Operations",
            "LinkedList vs ArrayList in Java",
            "Multidimensional Arrays",
            "Vector and Stack Classes",
            "Time Complexity Analysis of List Operations",
            "Collections Utility Methods for Lists",
            "Common Array/List Algorithms in Java",
            "Arrays Class Utility Methods"
          ]
        },
        {
          id: "basic-dsa-module2",
          title: "Module 2: Linked Lists",
          icon: Share2,
          lectures: [
            "Linked List Concepts",
            "Implementing Singly Linked List in Java",
            "Doubly Linked List Implementation",
            "Circular Linked Lists",
            "Linked List Operations (Insertion, Deletion, Search)",
            "Java's LinkedList Class",
            "Linked List Problems and Solutions",
            "Memory Management in Linked Lists",
            "Linked Lists vs Arrays: Trade-offs"
          ]
        },
        {
          id: "basic-dsa-module3",
          title: "Module 3: Stacks and Queues",
          icon: ArrowDownUp,
          lectures: [
            "Stack Data Structure Concepts",
            "Stack Implementation using Arrays",
            "Stack Implementation using LinkedList",
            "Java's Stack and Deque Interfaces",
            "Queue Data Structure Concepts",
            "Queue Implementation using Arrays and LinkedList",
            "Priority Queue in Java",
            "Deque (Double-ended Queue) Implementation",
            "Applications of Stacks and Queues"
          ]
        },
        {
          id: "basic-dsa-module4",
          title: "Module 4: Hash-Based Structures",
          icon: Code,
          lectures: [
            "Hashing Concepts and Hash Functions",
            "Hash Table Implementation in Java",
            "HashMap and HashSet in Java",
            "Handling Collisions",
            "LinkedHashMap and LinkedHashSet",
            "TreeMap and TreeSet",
            "Hashtable vs ConcurrentHashMap",
            "Custom Objects as Keys in HashMaps",
            "Hash Codes and equals() Method"
          ]
        }
      ]
    },
    {
      id: "advanced-dsa",
      title: "Advanced Data Structures",
      description: "Explore more complex data structures essential for solving challenging problems in Java.",
      color: "purple",
      icon: Network,
      modules: [
        {
          id: "advanced-dsa-module1",
          title: "Module 1: Trees",
          icon: GitBranch,
          lectures: [
            "Tree Data Structure Fundamentals",
            "Binary Tree Implementation in Java",
            "Binary Search Trees (BST)",
            "Tree Traversals (In-order, Pre-order, Post-order, Level-order)",
            "AVL Trees Implementation",
            "Red-Black Trees in Java",
            "Java's TreeMap and TreeSet Internals",
            "B-Tree and B+ Tree Concepts",
            "Trie Data Structure Implementation",
            "Heap Data Structure and PriorityQueue"
          ]
        },
        {
          id: "advanced-dsa-module2",
          title: "Module 2: Graphs",
          icon: Network,
          lectures: [
            "Graph Theory Basics",
            "Graph Representations in Java",
            "Graph Traversals (BFS, DFS) Implementation",
            "Shortest Path Algorithms (Dijkstra's, Bellman-Ford)",
            "Minimum Spanning Tree (Prim's, Kruskal's)",
            "Strongly Connected Components",
            "Topological Sort Implementation",
            "Graph Coloring Problems",
            "Network Flow Algorithms",
            "Java Libraries for Graphs"
          ]
        },
        {
          id: "advanced-dsa-module3",
          title: "Module 3: Advanced Data Structures",
          icon: BrainCircuit,
          lectures: [
            "Disjoint Set Union (Union-Find) in Java",
            "Segment Trees Implementation",
            "Fenwick Tree (Binary Indexed Tree)",
            "Sparse Tables for Range Queries",
            "Suffix Arrays and Suffix Trees",
            "Skip List Implementation",
            "Bloom Filters",
            "LRU Cache Implementation",
            "Concurrent Data Structures in Java",
            "Custom Collection Implementations"
          ]
        }
      ]
    },
    {
      id: "algorithms",
      title: "Algorithms",
      description: "Master core algorithmic techniques and approaches to problem-solving in Java.",
      color: "rose",
      icon: Workflow,
      modules: [
        {
          id: "algorithms-module1",
          title: "Module 1: Sorting Algorithms",
          icon: ArrowDownUp,
          lectures: [
            "Bubble Sort in Java",
            "Selection Sort and Insertion Sort",
            "Merge Sort Implementation",
            "Quick Sort Implementation",
            "Heap Sort in Java",
            "Counting Sort and Radix Sort",
            "Java's Arrays.sort() and Collections.sort()",
            "Comparator and Comparable Interfaces",
            "Stability in Sorting Algorithms",
            "Custom Sorting Implementation"
          ]
        },
        {
          id: "algorithms-module2",
          title: "Module 2: Searching Algorithms",
          icon: PenTool,
          lectures: [
            "Linear Search in Arrays and Lists",
            "Binary Search Implementation",
            "Binary Search using Java's Arrays.binarySearch()",
            "Jump Search and Interpolation Search",
            "Exponential Search",
            "Searching in Rotated Sorted Arrays",
            "String Searching Algorithms",
            "Pattern Matching (KMP, Rabin-Karp)",
            "Java's Stream API for Searching",
            "Custom Search Functionality"
          ]
        },
        {
          id: "algorithms-module3",
          title: "Module 3: Algorithmic Paradigms",
          icon: BrainCircuit,
          lectures: [
            "Brute Force Approach in Java",
            "Divide and Conquer Strategy",
            "Greedy Algorithms Implementation",
            "Dynamic Programming in Java",
            "Memoization Techniques",
            "Tabulation Methods",
            "Backtracking Algorithm Implementation",
            "Branch and Bound",
            "Bit Manipulation in Java",
            "Randomized Algorithms"
          ]
        },
        {
          id: "algorithms-module4",
          title: "Module 4: String Algorithms",
          icon: Code,
          lectures: [
            "String Manipulation in Java",
            "Regular Expressions",
            "Pattern Matching Algorithms",
            "String Building and Formatting",
            "Palindrome and Anagram Checks",
            "Longest Common Subsequence",
            "Longest Palindromic Substring",
            "Edit Distance Algorithm",
            "Substring Search Algorithms",
            "Java's String and StringBuilder Classes"
          ]
        }
      ]
    },
    {
      id: "problem-solving",
      title: "Problem Solving Techniques",
      description: "Develop strategies to approach and solve algorithmic problems effectively in Java.",
      color: "indigo",
      icon: PenTool,
      modules: [
        {
          id: "problem-solving-module1",
          title: "Module 1: Problem-Solving Methodology",
          icon: PenTool,
          lectures: [
            "Problem Analysis Techniques",
            "Breaking Down Complex Problems",
            "Algorithmic Pattern Recognition",
            "Developing Multiple Solutions",
            "Time and Space Complexity Analysis in Java",
            "Solution Optimization Strategies",
            "Edge Cases and Testing",
            "Problem-Solving Templates in Java",
            "Java-specific Tricks and Techniques",
            "Debugging Strategies"
          ]
        },
        {
          id: "problem-solving-module2",
          title: "Module 2: Common Problem Patterns",
          icon: Workflow,
          lectures: [
            "Two Pointers Technique in Java",
            "Sliding Window Implementation",
            "Fast and Slow Pointers",
            "Merge Intervals Pattern",
            "Cyclic Sort Pattern",
            "In-place Reversal of LinkedList",
            "Tree Breadth First Search",
            "Tree Depth First Search",
            "Subsets and Permutations",
            "Modified Binary Search Patterns"
          ]
        },
        {
          id: "problem-solving-module3",
          title: "Module 3: Advanced Problem Types",
          icon: BrainCircuit,
          lectures: [
            "Graph Problems in Java",
            "Dynamic Programming Patterns",
            "Bit Manipulation Problems",
            "Mathematical Problems",
            "Geometric Algorithm Implementation",
            "Game Theory Problems",
            "System Design Problems",
            "Multithreading Problems",
            "Object-Oriented Design Problems",
            "Java Language-Specific Optimizations"
          ]
        }
      ]
    },
    {
      id: "optimization",
      title: "Java Performance & Optimization",
      description: "Learn to analyze and optimize your Java algorithms for better performance.",
      color: "amber",
      icon: Timer,
      modules: [
        {
          id: "optimization-module1",
          title: "Module 1: Java Performance Analysis",
          icon: Timer,
          lectures: [
            "Java Profiling Tools",
            "JVM Performance Tuning",
            "Measuring Algorithm Performance",
            "Big O Analysis in Java Context",
            "Memory Usage Analysis",
            "Java Benchmarking with JMH",
            "VisualVM and Java Mission Control",
            "Garbage Collection Analysis",
            "Java Flight Recorder",
            "Performance Testing Strategies"
          ]
        },
        {
          id: "optimization-module2",
          title: "Module 2: Java Optimization Techniques",
          icon: Coffee,
          lectures: [
            "Java Collection Selection Guidelines",
            "Stream API Optimization",
            "Primitive vs Wrapper Classes",
            "String Optimization Techniques",
            "Immutable Objects and Performance",
            "Thread Safety Considerations",
            "Memory Management Optimization",
            "I/O Performance Optimization",
            "Java 9+ Performance Improvements",
            "Compiler Optimizations"
          ]
        },
        {
          id: "optimization-module3",
          title: "Module 3: Practical Applications",
          icon: Code,
          lectures: [
            "Real-world DSA Applications in Java",
            "Leetcode Problem Solving Strategies",
            "Interview Problem Patterns in Java",
            "Building a DSA Project in Java",
            "Threading and Concurrency Applications",
            "Enterprise Application Optimizations",
            "DSA in Spring Framework",
            "Java in System Design",
            "Java APIs and Libraries for DSA",
            "Career Paths for Java DSA Specialists"
          ]
        }
      ]
    }
  ]
}; 