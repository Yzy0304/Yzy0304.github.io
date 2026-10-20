// Single source of truth for every factual claim on the site.
// Each entry must be traceable to the résumé (Yao_Zhenyu_Research_Internship_CV.docx /
// 姚振宇简历.docx). Do not add numbers, results, or experience that are not there.

export type Lang = 'en' | 'zh';

export const links = {
  github: 'https://github.com/Yzy0304',
  email: 'felix.zhenyuyao@gmail.com',
  schoolEmail: 'u202414235@hust.edu.cn',
};

type Entry = {
  title: string;
  org?: string;
  period: string;
  tags?: string[];
  bullets: string[];
  note?: string;
  highlight?: string;
  link?: { label: string; href: string };
};

export const sectionKeys = ['academics', 'research', 'projects', 'internships', 'resume', 'life'] as const;
export type SectionKey = (typeof sectionKeys)[number];

type Course = { name: string; grade: string; score?: number };

type Profile = {
  name: string;
  altName: string;
  role: string;
  headline: string;
  affiliation: string;
  focus: string;
  summary: string;
  interests: string[];
  hero: { eyebrow: string; tagline: [string, string]; sub: string };
  nav: Record<SectionKey | 'home' | 'blog', string> & { switchLang: string };
  // Card + page copy for each section. `lead` is the page subtitle, `card` the home-card blurb.
  pages: Record<SectionKey, { title: string; eyebrow: string; lead: string; card: string }>;
  sections: {
    summary: string;
    interests: string;
    research: string;
    projects: string;
    education: string;
    coursework: string;
    skills: string;
    recent: string;
    contact: string;
  };
  research: Entry[];
  projects: Entry[];
  education: Entry[];
  courses: { school: string; groups: { label: string; items: Course[] }[] }[];
  // Empty until there is an internship on the résumé; the page then shows the "open to" state.
  internships: Entry[];
  seeking: { label: string; value: string }[];
  // Life moments. Keep to things that actually happened; add photos under public/images/life/.
  life: { title: string; place: string; period: string; text: string; image?: string }[];
  skills: { label: string; items: string }[];
  contactNote: string;
};

export const profile: Record<Lang, Profile> = {
  en: {
    name: 'Zhenyu Yao',
    altName: '姚振宇',
    role: 'AI undergraduate at Huazhong University of Science and Technology',
    headline: 'AI Undergraduate',
    affiliation: 'Huazhong University of Science and Technology',
    focus: 'Computer Vision · Vision-Language Models · Anomaly Detection',
    summary:
      'Artificial Intelligence undergraduate ranked in the top 20% of the program (weighted average 87.1/100). I am researching CLIP-based zero- and few-shot anomaly detection for aero-engine blades, and I am looking for research or algorithm internships in CV, VLMs, and anomaly detection.',
    interests: ['Computer Vision', 'Vision-Language Models', 'Industrial Anomaly Detection', 'Reinforcement Learning'],
    hero: {
      eyebrow: 'Zhenyu Yao · 姚振宇',
      tagline: ['Teaching machines', 'to spot anomalies.'],
      sub: 'AI undergraduate at Huazhong University of Science and Technology, working on vision-language models for industrial anomaly detection.',
    },
    nav: {
      home: 'Home',
      academics: 'Academics',
      research: 'Research',
      projects: 'Projects',
      internships: 'Internships',
      resume: 'Résumé',
      life: 'Life',
      blog: 'Blog',
      switchLang: '中文',
    },
    pages: {
      academics: {
        title: 'Academics',
        eyebrow: 'HUST · UC Berkeley',
        lead: 'B.Eng. in Artificial Intelligence at HUST, with a summer of coursework at UC Berkeley.',
        card: 'Top 20% of the AI program, with a weighted average of 87.1.',
      },
      research: {
        title: 'Research',
        eyebrow: 'Anomaly detection',
        lead: 'CLIP-based zero- and few-shot anomaly detection for aero-engine blades.',
        card: 'Training-free test-time augmentation for zero-shot AnomalyCLIP on AeBAD-S.',
      },
      projects: {
        title: 'Projects',
        eyebrow: 'Build & learn',
        lead: 'From search and game trees to reinforcement learning and neural networks.',
        card: 'UC Berkeley CS188 Pacman AI: search, games, RL, inference, and ML.',
      },
      internships: {
        title: 'Internships',
        eyebrow: 'Experience',
        lead: 'Looking for research or algorithm internships in CV, VLMs, and anomaly detection.',
        card: 'Open to research and algorithm internships.',
      },
      resume: {
        title: 'Résumé',
        eyebrow: 'One page',
        lead: 'Everything in one place. Print it or save it as a PDF.',
        card: 'Education, research, projects, and skills on one page.',
      },
      life: {
        title: 'Life',
        eyebrow: 'Beyond the lab',
        lead: 'Places, moments, and notes from everyday life.',
        card: 'From Wuhan to Berkeley, and the notes in between.',
      },
    },
    sections: {
      summary: 'Professional Summary',
      interests: 'Interests',
      coursework: 'Coursework',
      research: 'Research',
      projects: 'Projects',
      education: 'Education',
      skills: 'Skills',
      recent: 'Recent posts',
      contact: 'Contact',
    },
    research: [
      {
        title: 'AeBAD-S Aero-engine Blade Anomaly Detection',
        org: 'Ongoing research project',
        period: '2026 – Present',
        tags: ['CLIP', 'Zero-/few-shot', 'Pixel-level AD', 'PyTorch'],
        bullets: [
          'Built and iterated CLIP-based zero-shot and few-shot baselines for image-level and pixel-level anomaly detection on aero-engine blade imagery.',
          'Designed controlled studies of prompt design, memory banks, and geometric test-time augmentation, keeping configurations, metrics, and provenance for reproducibility.',
          'Starting from zero-shot AnomalyCLIP in its official configuration, training-free geometric test-time augmentation (flips, rotations, rescaling) raised pixel AUROC on the 1,639 AeBAD-S test images from 0.902 to 0.924.',
        ],
        note: 'The 0.902 → 0.924 figure is a preliminary result from a single setting. Code is not public.',
      },
    ],
    projects: [
      {
        title: 'UC Berkeley CS188 Pacman AI Projects',
        org: 'Course project · COMPSCI 188',
        period: 'Jun – Aug 2026',
        tags: ['Search', 'Game trees', 'RL', 'Probabilistic inference', 'ML'],
        bullets: [
          'Search and multi-agent decision making: DFS, BFS, UCS, A*, Minimax, Alpha-Beta Pruning, Expectimax.',
          'Reinforcement learning and inference: Value Iteration, Q-learning, Approximate Q-learning, Bayesian-network inference, variable elimination, particle filtering.',
          'Machine learning: Perceptron, nonlinear regression, MNIST digit classification, recurrent language identification.',
        ],
        note: 'Course code is not public.',
      },
    ],
    education: [
      {
        title: 'Huazhong University of Science and Technology',
        org: 'B.Eng. in Artificial Intelligence',
        period: 'Sep 2024 – Present',
        highlight: 'Top 20% · Weighted avg. 87.1/100',
        bullets: [
          'Mathematics: Control Theory (98), Calculus I (97), Discrete Mathematics (95), Linear Algebra (92), Probability & Statistics (87).',
          'Computing: Computer Organization & Embedded Systems (93), Signal Analysis (92), Object-Oriented Programming (92), Data Science Foundations (89), Introduction to AI (88), Data Structures & Algorithm Analysis (87).',
        ],
      },
      {
        title: 'UC Berkeley Summer Sessions',
        org: 'Summer C · International Visitor Undergraduate Program',
        period: 'Jun 22 – Aug 14, 2026',
        highlight: 'GPA 3.85/4.00',
        bullets: [
          'COMPSCI 188 Artificial Intelligence (A), DATA C8 Foundations of Data Science (A−).',
        ],
      },
    ],
    courses: [
      {
        school: 'Huazhong University of Science and Technology',
        groups: [
          {
            label: 'Mathematics',
            items: [
              { name: 'Control Theory', grade: '98', score: 98 },
              { name: 'Calculus I', grade: '97', score: 97 },
              { name: 'Discrete Mathematics', grade: '95', score: 95 },
              { name: 'Linear Algebra', grade: '92', score: 92 },
              { name: 'Probability & Statistics', grade: '87', score: 87 },
            ],
          },
          {
            label: 'Computing & AI',
            items: [
              { name: 'Computer Organization & Embedded Systems', grade: '93', score: 93 },
              { name: 'Signal Analysis', grade: '92', score: 92 },
              { name: 'Object-Oriented Programming', grade: '92', score: 92 },
              { name: 'Data Science Foundations', grade: '89', score: 89 },
              { name: 'Introduction to AI', grade: '88', score: 88 },
              { name: 'Data Structures & Algorithm Analysis', grade: '87', score: 87 },
            ],
          },
        ],
      },
      {
        school: 'UC Berkeley Summer Sessions',
        groups: [
          {
            label: 'Summer C 2026',
            items: [
              { name: 'COMPSCI 188 Artificial Intelligence', grade: 'A' },
              { name: 'DATA C8 Foundations of Data Science', grade: 'A−' },
            ],
          },
        ],
      },
    ],
    internships: [],
    seeking: [
      { label: 'Role', value: 'Research or algorithm intern' },
      { label: 'Areas', value: 'Computer vision · Vision-language models · Anomaly detection' },
      { label: 'Toolkit', value: 'Python, PyTorch, CLIP, C++, Git, Linux' },
    ],
    life: [
      {
        title: 'Wuhan',
        place: 'Huazhong University of Science and Technology',
        period: 'Since Sep 2024',
        text: 'Home base for my Artificial Intelligence degree.',
      },
      {
        title: 'Berkeley',
        place: 'UC Berkeley Summer Sessions',
        period: 'Summer 2026',
        text: 'A summer as an international visiting undergraduate, taking CS188 and Data C8.',
      },
    ],
    skills: [
      { label: 'Languages', items: 'Python, C++, C, MySQL' },
      { label: 'ML / CV', items: 'PyTorch, CLIP, computer vision, reinforcement learning' },
      { label: 'Tools', items: 'Git, Linux' },
      { label: 'English', items: 'CET-6 524; technical communication' },
    ],
    contactNote: 'Open to research and algorithm internships in CV, VLMs, and anomaly detection.',
  },
  zh: {
    name: '姚振宇',
    altName: 'Zhenyu Yao',
    role: '华中科技大学 人工智能专业本科生',
    headline: '人工智能本科生',
    affiliation: '华中科技大学',
    focus: '计算机视觉 · 视觉语言模型 · 异常检测',
    summary:
      '华中科技大学人工智能专业本科生，专业排名前 20%，加权平均分 87.1/100。正在开展基于 CLIP 的航空发动机叶片零/少样本异常检测研究，寻找计算机视觉、视觉语言模型与异常检测方向的科研或算法实习。',
    interests: ['计算机视觉', '视觉语言模型', '工业异常检测', '强化学习'],
    hero: {
      eyebrow: '姚振宇 · Zhenyu Yao',
      tagline: ['让机器', '看见异常。'],
      sub: '华中科技大学人工智能专业本科生，研究视觉语言模型在工业异常检测中的应用。',
    },
    nav: {
      home: '首页',
      academics: '学业',
      research: '科研',
      projects: '项目',
      internships: '实习',
      resume: '简历',
      life: '日常',
      blog: '博客',
      switchLang: 'EN',
    },
    pages: {
      academics: {
        title: '学业',
        eyebrow: '华中科技大学 · UC Berkeley',
        lead: '华中科技大学人工智能专业本科，并在 UC Berkeley 完成暑期课程。',
        card: '专业前 20%，加权平均分 87.1。',
      },
      research: {
        title: '科研',
        eyebrow: '异常检测',
        lead: '基于 CLIP 的航空发动机叶片零/少样本异常检测。',
        card: '在 AeBAD-S 上为零样本 AnomalyCLIP 引入免训练的测试时增强。',
      },
      projects: {
        title: '项目',
        eyebrow: '动手实践',
        lead: '从搜索与博弈树，到强化学习与神经网络。',
        card: 'UC Berkeley CS188 Pacman AI：搜索、博弈、强化学习、推断与机器学习。',
      },
      internships: {
        title: '实习',
        eyebrow: '实践经历',
        lead: '寻找计算机视觉、视觉语言模型与异常检测方向的科研或算法实习。',
        card: '欢迎科研与算法实习机会。',
      },
      resume: {
        title: '简历',
        eyebrow: '一页纸',
        lead: '所有信息集中在一页，可直接打印或另存为 PDF。',
        card: '教育、科研、项目与技能，一页看完。',
      },
      life: {
        title: '日常生活',
        eyebrow: '实验室之外',
        lead: '去过的地方、经历的瞬间，以及生活里的随笔。',
        card: '从武汉到伯克利，以及路上的点滴。',
      },
    },
    sections: {
      summary: '个人简介',
      interests: '研究兴趣',
      coursework: '课程成绩',
      research: '科研经历',
      projects: '项目',
      education: '教育背景',
      skills: '技术技能',
      recent: '最新文章',
      contact: '联系方式',
    },
    research: [
      {
        title: 'AeBAD-S 航空发动机叶片异常检测',
        org: '在研项目',
        period: '2026 – 至今',
        tags: ['CLIP', '零/少样本', '像素级异常检测', 'PyTorch'],
        bullets: [
          '面向航空发动机叶片图像异常检测，搭建并迭代基于 CLIP 的零样本与少样本检测基线，覆盖图像级与像素级。',
          '围绕提示设计、记忆库与几何测试时增强开展受控对比实验，保留配置、结果与可复现性审计记录。',
          '以官方配置的零样本 AnomalyCLIP 为基线，免训练的几何测试时增强（翻转、旋转、缩放）使 AeBAD-S 全部 1639 张测试图的像素级 AUROC 由 0.902 提升至 0.924。',
        ],
        note: '0.902 → 0.924 为单配置下的初步结果；代码暂未公开。',
      },
    ],
    projects: [
      {
        title: 'UC Berkeley CS188 Pacman AI Projects',
        org: '课程项目 · COMPSCI 188',
        period: '2026.06 – 2026.08',
        tags: ['搜索', '博弈树', '强化学习', '概率推断', '机器学习'],
        bullets: [
          '搜索与多智能体决策：DFS、BFS、UCS、A*、Minimax、Alpha-Beta Pruning、Expectimax。',
          '强化学习与推断：Value Iteration、Q-learning、Approximate Q-learning、贝叶斯网络推断、变量消元、粒子滤波。',
          '机器学习：感知机、非线性回归、MNIST 手写数字分类、循环神经网络语言识别。',
        ],
        note: '课程代码不公开。',
      },
    ],
    education: [
      {
        title: '华中科技大学',
        org: '人工智能专业 本科',
        period: '2024.09 – 至今',
        highlight: '专业前 20% · 加权 87.1/100',
        bullets: [
          '数学基础：控制原理 98、微积分（B）（上）97、离散数学 95、线性代数 92、概率论与数理统计（B）87。',
          '计算机与人工智能：计算机组成与嵌入式系统 93、信号分析 92、面向对象的程序设计 92、数据科学基础 89、人工智能导论 88、数据结构与算法分析 87。',
        ],
      },
      {
        title: 'UC Berkeley Summer Sessions',
        org: 'Summer C · International Visitor Undergraduate Program',
        period: '2026.06.22 – 2026.08.14',
        highlight: 'GPA 3.85/4.00',
        bullets: ['COMPSCI 188 Artificial Intelligence（A）、DATA C8 Foundations of Data Science（A−）。'],
      },
    ],
    courses: [
      {
        school: '华中科技大学',
        groups: [
          {
            label: '数学基础',
            items: [
              { name: '控制原理', grade: '98', score: 98 },
              { name: '微积分（B）（上）', grade: '97', score: 97 },
              { name: '离散数学', grade: '95', score: 95 },
              { name: '线性代数', grade: '92', score: 92 },
              { name: '概率论与数理统计（B）', grade: '87', score: 87 },
            ],
          },
          {
            label: '计算机与人工智能',
            items: [
              { name: '计算机组成与嵌入式系统', grade: '93', score: 93 },
              { name: '信号分析', grade: '92', score: 92 },
              { name: '面向对象的程序设计', grade: '92', score: 92 },
              { name: '数据科学基础', grade: '89', score: 89 },
              { name: '人工智能导论', grade: '88', score: 88 },
              { name: '数据结构与算法分析', grade: '87', score: 87 },
            ],
          },
        ],
      },
      {
        school: 'UC Berkeley Summer Sessions',
        groups: [
          {
            label: 'Summer C 2026',
            items: [
              { name: 'COMPSCI 188 Artificial Intelligence', grade: 'A' },
              { name: 'DATA C8 Foundations of Data Science', grade: 'A−' },
            ],
          },
        ],
      },
    ],
    internships: [],
    seeking: [
      { label: '岗位', value: '科研实习 / 算法实习' },
      { label: '方向', value: '计算机视觉 · 视觉语言模型 · 异常检测' },
      { label: '技能', value: 'Python、PyTorch、CLIP、C++、Git、Linux' },
    ],
    life: [
      {
        title: '武汉',
        place: '华中科技大学',
        period: '2024.09 起',
        text: '攻读人工智能本科的地方。',
      },
      {
        title: '伯克利',
        place: 'UC Berkeley Summer Sessions',
        period: '2026 年夏',
        text: '以国际访问本科生身份度过一个夏天，修读 CS188 与 Data C8。',
      },
    ],
    skills: [
      { label: '编程语言', items: 'Python、C++、C、MySQL' },
      { label: '机器学习 / 视觉', items: 'PyTorch、CLIP、计算机视觉、强化学习' },
      { label: '工具', items: 'Git、Linux' },
      { label: '英语', items: 'CET-6 524；可进行英文技术交流' },
    ],
    contactNote: '欢迎联系计算机视觉、视觉语言模型与异常检测方向的科研或算法实习机会。',
  },
};
