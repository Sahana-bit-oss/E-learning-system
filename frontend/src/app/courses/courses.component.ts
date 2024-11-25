import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  selectedCourse: any = null;
  searchQuery: string = '';
  selectedCategory: string = '';
  filteredCourses: any[] = [];
 
courses = [
    {
      id:1,
      title: 'Full Stack Development',
      image: 'image/full-stack-development.gif',
      level: 'Advanced',
      duration: 'Approx. 3 months',
      category: 'Technology & Programming',
      ratings:'4.5',
      description: 'Master front-end and back-end skills to build full web applications.',
      topics: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Database Management'],
      content:[
        {title: 'What is HTML?', time: '30 minutes'},
        {title: 'How HTML works?', time: '1 hour'},
        {title: 'Basic Tags in HTML', time: '1 hour'},
        {title: 'Creating a Web Page', time: '2 hours'},
        {title: 'What is CSS?', time: '30 minutes'},
        {title: 'CSS Selectors', time: '1 hour'},
        {title: 'Styling a Web Page', time: '1.5 hours'}
      ]
    },
  
  {
      id:2,
      title: 'Cybersecurity Basics',
      image: 'image/cybersecurity.jpg',
      level: 'Basics',
      duration: 'Approx. 24 hours',
      ratings:'4.0',
      category: 'Technology & Programming',
      description: 'Understand key cybersecurity concepts to safeguard systems and data from threats.',
      topics: ['Threat Analysis', 'Encryption', 'Network Security', 'Ethical Hacking'],
      content:[
        {title: 'What is Cybersecurity?', time: '30 minutes'},
        {title: 'Understanding Threats and Vulnerabilities', time: '1.5 hours'},
        {title: 'Basics of Network Security', time: '1 hour'},
        {title: 'Tools for Network Security', time: '2 hours'}
      ]
    },
    {
      id: 3,
      title: "Datascience with Python",
      image: "image/datascience.jpg",
      level: "Intermediate",
      duration: "Approx. 1 month to complete",
      ratings:'4.2',
      category: 'Technology & Programming',
      description: "Learn to analyze and visualize data using Python for insightful decision-making.",
      topics: [
        "Python Programming Basics",
        "Data Analysis Libraries (Pandas, NumPy)",
        "Data Visualization (Matplotlib, Seaborn)",
        "Machine Learning Basics",
        "Project: Data Analysis Case Study"
      ],
      content:[
        {title: 'What is Python?', time: '30 minutes'},
        {title: 'Data Types in Python', time: '1 hour'},
        {title: 'Writing Your First Python Script', time: '2 hours'},
        {title: 'Understanding Pandas', time: '1 hour'},
        {title: 'Data Cleaning Basics', time: '1.5 hours'}
      ]
    },
    {
      id: 4,
      title: "Fundamentals of Physics",
      image: "image/physics.jpeg",
      level: "Basics",
      duration: "Approx. 1.5 months to complete",
      ratings:'4.4',
      category:'Science and Engineering',
      description: "Learn core principles of motion, forces, and energy.",
      topics: [
        "Kinematics",
        "Newton's Laws of Motion",
        "Work, Energy, and Power",
        "Thermodynamics Basics",
        "Oscillations and Waves"
      ]
    },
    {
      id: 5,
      title: "Distributed Computing",
      image: "image/distributedcomputing.jpeg",
      level: "Basics",
      duration: "Approx. 1.5 months to complete",
      ratings:'3.9',
      category:'Science and Engineering',
      description: "Study data sharing and parallel processing across systems.",
      topics: [
        "Introduction to Distributed Systems",
        "Parallel Processing Concepts",
        "Fault Tolerance",
        "Consensus Algorithms",
        "Case Study: Hadoop and MapReduce"
      ]
    },
    {
      id: 6,
      title: "Compiler Design",
      image: "image/cd.jpeg",
      level: "Basics",
      duration: "Approx. 1.5 months to complete",
      ratings:'3.5',
      category:'Science and Engineering',
      description: "Discover how code is translated into machine language for execution.",
      topics: [
        "Lexical Analysis",
        "Syntax Analysis",
        "Semantic Analysis",
        "Code Optimization",
        "Code Generation"
      ]
    },
    {
      id: 7,
      title: "Effective Public Speaking",
      image: "image/publicspeaking.jpeg",
      level: "Intermediate",
      duration: "Approx. 3 hours to complete",
      ratings:'4.1',
      category:'Language and Communication',
      description: "Gain confidence to deliver impactful presentations.",
      topics: [
        "Public Speaking Basics",
        "Overcoming Stage Fright",
        "Speech Structuring",
        "Engaging Your Audience",
        "Practical Speech Exercises"
      ]
    },
    {
      id: 8,
      title: "Creative Writing Essentials",
      image: "image/writingcourse.jpeg",
      level: "Basics",
      duration: "Approx. 5 hours to complete",
      ratings:'3.9',
      category:'Language and Communication',
      description: "Develop skills and techniques to craft compelling stories.",
      topics: [
        "Elements of Storytelling",
        "Writing Techniques",
        "Editing and Proofreading",
        "Building Characters",
        "Creative Writing Practice"
      ]
    },
    {
      id: 9,
      title: "Business Communication",
      image: "image/businesscoursse.png",
      level: "Intermediate",
      duration: "Approx. 2 hours to complete",
      ratings:'4.4',
      category:'Language and Communication',
      description: "Enhance English skills for clear, professional interactions.",
      topics: [
        "Effective Email Writing",
        "Professional Presentation Skills",
        "Negotiation Techniques",
        "Cross-Cultural Communication",
        "Practical Communication Scenarios"
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filteredCourses = this.courses;
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.selectedCourse = this.courses.find((course) => course.id === +params['id']);
      }
    });
  }

  viewDetails(course: any): void {
    this.selectedCourse = course;
  }

  goBack(): void {
    this.selectedCourse = null;
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesQuery = course.title
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || course.category === this.selectedCategory;
      return matchesQuery && matchesCategory;
    });
}
}






