import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export const colleges = [
  {
    id: 'iit-madras',
    name: 'IIT Madras',
    programs: [
      {
        id: 'bs-data-science',
        name: 'BS in Data Science',
        levels: [
          {
            id: 'foundation',
            name: 'Foundation',
            subjects: [
              'Mathematics for Data Science I',
              'Mathematics for Data Science II',
              'Statistics for Data Science I',
              'Statistics for Data Science II',
              'Computational Thinking',
              'Programming in Python',
              'English I',
              'English II'
            ]
          },
          {
            id: 'diploma-programming',
            name: 'Diploma - Programming',
            subjects: [
              'Database Management Systems',
              'Programming, Data Structures & Algorithms using Python',
              'Modern Application Development I',
              'Modern Application Development I - Project',
              'Modern Application Development II',
              'Modern Application Development II - Project',
              'Programming Concepts Using Java',
              'System Commands'
            ]
          },
          {
            id: 'diploma-data-science',
            name: 'Diploma - Data Science',
            subjects: [
              'Machine Learning Foundations',
              'Machine Learning Techniques',
              'Machine Learning Practice',
              'Machine Learning Practice - Project',
              'Business Data Management',
              'Business Data Management - Project',
              'Business Analytics',
              'Tools in Data Science'
            ]
          },
          {
            id: 'bsc-degree',
            name: 'BSc Degree',
            subjects: [
              'Operating Systems & Computer Architecture',
              'Software Testing & Software Engineering',
              'AI: Search Methods for Problem Solving & Deep Learning',
              'Design Thinking'
            ]
          },
          {
            id: 'bs-degree',
            name: 'BS Degree',
            subjects: [
              'Speech Technology',
              'Deep Learning in Practice',
              'Thematic Ideas in Data Science',
              'Special Topics in Machine Learning',
              'Computer Vision',
              'Reinforcement Learning',
              'Large Language Models',
              'Algorithmic Thinking in Bioinformatics',
              'Big Data and Biological Networks',
              'Data Visualization Design',
              'Industry 4.0',
              'Sequential Decision Making',
              'Market Research',
              'Privacy & Security in Online Social Media',
              'Introduction to Big Data',
              'Financial Forensics',
              'Linear Statistical Models',
              'Advanced Algorithms',
              'Statistical Computing',
              'Computer Systems Design',
              'Programming in C',
              'Mathematical Thinking',
              'Introduction to Natural Language Processing',
              'Deep Learning for Computer Vision',
              'Managerial Economics',
              'Game Theory and Strategy',
              'Corporate Finance',
              'Operating System'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    programs: [
      {
        id: 'btech-cse',
        name: 'B.Tech Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Mathematics I', 'Mathematics II', 'Physics I', 'Physics II', 'Programming in C', 'Data Structures']
          },
          {
            id: 'second-year',
            name: 'Second Year',
            subjects: ['Digital Logic', 'Computer Organization', 'Operating Systems', 'Database Systems']
          }
        ]
      }
    ]
  },
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    programs: [
      {
        id: 'btech-cse',
        name: 'B.Tech Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Mathematics', 'Physics', 'Programming Fundamentals', 'Digital Logic']
          }
        ]
      }
    ]
  },
  {
    id: 'nit-trichy',
    name: 'NIT Trichy',
    programs: [
      {
        id: 'btech-cse',
        name: 'B.Tech Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Engineering Mathematics', 'Physics', 'Programming in C', 'Digital Electronics']
          }
        ]
      }
    ]
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    programs: [
      {
        id: 'be-cse',
        name: 'BE Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Mathematics', 'Physics', 'Computer Programming', 'Digital Design']
          }
        ]
      }
    ]
  },
  {
    id: 'anna-univ',
    name: 'Anna University',
    programs: [
      {
        id: 'be-cse',
        name: 'BE Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Engineering Mathematics', 'Physics', 'Programming in C', 'Basic Electronics']
          }
        ]
      }
    ]
  },
  {
    id: 'vit-vellore',
    name: 'VIT Vellore',
    programs: [
      {
        id: 'btech-cse',
        name: 'B.Tech Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Mathematics', 'Physics', 'Programming Fundamentals', 'Digital Systems']
          }
        ]
      }
    ]
  },
  {
    id: 'srm-university',
    name: 'SRM University',
    programs: [
      {
        id: 'btech-cse',
        name: 'B.Tech Computer Science',
        levels: [
          {
            id: 'first-year',
            name: 'First Year',
            subjects: ['Mathematics', 'Physics', 'Computer Programming', 'Electronics']
          }
        ]
      }
    ]
  }
];

export const seedColleges = async () => {
  try {
    console.log('🌱 Starting college data seeding...');
    
    console.log('📝 Force seeding colleges data (ignoring existing data)...');
    
    // Force update all colleges with the new program structure
    const promises = colleges.map(async (college, index) => {
      console.log(`📝 Seeding college ${index + 1}/${colleges.length}:`, college.name, 'with', college.programs.length, 'programs');
      try {
        await setDoc(doc(db, 'colleges', college.id), {
          name: college.name,
          programs: college.programs,
          createdAt: new Date(),
          lastUpdated: new Date(),
        }, { merge: false }); // Use merge: false to completely overwrite
        console.log(`✅ Successfully seeded: ${college.name}`);
        return true;
      } catch (error) {
        console.error(`❌ Error seeding ${college.name}:`, error);
        throw error;
      }
    });
    
    await Promise.all(promises);
    console.log('✅ All colleges seeded successfully!');
    
    // Verify the data was written correctly
    const verifySnapshot = await getDocs(collection(db, 'colleges'));
    console.log('✅ Verification: Found', verifySnapshot.docs.length, 'colleges after seeding');
    
    if (verifySnapshot.docs.length > 0) {
      const sampleCollege = verifySnapshot.docs[0].data();
      console.log('🔍 Sample college structure:', {
        id: verifySnapshot.docs[0].id,
        name: sampleCollege.name,
        programCount: sampleCollege.programs?.length || 0,
        firstProgram: sampleCollege.programs?.[0] || null
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error seeding colleges:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return false;
  }
};