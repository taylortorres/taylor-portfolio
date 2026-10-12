import Image from "next/image";

type Card = {
  /** Decorative icon in public/, e.g. "/case-study/treeats/icon-clarity.svg", with its size. */
  icon: { src: string; width: number; height: number };
  title: string;
  text: string;
};

type Props = {
  /** Line above the cards, e.g. "Based on my research and testing, ...". */
  intro: string;
  cards: Card[];
  /** "takeaways": the concept validation cards (Figma 2691:71113): taller,
   * 15px apart, 20px below the intro, two-line titles. */
  variant?: "principles" | "takeaways";
};

// Three design principles (Treeats Solution, Figma 2691:70836): an intro line,
// then purple cards with a white icon, a mono title and a short sentence.
// At least 245px tall in a row from md (taller if narrow columns wrap more);
// stacked and as tall as their text on phones. The "takeaways" variant
// (Treeats Ideation) is 290px tall with 24 / 32 padding.
export default function PrincipleCards({ intro, cards, variant = "principles" }: Props) {
  const takeaways = variant === "takeaways";
  return (
    <div>
      <p>{intro}</p>
      <ul
        className={`grid md:grid-cols-3 ${takeaways ? "mt-takeaways-top gap-takeaways-gap" : "mt-principles-gap gap-principle-gap"}`}
      >
        {cards.map(({ icon, title, text }) => (
          <li
            key={title}
            className={`rounded-chart bg-principle text-paper ${takeaways ? "px-6 py-8 md:min-h-takeaway-h" : "px-6.75 py-7 md:min-h-principle-h"}`}
          >
            <div className={`flex items-start ${takeaways ? "h-takeaway-icon" : "h-8"}`}>
              <Image src={icon.src} alt="" aria-hidden="true" width={icon.width} height={icon.height} />
            </div>
            <h4 className={`${takeaways ? "mt-3.5" : "mt-4"} font-mono text-principle-title font-medium uppercase`}>{title}</h4>
            <p className={`${takeaways ? "mt-4.5" : "mt-4"} font-sans text-principle-body font-medium`}>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
