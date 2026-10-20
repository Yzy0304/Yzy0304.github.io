// Offline assistant behind the home-page pet. It answers from profile.ts only,
// by keyword matching — no network, no LLM.
//
// To plug in a real model later, keep the UI and replace `reply()` with a call
// to your own endpoint, sending `systemContext(lang)` as the system prompt.

import { profile, links, type Lang } from '../data/profile';

export const petName = 'Felix';

export type Reply = { text: string; links?: { label: string; href: string }[]; suggest?: string[] };

type Intent = {
  id: string;
  // Lowercase keywords. Pure-ASCII ones of ≤ 3 letters must match a whole word.
  keys: string[];
  // Broad intents (e.g. "about") get a low weight so specific topics win.
  weight?: number;
  answer: (lang: Lang, base: string) => Reply;
};

const L = (lang: Lang, en: string, zh: string) => (lang === 'zh' ? zh : en);
const page = (lang: Lang, base: string, key: string) => ({
  label: `${profile[lang].nav[key as keyof Profile['nav']]} →`,
  href: `${base}${lang === 'zh' ? '/zh' : ''}/${key === 'home' ? '' : `${key}/`}`,
});
type Profile = (typeof profile)['en'];

export function suggestions(lang: Lang) {
  return lang === 'zh'
    ? ['介绍一下振宇', '他在做什么研究？', '成绩怎么样？', '会哪些技能？', '怎么联系他？']
    : ['Who is Zhenyu?', 'What is his research?', 'How are his grades?', 'What are his skills?', 'How can I contact him?'];
}

const intents: Intent[] = [
  {
    id: 'pet',
    keys: ['who are you', 'yourself', 'your name', 'are you', 'felix', 'what are you', '你是谁', '你叫', '你是什么', '你的名字'],
    answer: (lang) => ({
      text: L(
        lang,
        `I'm ${petName}, Zhenyu's little assistant. I run entirely in your browser and only know what's on his profile, so ask me about his studies, research, projects, skills, or how to reach him.`,
        `我是 ${petName}，振宇的小助手。我完全在你的浏览器里运行，只知道他主页上的信息，可以问我他的学业、科研、项目、技能或联系方式。`,
      ),
      suggest: suggestions(lang).slice(0, 3),
    }),
  },
  {
    id: 'greet',
    keys: ['hello', 'hi', 'hey', 'yo', 'good morning', 'good evening', '你好', '嗨', '哈喽', '在吗', '早上好', '晚上好', '您好'],
    answer: (lang) => ({
      text: L(lang, `Hi there! 👋 I'm ${petName}. What would you like to know about Zhenyu?`, `你好呀！👋 我是 ${petName}，想了解振宇的什么呢？`),
      suggest: suggestions(lang),
    }),
  },
  {
    id: 'about',
    keys: ['who is', 'about', 'introduce', 'introduction', 'tell me', 'zhenyu', 'yao', 'himself', 'background', '介绍', '是谁', '简介', '振宇', '姚振宇', '他是', '背景'],
    weight: 0.3,
    answer: (lang, base) => ({
      text: profile[lang].summary,
      links: [page(lang, base, 'resume')],
      suggest: lang === 'zh' ? ['他在做什么研究？', '成绩怎么样？'] : ['What is his research?', 'How are his grades?'],
    }),
  },
  {
    id: 'education',
    keys: ['school', 'university', 'college', 'study', 'studies', 'major', 'degree', 'hust', 'huazhong', 'education', 'undergraduate', 'academic', '学校', '大学', '专业', '学历', '本科', '学业', '华科', '华中科技', '读书', '年级'],
    answer: (lang, base) => {
      const [hust, ucb] = profile[lang].education;
      return {
        text: L(
          lang,
          `He is studying for a ${hust.org} at ${hust.title} (${hust.period}), ranked ${hust.highlight}. In summer 2026 he also took courses at ${ucb.title} (${ucb.highlight}).`,
          `他在${hust.title}读${hust.org}（${hust.period}），${hust.highlight}。2026 年夏天还在 ${ucb.title} 修读课程（${ucb.highlight}）。`,
        ),
        links: [page(lang, base, 'academics')],
      };
    },
  },
  {
    id: 'grades',
    keys: ['gpa', 'grade', 'grades', 'score', 'scores', 'rank', 'ranking', 'average', 'transcript', '成绩', '绩点', '排名', '分数', '均分', '加权', '学分', '考得'],
    answer: (lang, base) => {
      const top = profile[lang].courses[0].groups.flatMap((g) => g.items).sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 3);
      const list = top.map((c) => `${c.name} ${c.grade}`).join(L(lang, ', ', '、'));
      return {
        text: L(
          lang,
          `At HUST he is in the top 20% of the AI program with a weighted average of 87.1/100. Highest marks: ${list}. At UC Berkeley he earned a 3.85/4.00 GPA (CS188: A, Data C8: A−).`,
          `在华科，他位列人工智能专业前 20%，加权平均分 87.1/100。最高分课程：${list}。在 UC Berkeley 暑期 GPA 3.85/4.00（CS188：A，Data C8：A−）。`,
        ),
        links: [page(lang, base, 'academics')],
      };
    },
  },
  {
    id: 'courses',
    keys: ['course', 'courses', 'class', 'classes', 'coursework', 'math', 'calculus', '课程', '上过', '修过', '数学', '课'],
    answer: (lang, base) => ({
      text: profile[lang].education.map((e) => e.bullets.join(' ')).join(' '),
      links: [page(lang, base, 'academics')],
    }),
  },
  {
    id: 'berkeley',
    keys: ['berkeley', 'uc', 'ucb', 'summer', 'cal', 'america', 'usa', 'abroad', 'exchange', '伯克利', '暑期', '暑假', '美国', '交换', '海外', '出国'],
    answer: (lang, base) => {
      const ucb = profile[lang].education[1];
      return {
        text: L(
          lang,
          `He attended ${ucb.title} (${ucb.org}) from ${ucb.period}, taking COMPSCI 188 Artificial Intelligence (A) and DATA C8 Foundations of Data Science (A−), for a ${ucb.highlight}.`,
          `他于 ${ucb.period} 参加 ${ucb.title}（${ucb.org}），修读 COMPSCI 188 人工智能（A）与 DATA C8 数据科学基础（A−），${ucb.highlight}。`,
        ),
        links: [page(lang, base, 'academics'), page(lang, base, 'life')],
      };
    },
  },
  {
    id: 'research',
    keys: ['research', 'anomaly', 'clip', 'anomalyclip', 'aebad', 'blade', 'engine', 'aero', 'paper', 'vlm', 'vision-language', 'zero-shot', 'few-shot', 'lab', '科研', '研究', '异常', '叶片', '发动机', '论文', '零样本', '少样本', '课题', '实验室'],
    answer: (lang, base) => {
      const r = profile[lang].research[0];
      return {
        text: L(
          lang,
          `His current project is "${r.title}" (${r.period}). ${r.bullets[0]} ${r.bullets[1]}`,
          `他目前在做「${r.title}」（${r.period}）。${r.bullets[0]}${r.bullets[1]}`,
        ),
        links: [page(lang, base, 'research')],
        suggest: lang === 'zh' ? ['有什么结果？'] : ['Any results so far?'],
      };
    },
  },
  {
    id: 'results',
    keys: ['result', 'results', 'auroc', 'tta', 'augmentation', 'improve', 'improvement', 'number', 'metric', 'performance', '结果', '提升', '指标', '效果', '成果', '增强'],
    answer: (lang, base) => {
      const r = profile[lang].research[0];
      return { text: `${r.bullets[2]} ${r.note ?? ''}`.trim(), links: [page(lang, base, 'research')] };
    },
  },
  {
    id: 'projects',
    keys: ['project', 'projects', 'cs188', '188', 'pacman', 'built', 'build', 'portfolio', 'code', '项目', '吃豆人', '作品', '做过'],
    answer: (lang, base) => {
      const pr = profile[lang].projects[0];
      return { text: L(lang, `${pr.title} (${pr.period}). ${pr.bullets.join(' ')}`, `${pr.title}（${pr.period}）。${pr.bullets.join('')}`), links: [page(lang, base, 'projects')] };
    },
  },
  {
    id: 'skills',
    keys: ['skill', 'skills', 'python', 'pytorch', 'c++', 'stack', 'tools', 'programming', 'language', 'languages', 'tech', 'good at', '技能', '会什么', '编程', '擅长', '技术栈', '工具', '语言'],
    answer: (lang, base) => ({
      text: profile[lang].skills.map((s) => `${s.label}${L(lang, ': ', '：')}${s.items}`).join(L(lang, '. ', '；')) + L(lang, '.', '。'),
      links: [page(lang, base, 'resume')],
    }),
  },
  {
    id: 'english',
    keys: ['english', 'cet', 'cet-6', 'toefl', 'ielts', '英语', '六级', '英文', '托福', '雅思'],
    answer: (lang) => ({
      text: L(lang, 'He scored 524 on CET-6 and is comfortable with technical communication in English — he also took two courses at UC Berkeley.', '他的大学英语六级成绩为 524，可以用英文进行技术交流，也在 UC Berkeley 用英文修读了两门课程。'),
    }),
  },
  {
    id: 'internship',
    keys: ['intern', 'internship', 'internships', 'job', 'hire', 'hiring', 'opportunity', 'work', 'experience', 'available', 'position', 'recruit', '实习', '工作', '机会', '招聘', '求职', '经历', '内推', '岗位'],
    answer: (lang, base) => ({
      text:
        profile[lang].internships.length > 0
          ? profile[lang].internships.map((i) => `${i.title}${i.org ? ` · ${i.org}` : ''} (${i.period})`).join('; ')
          : L(
              lang,
              `He hasn't done an internship yet and is actively looking. ${profile[lang].contactNote} You can reach him at ${links.email}.`,
              `他目前还没有实习经历，正在积极寻找。${profile[lang].contactNote}邮箱：${links.email}。`,
            ),
      links: [page(lang, base, 'internships')],
    }),
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'mail', 'reach', 'wechat', 'phone', 'connect', 'touch', 'github', 'linkedin', '联系', '邮箱', '邮件', '微信', '电话', '找他'],
    answer: (lang) => ({
      text: L(
        lang,
        `Email is best: ${links.email} (school: ${links.schoolEmail}). His GitHub is github.com/Yzy0304.`,
        `最方便的是邮件：${links.email}（学校邮箱：${links.schoolEmail}）。GitHub：github.com/Yzy0304。`,
      ),
      links: [
        { label: 'Email', href: `mailto:${links.email}` },
        { label: 'GitHub', href: links.github },
      ],
    }),
  },
  {
    id: 'resume',
    keys: ['resume', 'résumé', 'cv', 'pdf', '简历', '履历'],
    answer: (lang, base) => ({
      text: L(lang, 'His one-page résumé is on the site — you can print it or save it as a PDF from there.', '他的一页纸简历就在网站上，可以直接打印或另存为 PDF。'),
      links: [page(lang, base, 'resume')],
    }),
  },
  {
    id: 'interests',
    keys: ['interest', 'interests', 'focus', 'direction', 'passion', 'field', 'area', 'vision', 'reinforcement', '兴趣', '方向', '领域', '感兴趣', '视觉', '强化学习'],
    answer: (lang) => ({
      text: L(lang, `He's interested in ${profile.en.interests.join(', ')}.`, `他的研究兴趣：${profile.zh.interests.join('、')}。`),
    }),
  },
  {
    id: 'life',
    keys: ['life', 'hobby', 'hobbies', 'fun', 'daily', 'free time', 'weekend', 'travel', 'wuhan', 'live', '生活', '爱好', '日常', '兴趣爱好', '周末', '旅行', '武汉', '平时'],
    answer: (lang, base) => ({
      text: L(
        lang,
        "He's based in Wuhan for university and spent summer 2026 in Berkeley. He hasn't told me much about his hobbies yet — the Life page is where those stories will go.",
        '他在武汉读大学，2026 年夏天去了伯克利。他还没告诉我太多兴趣爱好，以后会写在「日常」页面里。',
      ),
      links: [page(lang, base, 'life')],
    }),
  },
  {
    id: 'blog',
    keys: ['blog', 'post', 'posts', 'article', 'write', 'writing', 'notes', '博客', '文章', '笔记', '写'],
    answer: (lang, base) => ({
      text: L(lang, 'He writes notes on computer vision, vision-language models, and anomaly detection on his blog.', '他会在博客里写计算机视觉、视觉语言模型和异常检测相关的笔记。'),
      links: [{ label: `${profile[lang].nav.blog} →`, href: `${base}/blog/` }],
    }),
  },
  {
    id: 'thanks',
    keys: ['thanks', 'thank', 'thx', 'great', 'cool', 'nice', 'awesome', '谢谢', '感谢', '好的', '厉害', '不错', '棒'],
    answer: (lang) => ({ text: L(lang, 'Anytime! Anything else you want to know? ✨', '不客气！还想了解什么吗？✨') }),
  },
  {
    id: 'bye',
    keys: ['bye', 'goodbye', 'see you', '再见', '拜拜', '下次见'],
    answer: (lang) => ({ text: L(lang, 'Bye! Come back anytime. 👋', '再见！随时回来找我玩～👋') }),
  },
];

const hasCJK = (s: string) => /[㐀-鿿]/.test(s);

function score(text: string, keys: string[]) {
  let total = 0;
  for (const k of keys) {
    const hit = /^[a-z0-9]{1,3}$/.test(k) ? new RegExp(`\\b${k}\\b`).test(text) : text.includes(k);
    if (hit) total += hasCJK(k) ? k.length * 2 : k.length;
  }
  return total;
}

/** Picks the language to answer in: Chinese input → zh, Latin input → en, else the page's. */
export function detectLang(text: string, fallback: Lang): Lang {
  if (hasCJK(text)) return 'zh';
  if (/[a-z]/i.test(text)) return 'en';
  return fallback;
}

export function reply(input: string, pageLang: Lang, base = ''): Reply {
  const text = input.toLowerCase().trim();
  const lang = detectLang(text, pageLang);
  let best: Intent | undefined;
  let bestScore = 0;
  for (const intent of intents) {
    const s = score(text, intent.keys) * (intent.weight ?? 1);
    if (s > bestScore) [best, bestScore] = [intent, s];
  }
  if (best) return best.answer(lang, base);
  return {
    text: L(
      lang,
      "Hmm, I'm not sure about that one — I only know what's on Zhenyu's profile. Try one of these:",
      '这个我还不太清楚——我只知道振宇主页上的信息。可以试试问这些：',
    ),
    suggest: suggestions(lang),
  };
}

/** Plain-text profile, ready to use as a system prompt once a real model is connected. */
export function systemContext(lang: Lang) {
  const p = profile[lang];
  const entry = (e: { title: string; org?: string; period: string; bullets: string[]; note?: string }) =>
    `- ${e.title}${e.org ? ` (${e.org})` : ''}, ${e.period}\n${e.bullets.map((b) => `  • ${b}`).join('\n')}${e.note ? `\n  Note: ${e.note}` : ''}`;
  return [
    `You are ${petName}, the assistant on ${p.name}'s personal site. Answer only from the facts below; if something isn't covered, say so.`,
    `Name: ${p.name} (${p.altName})`,
    `Role: ${p.role}`,
    `Summary: ${p.summary}`,
    `Interests: ${p.interests.join(', ')}`,
    `Education:\n${p.education.map(entry).join('\n')}`,
    `Research:\n${p.research.map(entry).join('\n')}`,
    `Projects:\n${p.projects.map(entry).join('\n')}`,
    `Skills:\n${p.skills.map((s) => `- ${s.label}: ${s.items}`).join('\n')}`,
    `Contact: ${links.email}, ${links.github}`,
  ].join('\n\n');
}
