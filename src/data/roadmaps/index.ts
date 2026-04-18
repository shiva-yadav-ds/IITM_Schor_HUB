import { dataScientistRoadmap } from './data-scientist';
import { dsaPythonRoadmap } from './dsa-python';
import { dsaJavaRoadmap } from './dsa-java';
import { fullstackRoadmap } from './fullstack';

export const roadmaps = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Learn Python, Statistics, Machine Learning, Deep Learning, and more to become a professional Data Scientist.',
    image: '/images/roadmaps/data-science.jpg',
    roadmap: dataScientistRoadmap
  },
  {
    id: 'dsa-python',
    title: 'DSA in Python',
    description: 'Master Data Structures and Algorithms using Python to excel in coding interviews and practical applications.',
    image: '/images/roadmaps/dsa-python.jpg',
    roadmap: dsaPythonRoadmap
  },
  {
    id: 'dsa-java',
    title: 'DSA in Java',
    description: 'Learn Data Structures and Algorithms in Java for better programming skills and interview preparation.',
    image: '/images/roadmaps/dsa-java.jpg',
    roadmap: dsaJavaRoadmap
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become a complete Full Stack Developer by mastering both frontend and backend technologies.',
    image: '/images/roadmaps/fullstack.jpg',
    roadmap: fullstackRoadmap
  }
];

export type RoadmapId = 'data-scientist' | 'dsa-python' | 'dsa-java' | 'fullstack';

export function getRoadmapById(id: RoadmapId) {
  return roadmaps.find(roadmap => roadmap.id === id)?.roadmap;
}

export default roadmaps; 