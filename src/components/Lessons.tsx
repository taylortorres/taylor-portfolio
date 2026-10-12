type Lesson = { title: string; text: string };

// "What I learned" (Figma 2682:69772): three lessons side by side from md,
// each a serif title over a short paragraph. Stacked on phones.
export default function Lessons({ lessons }: { lessons: Lesson[] }) {
  return (
    <ul data-lessons className="grid gap-8 md:grid-cols-3 md:gap-lessons-gap">
      {lessons.map((l) => (
        <li key={l.title}>
          <h4 className="font-serif text-lesson-title text-heading">{l.title}</h4>
          <p className="mt-2 font-sans text-lesson text-muted">{l.text}</p>
        </li>
      ))}
    </ul>
  );
}
