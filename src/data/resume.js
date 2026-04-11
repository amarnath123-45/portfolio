export const resumeData = {
  personalInfo: {
    name: "Amarnath S",
    title: "Python Full Stack Developer",
    phone: "+918136897982",
    email: "amar7102k3@gmail.com",
    linkedin: "https://www.linkedin.com/in/amarnath-s-858a5934a/", // Updated securely to your new profile url
    summary: "Diligent and detail-focused Python Full Stack Developer with hands-on experience in building responsive web applications using Python, Django, React, HTML, CSS, and JavaScript. Skilled in database management with MySQL and SQL. Highly motivated to contribute to dynamic development teams and grow professionally."
  },
  experience: [
    {
      role: "Software Developer Intern",
      company: "TechFifo Innovations",
      location: "Palakkad, Kerala, India", // Fixed 'Keraka' typo from image
      period: "Present",
      description: [
        "Worked on full-stack web development using React & Django, including GST billing software with invoicing and tax computation.",
        "Developed a charity website and contributed to backend development of a water supply ordering system with REST APIs."
      ]
    },
    {
      role: "Python Full Stack Intern",
      company: "Techolas Technologies",
      location: "", // Implicitly the same or remote, leave blank if not specified
      period: "Past", // Not specified explicitly for intern, could be prior to Present
      description: [
        "Assisted in developing full-stack web applications using Python, HTML, CSS, Bootstrap, React, JavaScript, and SQL, contributing to core features and bug fixes.",
        "Participated in code reviews, testing, and debugging to improve application performance while learning industry best practices and Agile development processes."
      ]
    }
  ],
  projects: [
    {
      title: "GST Billing Software",
      organization: "Techfifo Innovations",
      description: [
        "Full-stack billing application with React frontend and Django backend for GST-compliant invoice generation.",
        "Engineered a comprehensive GST-compliant billing system processing 4 invoice types (GST/Non-GST invoices and proformas) with automated tax calculation and invoice numbering.",
        "Designed and developed RESTful APIs with pagination, filtering, and search capabilities handling 100+ concurrent requests with optimized database queries."
      ]
    },
    {
      title: "AVAS Foundation Charity Website",
      organization: "Techfifo Innovations",
      description: [
        "Responsive charity website built with React and Django, featuring campaign listings, donation flows, and content management for a non-profit organization.",
        "Developed a scalable backend using Django Rest Framework for managing online and offline donations.",
        "Integrated Razorpay for secure online donations, implemented payment verification using order_id and payment_id, and developed automated receipt generation for successful transactions."
      ]
    },
    {
      title: "AXA Water Supplying and Ordering Software",
      organization: "Techfifo Innovations",
      description: [
        "Backend developer on the customer application - designed and implemented REST APIs for order placement, real-time order tracking, and delivery scheduling using Django.",
        "Designed and implemented real-time order tracking using WebSockets (Django Channels + Redis) to stream live driver location updates to customers.",
        "Built optimized APIs for products, orders, payments, and user management, ensuring performance and scalability."
      ]
    },
    {
      title: "Moodify - Music Recommending Web Application",
      organization: "Thunchath Ezhuthachan College",
      description: [
        "Web-based chatbot that recommends songs based on the user's emotional state by analysing text input and detecting mood patterns."
      ]
    },
    {
      title: "Marvel Timeline",
      organization: "Techolas Technologies",
      description: [
        "Frontend project displaying Marvel movies in chronological order, built with HTML, CSS, and Bootstrap during internship at Techolas Technologies."
      ]
    }
  ],
  education: [
    {
      degree: "BSc in Computer Science",
      institution: "Thunchath Ezhuthachan College",
      grade: "CGPA: 64.50%",
      period: "Sep '22 — Mar '25"
    },
    {
      degree: "Higher Secondary in Biology Science",
      institution: "BSSHSS Kollengode",
      grade: "GPA: 94.4%",
      period: "Jun '20 — Apr '22"
    },
    {
      degree: "High School",
      institution: "BSS HSS",
      grade: "GPA: 99.9%",
      period: "Jun '17 — Apr '20"
    }
  ],
  skills: {
    frontend: ["HTML", "CSS", "Bootstrap", "JavaScript", "React"],
    backend: ["Python", "Django"],
    database: ["MySQL", "SQL", "PostgreSQL"],
    tools: ["Git", "REST APIs", "Code Review & Debugging"],
    softSkills: ["Adaptability", "Teamwork", "Problem Solving", "Quick Learning", "Communication", "Leadership"],
    languages: ["English", "Malayalam", "Tamil (Spoken)"]
  }
};
