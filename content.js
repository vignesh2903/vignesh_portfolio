/**
 * Portfolio content — edit this file to update the site.
 *
 * How to extend it
 * -----------------
 * 1. Add a job, degree, or project by pushing an object onto the
 *    matching section's `items` array. Highlights has two groups,
 *    "Research Publications" and "Achievements". Add a card to
 *    that group's `items`. A publication with `abstract` and
 *    `href` opens the same popup as an update: the abstract,
 *    plus a link to the paper.
 * 2. Add a skill as { name, icon }. icon is an image URL or a file
 *    path such as "assets/skills/java.png". Leave icon "" for the
 *    placeholder. Any image is cropped to the circle automatically.
 *    Add note: "..." to make the item clickable; the note opens
 *    in a panel below the row.
 * 3. Add a nav link: push { href, text } onto `nav`.
 *    Use isExternal: true for the resume and other outside links.
 * 4. Reorder the page by reordering `sections`.
 * 5. Social links with an empty href stay hidden.
 *    Paste a real LinkedIn or GitHub URL and it appears on its own.
 * 6. On a project, set `image` to a path or URL and it fills the
 *    square the same way a skill icon fills its circle.
 *    Set `github` to that project's repository URL to turn the
 *    GitHub icon into a link.
 * 7. Add a post to the Posts and Updates `items` array. Use a
 *    date like "2026-03-18". Cards sort themselves, oldest on
 *    the left and latest on the right. `lines` are the short
 *    highlights on the card. `body` is the longer note in the
 *    popup. `image` is optional and fills the white frame.
 */
const SITE = {
  profile: {
    name: "Vignesh Sekaran",
    first: "Vignesh",
    last: "Sekaran",
    mark: "VS",
    role: "Software Developer",
    location: "Pune, India",
    email: "svignesh2902@gmail.com",
    phone: "+91 9150449387",
    phoneHref: "tel:+919150449387",
    resume: "assets/Vignesh-Sekaran-CV.pdf",
  },

  nav: [
    { href: "#Updates", text: "Updates" },
    { href: "#Experience", text: "Experience" },
    { href: "#Education", text: "Education" },
    { href: "#Skills", text: "Skills" },
    { href: "#Languages", text: "Languages" },
    { href: "#Projects", text: "Projects" },
    { href: "#Contact", text: "Contact" },
    { href: "assets/Vignesh-Sekaran-CV.pdf", text: "Resume", isExternal: true },
  ],

  hero: {
    badge: "Software Developer",
    lead: [
      { text: "Building cloud-native services at Amdocs with Java, Spring, and Kafka. " },
      { text: "Always up for a hard problem, so reach out.", accent: true },
    ],
    primary: { href: "#Contact", text: "Reach out" },
    secondary: { href: "#Projects", text: "View work" },
  },

  socials: [
    { label: "Email", href: "mailto:svignesh2902@gmail.com" },
    { label: "Phone", href: "tel:+919150449387" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "https://github.com/vignesh2903" },
  ],

  sections: [
    {
      id: "Updates",
      type: "posts",
      kicker: "Section",
      title: "Posts and Updates",
      subtitle: "Oldest on the left, latest on the right",
      items: [
        {
          date: "2025-11-01",
          title: "Moonshot Avishkar 2025",
          image: "",
          lines: [
            "1st place",
            "Carbon-Aware Network Optimizer",
            "Functional POCs and an MVP",
            "Energy-aware telecom networks",
          ],
          body: "Secured 1st place at Amdocs Moonshot Avishkar 2025 for a Carbon-Aware Network Optimizer. The work delivered functional proofs of concept and an MVP that showed sustainable, energy-aware telecom network optimization.",
        },
        {
          date: "2022-08-01",
          title: "Lakehead research paper",
          image: "",
          lines: [
            "Mitacs research intern",
            "EEG authentication proof of concept",
            "Dataset built from 11 participants",
            "Paper published from the work",
          ],
          body: "During a Mitacs research internship at Lakehead University, I built a proof of concept that uses EEG brain signals for authentication. The dataset was collected and preprocessed from 11 participants, and the findings were published.",
        },
        {
          date: "2024-06-01",
          title: "Amdocs GenAI hackathon",
          image: "",
          lines: [
            "3rd place, global hackathon",
            "Lightweight log analyzer",
            "Elasticsearch plus Azure OpenAI",
            "Podium finish",
          ],
          body: "Placed 3rd in a global Amdocs GenAI hackathon by designing a lightweight log analyzer that connects Elasticsearch with Azure OpenAI APIs.",
        },
        {
          date: "2023-08-01",
          title: "Joined Amdocs",
          image: "",
          lines: [
            "Software developer, Pune",
            "Spring Boot and Kafka services",
            "Cassandra and Elasticsearch",
            "Deployed on AWS EKS",
          ],
          body: "Started as a software developer at Amdocs in Pune, building scalable cloud-native microservices with Spring Boot, Kafka, Cassandra, and Elasticsearch on AWS EKS.",
        },
      ],
    },
    {
      id: "Experience",
      type: "entries",
      kicker: "Section",
      title: "Experience",
      subtitle: "Where I've been building",
      linkLabel: "View company",
      items: [
        {
          mark: "AD",
          image: "assets/logos/amdocs.gif",
          title: "Software Developer, Amdocs",
          href: "https://www.amdocs.com/",
          meta: "Aug 2023 — Present",
          place: "Pune, India",
          summary:
            "Developed scalable, cloud-native microservices using Spring Boot and Kafka, with Cassandra and Elasticsearch, deployed on AWS EKS.",
          points: [
            "Designed and built RESTful APIs integrating multiple databases to support business-critical workflows.",
            "Contributed to effort estimation, system design, and POCs to deliver high-quality, optimal solutions.",
            "Worked on blue-green deployments and fixing CVE vulnerabilities across microservices.",
            "Applied design patterns, with a strong understanding of CI/CD pipelines and TDD/LLD.",
            "Collaborated with cross-functional teams and delivered end-to-end technical demos to architects and product teams.",
            "Participated in in-house hackathons, securing podium finishes with scalable solutions.",
          ],
        },
        {
          mark: "LU",
          image: "assets/logos/lakehead.jpg",
          title: "Research Intern, Lakehead University",
          href: "https://www.lakeheadu.ca/",
          meta: "May 2022 — Aug 2022",
          place: "Thunder Bay, Canada",
          summary:
            "Built a proof of concept that uses EEG brain signals as an authentication method, then published the findings.",
          points: [
            "Participated in a Mitacs research program, contributing to research-driven innovation.",
            "Collected and preprocessed EEG data from 11 participants, creating the dataset from scratch.",
            "Applied machine learning and deep learning models to classify subjects and test the approach.",
          ],
        },
      ],
    },
    {
      id: "Education",
      type: "entries",
      kicker: "Section",
      title: "Education",
      subtitle: "Where I studied",
      linkLabel: "View school",
      items: [
        {
          mark: "VIT",
          image: "assets/logos/vit.jpg",
          title: "B.Tech, Electronics and Communication Engineering",
          href: "https://chennai.vit.ac.in/",
          meta: "Jun 2019 — Aug 2023",
          place: "Vellore Institute of Technology, Chennai",
          summary: "CGPA 8.76.",
        },
        {
          mark: "MVM",
          image: "assets/logos/mvm.png",
          title: "12th Standard, CBSE — Computer Science",
          href: "",
          meta: "Jul 2017 — May 2019",
          place: "Maharishi Vidya Mandir Senior Secondary School, Chennai",
          summary: "Percentage 83.5%.",
        },
      ],
    },
    {
      id: "Skills",
      type: "skills",
      kicker: "Section",
      title: "Skills",
      subtitle: "Tools I reach for",
      groups: [
        {
          label: "Backend, APIs & Streaming",
          items: [
            { name: "Java", icon: "assets/logos/skills/java.png" },
            { name: "Spring Boot", icon: "assets/logos/skills/spring.png" },
            { name: "REST APIs", icon: "assets/logos/skills/rest.png" },
            { name: "Kafka", icon: "assets/logos/skills/kafka_1.png" },
          ],
        },
        {
          label: "Databases & Search",
          items: [
            { name: "SQL", icon: "assets/logos/skills/sql.png" },
            { name: "Cassandra", icon: "assets/logos/skills/cassandra.png" },
            { name: "Elasticsearch", icon: "assets/logos/skills/es.svg" },
          ],
        },
        {
          label: "Tools",
          items: [
            { name: "Docker", icon: "assets/logos/skills/docker-icon.webp" },
            { name: "Kubernetes", icon: "assets/logos/skills/kubectl.webp" },
            { name: "Maven", icon: "assets/logos/skills/maven.webp" },
            { name: "JUnit", icon: "assets/logos/skills/junit.svg" },
          ],
        },
        {
          label: "AI / Data Science",
          items: [
            { name: "Python", icon: "assets/logos/skills/py.webp" },
            { name: "Machine Learning", icon: "assets/logos/skills/ML.png" },
            { name: "CNN", icon: "assets/logos/skills/CNN.png" },
            { name: "GenAI", icon: "assets/logos/skills/genai.webp" },
            { name: "LLMs", icon: "assets/logos/skills/LLM.png" },
          ],
        },
      ],
    },
    {
      id: "Languages",
      type: "skills",
      kicker: "Section",
      title: "Languages",
      subtitle: "Languages I speak",
      groups: [
        {
          label: "Spoken",
          items: [
            { name: "English", icon: "", note: "Professional working proficiency. An advanced C1-level with IELTS score of 7.5 overall" },
            { name: "Tamil", icon: "", note: "Native fluency. Fluent in Tamil, can read, write, and speak fluently." },
            { name: "Telugu", icon: "", note: "Native fluency. My native language." },
            { name: "Hindi", icon: "", note: "Conversational. Basic level of proficiency." },
          ],
        },
      ],
    },
    {
      id: "Projects",
      type: "projects",
      kicker: "Section",
      title: "Projects",
      subtitle: "Things I've built",
      items: [
        {
          mark: "EEG",
          title: "EEG Authentication for Cyber-Physical Systems",
          description:
            "Brain signals as a future authentication tool. Built a benchmark deep learning model so later EEG researchers can implement applications with less setup. Guided by Dr. Garima Bajwa at Lakehead University.",
          tags: ["Deep Learning", "EEG", "Cybersecurity"],
          href: "",
          image: "assets/logos/eeg.jpg",
          github: "",
        },
        {
          mark: "UN",
          title: "Biomedical Image Segmentation with UNet",
          description:
            "UNet convolutional network for detecting disease and anomalies in biomedical images, including brain MRI scans and glaucoma.",
          tags: ["UNet", "CNN", "Medical Imaging"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "ECG",
          title: "ECG Classification with CNN Architectures",
          description:
            "Transformed 1D ECG signals into scalograms with a continuous wavelet transform, then compared ResNet, AlexNet, Inception V3, and GoogleNet.",
          tags: ["CNN", "CWT", "Signal Processing"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "MS",
          title: "Math Solver App",
          description:
            "Web app that solves math problems. Computer vision reads the characters in an equation and a convnet classifies them.",
          tags: ["Computer Vision", "Deep Learning"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "OTT",
          title: "Movies & TV Shows Analysis",
          description:
            "Exploratory analysis of IMDB, Netflix, and other OTT datasets using RStudio, Excel, and Tableau.",
          tags: ["R", "Tableau", "Excel"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "IoT",
          title: "Healthcare Reminder Device",
          description:
            "Emergency medicine reminder built with Arduino and NodeMCU for hospitals and clinical homes, prompting fluids and other essentials a patient needs.",
          tags: ["Arduino", "NodeMCU", "IoT"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "SP",
          title: "Path Planning Comparison",
          description:
            "Compared traditional and modern shortest-path algorithms, including maze solving, and measured how they differ in efficiency.",
          tags: ["Algorithms", "Path Planning"],
          href: "",
          image: "",
          github: "",
        },
        {
          mark: "MN",
          title: "Music Note Recognition",
          description:
            "Signal-processing pipeline on a 1D sound recording that detects music notes and displays what the instrument played, built in MATLAB.",
          tags: ["MATLAB", "Signal Processing"],
          href: "",
          image: "",
          github: "",
        },
      ],
    },
    {
      id: "Highlights",
      type: "highlights",
      kicker: "Section",
      title: "Highlights",
      subtitle: "A few that stood out",
      groups: [
        {
          label: "Research Publications",
          items: [
            {
              kicker: "2024",
              title: "A hybrid model for the classification of Autism Spectrum Disorder using Mu rhythm in EEG",
              href: "https://journals.sagepub.com/doi/10.3233/THC-240644",
              abstract: "BACKGROUND: Autism Spectrum Disorder (ASD) is a condition with social interaction, communication, and behavioral difficulties. Diagnostic methods mostly rely on subjective evaluations and can lack objectivity. In this research Machine learning (ML) and deep learning (DL) techniques are used to enhance ASD classification.\n\nOBJECTIVE: This study focuses on improving ASD and TD classification accuracy with a minimal number of EEG channels. ML and DL models are used with EEG data, including Mu Rhythm from the Sensory Motor Cortex (SMC) for classification.\n\nMETHODS: Non-linear features in time and frequency domains are extracted and ML models are applied for classification. The EEG 1D data is transformed into images using Independent Component Analysis-Second Order Blind Identification (ICA-SOBI), Spectrogram, and Continuous Wavelet Transform (CWT).\n\nRESULTS: Stacking Classifier employed with non-linear features yields precision, recall, F1-score, and accuracy rates of 78%, 79%, 78%, and 78% respectively. Including entropy and fuzzy entropy features further improves accuracy to 81.4%. In addition, DL models, employing SOBI, CWT, and spectrogram plots, achieve precision, recall, F1-score, and accuracy of 75%, 75%, 74%, and 75% respectively. The hybrid model, which combined deep learning features from spectrogram and CWT with machine learning, exhibits prominent improvement, attained precision, recall, F1-score, and accuracy of 94%, 94%, 94%, and 94% respectively. Incorporating entropy and fuzzy entropy features further improved the accuracy to 96.9%.\n\nCONCLUSIONS: This study underscores the potential of ML and DL techniques in improving the classification of ASD and TD individuals, particularly when utilizing a minimal set of EEG channels.",
            },
            {
              kicker: "2022",
              title: "Reproducibility in Brain-Computer Interface Research: A Replication-Based Analysis",
              href: "https://ieeexplore.ieee.org/abstract/document/9973649",
              abstract: "In this paper, we have discussed the reproducibility workflow of published Brain-Computer Interface research articles and remarked on the same by replicating two papers having multiple similarities, starting from the same dataset to the classification stages. We followed a step-by-step approach while replicating the work and documenting the assumptions and interpretations made during the process. Finally, we compared the results and discussed how the documentation in BCI research has evolved over 20 years. Through trial and error implementations and calculated deductions, this paper helps determine the importance and relevance of proper documentation, efficient workflows, and the pressing need for direction-specific information flow in the growing field of Brain Computing Interface applications.",
            },
          ],
        },
        {
          label: "Achievements",
          items: [
            {
              kicker: "1st place",
              title: "Moonshot Avishkar 2025",
              body: "Carbon-Aware Network Optimizer (CANO): functional POCs and an MVP for sustainable, energy-aware telecom network optimization.",
            },
            {
              kicker: "3rd place",
              title: "Amdocs GenAI Hackathon 2024",
              body: "A lightweight log analyzer integrating Elasticsearch with Azure OpenAI APIs, in a global Amdocs hackathon.",
            },
          ],
        },
      ],
    },
    {
      id: "Contact",
      type: "contact",
      kicker: "Section",
      title: "Contact",
      subtitle: "Let's talk",
    },
  ],
};
