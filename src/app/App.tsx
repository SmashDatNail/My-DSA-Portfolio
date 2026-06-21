import { useState, useEffect, useRef } from "react";
import segfaultTitle from "../assets/segfault-title.png";
import { motion } from "motion/react";
import {
  BookOpen,
  Code2,
  Lightbulb,
  Target,
  ChevronRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const SECTIONS = [
  "intro",
  "journey",
  "projects",
  "skills",
  "reflections",
];

const weeks = [
  {
    week: "CH 1",
    date: "Week 1",
    title: "Introduction to Data Structures & Algorithms",
    description:
      "This chapter introduces me to the definition of data structures and algorithms, data types, efficient coding approaches, as well as Big-O notation. It made me understand the big impact data structures and algorithms have on writing code. It pushes me into thinking that writing code isn't just about getting it to 'work' — rather, writing code is just like writing an essay, where we organise and structure our thinking into a complete, fully coherent piece of words that can be understood by both humans and machines.",
    tag: "Theory",
    highlight: false,
  },
  {
    week: "CH 2",
    date: "Week 2–3",
    title: "C++ Fundamentals",
    description:
      "This chapter reintroduces me to the basics of C++ and coding in general. It's there to refresh and jog our memories on how to write simple for loops, if-else statements, and variables — putting the fundamentals together to make working, functional code.",
    tag: "Setup",
    highlight: false,
  },
  {
    week: "CH 3",
    date: "Week 4–5",
    title: "Arrays",
    description:
      "This chapter makes me understand how arrays work — from moving the array, to swapping the values inside it, to rotating the array from the top or the bottom. It's a bit tricky at first since we have to visualise everything from just a piece of text, but with enough practice and understanding, it isn't actually all that bad.",
    tag: "Structure",
    highlight: false,
  },
  {
    week: "CH 4",
    date: "Week 6",
    title: "Abstract Data Types",
    description:
      "Now this chapter introduces me to what C++ is really all about — an Object-Oriented Programming (OOP) language, which is one of the most important and beneficial concepts that C++ offers. Why, you might ask? Well, think of it this way. Imagine you're playing a video game. There are many heroes you can choose from. But how do I determine what roles each hero can be played as? What are the characteristics of each hero? This is where classes come into place: we can group the heroes and class them together by the similarities of what each one can do. In games like Mobile Legends, the heroes can be classified as 'Assassin', 'Marksman', 'Tank', 'Fighter', 'Mage', and 'Support'. And that's what OOP is really all about.",
    tag: "Theory",
    highlight: true,
  },
  {
    week: "CH 5",
    date: "Week 7",
    title: "Stack",
    description:
      "This chapter told me that a Pringles can is a data structure. No, seriously — when you take out a chip, surely you take it from the top and not the bottom, right? Only a psychopath would do that. The reason I'm saying this is because a stack is basically like that. When you pop (delete an element) from the array, it's like taking a chip out of a Pringles can. And let's say you recycle the can and want to put your own homemade chips in — you start placing them at the bottom of the can, right? That's what we call a push in stack terms.",
    tag: "Structure",
    highlight: false,
  },
  {
    week: "CH 6",
    date: "Week 8",
    title: "Queue",
    description:
      "This chapter is like your average day in a busy restaurant — first come, first served, you know what they say. A queue is a concept where you add new elements at the back and always remove them from the front of the array. It's like ordering your food at the counter (insert), waiting for a little while, then leaving the counter (remove) so the next customer can continue the cycle of ordering their food.",
    tag: "Structure",
    highlight: false,
  },
  {
    week: "CH 7",
    date: "Week 9–10",
    title: "Linked List",
    description:
      "Ever use a music player? Well, that's a dumb question — of course everyone listens to music. But how does it know what song to play next? It's like a chain connected to each other. Imagine an album with five songs. They're interconnected because they're all in the same album, and each song smoothly transitions into the next. But why is the transition so smooth? Because the album is most likely a story that continues into the next chapter. The first chapter is all about finding the partner of your life, the next is about the hardship of the relationship, and the last is about losing that partner — now you're all sad and emo about it. So basically, a linked list is sort of like that: each node is connected like a chain to whatever chapter or story it wants to tell you.",
    tag: "Build",
    highlight: true,
  },
  {
    week: "CH 8",
    date: "Week 11",
    title: "Sorting & Searching Algorithms",
    description:
      "This chapter is like a whole library with dozens of books. Imagine an unkempt, messy library with different types of books scattered all over the place. Now, the librarian has to find a way to sort the books by their genres — whether biography, educational, or fantasy — and place them on the bookshelves suited to each genre, based on the labelling. But what's the most efficient way to sort the books in the least amount of time? That's what a sorting algorithm is about. And why does the librarian want to sort the books in the first place? Tell me: if someone were looking for a specific book, which would be faster — an unorganised library or an organised one? Surely the organised library takes less time and causes less of a headache. And that's what a searching algorithm is like.",
    tag: "Algorithm",
    highlight: false,
  },
  {
    week: "CH 9",
    date: "Week 12–13",
    title: "Tree",
    description:
      "This chapter is all about decisions. It's like a story-driven video game — no, a visual novel. In this genre, the game lets you pick whichever option you want from the choices given, and each choice makes a huge impact. Like in this visual novel I played before: the antagonist had been defeated, and I had a choice — to kill him, or to forgive him for the mistakes he made to us, the protagonists. It's up to us to decide, and it heavily impacts the ending, whether good or bad. A tree is basically like that: it builds an outcome based on the decisions made. It's basically a simple form of AI.",
    tag: "Structure",
    highlight: true,
  },
  {
    week: "CH X",
    date: "Week 14",
    title: "Modular Programming",
    description:
      "This chapter is all about making separate files for separate purposes. It gets messy if you combine both the declarations and the function definitions in the same file.",
    tag: "Build",
    highlight: false,
  },
];

const projects = [
  {
    id: "01",
    title: "Segfault — A Simple Turn-Based RPG",
    subtitle: "Group Assignment · Full Semester · Data Structures & Algorithms",
    image: segfaultTitle,
    imageAlt: "Segfault — A Simple Turn-Based RPG title screen",
    tags: ["Array", "Stack", "Queue", "Linked List", "Binary Search Tree", "Modular Design", "C++"],
    outcome: "Completed",
    sections: [
      {
        heading: "What We Built",
        body: "A simple turn-based RPG in the spirit of The Legend of Zelda, Final Fantasy, and Undertale. The game mostly resembles the older 8-bit titles from the 80s era of the NES console.",
      },
      {
        heading: "Data Structures Applied",
        body: "We used arrays for enemy positions and dialogue, queues for dialogue animation and boss-planning AI, a stack for the boss combo system, a linked list for the inventory system, and a tree for boss AI — along with searching for enemy detection and hitboxes.",
      },
      {
        heading: "My Contributions",
        body: "I designed the battle system and the boss battles, as well as fixing some of the bugs that came up during development.",
      },
      {
        heading: "Challenges & What We Learned",
        body: "The debugging process is a pain to deal with, but satisfying once you figure out the actual cause. For example, there was a bug in the enemy tracking system where the game would crash the moment it entered a battle state. We fixed it by assigning the correct pointer to the enemy so it wouldn't return as NULL — it was crashing because of garbage memory, similar to the infamous 'MissingNo.' bug in Pokémon Red/Blue.",
      },
    ],
  },
];

const skills = [
  {
    name: "C++ Programming Skills",
    start: 50,
    end: 85,
    color: "#1E3A5F",
  },
  {
    name: "Algorithm Analysis (Big-O)",
    start: 10,
    end: 87,
    color: "#3D5A80",
  },
  {
    name: "Understanding of Data Structures & Algorithms",
    start: 25,
    end: 80,
    color: "#5B7799",
  },
  {
    name: "Data Structure Design",
    start: 25,
    end: 80,
    color: "#334155",
  },
  {
    name: "Problem Solving & Debugging",
    start: 35,
    end: 85,
    color: "#64748B",
  },
];

const reflections = [
  {
    quote:
      "I truly understand what OOP is really all about.",
    context: "Reflection after Chapter 4: Abstract Data Types, Week 6",
  },
  {
    quote:
      "Whenever I think of a Pringles can, I think of the stack data structure.",
    context:
      "Personal notes, Chapter 5: Stack, Week 7",
  },
  {
    quote:
      "DSA is all about organising our code into something clean, efficient, and well-structured. It was a fun experience and I really like this subject — it forces you to think critically about how to make a piece of software more optimised and faster.",
    context: "End-of-semester retrospective, Week 14",
  },
];

const tagColors: Record<string, string> = {
  Setup: "bg-slate-100 text-slate-500",
  Theory: "bg-slate-200 text-slate-700",
  Milestone: "bg-[#3D5A80]/15 text-[#3D5A80]",
  Structure: "bg-slate-100 text-slate-600",
  Build: "bg-[#1E3A5F]/10 text-[#1E3A5F]",
  Algorithm: "bg-slate-200 text-slate-600",
  Reflection: "bg-slate-100 text-slate-500",
};

function SkillBar({
  name,
  start,
  end,
  color,
  index,
}: {
  name: string;
  start: number;
  end: number;
  color: string;
  index: number;
}) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-5 border-b border-slate-200 last:border-0"
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-sans text-sm font-medium text-slate-900 tracking-wide">
          {name}
        </span>
        <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
          <span>Start {start}%</span>
          <ChevronRight size={10} />
          <span style={{ color }} className="font-medium">
            {end}%
          </span>
        </div>
      </div>
      <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full opacity-25"
          style={{ width: `${start}%`, backgroundColor: color }}
        />
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${start}%`,
            width: animated ? `${end - start}%` : "0%",
            backgroundColor: color,
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionRefs = useRef<
    Record<string, HTMLElement | null>
  >({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
    });
    setMobileNavOpen(false);
  };

  const navItems = [
    { id: "intro", label: "Introduction" },
    { id: "journey", label: "Chapter Journey" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skill Growth" },
    { id: "reflections", label: "Reflections" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 xl:w-72 bg-slate-900 text-white z-40 p-8 overflow-y-auto">
        <div className="mb-12">
          <p className="font-mono text-xs text-white/40 tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-2xl font-bold leading-tight text-white">
            Na&apos;il Irfan
          </h1>
          <p className="font-sans text-sm text-white/60 mt-1">
            Computer Engineering
            <br />
            Semester 2 · Year 1 · 2026
          </p>
        </div>

        <nav className="flex-1">
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">
            Sections
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all duration-200 flex items-center gap-2 group ${
                    activeSection === item.id
                      ? "bg-[#3D5A80] text-white font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
                      activeSection === item.id
                        ? "bg-white"
                        : "bg-white/20 group-hover:bg-white/50"
                    }`}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <p className="font-mono text-xs text-white/30 leading-relaxed">
            Data Structures & Algorithms
            <br />
            Computer Engineering
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-white/40 tracking-widest uppercase">
            Portfolio
          </p>
          <h1 className="font-serif text-lg font-bold">
            Na'il Irfan
          </h1>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-16">
          <div
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <nav className="relative bg-slate-900 h-full w-72 max-w-full p-8 pt-6 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left px-3 py-3 text-white/80 hover:text-white text-base"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 xl:ml-72 pt-16 lg:pt-0 overflow-y-auto">
        {/* INTRO */}
        <section
          id="intro"
          ref={(el) => {
            sectionRefs.current["intro"] = el;
          }}
          className="min-h-screen flex flex-col lg:flex-row"
        >
          {/* Left column — text */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-20 lg:py-32 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-mono text-xs text-[#3D5A80] tracking-widest uppercase mb-6">
                Semester 2 · Year 1 · 2026
              </p>
              <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] text-slate-900 mb-8">
                Structures,
                <br />
                <em className="font-light italic">
                  Algorithms
                </em>
                <br />& Growth
              </h2>
              <p className="font-sans text-lg text-slate-500 leading-relaxed mb-6 max-w-md">
                This is my reflection and overall thoughts on the data structures and algorithms subject that I learnt throughout this semester.
              </p>
              <p className="font-sans text-base text-slate-500 leading-relaxed max-w-md">
                From the basics of Big-O notation to more complex concepts like the binary search tree, the journey has been quite impactful for me so far.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8"
            >
              {[
                { value: "10", label: "Chapters" },
                { value: "1", label: "Group Project" },
                { value: "C++", label: "Language" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-slate-500 tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — image */}
          <div className="lg:w-[42%] xl:w-[45%] relative bg-slate-100 overflow-hidden hidden lg:flex items-center justify-center p-8">
            <img
              src="https://img.perlego.com/book-covers/3833560/9781774695807.jpg"
              alt="Data Structures & Algorithms book cover"
              className="max-w-full max-h-full object-contain shadow-xl rounded-sm"
            />
          </div>
        </section>

        {/* JOURNEY */}
        <section
          id="journey"
          ref={(el) => {
            sectionRefs.current["journey"] = el;
          }}
          className="bg-slate-50 px-8 md:px-16 py-20 lg:py-28"
        >
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-[#3D5A80] tracking-widest uppercase mb-3">
              Chapter by Chapter
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              The Journey
            </h2>
            <p className="font-sans text-slate-500 mb-16 max-w-lg leading-relaxed">
              Ten chapters, each building on the last. Not every
              concept clicked immediately — this is the
              progression as it actually happened.
            </p>

            <div className="relative">
              {/* Timeline spine */}
              <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-slate-200 hidden sm:block" />

              <div className="space-y-0">
                {weeks.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.04,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    className={`relative flex gap-6 sm:gap-10 py-6 border-b border-slate-200 last:border-0 ${w.highlight ? "bg-[#3D5A80]/5 -mx-4 px-4 rounded-sm" : ""}`}
                  >
                    {/* Week number */}
                    <div className="flex-shrink-0 w-14 text-right relative z-10">
                      <span className="font-mono text-xs text-slate-500">
                        {w.date}
                      </span>
                      <div className="hidden sm:flex absolute right-[-1.65rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#3D5A80] bg-slate-50 items-center justify-center">
                        {w.highlight && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3D5A80]" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-[#3D5A80] font-medium">
                          WK {w.week}
                        </span>
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded-full ${tagColors[w.tag] || "bg-slate-100 text-slate-500"}`}
                        >
                          {w.tag}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-slate-900 mb-1.5">
                        {w.title}
                      </h3>
                      <p className="font-sans text-sm text-slate-500 leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          ref={(el) => { sectionRefs.current["projects"] = el; }}
          className="px-8 md:px-16 py-20 lg:py-28"
        >
          <p className="font-mono text-xs text-[#3D5A80] tracking-widest uppercase mb-3">Assessed Work</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">Projects</h2>
          <p className="font-sans text-slate-500 mb-14 max-w-lg leading-relaxed">
            One group project spanning the full semester — a turn-based RPG built in C++ that puts every major data structure from the course to work.
          </p>

          {projects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-60px" }}
              className="border border-slate-200 rounded-sm overflow-hidden"
            >
              {/* Hero image */}
              <div className="relative bg-slate-100 aspect-video lg:aspect-[21/6] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/55" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <p className="font-mono text-xs text-[#8AA6C8] uppercase tracking-widest mb-2">{project.subtitle}</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail sections */}
              <div className="bg-slate-50 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                {project.sections.map((s, i) => (
                  <div key={i} className="p-8 border-b border-slate-200 last:border-b-0 md:last:border-b md:[&:nth-child(odd)]:border-r-0">
                    <p className="font-mono text-xs text-[#3D5A80] uppercase tracking-widest mb-3">{s.heading}</p>
                    <p className="font-sans text-sm text-slate-500 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              {/* Footer row */}
              <div className="bg-slate-100 border-t border-slate-200 px-8 py-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Status</p>
                  <p className="font-serif text-base font-bold text-[#3D5A80]">{project.outcome}</p>
                </div>
                <ArrowUpRight size={18} className="text-slate-500" />
              </div>
            </motion.article>
          ))}
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          ref={(el) => {
            sectionRefs.current["skills"] = el;
          }}
          className="bg-slate-50 px-8 md:px-16 py-20 lg:py-28"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-[#3D5A80] tracking-widest uppercase mb-3">
              Development
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Skill Growth
            </h2>
            <p className="font-sans text-slate-500 mb-12 leading-relaxed">
              Self-assessed at the start and end of the semester.
              The numbers are honest — some skills moved more
              than expected, others less.
            </p>

            <div className="mb-8">
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  index={i}
                />
              ))}
            </div>

            <p className="font-mono text-xs text-slate-500">
              Self-assessment · 0 = no competence, 100 = expert
              proficiency
            </p>
          </div>

          {/* What surprised me */}
          <div className="mt-16 max-w-3xl grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={16} />,
                title: "Most Improved",
                body: "My structural thinking, and how to solve problems using data structures and algorithms.",
              },
              {
                icon: <Target size={16} />,
                title: "Hardest-Won",
                body: "Making a fully functional game using raylib. It was certainly a great experience.",
              },
              {
                icon: <Lightbulb size={16} />,
                title: "Biggest Surprise",
                body: "How much of a pain it is to debug everything I coded. Now I know what it feels like to be a programmer.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white border border-slate-200 rounded-sm p-6"
              >
                <div className="text-[#3D5A80] mb-3">
                  {card.icon}
                </div>
                <h4 className="font-serif text-base font-semibold text-slate-900 mb-2">
                  {card.title}
                </h4>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* REFLECTIONS */}
        <section
          id="reflections"
          ref={(el) => {
            sectionRefs.current["reflections"] = el;
          }}
          className="px-8 md:px-16 py-20 lg:py-28"
        >
          <p className="font-mono text-xs text-[#3D5A80] tracking-widest uppercase mb-3">
            Looking Back
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Reflections
          </h2>
          <p className="font-sans text-slate-500 mb-14 max-w-lg leading-relaxed">
            Three observations that stayed with me after the
            semester closed.
          </p>

          <div className="space-y-12 max-w-2xl">
            {reflections.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 mt-1">
                    <span className="font-serif text-5xl text-[#3D5A80] leading-none select-none">
                      "
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-xl xl:text-2xl font-medium italic text-slate-900 leading-relaxed mb-4">
                      {r.quote}
                    </p>
                    <cite className="font-mono text-xs text-slate-500 not-italic">
                      {r.context}
                    </cite>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>

          {/* Final note */}
          <div className="mt-20 max-w-2xl border-t border-slate-200 pt-12">
            <div className="flex items-start gap-4">
              <Code2
                size={16}
                className="text-[#3D5A80] mt-1 flex-shrink-0"
              />
              <div>
                <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
                  If I Could Start Again
                </h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">
                  I would try to learn the concepts first, implement and experiment with them by hand, and build things only once I actually understand them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white px-8 md:px-16 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-serif text-lg font-bold">
                Na&apos;il Irfan
              </p>
              <p className="font-mono text-xs text-white/40 mt-0.5">
                Data Structures & Algorithms · Computer Engineering · Sem 2, Year 1, 2026
              </p>
            </div>
            <p className="font-mono text-xs text-white/30">
              Portfolio · Semester Archive
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}