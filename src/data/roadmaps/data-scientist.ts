import { Book, Code, Database, LineChart, BrainCircuit, Network, PenTool, MonitorSmartphone, Cpu, Diff, AlignJustify, Bot, Lightbulb, Terminal, ImageIcon, MessageSquare, Mic, Settings, BarChart, Layers, Link, FileText } from 'lucide-react';

export const dataScientistRoadmap = {
  title: "Complete Roadmap to Become a Pro Data Scientist",
  description: "This comprehensive learning path will guide you through everything you need to know to become a proficient data scientist, from programming fundamentals to advanced machine learning techniques.",
  sections: [
    {
      id: "python",
      title: "Python for Data Science",
      description: "Python is the foundation for data science. This section covers everything from basic syntax to advanced features that will help you manipulate and analyze data effectively.",
      color: "blue",
      icon: Code,
      modules: [
        {
          id: "python-module1",
          title: "Module 1: Python Basics",
          icon: Book,
          lectures: [
            {
              id: "py-basics-1",
              title: "Lecture 1: Introduction to Python",
              content: "Overview of Python as a programming language, its history, applications in data science, and setting up your development environment. Learn about Python's key features and why it's ideal for data science work."
            },
            {
              id: "py-basics-2",
              title: "Lecture 2: Python Objects, Numbers, Booleans & Strings",
              content: "Understanding Python's object-oriented nature, working with numeric data types (int, float, complex), boolean values (True/False), and string manipulation basics for text processing."
            },
            {
              id: "py-basics-3",
              title: "Lecture 3: Container Objects, Mutability of Objects",
              content: "Exploring Python's container types (list, tuple, dict, set), understanding the concept of mutability vs immutability, and how it affects data manipulation and memory usage."
            },
            {
              id: "py-basics-4",
              title: "Lecture 4: Operators",
              content: "Comprehensive overview of Python operators: arithmetic, comparison, assignment, logical, bitwise, identity, and membership operators. How to use these effectively in data operations."
            },
            {
              id: "py-basics-5",
              title: "Lecture 5: Python Type Conversion",
              content: "Techniques for converting between data types (implicit and explicit type conversion), handling type errors, and best practices for managing data types in analytical workflows."
            },
            {
              id: "py-basics-6",
              title: "Lecture 6: Conditions (If-Else, If-Elif-Else)",
              content: "Implementing conditional logic with if, elif, and else statements. Creating decision trees and controlling program flow based on data conditions."
            },
            {
              id: "py-basics-7",
              title: "Lecture 7: Loops (While, For)",
              content: "Using for loops and while loops for iteration, controlling loop execution, and applying loops for data processing tasks in data science applications."
            },
            {
              id: "py-basics-8",
              title: "Lecture 8: Break and Continue Statements and Range Function",
              content: "Flow control within loops using break and continue, generating sequences with range(), and optimizing loop performance for data processing tasks."
            },
            {
              id: "py-basics-9",
              title: "Lecture 9: Python Namespace",
              content: "Understanding Python's namespace concept, variable scope (local, enclosing, global, built-in), and how namespaces affect your code organization in data science projects."
            }
          ]
        },
        {
          id: "python-module2",
          title: "Module 2: Data Types & Functions",
          icon: Code,
          lectures: [
            {
              id: "py-dt-1",
              title: "Lecture 1: Basic Data Structure in Python",
              content: "Deep dive into Python's core data structures (lists, tuples, sets, dictionaries) and their applications in organizing and managing datasets."
            },
            {
              id: "py-dt-2",
              title: "Lecture 2: String Object Basics",
              content: "String fundamentals including creation, indexing, slicing, and basic operations for text data processing in data science applications."
            },
            {
              id: "py-dt-3",
              title: "Lecture 3: String Inbuilt Methods",
              content: "Exploring Python's powerful string methods for text manipulation, searching, replacing, and formatting in data cleaning and preparation tasks."
            },
            {
              id: "py-dt-4",
              title: "Lecture 4: Splitting and Joining Strings",
              content: "Techniques for splitting strings into components and joining collections into strings, essential for text data parsing and preprocessing."
            },
            {
              id: "py-dt-5",
              title: "Lecture 5: String Format Functions",
              content: "Advanced string formatting with str.format(), f-strings, and format specifiers for creating reports and presenting data science results."
            },
            {
              id: "py-dt-6",
              title: "Lecture 6: List Methods",
              content: "Comprehensive overview of list manipulation methods (append, extend, insert, remove, pop, etc.) for managing sequential data."
            },
            {
              id: "py-dt-7",
              title: "Lecture 7: List as Stack and Queues",
              content: "Implementing stack (LIFO) and queue (FIFO) data structures using Python lists for algorithm implementation in data analysis."
            },
            {
              id: "py-dt-8",
              title: "Lecture 8: List Comprehensions",
              content: "Writing concise and efficient list comprehensions for data transformation, filtering, and generation in data science workflows."
            },
            {
              id: "py-dt-9",
              title: "Lecture 9: Tuples, Sets & Dictionary Object Methods",
              content: "Detailed exploration of tuple methods, set operations (union, intersection, difference), and dictionary methods for various data handling scenarios."
            },
            {
              id: "py-dt-10",
              title: "Lecture 10: Dictionary Comprehensions",
              content: "Creating dictionaries efficiently with dictionary comprehensions for key-value data transformations and feature engineering."
            },
            {
              id: "py-dt-11",
              title: "Lecture 11: Dictionary View Objects",
              content: "Working with dictionary views (keys, values, items) and their dynamic behavior for efficient dictionary operations in data processing."
            },
            {
              id: "py-dt-12",
              title: "Lecture 12: Functions Basics, Parameter Passing, Iterators",
              content: "Creating functions, understanding different parameter types (positional, keyword, default, variable-length), and implementing iterators for data processing."
            },
            {
              id: "py-dt-13",
              title: "Lecture 13: Generator Functions",
              content: "Building memory-efficient generators with yield statements for handling large datasets without loading everything into memory."
            },
            {
              id: "py-dt-14",
              title: "Lecture 14: Lambda Functions",
              content: "Writing anonymous lambda functions for short operations and function arguments in data transformation and analytics workflows."
            },
            {
              id: "py-dt-15",
              title: "Lecture 15: Map, Reduce, Filter Functions",
              content: "Applying functional programming concepts with map(), reduce(), and filter() for elegant and efficient data processing operations."
            }
          ]
        },
        {
          id: "python-module3",
          title: "Module 3: OOPS",
          icon: Code,
          lectures: [
            {
              id: "py-oops-1",
              title: "Lecture 1: OOPS Basic Concepts",
              content: "Introduction to Object-Oriented Programming paradigm in Python, covering classes, objects, attributes, and methods for structured data science application development."
            },
            {
              id: "py-oops-2",
              title: "Lecture 2: Creating Classes",
              content: "Defining classes, constructors (__init__), instance attributes, and methods to model real-world entities in data science applications."
            },
            {
              id: "py-oops-3",
              title: "Lecture 3: Pillars of OOPS",
              content: "Overview of the four major principles of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction, and their relevance in data science."
            },
            {
              id: "py-oops-4",
              title: "Lecture 4: Inheritance",
              content: "Implementing class inheritance, creating parent and child classes, method overriding, and utilizing super() for code reuse in data processing frameworks."
            },
            {
              id: "py-oops-5",
              title: "Lecture 5: Polymorphism",
              content: "Applying polymorphic behavior through method overriding and operator overloading to create flexible data processing components."
            },
            {
              id: "py-oops-6",
              title: "Lecture 6: Encapsulation",
              content: "Using access modifiers (public, protected, private), property getters/setters, and information hiding for robust data science class implementations."
            },
            {
              id: "py-oops-7",
              title: "Lecture 7: Abstraction",
              content: "Creating abstract base classes, interfaces, and implementing abstraction to create reusable and modular data processing components."
            },
            {
              id: "py-oops-8",
              title: "Lecture 8: Decorator",
              content: "Understanding and implementing function and class decorators to add functionality to existing code without modifying core implementation."
            },
            {
              id: "py-oops-9",
              title: "Lecture 9: Class Methods and Static Methods",
              content: "Defining and using class methods (@classmethod) and static methods (@staticmethod) for operations that don't require object instances."
            },
            {
              id: "py-oops-10",
              title: "Lecture 10: Special (Magic/Dunder) Methods",
              content: "Implementing special methods (__str__, __repr__, __eq__, __lt__, etc.) to customize object behavior in Python for data model integration."
            },
            {
              id: "py-oops-11",
              title: "Lecture 11: Property Decorators - Getters, Setters, and Deletes",
              content: "Using the @property decorator to create managed attributes with custom access, validation, and deletion behavior in data classes."
            }
          ]
        },
        {
          id: "python-module4",
          title: "Module 4: Files & Exceptional Handling",
          icon: Code,
          lectures: [
            {
              id: "py-files-1",
              title: "Lecture 1: Working with Files",
              content: "Introduction to file handling in Python, file objects, file paths, and the importance of proper file operations in data science workflows."
            },
            {
              id: "py-files-2",
              title: "Lecture 2: Reading and Writing Files",
              content: "Opening, reading, writing, and closing files using various modes (text vs binary), handling different file formats common in data science."
            },
            {
              id: "py-files-3",
              title: "Lecture 3: Buffered Read and Write",
              content: "Understanding buffer mechanisms for efficient file I/O, reading/writing in chunks, and optimizing file operations for large datasets."
            },
            {
              id: "py-files-4",
              title: "Lecture 4: Other File Methods",
              content: "Exploring additional file operations like seeking, telling position, truncating, and context managers (with statement) for safe file handling."
            },
            {
              id: "py-files-5",
              title: "Lecture 5: Logging, Debugger",
              content: "Implementing logging for data science applications, configuring log levels, using the Python debugger (pdb) for troubleshooting data processing code."
            },
            {
              id: "py-files-6",
              title: "Lecture 6: Modules and Import Statements",
              content: "Organizing code into modules, creating packages, import mechanisms, and managing dependencies in data science projects."
            },
            {
              id: "py-files-7",
              title: "Lecture 7: Exceptions Handling with Try-Except",
              content: "Implementing try-except blocks to catch and handle errors, ensuring data science pipelines continue running despite unexpected issues."
            },
            {
              id: "py-files-8",
              title: "Lecture 8: Custom Exception Handling",
              content: "Creating custom exception classes for specific error types in data processing, raising exceptions, and designing error handling strategies."
            },
            {
              id: "py-files-9",
              title: "Lecture 9: List of General Use Exception",
              content: "Overview of common Python exceptions (ValueError, TypeError, FileNotFoundError, etc.) and appropriate handling techniques in data science applications."
            },
            {
              id: "py-files-10",
              title: "Lecture 10: Best Practice Exception Handling",
              content: "Implementing exception handling patterns, error logging, recovery strategies, and defensive programming for robust data processing pipelines."
            }
          ]
        },
        {
          id: "python-module5",
          title: "Module 5: Database & Web API",
          icon: Database,
          lectures: [
            {
              id: "py-db-1",
              title: "Lecture 1: Multithreading",
              content: "Implementing concurrent execution with threads, understanding the Global Interpreter Lock (GIL), and applying threading for I/O-bound data processing tasks."
            },
            {
              id: "py-db-2",
              title: "Lecture 2: Multiprocessing",
              content: "Using the multiprocessing module to execute truly parallel tasks, process pools, and sharing data between processes for CPU-bound data analysis."
            },
            {
              id: "py-db-3",
              title: "Lecture 3: MySQL",
              content: "Connecting to MySQL databases using Python, executing SQL queries, fetching and manipulating data, and integrating databases in data science workflows."
            },
            {
              id: "py-db-4",
              title: "Lecture 4: MongoDB",
              content: "Working with MongoDB NoSQL database, storing and retrieving JSON-like documents, and using MongoDB for flexible schema data storage in data pipelines."
            },
            {
              id: "py-db-5",
              title: "Lecture 5: What is Web API",
              content: "Understanding Web APIs, their role in data science for accessing remote data sources, and the HTTP protocol for client-server communication."
            },
            {
              id: "py-db-6",
              title: "Lecture 6: Difference Between API and Web API",
              content: "Distinguishing between general APIs and Web APIs, understanding their architectural differences, and appropriate use cases in data science."
            },
            {
              id: "py-db-7",
              title: "Lecture 7: REST and SOAP Architecture",
              content: "Comparing REST and SOAP web service architectures, understanding their principles, and using them to access data for analysis and machine learning."
            },
            {
              id: "py-db-8",
              title: "Lecture 8: RESTful Services",
              content: "Consuming RESTful APIs with Python requests library, handling authentication, parsing responses, and integrating API data into data science workflows."
            }
          ]
        },
        {
          id: "python-module6",
          title: "Module 6: Python Libraries",
          icon: Code,
          lectures: [
            {
              id: "py-lib-1",
              title: "Lecture 1: NumPy",
              content: "Mastering NumPy for numerical computing, working with arrays, vectorization, broadcasting, and performing efficient mathematical operations essential for data science."
            },
            {
              id: "py-lib-2",
              title: "Lecture 2: Pandas",
              content: "Using Pandas for data manipulation and analysis, working with DataFrames and Series, data cleaning, transformation, merging, and statistical operations."
            },
            {
              id: "py-lib-3",
              title: "Lecture 3: Matplotlib",
              content: "Creating static, animated, and interactive visualizations with Matplotlib, customizing plots, and building publication-quality figures for data exploration."
            },
            {
              id: "py-lib-4",
              title: "Lecture 4: Seaborn",
              content: "Implementing statistical data visualization with Seaborn, creating complex plots like heatmaps, pair plots, and distribution plots for advanced data analysis."
            },
            {
              id: "py-lib-5",
              title: "Lecture 5: Plotly",
              content: "Building interactive visualizations and dashboards with Plotly, creating web-ready charts, and implementing interactive data exploration tools."
            },
            {
              id: "py-lib-6",
              title: "Lecture 6: Bokeh",
              content: "Developing interactive web visualizations with Bokeh, creating dashboards, and building tools for visual data exploration in browser environments."
            }
          ]
        }
      ]
    },
    {
      id: "statistics",
      title: "Statistics for Data Science",
      description: "Statistics is the backbone of data analysis. Learn fundamental statistical concepts and advanced techniques essential for making sense of data.",
      color: "green",
      icon: LineChart,
      modules: [
        {
          id: "statistics-module1",
          title: "Module 1: Statistics Basics",
          icon: LineChart,
          lectures: [
            {
              id: "stats-basics-1",
              title: "Lecture 1: Introduction to Basic Statistics Terms",
              content: "Understanding fundamental statistical terminology, including population, sample, parameter, statistic, and variables. Learn the core concepts that form the foundation of statistical analysis."
            },
            {
              id: "stats-basics-2",
              title: "Lecture 2: Types of Statistics",
              content: "Exploring descriptive statistics vs. inferential statistics. Learn how descriptive statistics summarize data while inferential statistics make predictions and inferences about populations."
            },
            {
              id: "stats-basics-3",
              title: "Lecture 3: Types of Data",
              content: "Classification of data types including categorical (nominal and ordinal) and numerical (discrete and continuous) data. Understanding how data type determines appropriate analysis methods."
            },
            {
              id: "stats-basics-4",
              title: "Lecture 4: Levels of Measurement",
              content: "Understanding the four measurement scales: nominal, ordinal, interval, and ratio. Learn how the level of measurement affects which statistical analyses are appropriate."
            },
            {
              id: "stats-basics-5",
              title: "Lecture 5: Measures of Central Tendency",
              content: "Calculating and interpreting mean, median, and mode as measures of central tendency. Learn when to use each measure based on data distribution and outliers."
            },
            {
              id: "stats-basics-6",
              title: "Lecture 6: Measures of Dispersion",
              content: "Understanding variance, standard deviation, range, interquartile range, and coefficient of variation as measures of spread. Learn how these metrics quantify data variability."
            },
            {
              id: "stats-basics-7",
              title: "Lecture 7: Random Variables",
              content: "Introduction to random variables, including discrete and continuous random variables. Learn about probability distributions and expected values in statistical modeling."
            },
            {
              id: "stats-basics-8",
              title: "Lecture 8: Set",
              content: "Set theory fundamentals and operations including union, intersection, complement, and Venn diagrams. Learn how sets form the foundation for probability theory."
            },
            {
              id: "stats-basics-9",
              title: "Lecture 9: Skewness",
              content: "Understanding distribution symmetry and asymmetry through skewness. Learn to identify positively and negatively skewed distributions and their implications for data analysis."
            },
            {
              id: "stats-basics-10",
              title: "Lecture 10: Covariance and Correlation",
              content: "Calculating and interpreting covariance and correlation coefficients. Learn how these measures quantify relationships between variables and their importance in predictive modeling."
            }
          ]
        },
        {
          id: "statistics-module2",
          title: "Module 2: Statistics Advance",
          icon: LineChart,
          lectures: [
            {
              id: "stats-adv-1",
              title: "Lecture 1: Probability Density/Distribution Function",
              content: "Understanding probability density functions (PDF) and probability mass functions (PMF) for continuous and discrete random variables. Learn how these functions describe probability distributions."
            },
            {
              id: "stats-adv-2",
              title: "Lecture 2: Types of Probability Distribution",
              content: "Overview of common probability distributions including uniform, normal, binomial, Poisson, exponential, and chi-square. Learn when to apply each distribution in data modeling."
            },
            {
              id: "stats-adv-3",
              title: "Lecture 3: Binomial Distribution",
              content: "Deep dive into the binomial distribution for modeling binary outcome experiments. Learn to calculate probabilities and apply this distribution to real-world scenarios."
            },
            {
              id: "stats-adv-4",
              title: "Lecture 4: Poisson Distribution",
              content: "Understanding the Poisson distribution for modeling rare events. Learn applications in modeling count data and event occurrences within fixed intervals."
            },
            {
              id: "stats-adv-5",
              title: "Lecture 5: Normal Distribution (Gaussian Distribution)",
              content: "Exploring the normal distribution, its properties, and its prevalence in natural phenomena. Learn why this distribution is central to statistical theory and data science."
            },
            {
              id: "stats-adv-6",
              title: "Lecture 6: Probability Density Function and Mass Function",
              content: "Comparing PDFs and PMFs in detail, understanding their mathematical properties and applications in continuous and discrete probability distributions."
            },
            {
              id: "stats-adv-7",
              title: "Lecture 7: Cumulative Density Function",
              content: "Working with cumulative distribution functions (CDFs) to calculate probability ranges. Learn how CDFs relate to PDFs and their applications in statistical analysis."
            },
            {
              id: "stats-adv-8",
              title: "Lecture 8: Examples of Normal Distribution",
              content: "Real-world applications of the normal distribution in fields like biology, economics, and quality control. Learn to identify normally distributed phenomena."
            },
            {
              id: "stats-adv-9",
              title: "Lecture 9: Bernoulli Distribution",
              content: "Understanding the Bernoulli distribution as the foundation for binomial and other distributions. Learn its applications in modeling single binary outcomes."
            },
            {
              id: "stats-adv-10",
              title: "Lecture 10: Uniform Distribution",
              content: "Exploring the uniform distribution for modeling equally likely outcomes. Learn its applications in simulation, random number generation, and as a building block for other distributions."
            },
            {
              id: "stats-adv-11",
              title: "Lecture 11: Z-Stats",
              content: "Working with z-scores and the standard normal distribution. Learn to standardize variables, interpret z-scores, and calculate probabilities using the z-table."
            },
            {
              id: "stats-adv-12",
              title: "Lecture 12: Central Limit Theorem",
              content: "Understanding the Central Limit Theorem and its implications for statistical inference. Learn how this fundamental theorem enables the use of normal distribution in sampling."
            },
            {
              id: "stats-adv-13",
              title: "Lecture 13: Estimation",
              content: "Principles of point estimation and interval estimation. Learn techniques for estimating population parameters from sample statistics with measures of precision."
            },
            {
              id: "stats-adv-14",
              title: "Lecture 14: A Hypothesis",
              content: "Introduction to statistical hypotheses, including null and alternative hypotheses. Learn how to formulate testable hypotheses for statistical investigation."
            },
            {
              id: "stats-adv-15",
              title: "Lecture 15: Hypothesis Testing's Mechanism",
              content: "Understanding the framework and steps of hypothesis testing. Learn about test statistics, critical regions, and decision rules for accepting or rejecting hypotheses."
            },
            {
              id: "stats-adv-16",
              title: "Lecture 16: P-Value",
              content: "Understanding p-values as measures of evidence against the null hypothesis. Learn to calculate, interpret, and use p-values in making statistical decisions."
            },
            {
              id: "stats-adv-17",
              title: "Lecture 17: T-Stats",
              content: "Working with t-statistics when population parameters are unknown. Learn how t-statistics differ from z-statistics and when to use them in hypothesis testing."
            },
            {
              id: "stats-adv-18",
              title: "Lecture 18: Student T Distribution",
              content: "Exploring the Student's t-distribution, its properties, and applications. Learn how sample size affects the shape of the t-distribution and its relationship to the normal distribution."
            },
            {
              id: "stats-adv-19",
              title: "Lecture 19: T-Stats vs. Z-Stats: Overview",
              content: "Comparing t-statistics and z-statistics in terms of assumptions, applications, and limitations. Learn which statistic is appropriate for different statistical scenarios."
            },
            {
              id: "stats-adv-20",
              title: "Lecture 20: When to Use T-Tests vs. Z-Tests",
              content: "Decision framework for choosing between t-tests and z-tests based on sample size, known population parameters, and normality assumptions. Learn the practical differences in application."
            },
            {
              id: "stats-adv-21",
              title: "Lecture 21: Type 1 & Type 2 Error",
              content: "Understanding false positives (Type I errors) and false negatives (Type II errors) in hypothesis testing. Learn how to balance these errors and their implications for research."
            },
            {
              id: "stats-adv-22",
              title: "Lecture 22: Confidence Interval (CI)",
              content: "Constructing and interpreting confidence intervals for population parameters. Learn how confidence intervals provide a range of plausible values with a specified confidence level."
            },
            {
              id: "stats-adv-23",
              title: "Lecture 23: Confidence Intervals and the Margin of Error",
              content: "Understanding margin of error in confidence intervals and how it relates to sample size and confidence level. Learn to calculate and interpret margins of error in statistical reporting."
            },
            {
              id: "stats-adv-24",
              title: "Lecture 24: Interpreting Confidence Levels and Confidence Intervals",
              content: "Proper interpretation of confidence levels (e.g., 95%, 99%) and the resulting intervals. Learn common misinterpretations and how to communicate confidence interval results accurately."
            },
            {
              id: "stats-adv-25",
              title: "Lecture 25: Chi-Square Test",
              content: "Introduction to chi-square tests for categorical data analysis. Learn applications in testing independence, goodness-of-fit, and homogeneity in categorical variables."
            },
            {
              id: "stats-adv-26",
              title: "Lecture 26: Chi-Square Distribution Using Python",
              content: "Practical implementation of chi-square tests using Python and libraries like SciPy and statsmodels. Learn to execute and interpret chi-square test results programmatically."
            },
            {
              id: "stats-adv-27",
              title: "Lecture 27: Chi-Square for Goodness of Fit Test",
              content: "Applying chi-square tests to determine if sample data fits a specific distribution. Learn to test if observed frequencies match expected frequencies based on theoretical distributions."
            },
            {
              id: "stats-adv-28",
              title: "Lecture 28: When to Use Which Statistical Distribution?",
              content: "Decision framework for selecting appropriate probability distributions based on data characteristics. Learn to match real-world scenarios to their most suitable statistical distributions."
            },
            {
              id: "stats-adv-29",
              title: "Lecture 29: Analysis of Variance (ANOVA)",
              content: "Introduction to ANOVA for comparing means across multiple groups. Learn how ANOVA extends t-tests to scenarios with more than two groups."
            },
            {
              id: "stats-adv-30",
              title: "Lecture 30: ANOVA Three Types",
              content: "Exploring one-way, two-way, and N-way ANOVA designs. Learn the differences between these ANOVA types and when to apply each in experimental design."
            },
            {
              id: "stats-adv-31",
              title: "Lecture 31: Partitioning of Variance in the ANOVA",
              content: "Understanding how ANOVA partitions total variance into between-group and within-group components. Learn how this partitioning enables testing for significant differences between groups."
            },
            {
              id: "stats-adv-32",
              title: "Lecture 32: Calculating Using Python",
              content: "Practical implementation of ANOVA tests using Python with libraries like SciPy, statsmodels, and pingouin. Learn to execute and interpret ANOVA results programmatically."
            },
            {
              id: "stats-adv-33",
              title: "Lecture 33: F-Distribution",
              content: "Understanding the F-distribution and its role in ANOVA and other variance-based tests. Learn the properties of the F-distribution and how it's derived from chi-square distributions."
            },
            {
              id: "stats-adv-34",
              title: "Lecture 34: F-Test (Variance Ratio Test)",
              content: "Applying F-tests to compare variances between populations. Learn to test for equal variances as an assumption check for other statistical tests."
            },
            {
              id: "stats-adv-35",
              title: "Lecture 35: Determining the Values of F",
              content: "Calculating F-statistics and critical values for hypothesis testing. Learn to make decisions based on F-values and understand their interpretation in statistical analysis."
            },
            {
              id: "stats-adv-36",
              title: "Lecture 36: F Distribution Using Python",
              content: "Practical implementation of F-tests using Python with statistical libraries. Learn to calculate F-statistics, p-values, and visualize F-distributions programmatically."
            }
          ]
        }
      ]
    },
    {
      id: "ml",
      title: "Machine Learning Foundations",
      description: "Machine Learning is what powers predictive models. This section covers the essential algorithms and techniques used in modern data science.",
      color: "purple",
      icon: BrainCircuit,
      modules: [
        {
          id: "ml-module1",
          title: "Module 1: Introduction to ML",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-intro-1",
              title: "Lecture 1: AI vs ML vs DL vs DS",
              content: "Understanding the distinctions between Artificial Intelligence, Machine Learning, Deep Learning, and Data Science. Learn how these fields overlap and differ in their approaches and applications."
            },
            {
              id: "ml-intro-2",
              title: "Lecture 2: Supervised, Unsupervised",
              content: "Exploring supervised learning (with labeled data) and unsupervised learning (with unlabeled data). Learn the fundamental differences, appropriate use cases, and common algorithms for each approach."
            },
            {
              id: "ml-intro-3",
              title: "Lecture 3: Semi-Supervised, Reinforcement Learning",
              content: "Understanding semi-supervised learning (combining labeled and unlabeled data) and reinforcement learning (learning through environment interaction). Learn when to use these specialized approaches."
            },
            {
              id: "ml-intro-4",
              title: "Lecture 4: Train, Test, Validation Split",
              content: "Best practices for splitting data into training, testing, and validation sets. Learn cross-validation techniques, stratified sampling, and how to avoid data leakage between splits."
            },
            {
              id: "ml-intro-5",
              title: "Lecture 5: Overfitting, Under Fitting",
              content: "Recognizing and addressing overfitting (high variance) and underfitting (high bias) in machine learning models. Learn techniques to achieve the right balance for optimal model performance."
            },
            {
              id: "ml-intro-6",
              title: "Lecture 6: Bias vs Variance",
              content: "Understanding the bias-variance tradeoff in machine learning. Learn how to diagnose bias and variance problems and apply appropriate techniques to optimize model performance."
            }
          ]
        },
        {
          id: "ml-module2",
          title: "Module 2: Feature Engineering",
          icon: PenTool,
          lectures: [
            {
              id: "ml-feat-1",
              title: "Lecture 1: Handling Missing Data",
              content: "Strategies for identifying and addressing missing data in datasets. Learn techniques like imputation, deletion, and algorithmic approaches to maintain data integrity."
            },
            {
              id: "ml-feat-2",
              title: "Lecture 2: Handling Imbalanced Data",
              content: "Techniques for working with imbalanced datasets where class distributions are skewed. Learn why imbalanced data is problematic and overview of solutions."
            },
            {
              id: "ml-feat-3",
              title: "Lecture 3: Up-Sampling",
              content: "Methods for increasing the representation of minority classes through techniques like random over-sampling, SMOTE, and ADASYN to create balanced datasets."
            },
            {
              id: "ml-feat-4",
              title: "Lecture 4: Down-Sampling",
              content: "Approaches for reducing majority class instances through random under-sampling, Tomek links, and cluster centroids to create more balanced class distributions."
            },
            {
              id: "ml-feat-5",
              title: "Lecture 5: SMOTE",
              content: "Deep dive into Synthetic Minority Over-sampling Technique (SMOTE) for generating synthetic samples. Learn implementation details and when to apply this powerful technique."
            },
            {
              id: "ml-feat-6",
              title: "Lecture 6: Data Interpolation",
              content: "Methods for estimating unknown values within a dataset using techniques like linear, polynomial, and spline interpolation to handle missing or sparse data."
            },
            {
              id: "ml-feat-7",
              title: "Lecture 7: Handling Outliers",
              content: "Techniques for detecting and handling outliers in data, including statistical methods, visualization approaches, and algorithms for outlier treatment or removal."
            },
            {
              id: "ml-feat-8",
              title: "Lecture 8: Filter Method",
              content: "Feature selection using filter methods that evaluate feature importance independent of the model. Learn techniques like correlation, chi-square testing, and information gain."
            },
            {
              id: "ml-feat-9",
              title: "Lecture 9: Wrapper Method",
              content: "Feature selection using wrapper methods that evaluate feature subsets using a specific model. Learn techniques like forward selection, backward elimination, and recursive feature elimination."
            },
            {
              id: "ml-feat-10",
              title: "Lecture 10: Embedded Methods",
              content: "Feature selection techniques that incorporate feature selection as part of the model training process. Learn about LASSO regularization and tree importance for feature selection."
            },
            {
              id: "ml-feat-11",
              title: "Lecture 11: Feature Scaling",
              content: "Understanding the importance of feature scaling and its impact on various machine learning algorithms. Learn when scaling is necessary and available techniques."
            },
            {
              id: "ml-feat-12",
              title: "Lecture 12: Standardization",
              content: "Implementing standardization (z-score normalization) to transform features to have zero mean and unit variance. Learn how this affects model performance for certain algorithms."
            },
            {
              id: "ml-feat-13",
              title: "Lecture 13: Mean Normalization",
              content: "Applying mean normalization to scale features into a specific range while maintaining the distribution shape. Learn implementation and applications."
            },
            {
              id: "ml-feat-14",
              title: "Lecture 14: Min-Max Scaling",
              content: "Using min-max scaling to transform features to a specific range (typically 0-1). Learn implementation, benefits, and limitations of this commonly used technique."
            },
            {
              id: "ml-feat-15",
              title: "Lecture 15: Unit Vector",
              content: "Implementing feature normalization using unit vectors to scale samples to have unit norm. Learn about the impact on distance-based algorithms and when to use this approach."
            },
            {
              id: "ml-feat-16",
              title: "Lecture 16: Feature Extraction",
              content: "Understanding feature extraction as a dimensionality reduction approach. Learn the difference between feature selection and feature extraction for machine learning."
            },
            {
              id: "ml-feat-17",
              title: "Lecture 17: PCA (Principal Component Analysis)",
              content: "Deep dive into Principal Component Analysis for dimensionality reduction. Learn the mathematical foundations, implementation, and when to apply PCA in the machine learning pipeline."
            },
            {
              id: "ml-feat-18",
              title: "Lecture 18: Data Encoding",
              content: "Overview of encoding techniques for converting categorical data into numerical formats suitable for machine learning algorithms. Learn about the considerations for different encoding approaches."
            },
            {
              id: "ml-feat-19",
              title: "Lecture 19: Nominal Encoding",
              content: "Implementing encoding strategies for nominal (unordered) categorical variables. Learn approaches like one-hot encoding and binary encoding for handling nominal data."
            },
            {
              id: "ml-feat-20",
              title: "Lecture 20: One Hot Encoding",
              content: "Deep dive into one-hot encoding for converting categorical variables into binary vectors. Learn implementation, benefits, limitations, and strategies for handling high cardinality."
            },
            {
              id: "ml-feat-21",
              title: "Lecture 21: One Hot Encoding With Multiple Categories",
              content: "Strategies for applying one-hot encoding to datasets with multiple categorical features, including handling high dimensionality and sparse matrices."
            },
            {
              id: "ml-feat-22",
              title: "Lecture 22: Mean Encoding",
              content: "Implementing target mean encoding (or likelihood encoding) to replace categorical values with the mean of the target variable. Learn techniques to prevent overfitting."
            },
            {
              id: "ml-feat-23",
              title: "Lecture 23: Ordinal Encoding",
              content: "Encoding ordinal (ordered) categorical variables using integer representation. Learn when ordinal encoding is appropriate and how to implement it effectively."
            },
            {
              id: "ml-feat-24",
              title: "Lecture 24: Label Encoding",
              content: "Applying label encoding to convert categorical values into numerical integers. Learn the benefits, limitations, and appropriate use cases for this simple encoding technique."
            },
            {
              id: "ml-feat-25",
              title: "Lecture 25: Target Guided Ordinal Encoding",
              content: "Implementing advanced ordinal encoding based on the relationship with the target variable. Learn how to create meaningful ordinal representations of categorical variables."
            },
            {
              id: "ml-feat-26",
              title: "Lecture 26: Covariance",
              content: "Understanding covariance as a measure of relationship between variables. Learn to calculate and interpret covariance matrices for feature analysis."
            },
            {
              id: "ml-feat-27",
              title: "Lecture 27: Correlation Check",
              content: "Techniques for analyzing and visualizing correlations between features and with the target variable. Learn to use correlation to identify redundant features and potential predictors."
            },
            {
              id: "ml-feat-28",
              title: "Lecture 28: Pearson Correlation Coefficient",
              content: "Deep dive into Pearson correlation for measuring linear relationships between continuous variables. Learn calculation, interpretation, and visualization of correlation matrices."
            },
            {
              id: "ml-feat-29",
              title: "Lecture 29: Spearman's Rank Correlation",
              content: "Implementing Spearman's rank correlation to measure monotonic relationships, including non-linear associations. Learn when to use Spearman's over Pearson correlation."
            },
            {
              id: "ml-feat-30",
              title: "Lecture 30: VIF",
              content: "Using Variance Inflation Factor (VIF) to detect multicollinearity between features. Learn how to calculate VIF, interpret results, and address multicollinearity issues."
            },
            {
              id: "ml-feat-31",
              title: "Lecture 31: Feature Selection",
              content: "Comprehensive overview of feature selection techniques and their importance in building efficient and effective machine learning models."
            },
            {
              id: "ml-feat-32",
              title: "Lecture 32: Recursive Feature Elimination",
              content: "Implementing Recursive Feature Elimination (RFE) to select features by recursively removing attributes and building a model on remaining attributes."
            },
            {
              id: "ml-feat-33",
              title: "Lecture 33: Backward Elimination",
              content: "Applying backward elimination as a stepwise feature selection method that starts with all features and iteratively removes the least significant features."
            },
            {
              id: "ml-feat-34",
              title: "Lecture 34: Forward Elimination",
              content: "Implementing forward selection as a stepwise feature selection method that starts with no features and iteratively adds the most significant features."
            }
          ]
        },
        {
          id: "ml-module3",
          title: "Module 3: Exploratory Data Analysis",
          icon: PenTool,
          lectures: [
            {
              id: "ml-eda-1",
              title: "Lecture 1: Feature Engineering and Selection",
              content: "Practical approach to feature engineering and selection in real-world datasets. Learn hands-on techniques for creating and selecting optimal features for modeling."
            },
            {
              id: "ml-eda-2",
              title: "Lecture 2: Analyzing Movie Reviews Sentiment",
              content: "Case study on sentiment analysis using movie reviews data. Learn techniques for text preprocessing, feature extraction, and modeling for sentiment classification."
            },
            {
              id: "ml-eda-3",
              title: "Lecture 3: Customer Segmentation and Cross Selling Suggestions",
              content: "Implementing customer segmentation using clustering techniques. Learn to analyze customer behavior, create segments, and develop cross-selling strategies."
            },
            {
              id: "ml-eda-4",
              title: "Lecture 4: Forecasting Stock and Commodity Prices",
              content: "Time series analysis for financial forecasting. Learn techniques for stock and commodity price prediction, including feature creation and model selection."
            }
          ]
        },
        {
          id: "ml-module4",
          title: "Module 4: Regression",
          icon: LineChart,
          lectures: [
            {
              id: "ml-reg-1",
              title: "Lecture 1: Linear Regression",
              content: "Fundamentals of linear regression for predicting continuous values. Learn the theory, assumptions, implementation, and evaluation of simple linear regression models."
            },
            {
              id: "ml-reg-2",
              title: "Lecture 2: Gradient Descent",
              content: "Understanding the gradient descent optimization algorithm for finding the minimum of a function. Learn batch, stochastic, and mini-batch gradient descent variants."
            },
            {
              id: "ml-reg-3",
              title: "Lecture 3: Multiple Linear Regression",
              content: "Extending linear regression to multiple independent variables. Learn model formulation, coefficient interpretation, and handling categorical predictors."
            },
            {
              id: "ml-reg-4",
              title: "Lecture 4: Polynomial Regression",
              content: "Implementing polynomial regression to capture non-linear relationships. Learn about polynomial feature creation, degree selection, and overfitting considerations."
            },
            {
              id: "ml-reg-5",
              title: "Lecture 5: R Square and Adjusted R Square",
              content: "Understanding R-squared and adjusted R-squared as evaluation metrics for regression models. Learn their calculation, interpretation, and limitations."
            },
            {
              id: "ml-reg-6",
              title: "Lecture 6: RMSE, MSE, MAE Comparison",
              content: "Comparing regression evaluation metrics: Root Mean Square Error, Mean Square Error, and Mean Absolute Error. Learn their mathematical foundations and practical applications."
            },
            {
              id: "ml-reg-7",
              title: "Lecture 7: Regularized Linear Models",
              content: "Introduction to regularization techniques for preventing overfitting in linear models. Learn the theory and applications of regularization in regression."
            },
            {
              id: "ml-reg-8",
              title: "Lecture 9: Ridge Regression",
              content: "Deep dive into Ridge regression (L2 regularization). Learn the mathematics, implementation, and hyperparameter tuning for Ridge regression models."
            },
            {
              id: "ml-reg-9",
              title: "Lecture 10: Lasso Regression",
              content: "Implementing Lasso regression (L1 regularization) for feature selection and regularization. Learn how Lasso differs from Ridge and when to use each approach."
            },
            {
              id: "ml-reg-10",
              title: "Lecture 12: Elastic Net",
              content: "Understanding Elastic Net regularization as a combination of Ridge and Lasso. Learn how to implement and tune Elastic Net for optimal regression performance."
            },
            {
              id: "ml-reg-11",
              title: "Lecture 13: Logistic Regression In-Depth Intuition",
              content: "Comprehensive overview of logistic regression for binary classification. Learn the logistic function, probability interpretation, and applications."
            },
            {
              id: "ml-reg-12",
              title: "Lecture 14: In-Depth Mathematical Intuition",
              content: "Mathematical foundations of logistic regression including maximum likelihood estimation, log odds, and the sigmoid function. Learn the derivation of the logistic regression model."
            },
            {
              id: "ml-reg-13",
              title: "Lecture 15: In-Depth Geometrical Intuition",
              content: "Geometrical interpretation of logistic regression as a linear decision boundary in feature space. Learn how logistic regression separates classes geometrically."
            },
            {
              id: "ml-reg-14",
              title: "Lecture 16: Hyper Parameter Tuning",
              content: "Strategies for tuning hyperparameters in regression models. Learn manual and automated approaches to finding optimal hyperparameter values."
            },
            {
              id: "ml-reg-15",
              title: "Lecture 17: Grid Search CV",
              content: "Implementing Grid Search with cross-validation for exhaustive hyperparameter optimization. Learn how to set up parameter grids and evaluate results."
            },
            {
              id: "ml-reg-16",
              title: "Lecture 18: Randomize Search CV",
              content: "Using Randomized Search for efficient hyperparameter tuning. Learn how random search compares to grid search and when to use each approach."
            },
            {
              id: "ml-reg-17",
              title: "Lecture 19: Data Leakage",
              content: "Understanding and preventing data leakage in regression modeling. Learn common sources of leakage and best practices for creating valid models."
            },
            {
              id: "ml-reg-18",
              title: "Lecture 20: Confusion Matrix",
              content: "Interpreting confusion matrices for binary classification evaluation. Learn about true positives, false positives, true negatives, and false negatives."
            },
            {
              id: "ml-reg-19",
              title: "Lecture 21: Explanation Precision, Recall, F1 Score, ROC, AUC",
              content: "Deep dive into classification metrics including precision, recall, F1 score, ROC curves, and Area Under the Curve. Learn when to prioritize different metrics."
            },
            {
              id: "ml-reg-20",
              title: "Lecture 22: Best Metric Selection",
              content: "Guidelines for selecting appropriate evaluation metrics based on the problem domain and business objectives. Learn to align metrics with stakeholder requirements."
            },
            {
              id: "ml-reg-21",
              title: "Lecture 23: Multiclass Classification in LR",
              content: "Extending logistic regression to multiclass classification problems. Learn one-vs-rest and multinomial approaches to handling multiple classes."
            }
          ]
        },
        {
          id: "ml-module5",
          title: "Module 5: Decision Trees & SVM",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-dt-1",
              title: "Lecture 1: Decision Tree Classifier",
              content: "Introduction to decision tree classifiers, including tree structure, splitting criteria, and pruning techniques. Learn how decision trees make predictions through hierarchical decisions."
            },
            {
              id: "ml-dt-2",
              title: "Lecture 2: In-Depth Mathematical Intuition",
              content: "Mathematical foundations of decision trees including entropy, information gain, Gini impurity, and variance reduction. Learn the formal basis for tree construction."
            },
            {
              id: "ml-dt-3",
              title: "Lecture 3: In-Depth Geometrical Intuition",
              content: "Geometrical interpretation of decision trees as recursive feature space partitioning. Understand how trees create decision boundaries and regions in the feature space."
            },
            {
              id: "ml-dt-4",
              title: "Lecture 4: Confusion Matrix",
              content: "Evaluating decision tree classifiers using confusion matrices. Learn to interpret and use confusion matrix metrics for decision tree optimization."
            },
            {
              id: "ml-dt-5",
              title: "Lecture 5: Best Metric Selection",
              content: "Selecting appropriate evaluation metrics for decision tree models based on problem characteristics. Learn which metrics to prioritize for different tree applications."
            },
            {
              id: "ml-dt-6",
              title: "Lecture 6: Decision Tree Regressor",
              content: "Implementing decision trees for regression problems. Learn the differences between classification and regression trees and appropriate evaluation metrics."
            },
            {
              id: "ml-dt-7",
              title: "Lecture 7: In-Depth Mathematical Intuition",
              content: "Mathematical foundations of regression trees, including variance reduction as a splitting criterion. Learn how regression trees minimize prediction error."
            },
            {
              id: "ml-dt-8",
              title: "Lecture 8: In-Depth Geometrical Intuition",
              content: "Geometrical interpretation of regression trees as piecewise constant functions. Understand how regression trees partition the feature space for predictions."
            },
            {
              id: "ml-dt-9",
              title: "Lecture 9: Performance Metrics",
              content: "Evaluating regression tree performance using metrics like MSE, MAE, and R-squared. Learn how to interpret these metrics and optimize regression trees."
            },
            {
              id: "ml-dt-10",
              title: "Lecture 10: Linear SVM Classification",
              content: "Introduction to Support Vector Machines for linear classification. Learn about maximum margin classifiers and the optimization problem behind SVMs."
            },
            {
              id: "ml-dt-11",
              title: "Lecture 11: In-Depth Mathematical Intuition",
              content: "Mathematical foundations of SVMs including the primal and dual formulations, Lagrangian multipliers, and the kernel trick. Learn the rigorous basis of SVM algorithms."
            },
            {
              id: "ml-dt-12",
              title: "Lecture 12: In-Depth Geometrical Intuition",
              content: "Geometrical interpretation of SVMs as hyperplane classifiers with maximum margin. Understand support vectors and their role in defining the decision boundary."
            },
            {
              id: "ml-dt-13",
              title: "Lecture 13: Soft Margin Classification",
              content: "Implementing soft margin SVMs to handle non-separable data. Learn about the C parameter, slack variables, and the tradeoff between margin width and training errors."
            },
            {
              id: "ml-dt-14",
              title: "Lecture 14: Nonlinear SVM Classification",
              content: "Extending SVMs to nonlinear classification problems. Learn how the kernel trick enables SVMs to create nonlinear decision boundaries."
            },
            {
              id: "ml-dt-15",
              title: "Lecture 15: Polynomial Kernel",
              content: "Implementing polynomial kernels in SVMs for creating flexible nonlinear decision boundaries. Learn about kernel parameters and selection strategies."
            },
            {
              id: "ml-dt-16",
              title: "Lecture 16: Gaussian, RBF Kernel",
              content: "Using Radial Basis Function (RBF) kernels in SVMs for highly complex decision boundaries. Learn about gamma parameters and their effect on model complexity."
            },
            {
              id: "ml-dt-17",
              title: "Lecture 17: Data Leakage",
              content: "Identifying and preventing data leakage in SVM models. Learn best practices for preprocessing, feature scaling, and model evaluation to ensure valid results."
            },
            {
              id: "ml-dt-18",
              title: "Lecture 18: Confusion Matrix",
              content: "Evaluating SVM classifiers using confusion matrices. Learn to interpret true positives, false positives, true negatives, and false negatives in the SVM context."
            },
            {
              id: "ml-dt-19",
              title: "Lecture 19: Precision, Recall, F1 Score, ROC, AUC",
              content: "Comprehensive evaluation of SVM models using advanced metrics. Learn to create and interpret precision-recall curves and ROC curves for SVMs."
            },
            {
              id: "ml-dt-20",
              title: "Lecture 20: Best Metric Selection",
              content: "Guidelines for selecting appropriate evaluation metrics for SVM models based on class distribution and problem requirements."
            },
            {
              id: "ml-dt-21",
              title: "Lecture 21: SVM Regression",
              content: "Implementing Support Vector Regression (SVR) for continuous target prediction. Learn how epsilon-SVR and nu-SVR differ from classification SVMs."
            },
            {
              id: "ml-dt-22",
              title: "Lecture 22: In-Depth Mathematical Intuition",
              content: "Mathematical foundations of SVR including the epsilon-insensitive loss function and optimization objective. Learn the formal derivation of support vector regression."
            },
            {
              id: "ml-dt-23",
              title: "Lecture 23: In-Depth Geometrical Intuition",
              content: "Geometrical interpretation of SVR as a tube with maximum margin. Understand how support vectors define the regression function in feature space."
            }
          ]
        },
        {
          id: "ml-module6",
          title: "Module 6: Naive Bayes & Ensemble Techniques",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-nb-1",
              title: "Lecture 1: Bayes Theorem",
              content: "Understanding Bayes' theorem and conditional probability as the foundation for Naive Bayes algorithms. Learn the mathematical formulation and intuition behind Bayesian methods."
            },
            {
              id: "ml-nb-2",
              title: "Lecture 2: Multinomial Naïve Bayes",
              content: "Implementing Multinomial Naive Bayes for classification with discrete features. Learn applications in text classification and document categorization."
            },
            {
              id: "ml-nb-3",
              title: "Lecture 3: Gaussian Naïve Bayes",
              content: "Using Gaussian Naive Bayes for classification with continuous features. Learn how to model feature distributions and make predictions with continuous data."
            },
            {
              id: "ml-nb-4",
              title: "Lecture 4: Various Type of Bayes Theorem and Its Intuition",
              content: "Exploring variants of Naive Bayes including Bernoulli, Complement, and Categorical Naive Bayes. Learn when to use each variant based on data characteristics."
            },
            {
              id: "ml-nb-5",
              title: "Lecture 5: Confusion Matrix",
              content: "Evaluating Naive Bayes classifiers using confusion matrices. Learn to interpret and optimize Naive Bayes models based on performance metrics."
            },
            {
              id: "ml-nb-6",
              title: "Lecture 6: Best Metric Selection",
              content: "Selecting appropriate evaluation metrics for Naive Bayes models based on class distribution and application requirements."
            },
            {
              id: "ml-nb-7",
              title: "Lecture 7: Definition of Ensemble Techniques",
              content: "Introduction to ensemble learning methods that combine multiple models to improve performance. Learn the theory and benefits of ensemble techniques."
            },
            {
              id: "ml-nb-8",
              title: "Lecture 8: Bagging Technique",
              content: "Understanding bootstrap aggregating (bagging) for reducing variance in high-variance models. Learn how bagging creates diverse base learners through sampling."
            },
            {
              id: "ml-nb-9",
              title: "Lecture 9: Bootstrap Aggregation",
              content: "Deep dive into the bootstrap method for generating multiple training sets. Learn how aggregating predictions across bootstrap samples reduces overfitting."
            },
            {
              id: "ml-nb-10",
              title: "Lecture 10: Random Forest (Bagging Technique)",
              content: "Implementing Random Forest as an ensemble of decision trees. Learn how feature randomization and bagging create powerful and robust predictive models."
            },
            {
              id: "ml-nb-11",
              title: "Lecture 11: Random Forest Regressor",
              content: "Using Random Forest for regression problems. Learn the differences between classification and regression forests and appropriate evaluation metrics."
            },
            {
              id: "ml-nb-12",
              title: "Lecture 12: Random Forest Classifier",
              content: "Implementing Random Forest for classification tasks. Learn about majority voting, feature importance, and hyperparameter tuning for optimal performance."
            }
          ]
        },
        {
          id: "ml-module7",
          title: "Module 7: Boosting, KNN & Dimension Reduction",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-boost-1",
              title: "Lecture 1: Boosting Technique",
              content: "Introduction to boosting as a sequential ensemble method that focuses on difficult training examples. Learn how boosting reduces bias in high-bias models."
            },
            {
              id: "ml-boost-2",
              title: "Lecture 2: Ada Boost",
              content: "Implementing Adaptive Boosting (AdaBoost) algorithm. Learn how AdaBoost assigns weights to training examples and combines weak learners into a strong ensemble."
            },
            {
              id: "ml-boost-3",
              title: "Lecture 3: Gradient Boost",
              content: "Understanding Gradient Boosting as a technique that optimizes a differentiable loss function. Learn how gradient boosting machines sequentially improve predictions."
            },
            {
              id: "ml-boost-4",
              title: "Lecture 4: XGBoost",
              content: "Implementing eXtreme Gradient Boosting (XGBoost) for state-of-the-art performance. Learn about regularization, tree pruning, and the advanced features of XGBoost."
            },
            {
              id: "ml-boost-5",
              title: "Lecture 5: KNN Classifier",
              content: "Using K-Nearest Neighbors for classification based on proximity in feature space. Learn distance metrics, k-value selection, and handling of categorical features."
            },
            {
              id: "ml-boost-6",
              title: "Lecture 6: KNN Regressor",
              content: "Implementing KNN for regression problems. Learn how to predict continuous values using nearest neighbor averaging and distance-weighted approaches."
            },
            {
              id: "ml-boost-7",
              title: "Lecture 7: Variants of KNN",
              content: "Exploring variations of the KNN algorithm including weighted KNN, condensed KNN, and locally weighted learning. Learn advancements beyond the basic KNN approach."
            },
            {
              id: "ml-boost-8",
              title: "Lecture 8: Brute Force KNN",
              content: "Understanding the naive implementation of KNN using exhaustive search. Learn computational complexity and optimization techniques for large datasets."
            },
            {
              id: "ml-boost-9",
              title: "Lecture 9: K-Dimension Tree",
              content: "Implementing KD-Trees to optimize KNN for low to medium dimensional data. Learn how space partitioning data structures accelerate nearest neighbor search."
            },
            {
              id: "ml-boost-10",
              title: "Lecture 10: Ball Tree",
              content: "Using Ball Trees to improve KNN performance in high-dimensional spaces. Learn hierarchical data structures for efficient nearest neighbor queries."
            },
            {
              id: "ml-boost-11",
              title: "Lecture 11: The Curse of Dimensionality",
              content: "Understanding the challenges of high-dimensional data including sparsity, distance concentration, and computational complexity. Learn how dimensionality affects machine learning algorithms."
            },
            {
              id: "ml-boost-12",
              title: "Lecture 12: Dimensionality Reduction Technique",
              content: "Overview of dimensionality reduction approaches including feature selection and feature extraction for managing high-dimensional data."
            },
            {
              id: "ml-boost-13",
              title: "Lecture 13: PCA (Principal Component Analysis)",
              content: "Comprehensive implementation of PCA for dimensionality reduction. Learn eigenvalue decomposition, component selection, and visualization techniques."
            },
            {
              id: "ml-boost-14",
              title: "Lecture 14: Mathematics Behind PCA",
              content: "Deep dive into the mathematical foundations of PCA including covariance matrices, eigenvectors, and singular value decomposition. Learn the rigorous derivation of PCA."
            },
            {
              id: "ml-boost-15",
              title: "Lecture 15: Scree Plots",
              content: "Using scree plots to determine the optimal number of principal components. Learn to interpret variance explained and cumulative variance plots."
            },
            {
              id: "ml-boost-16",
              title: "Lecture 16: Eigen-Decomposition Approach",
              content: "Understanding PCA through eigenvalue decomposition of the covariance matrix. Learn computational approaches to finding principal components."
            },
            {
              id: "ml-boost-17",
              title: "Lecture 17: Practicals",
              content: "Hands-on implementation of dimensionality reduction techniques on real-world datasets. Learn workflow integration and performance impact of reduced dimensions."
            }
          ]
        },
        {
          id: "ml-module8",
          title: "Module 8: Anomaly Detection & Time Series",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-anom-1",
              title: "Lecture 1: Anomaly Detection Types",
              content: "Overview of anomaly detection categories including point anomalies, contextual anomalies, and collective anomalies. Learn approaches to identifying different types of outliers."
            },
            {
              id: "ml-anom-2",
              title: "Lecture 2: Anomaly Detection Applications",
              content: "Exploring real-world applications of anomaly detection in fraud detection, system health monitoring, intrusion detection, and quality control. Learn domain-specific considerations."
            },
            {
              id: "ml-anom-3",
              title: "Lecture 3: Isolation Forest Anomaly Detection Algorithm",
              content: "Implementing Isolation Forest for efficient anomaly detection. Learn how isolating observations leads to effective outlier detection in large datasets."
            },
            {
              id: "ml-anom-4",
              title: "Lecture 4: Density-Based Anomaly Detection (Local Outlier Factor) Algorithm",
              content: "Using Local Outlier Factor (LOF) to detect anomalies based on local density deviation. Learn how to identify outliers in varying-density datasets."
            },
            {
              id: "ml-anom-5",
              title: "Lecture 5: Support Vector Machine Anomaly Detection Algorithm",
              content: "Implementing One-Class SVM for anomaly detection by learning a boundary around normal data. Learn the connection between classification and anomaly detection."
            },
            {
              id: "ml-anom-6",
              title: "Lecture 6: DBSCAN Algorithm for Anomaly Detection",
              content: "Using Density-Based Spatial Clustering of Applications with Noise (DBSCAN) for identifying outliers. Learn how clustering techniques contribute to anomaly detection."
            },
            {
              id: "ml-anom-7",
              title: "Lecture 7: What is a Time Series?",
              content: "Introduction to time series data and its unique characteristics including trend, seasonality, cyclicity, and irregularity. Learn the fundamentals of temporal data analysis."
            },
            {
              id: "ml-anom-8",
              title: "Lecture 8: Old Techniques",
              content: "Overview of classical time series forecasting methods including moving averages, exponential smoothing, and Holt-Winters. Learn the evolution of time series analysis."
            },
            {
              id: "ml-anom-9",
              title: "Lecture 9: ARIMA",
              content: "Implementing Autoregressive Integrated Moving Average (ARIMA) models for time series forecasting. Learn about stationarity, differencing, and parameter selection."
            },
            {
              id: "ml-anom-10",
              title: "Lecture 10: ACF and PACF",
              content: "Using Autocorrelation Function (ACF) and Partial Autocorrelation Function (PACF) plots for model identification. Learn to interpret correlation patterns for ARIMA modeling."
            },
            {
              id: "ml-anom-11",
              title: "Lecture 11: Time-Dependent Seasonal Components",
              content: "Handling seasonality in time series data using Seasonal ARIMA (SARIMA) and other techniques. Learn to model data with recurring patterns at fixed intervals."
            },
            {
              id: "ml-anom-12",
              title: "Lecture 12: Autoregressive (AR)",
              content: "Understanding Autoregressive models where future values depend on past observations. Learn parameter estimation and order selection for AR models."
            },
            {
              id: "ml-anom-13",
              title: "Lecture 13: Moving Average (MA)",
              content: "Implementing Moving Average models where future values depend on past forecast errors. Learn parameter estimation and order selection for MA models."
            },
            {
              id: "ml-anom-14",
              title: "Lecture 14: Mixed ARMA Modeler",
              content: "Combining Autoregressive and Moving Average components into ARMA models for complex time series patterns. Learn model selection and evaluation strategies."
            }
          ]
        },
        {
          id: "ml-module9",
          title: "Module 9: Cloud Introduction",
          icon: BrainCircuit,
          lectures: [
            {
              id: "ml-cloud-1",
              title: "Lecture 1: Deployment of Project over Cloud Platform",
              content: "Comprehensive guide to deploying machine learning models on cloud platforms like AWS, Azure, and Google Cloud. Learn containerization, serverless deployment, and MLOps best practices."
            }
          ]
        }
      ]
    },
    {
      id: "dl",
      title: "Deep Learning Specialization",
      description: "Deep Learning is revolutionizing AI. Learn about neural networks, computer vision, and other advanced techniques in this section.",
      color: "rose",
      icon: Network,
      modules: [
        {
          id: "dl-module1",
          title: "Module 1: Neural Network A Simple Perception",
          icon: Network,
          lectures: [
            {
              id: "dl-nn-1",
              title: "Lecture 1: Introduction to Deep Learning",
              content: "Overview of deep learning fundamentals, history, and its impact on artificial intelligence. Learn how deep learning differs from traditional machine learning approaches."
            },
            {
              id: "dl-nn-2",
              title: "Lecture 2: Neural Network Overview And Its Use Case",
              content: "Comprehensive introduction to neural networks, their basic structure, and practical applications across various domains and industries."
            },
            {
              id: "dl-nn-3",
              title: "Lecture 3: Detail Mathematical Explanation",
              content: "Mathematical foundations of neural networks including linear algebra concepts, calculus, and probability theory essential for understanding network operations."
            },
            {
              id: "dl-nn-4",
              title: "Lecture 4: Various Neural Network Architect Overview",
              content: "Survey of different neural network architectures including feedforward, convolutional, recurrent networks, and their structural components."
            },
            {
              id: "dl-nn-5",
              title: "Lecture 5: Various Neural Network Architect Overview",
              content: "Continued exploration of advanced neural network architectures including autoencoders, GANs, and transformer-based models."
            },
            {
              id: "dl-nn-6",
              title: "Lecture 6: Use Case Of Neural Network In NLP And Computer Vision",
              content: "Practical applications of neural networks in natural language processing and computer vision, with case studies and implementation examples."
            },
            {
              id: "dl-nn-7",
              title: "Lecture 7: Activation Function - All Name",
              content: "Comprehensive overview of activation functions including sigmoid, tanh, ReLU, Leaky ReLU, ELU, SELU, Swish, and their impact on network performance."
            },
            {
              id: "dl-nn-8",
              title: "Lecture 8: Multilayer Network",
              content: "Deep dive into multilayer perceptrons (MLPs), hidden layers, network depth considerations, and information flow through deep networks."
            },
            {
              id: "dl-nn-9",
              title: "Lecture 9: Loss Functions - All 10",
              content: "Comprehensive study of loss functions including MSE, MAE, binary and categorical cross-entropy, hinge loss, Huber loss, KL divergence, and custom loss functions."
            },
            {
              id: "dl-nn-10",
              title: "Lecture 10: Forward And Backward Propagation",
              content: "Detailed explanation of forward propagation for prediction and backward propagation for learning, with step-by-step mathematical derivations."
            },
            {
              id: "dl-nn-11",
              title: "Lecture 11: Optimizers - All 10",
              content: "In-depth coverage of optimization algorithms including SGD, Momentum, RMSprop, Adam, AdaGrad, Adadelta, NAdam, FTRL, and their mathematical foundations."
            },
            {
              id: "dl-nn-12",
              title: "Lecture 12: Forward And Backward Propagation",
              content: "Advanced topics in forward and backward propagation, including computational graphs, automatic differentiation, and efficient implementations."
            },
            {
              id: "dl-nn-13",
              title: "Lecture 13: Vanishing Gradient Problem",
              content: "Understanding the vanishing gradient problem in deep networks, its causes, effects on training, and modern solutions to address this challenge."
            },
            {
              id: "dl-nn-14",
              title: "Lecture 14: Weight Initialization Technique",
              content: "Various weight initialization strategies including Xavier/Glorot, He initialization, orthogonal initialization, and their impact on training convergence."
            },
            {
              id: "dl-nn-15",
              title: "Lecture 15: Exploding Gradient Problem",
              content: "Addressing the exploding gradient problem through gradient clipping, normalization techniques, and architectural considerations in deep networks."
            },
            {
              id: "dl-nn-16",
              title: "Lecture 16: Visualization Of Neural Network",
              content: "Techniques for visualizing and interpreting neural networks including activation visualization, filter visualization, saliency maps, and interpretability tools."
            }
          ]
        },
        {
          id: "dl-module2",
          title: "Module 2: TensorFlow",
          icon: Cpu,
          lectures: [
            {
              id: "dl-tf-1",
              title: "Lecture 1: Colab Pro Setup",
              content: "Setting up Google Colab Pro environment for deep learning, including GPU/TPU configuration, persistent storage options, and performance optimization."
            },
            {
              id: "dl-tf-2",
              title: "Lecture 2: TensorFlow Installation 2.0",
              content: "Comprehensive guide to installing TensorFlow 2.0, configuring environments, and setting up GPU support for accelerated deep learning development."
            },
            {
              id: "dl-tf-3",
              title: "Lecture 3: TensorFlow 2.0 Function",
              content: "Understanding core TensorFlow functions, eager execution, automatic differentiation, and the transition from TensorFlow 1.x to 2.0 paradigms."
            },
            {
              id: "dl-tf-4",
              title: "Lecture 4: TensorFlow 2.0 Neural Network Creation",
              content: "Building neural networks using TensorFlow's Keras API, Sequential and Functional models, custom layers, and model subclassing approaches."
            },
            {
              id: "dl-tf-5",
              title: "Lecture 5: Mini Project In TensorFlow",
              content: "Hands-on implementation of a complete deep learning project using TensorFlow, covering data preprocessing, model building, training, and evaluation."
            },
            {
              id: "dl-tf-6",
              title: "Lecture 6: Tensor Space",
              content: "Exploring tensor operations, manipulations in n-dimensional space, and understanding the mathematics of tensors in deep learning contexts."
            },
            {
              id: "dl-tf-7",
              title: "Lecture 7: Tensor Board Integration",
              content: "Implementing TensorBoard for visualizing training metrics, model graphs, histograms, embeddings, and using it to debug and optimize neural networks."
            },
            {
              id: "dl-tf-8",
              title: "Lecture 8: TensorFlow Playground",
              content: "Using TensorFlow Playground to interactively explore neural network behavior, hyperparameter effects, and build intuition about network architecture design."
            },
            {
              id: "dl-tf-9",
              title: "Lecture 9: Netron",
              content: "Utilizing Netron for visualizing and analyzing neural network models, exploring model architecture, and understanding computational graphs."
            }
          ]
        },
        {
          id: "dl-module3",
          title: "Module 3: PyTorch & CNN",
          icon: Cpu,
          lectures: [
            {
              id: "dl-pt-1",
              title: "Lecture 1: PyTorch Installation",
              content: "Comprehensive guide to installing PyTorch with CUDA support, configuring development environments, and verifying GPU acceleration setup."
            },
            {
              id: "dl-pt-2",
              title: "Lecture 2: PyTorch Functional Overview",
              content: "Understanding PyTorch's dynamic computational graph, tensor operations, autograd functionality, and core components for deep learning development."
            },
            {
              id: "dl-pt-3",
              title: "Lecture 3: PyTorch Neural Network Creation",
              content: "Building neural networks using PyTorch's nn module, defining custom modules, implementing forward methods, and managing model parameters."
            },
            {
              id: "dl-pt-4",
              title: "Lecture 4: CNN Fundamentals",
              content: "Introduction to Convolutional Neural Networks, including convolution operations, pooling, padding, stride, and their roles in feature extraction."
            },
            {
              id: "dl-pt-5",
              title: "Lecture 5: CNN Explained In Detail - CNNExplainer, Tensor Space",
              content: "Detailed exploration of CNN internals using visualization tools like CNNExplainer and Tensor Space to understand feature maps, filters, and activation patterns."
            },
            {
              id: "dl-pt-6",
              title: "Lecture 6: Various CNN Based Architecture",
              content: "Survey of influential CNN architectures including LeNet, AlexNet, VGG, GoogLeNet, ResNet, and recent innovations in convolutional network design."
            },
            {
              id: "dl-pt-7",
              title: "Lecture 7: Training CNN From Scratch",
              content: "End-to-end implementation of training a CNN from scratch, including data preparation, augmentation, model definition, training loop, and evaluation."
            },
            {
              id: "dl-pt-8",
              title: "Lecture 8: Building Webapps For CNN",
              content: "Developing web applications to serve CNN models using frameworks like Flask, FastAPI, and TorchServe for creating interactive deep learning demos."
            },
            {
              id: "dl-pt-9",
              title: "Lecture 9: Deployment In AWS, Azure & Google Cloud",
              content: "Strategies for deploying CNN models to cloud platforms, including containerization, serverless deployment, and using managed machine learning services."
            }
          ]
        },
        {
          id: "dl-module4",
          title: "Module 4: Image Classifications",
          icon: Network,
          lectures: [
            {
              id: "dl-img-1",
              title: "Lecture 1: Various CNN Architecture With Research Paper And Mathematics",
              content: "In-depth analysis of CNN architectures, their mathematical foundations, and the research papers that introduced them, tracing the evolution of network design."
            },
            {
              id: "dl-img-2",
              title: "Lecture 2: LeNet-5 Variants With Research Paper And Practical",
              content: "Studying LeNet-5 architecture, its historical significance, variants, and practical implementation with modern frameworks and datasets."
            },
            {
              id: "dl-img-3",
              title: "Lecture 3: AlexNet Variants With Research Paper And Practical",
              content: "Exploring AlexNet's revolutionary design, its impact on deep learning, variations of the architecture, and hands-on implementation for image classification."
            },
            {
              id: "dl-img-4",
              title: "Lecture 4: GoogLeNet Variants With Research Paper And Practical",
              content: "Understanding GoogLeNet/Inception architectures, their innovative inception modules, subsequent iterations, and implementation details."
            },
            {
              id: "dl-img-5",
              title: "Lecture 5: Transfer Learning",
              content: "Implementing transfer learning techniques to leverage pre-trained models, fine-tuning strategies, feature extraction, and domain adaptation methods."
            },
            {
              id: "dl-img-6",
              title: "Lecture 6: VGGNet Variants With Research Paper And Practical",
              content: "Deep dive into VGG architectures, their systematic design approach, variants, and practical implementation for various computer vision tasks."
            },
            {
              id: "dl-img-7",
              title: "Lecture 7: ResNet Variants With Research Paper And Practical",
              content: "Exploring ResNet's revolutionary residual learning approach, skip connections, various ResNet variants (ResNet-50, 101, 152), and practical implementations."
            }
          ]
        },
        {
          id: "dl-module5",
          title: "Module 5: RCNN, YOLO, Detectron2 & TFOD2",
          icon: Network,
          lectures: [
            {
              id: "dl-obj-1",
              title: "Lecture 1: FASTER RCNN",
              content: "Understanding Faster R-CNN architecture for object detection, including region proposal networks, ROI pooling, and end-to-end detection pipeline."
            },
            {
              id: "dl-obj-2",
              title: "Lecture 2: History of YOLO",
              content: "Tracing the evolution of You Only Look Once (YOLO) object detection algorithms from v1 to recent versions, highlighting key innovations and improvements."
            },
            {
              id: "dl-obj-3",
              title: "Lecture 3: Introduction of YOLO v8",
              content: "Overview of YOLO v8 architecture, features, improvements over previous versions, and performance benchmarks on standard detection datasets."
            },
            {
              id: "dl-obj-4",
              title: "Lecture 4: Installation Of YOLOv8",
              content: "Step-by-step guide to installing and configuring YOLOv8, including dependencies, environmental setup, and verification of the installation."
            },
            {
              id: "dl-obj-5",
              title: "Lecture 5: Data Annotation & Preparation",
              content: "Techniques for annotating object detection datasets, including bounding box creation, class labeling, and preparing data in YOLO-compatible format."
            },
            {
              id: "dl-obj-6",
              title: "Lecture 6: Download Data & Configure Path",
              content: "Sourcing appropriate datasets for object detection, organizing directory structure, and configuring data paths for training YOLO models."
            },
            {
              id: "dl-obj-7",
              title: "Lecture 7: Download & Configure Pretrained Weight",
              content: "Leveraging pre-trained YOLO weights, configuring model checkpoints, and preparing transfer learning for custom object detection tasks."
            },
            {
              id: "dl-obj-8",
              title: "Lecture 8: Start Model Training",
              content: "Implementing the training pipeline for YOLOv8, including configuration of hyperparameters, optimization strategies, and monitoring training progress."
            },
            {
              id: "dl-obj-9",
              title: "Lecture 9: Evaluation Curves YOLOv8",
              content: "Interpreting training and validation curves, precision-recall curves, and mAP metrics to evaluate YOLOv8 model performance and diagnose issues."
            },
            {
              id: "dl-obj-10",
              title: "Lecture 10: Introduction To Detectron2",
              content: "Overview of Facebook's Detectron2 framework for object detection and segmentation, its architecture, features, and advantages for research."
            },
            {
              id: "dl-obj-11",
              title: "Lecture 11: Installation Of Detectron2",
              content: "Comprehensive guide to installing Detectron2, including system requirements, dependency management, and troubleshooting common installation issues."
            },
            {
              id: "dl-obj-12",
              title: "Lecture 12: Data Annotation & Preparation",
              content: "Preparing datasets for Detectron2, including COCO format annotations, dataset registration, and creating custom DatasetCatalog entries."
            },
            {
              id: "dl-obj-13",
              title: "Lecture 13: Download Data & Configure Path",
              content: "Sourcing datasets compatible with Detectron2, organizing data directories, and configuring data loaders for training object detection models."
            },
            {
              id: "dl-obj-14",
              title: "Lecture 14: Download & Configure Pretrained Weight",
              content: "Using Detectron2's model zoo, selecting appropriate pre-trained models, and configuring checkpoints for transfer learning on custom tasks."
            },
            {
              id: "dl-obj-15",
              title: "Lecture 15: Start Model Training",
              content: "Implementing Detectron2 training workflows, configuration system, distributed training options, and customizing training parameters."
            },
            {
              id: "dl-obj-16",
              title: "Lecture 16: Evaluation Curves Detectron2",
              content: "Analyzing training metrics, COCO evaluation results, and performance visualizations to assess and improve Detectron2 model performance."
            },
            {
              id: "dl-obj-17",
              title: "Lecture 17: Inferencing Using Trained Model",
              content: "Deploying trained Detectron2 models for inference, processing images and video, visualizing results, and optimizing inference speed."
            },
            {
              id: "dl-obj-18",
              title: "Lecture 18: Introduction To TFOD2",
              content: "Overview of TensorFlow Object Detection API v2, its architecture, supported models, and integration with the TensorFlow ecosystem."
            },
            {
              id: "dl-obj-19",
              title: "Lecture 19: Installation Of TFOD2",
              content: "Step-by-step installation guide for TensorFlow Object Detection API v2, including dependency management and verifying the installation."
            },
            {
              id: "dl-obj-20",
              title: "Lecture 20: Data Annotation & Preparation",
              content: "Creating and preparing datasets for TFOD2, including TFRecord format conversion, label map creation, and data augmentation strategies."
            },
            {
              id: "dl-obj-21",
              title: "Lecture 21: Download Data & Configure Path",
              content: "Organizing data for TFOD2 training, configuring pipeline configuration files, and setting up directory structures for model training."
            },
            {
              id: "dl-obj-22",
              title: "Lecture 22: Download & Configure Pretrained Weight",
              content: "Using TFOD2 model zoo, selecting appropriate pre-trained detection models, and configuring checkpoint initialization for transfer learning."
            },
            {
              id: "dl-obj-23",
              title: "Lecture 23: Evaluation Curves TFOD2",
              content: "Monitoring and interpreting TensorBoard metrics for TFOD2, analyzing detection performance, and using evaluation results to improve models."
            },
            {
              id: "dl-obj-24",
              title: "Lecture 24: Inferencing Using Trained Model",
              content: "Exporting trained TFOD2 models for deployment, implementing inference pipelines, and optimizing models for various deployment scenarios."
            }
          ]
        },
        {
          id: "dl-module6",
          title: "Module 6: Image Segmentation & Mask RCNN",
          icon: Network,
          lectures: [
            {
              id: "dl-seg-1",
              title: "Lecture 1: Scene Understanding",
              content: "Introduction to scene understanding in computer vision, including object recognition, segmentation, and contextual reasoning about visual scenes."
            },
            {
              id: "dl-seg-2",
              title: "Lecture 2: More To Detection",
              content: "Beyond object detection: understanding the limitations of bounding boxes and the need for more precise localization methods in computer vision."
            },
            {
              id: "dl-seg-3",
              title: "Lecture 3: Need Accurate Results",
              content: "Exploring applications requiring pixel-level precision, including medical imaging, autonomous driving, and augmented reality use cases."
            },
            {
              id: "dl-seg-4",
              title: "Lecture 4: Segmentation",
              content: "Introduction to image segmentation concepts, including pixel-wise classification, instance vs. semantic segmentation, and panoptic segmentation."
            },
            {
              id: "dl-seg-5",
              title: "Lecture 5: Types Of Segmentation",
              content: "Comparative analysis of semantic, instance, and panoptic segmentation approaches, their applications, advantages, and limitations."
            },
            {
              id: "dl-seg-6",
              title: "Lecture 6: Understanding Masks",
              content: "Deep dive into binary and probabilistic masks, mask representation, encoding techniques, and their role in segmentation networks."
            },
            {
              id: "dl-seg-7",
              title: "Lecture 7: Mask RCNN",
              content: "Overview of Mask R-CNN architecture as an extension of Faster R-CNN, including the mask prediction branch and feature pyramid network."
            },
            {
              id: "dl-seg-8",
              title: "Lecture 8: From Bounding Box To Polygon Masks",
              content: "Techniques for converting between different spatial representations including bounding boxes, pixel masks, and polygon representations."
            },
            {
              id: "dl-seg-9",
              title: "Lecture 9: Mask RCNN Architecture",
              content: "Detailed examination of Mask R-CNN components including backbone networks, RPN, ROI Align, and the mask branch for instance segmentation."
            },
            {
              id: "dl-seg-10",
              title: "Lecture 10: Introduction To Detectron2",
              content: "Overview of Detectron2 as a platform for instance segmentation, focusing on its segmentation capabilities and implementations."
            },
            {
              id: "dl-seg-11",
              title: "Lecture 11: Our Custom Dataset",
              content: "Creating custom datasets for instance segmentation, including data collection strategies, considerations for mask annotation, and dataset scaling."
            },
            {
              id: "dl-seg-12",
              title: "Lecture 12: Doing Annotations Or Labeling Data",
              content: "Tools and techniques for pixel-level annotation, polygon drawing, and efficient mask creation for instance segmentation datasets."
            },
            {
              id: "dl-seg-13",
              title: "Lecture 13: Registering Dataset For Training",
              content: "Integrating custom segmentation datasets with Detectron2, creating DatasetCatalog and MetadataCatalog entries for training."
            },
            {
              id: "dl-seg-14",
              title: "Lecture 14: Selection Of Pretrained Model From Model Zoo",
              content: "Strategies for selecting appropriate pre-trained models for instance segmentation tasks based on accuracy, speed, and resource constraints."
            },
            {
              id: "dl-seg-15",
              title: "Lecture 15: Let's Start Training",
              content: "Implementing the training pipeline for Mask R-CNN in Detectron2, including configuration, hyperparameter settings, and monitoring."
            },
            {
              id: "dl-seg-16",
              title: "Lecture 16: Stop Training Or Resume Training",
              content: "Techniques for checkpointing, saving model state, and resuming training from checkpoints in Detectron2 for long training runs."
            },
            {
              id: "dl-seg-17",
              title: "Lecture 17: Inferencing Using The Custom Trained Model In Colab",
              content: "Implementing inference pipelines for instance segmentation models in Google Colab, including visualization of segmentation masks."
            },
            {
              id: "dl-seg-18",
              title: "Lecture 18: Evaluating The Model",
              content: "Comprehensive evaluation of instance segmentation models using metrics like mask AP, precision, recall at different IoU thresholds."
            },
            {
              id: "dl-seg-19",
              title: "Lecture 19: Face Detection Using Detectron 2",
              content: "Specialized application of instance segmentation for face detection and segmentation using Detectron2 framework."
            }
          ]
        },
        {
          id: "dl-module7",
          title: "Module 7: Object Tracking",
          icon: Network,
          lectures: [
            {
              id: "dl-track-1",
              title: "Lecture 1: What Is Object Tracking?",
              content: "Introduction to object tracking as the process of following objects across video frames, distinguishing tracking from detection, and tracking applications."
            },
            {
              id: "dl-track-2",
              title: "Lecture 2: Localization",
              content: "Understanding localization in the context of tracking, including bounding box regression, centroid tracking, and spatial prediction methods."
            },
            {
              id: "dl-track-3",
              title: "Lecture 3: Motion",
              content: "Analyzing motion patterns in videos, modeling object dynamics, and implementing motion prediction for tracking algorithms."
            },
            {
              id: "dl-track-4",
              title: "Lecture 4: Flow Of Optics",
              content: "Exploring optical flow techniques for estimating motion between video frames, including dense and sparse optical flow methods."
            },
            {
              id: "dl-track-5",
              title: "Lecture 5: Motion Vector",
              content: "Understanding motion vectors as representations of apparent movement between video frames and their role in tracking algorithms."
            },
            {
              id: "dl-track-6",
              title: "Lecture 6: Tracking Features",
              content: "Identifying and using distinctive features for tracking, including visual appearance features, motion features, and learned embeddings."
            },
            {
              id: "dl-track-7",
              title: "Lecture 7: Exploring Deep Sort",
              content: "Deep dive into the Deep SORT (Simple Online and Realtime Tracking) algorithm, including appearance feature extraction with deep learning."
            },
            {
              id: "dl-track-8",
              title: "Lecture 8: ByteTrack",
              content: "Understanding ByteTrack's approach to association-based tracking that leverages both high and low confidence detections for robust tracking."
            },
            {
              id: "dl-track-9",
              title: "Lecture 9: Data Preprocessing",
              content: "Preparing video data for object tracking, including frame extraction, normalization, and temporal sequence handling."
            },
            {
              id: "dl-track-10",
              title: "Lecture 10: Using YOLO For Detection",
              content: "Integrating YOLO object detection as the foundation for tracking systems, focusing on detection quality impact on tracking performance."
            },
            {
              id: "dl-track-11",
              title: "Lecture 11: Preparing Deep SORT With YOLO",
              content: "Implementing a complete tracking system by combining YOLO detection with Deep SORT tracking, including feature extraction and matching."
            },
            {
              id: "dl-track-12",
              title: "Lecture 12: Combining Pipelines For Tracking & Detection",
              content: "Creating end-to-end pipelines that integrate detection and tracking for video analysis applications with real-time performance considerations."
            }
          ]
        },
        {
          id: "dl-module8",
          title: "Module 8: GAN",
          icon: Network,
          lectures: [
            {
              id: "dl-gan-1",
              title: "Lecture 1: Introduction To GANs",
              content: "Overview of Generative Adversarial Networks, their invention by Ian Goodfellow, and their revolutionary impact on generative modeling."
            },
            {
              id: "dl-gan-2",
              title: "Lecture 2: GAN Architecture",
              content: "Deep dive into the two-player adversarial architecture of GANs, including generator and discriminator networks and their interplay."
            },
            {
              id: "dl-gan-3",
              title: "Lecture 3: Discriminator",
              content: "Understanding the discriminator network's role, architecture options, loss functions, and training techniques for effective adversarial learning."
            },
            {
              id: "dl-gan-4",
              title: "Lecture 4: Generator",
              content: "Exploring generator network design, latent space sampling, upsampling techniques, and strategies for generating high-quality synthetic data."
            },
            {
              id: "dl-gan-5",
              title: "Lecture 5: Controllable Generation",
              content: "Techniques for controlling GAN outputs including conditional GANs, latent space manipulation, and attribute editing approaches."
            },
            {
              id: "dl-gan-6",
              title: "Lecture 6: WGANs",
              content: "Wasserstein GANs and their improvements to training stability through alternative distance metrics and gradient penalty techniques."
            },
            {
              id: "dl-gan-7",
              title: "Lecture 7: DCGANs",
              content: "Deep Convolutional GANs architecture, design principles, and their application to image generation with convolutional networks."
            },
            {
              id: "dl-gan-8",
              title: "Lecture 8: StyleGANs",
              content: "Understanding StyleGAN architecture innovations including style-based generation, progressive growing, and advancements in high-resolution image synthesis."
            },
            {
              id: "dl-gan-9",
              title: "Lecture 9: GAN Practical's Implementation",
              content: "Hands-on implementation of various GAN architectures, addressing training challenges, and applying GANs to practical generation tasks."
            }
          ]
        }
      ]
    },
    {
      id: "nlp",
      title: "Natural Language Processing",
      description: "Master Natural Language Processing to analyze and generate human language. Learn text processing techniques, language models, and advanced architectures for language understanding.",
      color: "blue",
      icon: Bot,
      modules: [
        {
          id: "nlp-module1",
          title: "Module 1: NLP Introduction",
          icon: Book,
          lectures: [
            {
              id: "nlp-intro-1",
              title: "Lecture 1: Overview Computational Linguistic",
              content: "Introduction to computational linguistics fundamentals, the historical development of NLP, and how computers process and understand human language."
            },
            {
              id: "nlp-intro-2",
              title: "Lecture 2: History Of NLP",
              content: "Exploration of the evolution of Natural Language Processing from rule-based approaches to statistical methods and modern neural network techniques."
            },
            {
              id: "nlp-intro-3",
              title: "Lecture 3: Why NLP",
              content: "Understanding the importance of Natural Language Processing, its applications across industries, and the challenges in processing human language."
            },
            {
              id: "nlp-intro-4",
              title: "Lecture 4: Use Of NLP",
              content: "Survey of practical NLP applications including machine translation, sentiment analysis, chatbots, question answering systems, and text summarization."
            }
          ]
        },
        {
          id: "nlp-module2",
          title: "Module 2: Text Processing for NLP",
          icon: Code,
          lectures: [
            {
              id: "nlp-text-1",
              title: "Lecture 1: Text Processing",
              content: "Introduction to text preprocessing techniques essential for NLP tasks, including cleaning, normalization, and preparing text data for analysis."
            },
            {
              id: "nlp-text-2",
              title: "Lecture 2: Understanding Regex",
              content: "Mastering regular expressions for pattern matching and text manipulation in NLP pipelines to extract information and clean textual data."
            },
            {
              id: "nlp-text-3",
              title: "Lecture 3: Text Normalization",
              content: "Techniques for standardizing text including case normalization, stemming, lemmatization, and handling contractions to improve NLP model performance."
            },
            {
              id: "nlp-text-4",
              title: "Lecture 4: Word Count",
              content: "Methods for counting and analyzing word frequency in texts, creating frequency distributions, and using word count statistics for text analysis."
            },
            {
              id: "nlp-text-5",
              title: "Lecture 5: Frequency Distribution",
              content: "Creating and analyzing frequency distributions of words and n-grams to understand text characteristics and identify important terms."
            },
            {
              id: "nlp-text-6",
              title: "Lecture 6: String Tokenization",
              content: "Techniques for breaking text into tokens (words, sentences, paragraphs) using various tokenization approaches for different languages and contexts."
            },
            {
              id: "nlp-text-7",
              title: "Lecture 7: Annotator Creation",
              content: "Building custom text annotators to identify and label specific elements in text like named entities, parts of speech, and semantic roles."
            },
            {
              id: "nlp-text-8",
              title: "Lecture 8: Sentence Processing",
              content: "Methods for sentence boundary detection, parsing, and structural analysis to extract meaning and relationships within sentences."
            },
            {
              id: "nlp-text-9",
              title: "Lecture 9: Lemmatization In Text Processing",
              content: "Deep dive into lemmatization techniques to reduce words to their base forms while considering context and part of speech information."
            },
            {
              id: "nlp-text-10",
              title: "Lecture 10: Word Embedding",
              content: "Introduction to word embeddings as dense vector representations of words that capture semantic relationships in a continuous vector space."
            },
            {
              id: "nlp-text-11",
              title: "Lecture 11: Co-Occurrence Vectors",
              content: "Building co-occurrence matrices and vectors to represent words based on their contextual patterns and distributional semantics."
            },
            {
              id: "nlp-text-12",
              title: "Lecture 12: Word2Vec",
              content: "Deep dive into Word2Vec models (CBOW and Skip-gram) for creating word embeddings that capture semantic relationships between words."
            },
            {
              id: "nlp-text-13",
              title: "Lecture 13: Doc2Vec",
              content: "Extending word embeddings to document level representations using Doc2Vec models for document classification and similarity analysis."
            }
          ]
        },
        {
          id: "nlp-module3",
          title: "Module 3: NLP Libraries & Networks",
          icon: Code,
          lectures: [
            {
              id: "nlp-lib-1",
              title: "Lecture 1: NLTK",
              content: "Comprehensive overview of the Natural Language Toolkit (NLTK) for text processing, analysis, and linguistic research in Python."
            },
            {
              id: "nlp-lib-2",
              title: "Lecture 2: TextBlob",
              content: "Using TextBlob library for simplified text processing tasks including part-of-speech tagging, noun phrase extraction, and sentiment analysis."
            },
            {
              id: "nlp-lib-3",
              title: "Lecture 3: Recurrent Neural Networks",
              content: "Understanding Recurrent Neural Networks (RNNs) and their ability to process sequential data like text by maintaining internal state."
            },
            {
              id: "nlp-lib-4",
              title: "Lecture 4: Long Short Term Memory (LSTM)",
              content: "Deep dive into LSTM networks for addressing the vanishing gradient problem in RNNs and modeling long-term dependencies in text."
            },
            {
              id: "nlp-lib-5",
              title: "Lecture 5: Bi-LSTM",
              content: "Implementing Bidirectional LSTMs to capture context from both past and future states, improving performance on various NLP tasks."
            },
            {
              id: "nlp-lib-6",
              title: "Lecture 6: Stacked LSTM",
              content: "Building deep LSTM architectures by stacking multiple LSTM layers to learn hierarchical representations of text data."
            },
            {
              id: "nlp-lib-7",
              title: "Lecture 7: GRU Implementation",
              content: "Understanding and implementing Gated Recurrent Units (GRUs) as a simpler alternative to LSTMs for sequence modeling in NLP applications."
            }
          ]
        },
        {
          id: "nlp-module4",
          title: "Module 4: Attention-based Models & Transfer Learning",
          icon: BrainCircuit,
          lectures: [
            {
              id: "nlp-attn-1",
              title: "Lecture 1: Seq2Seq",
              content: "Understanding Sequence-to-Sequence models for tasks like machine translation, text summarization, and question answering systems."
            },
            {
              id: "nlp-attn-2",
              title: "Lecture 2: Encoders And Decoders",
              content: "Deep dive into encoder-decoder architectures for processing and generating sequential data in NLP applications."
            },
            {
              id: "nlp-attn-3",
              title: "Lecture 3: Attention Mechanism",
              content: "Exploring attention mechanisms that allow models to focus on relevant parts of input sequences when generating output sequences."
            },
            {
              id: "nlp-attn-4",
              title: "Lecture 4: Self-Attention",
              content: "Understanding self-attention mechanisms that allow tokens to attend to other tokens within the same sequence, capturing long-range dependencies."
            },
            {
              id: "nlp-attn-5",
              title: "Lecture 5: Introduction To Transformers",
              content: "Overview of the Transformer architecture that revolutionized NLP through parallelizable self-attention mechanisms and positional encodings."
            },
            {
              id: "nlp-attn-6",
              title: "Lecture 6: BERT Model",
              content: "Deep dive into Bidirectional Encoder Representations from Transformers (BERT) for pre-training and fine-tuning on various NLP tasks."
            },
            {
              id: "nlp-attn-7",
              title: "Lecture 7: GPT-2 Model",
              content: "Understanding the Generative Pre-trained Transformer 2 (GPT-2) architecture for powerful language generation and completion tasks."
            }
          ]
        }
      ]
    },
    {
      id: "genai",
      title: "Generative AI",
      description: "Explore the cutting-edge field of Generative AI, from foundational concepts to advanced applications including Large Language Models, prompt engineering, and creative content generation.",
      color: "amber",
      icon: Bot,
      modules: [
        {
          id: "genai-module1",
          title: "Module 1: Introduction of Generative AI",
          icon: Book,
          lectures: [
            {
              id: "genai-intro-1",
              title: "Lecture 1: Introduction of Generative AI and its use cases",
              content: "Overview of Generative AI technology, its evolution, and real-world applications across various industries and domains."
            },
            {
              id: "genai-intro-2",
              title: "Lecture 2: Probabilistic modeling and generative models",
              content: "Fundamental concepts of probabilistic modeling and how they form the basis for various generative models and techniques."
            }
          ]
        },
        {
          id: "genai-module2",
          title: "Module 2: Generative AI for Text Generation",
          icon: AlignJustify,
          lectures: [
            {
              id: "genai-text-1",
              title: "Lecture 1: Autoencoders and variational autoencoders",
              content: "Understanding autoencoder architectures and their variations for generating and transforming textual data."
            },
            {
              id: "genai-text-2",
              title: "Lecture 2: RNN & LSTM",
              content: "Applying Recurrent Neural Networks and Long Short-Term Memory networks for sequence generation and text modeling."
            },
            {
              id: "genai-text-3",
              title: "Lecture 3: Generative pre-trained transformers",
              content: "Introduction to transformer-based models pre-trained on large text corpora for powerful text generation capabilities."
            }
          ]
        },
        {
          id: "genai-module3",
          title: "Module 3: Generative AI for Machine Translation",
          icon: Diff,
          lectures: [
            {
              id: "genai-mt-1",
              title: "Lecture 1: SMT & NMT",
              content: "Comparing Statistical Machine Translation and Neural Machine Translation approaches for language translation tasks."
            },
            {
              id: "genai-mt-2",
              title: "Lecture 2: Attention mechanisms in NMT",
              content: "Deep dive into attention mechanisms that revolutionized neural machine translation by focusing on relevant parts of input sequences."
            },
            {
              id: "genai-mt-3",
              title: "Lecture 3: Generative pre-trained transformers",
              content: "Leveraging generative pre-trained transformers for state-of-the-art machine translation applications and services."
            }
          ]
        },
        {
          id: "genai-module4",
          title: "Module 4: Generative AI for Creative Content Generation",
          icon: PenTool,
          lectures: [
            {
              id: "genai-creative-1",
              title: "Lecture 1: Poetry generation and music composition using generative AI",
              content: "Exploring how generative models can create poetry and musical compositions that mimic human creativity."
            },
            {
              id: "genai-creative-2",
              title: "Lecture 2: Creative writing and storytelling with generative AI",
              content: "Techniques for using generative AI to assist in creative writing processes and generate compelling narratives."
            },
            {
              id: "genai-creative-3",
              title: "Lecture 3: Ethical considerations and biases in creative content generation",
              content: "Addressing ethical challenges, biases, and responsible use of AI in creative content generation."
            }
          ]
        },
        {
          id: "genai-module5",
          title: "Module 5: Advanced Topics in Generative AI with NLP",
          icon: BrainCircuit,
          lectures: [
            {
              id: "genai-adv-1",
              title: "Lecture 1: Reinforcement learning in generative AI for NLP",
              content: "Integrating reinforcement learning techniques to improve generative AI models for natural language processing tasks."
            },
            {
              id: "genai-adv-2",
              title: "Lecture 2: Multimodal generative models for NLP",
              content: "Building generative models that can work with multiple input modalities alongside text for richer content generation."
            },
            {
              id: "genai-adv-3",
              title: "Lecture 3: Generative AI for natural language understanding (NLU)",
              content: "Using generative approaches to enhance natural language understanding capabilities in AI systems."
            }
          ]
        },
        {
          id: "genai-module6",
          title: "Module 6: LLMs: Use Cases and Potentials",
          icon: Lightbulb,
          lectures: [
            {
              id: "genai-llm-1",
              title: "Lecture 1: Introduction to Large Language Models (LLMs)",
              content: "Overview of Large Language Models, their architecture, and how they represent a paradigm shift in AI capabilities."
            },
            {
              id: "genai-llm-2",
              title: "Lecture 2: Exploring the diverse applications of LLMs",
              content: "Survey of practical applications of LLMs across different domains, including content generation, coding assistance, and customer service."
            },
            {
              id: "genai-llm-3",
              title: "Lecture 3: Understanding the potential of LLMs to transform various industries",
              content: "Analyzing how LLMs can revolutionize industries like healthcare, finance, education, and more through advanced language processing capabilities."
            }
          ]
        },
        {
          id: "genai-module7",
          title: "Module 7: Hugging Face Hub: A Gateway to Generative AI",
          icon: Code,
          lectures: [
            {
              id: "genai-hf-1",
              title: "Lecture 1: Navigating the Hugging Face Hub and its vast repository of pre-trained models",
              content: "Introduction to the Hugging Face ecosystem and how to effectively browse and utilize its extensive model collection."
            },
            {
              id: "genai-hf-2",
              title: "Lecture 2: Leveraging Hugging Face Hub's tools and resources for generative AI tasks",
              content: "Hands-on guide to using Hugging Face's libraries, APIs, and tools for implementing generative AI solutions."
            },
            {
              id: "genai-hf-3",
              title: "Lecture 3: Exploring real-world applications built upon Hugging Face Hub's models",
              content: "Case studies of successful implementations using Hugging Face models across various domains and applications."
            }
          ]
        },
        {
          id: "genai-module8",
          title: "Module 8: Prompt Engineering: The Art of Guiding LLMs",
          icon: Terminal,
          lectures: [
            {
              id: "genai-prompt-1",
              title: "Lecture 1: Understanding the role of prompts in guiding LLMs",
              content: "Fundamentals of how prompts influence LLM outputs and why prompt design is crucial for effective model usage."
            },
            {
              id: "genai-prompt-2",
              title: "Lecture 2: Crafting effective prompts to generate desired outputs",
              content: "Techniques and best practices for writing prompts that elicit accurate, relevant, and high-quality responses from LLMs."
            },
            {
              id: "genai-prompt-3",
              title: "Lecture 3: Exploring advanced prompt engineering techniques",
              content: "Advanced methods including few-shot learning, chain-of-thought prompting, and other strategies to optimize LLM performance."
            }
          ]
        },
        {
          id: "genai-module9",
          title: "Module 9: RAG: A Versatile Tool for Generative AI",
          icon: Database,
          lectures: [
            {
              id: "genai-rag-1",
              title: "Lecture 1: Introduction to the Retrieval Augmented Generation (RAG)",
              content: "Understanding the RAG architecture that combines information retrieval with text generation to improve factuality and relevance."
            },
            {
              id: "genai-rag-2",
              title: "Lecture 2: Discuss about the frameworks to achieve RAG",
              content: "Overview of software frameworks, libraries, and tools that enable efficient implementation of RAG systems."
            },
            {
              id: "genai-rag-3",
              title: "Lecture 3: Utilizing RAG for various generative AI tasks",
              content: "Practical applications of RAG in question answering, content generation, and knowledge-intensive NLP tasks."
            },
            {
              id: "genai-rag-4",
              title: "Lecture 4: Understanding the advantages and limitations of RAG",
              content: "Critical analysis of RAG's strengths in improving factuality and its current limitations in real-world applications."
            }
          ]
        },
        {
          id: "genai-module10",
          title: "Module 10: Fine-tuning: Unveiling the Potential of LLMs",
          icon: Settings,
          lectures: [
            {
              id: "genai-finetune-1",
              title: "Lecture 1: Delving into the concept of fine-tuning LLMs",
              content: "Introduction to fine-tuning techniques that adapt pre-trained LLMs to specific domains or tasks with limited data."
            },
            {
              id: "genai-finetune-2",
              title: "Lecture 2: Understanding the different approaches to fine-tuning LLMs",
              content: "Comparing various fine-tuning methods including full fine-tuning, parameter-efficient techniques like LoRA, and instruction tuning."
            },
            {
              id: "genai-finetune-3",
              title: "Lecture 3: Exploring real-world examples of fine-tuning for specific applications",
              content: "Case studies demonstrating successful fine-tuning of LLMs for specialized domains such as healthcare, legal, and customer support."
            }
          ]
        },
        {
          id: "genai-module11",
          title: "Module 11: Project: On prompt image and caption generator",
          icon: ImageIcon,
          lectures: [
            {
              id: "genai-proj1-1",
              title: "Lecture 1: Exploring the OpenAI library in python",
              content: "Hands-on introduction to the OpenAI Python library, its capabilities, and how to integrate it into your projects."
            },
            {
              id: "genai-proj1-2",
              title: "Lecture 2: Image Generation with openai library",
              content: "Implementing image generation using OpenAI's DALL-E models through the Python library to create images from text descriptions."
            },
            {
              id: "genai-proj1-3",
              title: "Lecture 3: Image captioning with openai library",
              content: "Building an image captioning system that automatically generates descriptive text for images using OpenAI's multimodal capabilities."
            }
          ]
        },
        {
          id: "genai-module12",
          title: "Module 12: Project: Customised Chat bot",
          icon: MessageSquare,
          lectures: [
            {
              id: "genai-proj2-1",
              title: "Lecture 1: Exploring LangChain and chainlit",
              content: "Introduction to LangChain framework for building LLM applications and Chainlit for creating interactive chat interfaces."
            },
            {
              id: "genai-proj2-2",
              title: "Lecture 2: Creative Chatbot using LangChain and Chainlit",
              content: "Building a customized chatbot with enhanced capabilities using LangChain's components and Chainlit's user interface tools."
            }
          ]
        },
        {
          id: "genai-module13",
          title: "Module 13: Project: Genei: An Alexa like assistant",
          icon: Mic,
          lectures: [
            {
              id: "genai-proj3-1",
              title: "Lecture 1: Alexa like Assistant",
              content: "Developing a voice-activated digital assistant similar to Alexa using generative AI models, speech recognition, and text-to-speech technologies."
            }
          ]
        },
        {
          id: "genai-module14",
          title: "Module 14: Custom Chat GPT",
          icon: Bot,
          lectures: [
            {
              id: "genai-proj4-1",
              title: "Lecture 1: A custom chat bot which can create images based on the given input",
              content: "Building an advanced chatbot that integrates text generation with image creation capabilities to respond to user prompts with both text and visuals."
            }
          ]
        }
      ]
    },
    {
      id: "powerbi",
      title: "POWER BI (OPTIONAL)",
      description: "Master Microsoft Power BI, a powerful business analytics tool for data visualization, reporting, and dashboard creation that transforms data into actionable insights.",
      color: "indigo",
      icon: Database,
      modules: [
        {
          id: "powerbi-module1",
          title: "Module 1: Introduction to Power BI",
          icon: Book,
          lectures: [
            {
              id: "powerbi-intro-1",
              title: "Lecture 1: What is Power BI",
              content: "Overview of Power BI as a business analytics service by Microsoft, its capabilities, and how it helps in data visualization and business intelligence."
            },
            {
              id: "powerbi-intro-2",
              title: "Lecture 2: Power BI Products",
              content: "Understanding different Power BI products including Power BI Desktop, Power BI Service, Power BI Mobile, and how they work together."
            },
            {
              id: "powerbi-intro-3",
              title: "Lecture 3: Components of Power BI",
              content: "Exploring the key components of Power BI including Power Query, Power Pivot, Power View, and Power Map."
            },
            {
              id: "powerbi-intro-4",
              title: "Lecture 4: Why Power BI - PowerBI Vs Other BI Tools",
              content: "Comparative analysis of Power BI against other business intelligence tools, highlighting its advantages and limitations."
            },
            {
              id: "powerbi-intro-5",
              title: "Lecture 5: Building Blocks of Power BI",
              content: "Understanding the fundamental building blocks of Power BI: visualizations, datasets, reports, dashboards, and apps."
            },
            {
              id: "powerbi-intro-6",
              title: "Lecture 6: Power BI Process",
              content: "Overview of the end-to-end Power BI process from data connection and transformation to visualization and sharing."
            },
            {
              id: "powerbi-intro-7",
              title: "Lecture 7: Power BI Desktop Installation",
              content: "Step-by-step guide to installing Power BI Desktop and configuring it for first use."
            },
            {
              id: "powerbi-intro-8",
              title: "Lecture 8: User Interface",
              content: "Exploring the Power BI Desktop interface including the report view, data view, and relationship view."
            },
            {
              id: "powerbi-intro-9",
              title: "Lecture 9: Connecting to a local data Sources",
              content: "Methods for connecting Power BI to various local data sources like Excel, CSV, and SQL Server."
            },
            {
              id: "powerbi-intro-10",
              title: "Lecture 10: Power Query User Interface",
              content: "Introduction to the Power Query Editor interface and its capabilities for data transformation."
            },
            {
              id: "powerbi-intro-11",
              title: "Lecture 11: Data types",
              content: "Understanding different data types in Power BI and how to work with them effectively."
            },
            {
              id: "powerbi-intro-12",
              title: "Lecture 12: Home Tab",
              content: "Exploring the functions and features available in the Home tab of Power Query Editor."
            },
            {
              id: "powerbi-intro-13",
              title: "Lecture 13: Transform Tab",
              content: "Deep dive into the Transform tab and its powerful data manipulation capabilities."
            },
            {
              id: "powerbi-intro-14",
              title: "Lecture 14: Add Column",
              content: "Learning how to add and manipulate columns in Power Query for enhanced data analysis."
            },
            {
              id: "powerbi-intro-15",
              title: "Lecture 15: Other Transformations",
              content: "Exploring additional transformation techniques available in Power Query for data preparation."
            }
          ]
        },
        {
          id: "powerbi-module2",
          title: "Module 2: Visualizations",
          icon: BarChart,
          lectures: [
            {
              id: "powerbi-viz-1",
              title: "Lecture 1: Bar/Column charts",
              content: "Creating and customizing bar and column charts to compare data across categories."
            },
            {
              id: "powerbi-viz-2",
              title: "Lecture 2: Pie & Donut charts",
              content: "Using pie and donut charts to show proportional data and part-to-whole relationships."
            },
            {
              id: "powerbi-viz-3",
              title: "Lecture 3: Waterfall chart",
              content: "Implementing waterfall charts to visualize the cumulative effect of sequentially introduced positive or negative values."
            },
            {
              id: "powerbi-viz-4",
              title: "Lecture 4: Tree Map",
              content: "Building tree maps to display hierarchical data as nested rectangles with size proportional to values."
            },
            {
              id: "powerbi-viz-5",
              title: "Lecture 5: Table & Matrix visualization",
              content: "Creating tables and matrix visualizations to show detailed data in rows and columns with various formatting options."
            },
            {
              id: "powerbi-viz-6",
              title: "Lecture 6: Ribbon chart",
              content: "Using ribbon charts to show rank changes in data over time or across categories."
            },
            {
              id: "powerbi-viz-7",
              title: "Lecture 7: Funnel",
              content: "Implementing funnel charts to visualize stages in a linear process and identify potential bottlenecks."
            },
            {
              id: "powerbi-viz-8",
              title: "Lecture 8: Line",
              content: "Creating line charts to display trends in data over time and compare multiple series."
            },
            {
              id: "powerbi-viz-9",
              title: "Lecture 9: Slicers",
              content: "Using slicers as visual filters to narrow the portion of data shown in other visualizations on a report page."
            },
            {
              id: "powerbi-viz-10",
              title: "Lecture 10: KPI",
              content: "Implementing Key Performance Indicator (KPI) visuals to track progress against measurable goals."
            },
            {
              id: "powerbi-viz-11",
              title: "Lecture 11: Area",
              content: "Creating area charts to show the magnitude of change over time and highlight total values across a trend."
            },
            {
              id: "powerbi-viz-12",
              title: "Lecture 12: Cards",
              content: "Using card visualizations to display single numeric values and important metrics at a glance."
            },
            {
              id: "powerbi-viz-13",
              title: "Lecture 13: Scatter",
              content: "Building scatter charts to show relationships between two numerical values and identify patterns or outliers."
            },
            {
              id: "powerbi-viz-14",
              title: "Lecture 14: Gauge Chart",
              content: "Implementing gauge charts to display progress toward a goal or show values within a defined range."
            },
            {
              id: "powerbi-viz-15",
              title: "Lecture 15: Maps",
              content: "Creating map visualizations to display geographical data and spatial patterns."
            },
            {
              id: "powerbi-viz-16",
              title: "Lecture 16: Custom Visuals (Sankey, Sunburst, Playaxis, Wordcloud, Butterfly)",
              content: "Exploring and implementing custom visuals from the marketplace to enhance reports with specialized visualizations."
            }
          ]
        },
        {
          id: "powerbi-module3",
          title: "Module 3: Data modeling",
          icon: Database,
          lectures: [
            {
              id: "powerbi-model-1",
              title: "Lecture 1: Data models, Importance",
              content: "Understanding the concept of data modeling and why it's crucial for creating effective Power BI reports."
            },
            {
              id: "powerbi-model-2",
              title: "Lecture 2: Schema",
              content: "Learning about different schema types (star, snowflake) and how to design efficient data models."
            },
            {
              id: "powerbi-model-3",
              title: "Lecture 3: Creating and Managing relationships",
              content: "Techniques for establishing and managing relationships between tables in the data model."
            },
            {
              id: "powerbi-model-4",
              title: "Lecture 4: Optimizing Data Models",
              content: "Best practices and techniques for optimizing data models to improve performance and user experience."
            }
          ]
        },
        {
          id: "powerbi-module4",
          title: "Module 4: DAX",
          icon: Code,
          lectures: [
            {
              id: "powerbi-dax-1",
              title: "Lecture 1: DAX and its Importance",
              content: "Introduction to Data Analysis Expressions (DAX) and its role in creating calculations in Power BI."
            },
            {
              id: "powerbi-dax-2",
              title: "Lecture 2: Row & Filter context",
              content: "Understanding the concepts of row context and filter context in DAX calculations."
            },
            {
              id: "powerbi-dax-3",
              title: "Lecture 3: Measures & Calculated columns",
              content: "Learning when to use measures versus calculated columns and best practices for both."
            },
            {
              id: "powerbi-dax-4",
              title: "Lecture 4: SUM function",
              content: "Using the SUM function to calculate the total of numeric values in a column."
            },
            {
              id: "powerbi-dax-5",
              title: "Lecture 5: SUMX function",
              content: "Implementing SUMX for iterative sum calculations across a table with expressions."
            },
            {
              id: "powerbi-dax-6",
              title: "Lecture 6: MIN function",
              content: "Using the MIN function to find the minimum value in a column."
            },
            {
              id: "powerbi-dax-7",
              title: "Lecture 7: MINX function",
              content: "Implementing MINX for iterative minimum value calculations with expressions."
            },
            {
              id: "powerbi-dax-8",
              title: "Lecture 8: MAX function",
              content: "Using the MAX function to find the maximum value in a column."
            },
            {
              id: "powerbi-dax-9",
              title: "Lecture 9: MAXX function",
              content: "Implementing MAXX for iterative maximum value calculations with expressions."
            },
            {
              id: "powerbi-dax-10",
              title: "Lecture 10: AVERAGE function",
              content: "Using the AVERAGE function to calculate the arithmetic mean of values in a column."
            },
            {
              id: "powerbi-dax-11",
              title: "Lecture 11: AVERAGEX function",
              content: "Implementing AVERAGEX for iterative average calculations with expressions."
            },
            {
              id: "powerbi-dax-12",
              title: "Lecture 12: COUNT function",
              content: "Using the COUNT function to count non-blank values in a column."
            },
            {
              id: "powerbi-dax-13",
              title: "Lecture 13: DISTINCTCOUNT function",
              content: "Implementing DISTINCTCOUNT to count unique values in a column."
            },
            {
              id: "powerbi-dax-14",
              title: "Lecture 14: ALLSELECT function",
              content: "Using ALLSELECT to remove context filters from specified tables or columns."
            },
            {
              id: "powerbi-dax-15",
              title: "Lecture 15: FILTER function",
              content: "Implementing FILTER to return a table filtered based on specified conditions."
            },
            {
              id: "powerbi-dax-16",
              title: "Lecture 16: CALCULATE function",
              content: "Using CALCULATE to evaluate an expression in a modified filter context."
            },
            {
              id: "powerbi-dax-17",
              title: "Lecture 17: CROSSFILTER function",
              content: "Implementing CROSSFILTER to change the filter direction between two columns."
            },
            {
              id: "powerbi-dax-18",
              title: "Lecture 18: RELATED function",
              content: "Using RELATED to retrieve a value from another table related to the current table."
            },
            {
              id: "powerbi-dax-19",
              title: "Lecture 19: CALENDAR function",
              content: "Implementing CALENDAR to generate a table of dates within a specified range."
            },
            {
              id: "powerbi-dax-20",
              title: "Lecture 20: DATE function",
              content: "Using DATE to create a date from specified year, month, and day values."
            },
            {
              id: "powerbi-dax-21",
              title: "Lecture 21: DATEDIFF function",
              content: "Implementing DATEDIFF to calculate the difference between two dates in specified units."
            },
            {
              id: "powerbi-dax-22",
              title: "Lecture 22: MONTH function",
              content: "Using MONTH to extract the month number from a date."
            },
            {
              id: "powerbi-dax-23",
              title: "Lecture 23: WEEKDAY function",
              content: "Implementing WEEKDAY to determine the day of the week from a date."
            },
            {
              id: "powerbi-dax-24",
              title: "Lecture 24: YEAR function",
              content: "Using YEAR to extract the year from a date."
            },
            {
              id: "powerbi-dax-25",
              title: "Lecture 25: DATEADD function",
              content: "Implementing DATEADD to add a specified number of intervals to a date."
            },
            {
              id: "powerbi-dax-26",
              title: "Lecture 26: DATESBETWEEN function",
              content: "Using DATESBETWEEN to return a table of dates between two specified dates."
            },
            {
              id: "powerbi-dax-27",
              title: "Lecture 27: TOTALMTD function",
              content: "Implementing TOTALMTD to calculate month-to-date aggregations."
            },
            {
              id: "powerbi-dax-28",
              title: "Lecture 28: TOTALQTD function",
              content: "Using TOTALQTD to calculate quarter-to-date aggregations."
            },
            {
              id: "powerbi-dax-29",
              title: "Lecture 29: TOTALYTD function",
              content: "Implementing TOTALYTD to calculate year-to-date aggregations."
            },
            {
              id: "powerbi-dax-30",
              title: "Lecture 30: CONCATENATE function",
              content: "Using CONCATENATE to join two text strings into one text string."
            },
            {
              id: "powerbi-dax-31",
              title: "Lecture 31: CONCATENATEX function",
              content: "Implementing CONCATENATEX for iterative string concatenation across a table."
            },
            {
              id: "powerbi-dax-32",
              title: "Lecture 32: FORMAT function",
              content: "Using FORMAT to convert a value to text in a specified format."
            },
            {
              id: "powerbi-dax-33",
              title: "Lecture 33: LEFT function",
              content: "Implementing LEFT to return the specified number of characters from the start of a text string."
            },
            {
              id: "powerbi-dax-34",
              title: "Lecture 34: RIGHT function",
              content: "Using RIGHT to return the specified number of characters from the end of a text string."
            },
            {
              id: "powerbi-dax-35",
              title: "Lecture 35: TRIM function",
              content: "Implementing TRIM to remove all spaces from a text string except for single spaces between words."
            },
            {
              id: "powerbi-dax-36",
              title: "Lecture 36: FIND function",
              content: "Using FIND to locate one text string within another text string and return its starting position."
            },
            {
              id: "powerbi-dax-37",
              title: "Lecture 37: SEARCH function",
              content: "Implementing SEARCH to locate one text string within another, case-insensitive, and return its position."
            },
            {
              id: "powerbi-dax-38",
              title: "Lecture 38: AND function",
              content: "Using AND to check whether all arguments are TRUE and return TRUE if so."
            },
            {
              id: "powerbi-dax-39",
              title: "Lecture 39: OR function",
              content: "Implementing OR to check whether any arguments are TRUE and return TRUE if so."
            },
            {
              id: "powerbi-dax-40",
              title: "Lecture 40: NOT function",
              content: "Using NOT to reverse the logic of its argument."
            },
            {
              id: "powerbi-dax-41",
              title: "Lecture 41: FALSE function",
              content: "Implementing FALSE to return the logical value FALSE."
            },
            {
              id: "powerbi-dax-42",
              title: "Lecture 42: TRUE function",
              content: "Using TRUE to return the logical value TRUE."
            }
          ]
        },
        {
          id: "powerbi-module5",
          title: "Module 5: Connectivity",
          icon: Link,
          lectures: [
            {
              id: "powerbi-connect-1",
              title: "Lecture 1: Introduction to using Excel data in Power BI",
              content: "Best practices for importing and working with Excel data in Power BI."
            },
            {
              id: "powerbi-connect-2",
              title: "Lecture 2: Exploring live connections to data with Power BI",
              content: "Understanding live connections to data sources and their advantages and limitations."
            },
            {
              id: "powerbi-connect-3",
              title: "Lecture 3: Connecting directly to Database",
              content: "Methods for establishing direct connections to various database systems from Power BI."
            },
            {
              id: "powerbi-connect-4",
              title: "Lecture 4: Import Power View and Power Pivot to Power BI",
              content: "Techniques for importing existing Power View and Power Pivot models into Power BI."
            },
            {
              id: "powerbi-connect-5",
              title: "Lecture 5: Power BI Publisher for Excel",
              content: "Using the Power BI Publisher for Excel to pin Excel ranges to Power BI dashboards."
            },
            {
              id: "powerbi-connect-6",
              title: "Lecture 6: Content packs",
              content: "Working with pre-packaged collections of datasets, reports, and dashboards for specific services."
            },
            {
              id: "powerbi-connect-7",
              title: "Lecture 7: Introducing Power BI Mobile",
              content: "Overview of the Power BI mobile app capabilities for accessing reports and dashboards on the go."
            }
          ]
        },
        {
          id: "powerbi-module6",
          title: "Module 6: Creating reports",
          icon: FileText,
          lectures: [
            {
              id: "powerbi-report-1",
              title: "Lecture 1: What is a report?",
              content: "Understanding the concept of reports in Power BI and their role in data visualization."
            },
            {
              id: "powerbi-report-2",
              title: "Lecture 2: Filters; Visual level filter",
              content: "Implementing visual level filters to affect only specific visuals on a report page."
            },
            {
              id: "powerbi-report-3",
              title: "Lecture 3: Filters; Page level filter",
              content: "Applying page level filters to affect all visuals on a specific report page."
            },
            {
              id: "powerbi-report-4",
              title: "Lecture 4: Filters; Report level filter",
              content: "Setting up report level filters to affect all pages within a report."
            },
            {
              id: "powerbi-report-5",
              title: "Lecture 5: Filters; Drill through filter",
              content: "Creating drill through filters to enable detailed analysis of specific data points."
            },
            {
              id: "powerbi-report-6",
              title: "Lecture 6: Include, Exclude Filter",
              content: "Using include and exclude filters to refine data shown in visualizations."
            },
            {
              id: "powerbi-report-7",
              title: "Lecture 7: Formatting a report",
              content: "Techniques for enhancing the visual appeal and usability of reports through formatting options."
            }
          ]
        },
        {
          id: "powerbi-module7",
          title: "Module 7: Power BI Architecture",
          icon: Layers,
          lectures: [
            {
              id: "powerbi-arch-1",
              title: "Lecture 1: Creating an account on PBI service",
              content: "Step-by-step guide to setting up a Power BI service account and understanding the different license types."
            },
            {
              id: "powerbi-arch-2",
              title: "Lecture 2: Introduction to PBI Service",
              content: "Overview of the Power BI Service web platform and its main components."
            },
            {
              id: "powerbi-arch-3",
              title: "Lecture 3: Publishing a report to PBI Service",
              content: "Methods for publishing and sharing reports from Power BI Desktop to the Power BI Service."
            },
            {
              id: "powerbi-arch-4",
              title: "Lecture 4: Creating a dashboard",
              content: "Techniques for building interactive dashboards by pinning visualizations from various reports."
            },
            {
              id: "powerbi-arch-5",
              title: "Lecture 5: Creating a gateway",
              content: "Setting up and configuring data gateways to securely connect Power BI Service to on-premises data sources."
            },
            {
              id: "powerbi-arch-6",
              title: "Lecture 6: Scheduling a refresh",
              content: "Configuring automatic data refresh schedules to keep reports up-to-date."
            },
            {
              id: "powerbi-arch-7",
              title: "Lecture 7: Row level security",
              content: "Implementing row-level security to restrict data access based on user roles and permissions."
            },
            {
              id: "powerbi-arch-8",
              title: "Lecture 8: Introduction",
              content: "Overview of advanced Power BI architecture concepts and enterprise deployment scenarios."
            },
            {
              id: "powerbi-arch-9",
              title: "Lecture 9: M Language Functions",
              content: "Introduction to the M language (Power Query Formula Language) for advanced data transformations."
            }
          ]
        }
      ]
    }
  ]
};

export default dataScientistRoadmap; 