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
};

// Three design principles (Treeats Solution, Figma 2691:70836): an intro line,
// then purple cards with a white icon, a mono title and a short sentence.
// At least 245px tall in a row from md (taller if narrow columns wrap more);
// stacked and as tall as their text on phones.
export default function PrincipleCards({ intro, cards }: Props) {
  return (
    <div>
      <p>{intro}</p>
      <ul className="mt-principles-gap grid gap-principle-gap md:grid-cols-3">
        {cards.map(({ icon, title, text }) => (
          <li key={title} className="rounded-chart bg-principle px-6.75 py-7 text-paper md:min-h-principle-h">
            <div className="flex h-8 items-start">
              <Image src={icon.src} alt="" aria-hidden="true" width={icon.width} height={icon.height} />
            </div>
            <h4 className="mt-4 font-mono text-principle-title font-medium uppercase">{title}</h4>
            <p className="mt-4 font-sans text-principle-body font-medium">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
