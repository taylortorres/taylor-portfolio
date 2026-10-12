type Lesson = { title: string; text: string };

type Props = {
  lessons: Lesson[];
  /** "direction": two columns with smaller titles (Treeats Design Direction). */
  variant?: "lessons" | "direction";
};

// "What I learned" (Figma 2682:69772): three lessons side by side from md,
// each a serif title over a short paragraph. Stacked on phones.
// The "direction" variant (Treeats, Figma 2691:71056) has two columns, 21px
// titles 3px above their text, and starts 10px lower under a headline.
export default function Lessons({ lessons, variant = "lessons" }: Props) {
  const direction = variant === "direction";
  return (
    <ul
      data-lessons
      className={`grid gap-8 md:gap-lessons-gap ${direction ? "first:pt-direction-top md:grid-cols-2" : "md:grid-cols-3"}`}
    >
      {lessons.map((l) => (
        <li key={l.title}>
          <h4 className={`font-serif text-heading ${direction ? "text-insight" : "text-lesson-title"}`}>{l.title}</h4>
          <p className={`${direction ? "mt-0.75" : "mt-2"} font-sans text-lesson text-muted`}>{l.text}</p>
        </li>
      ))}
    </ul>
  );
}
