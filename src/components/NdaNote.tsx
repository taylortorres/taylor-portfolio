type Props = {
  /** Contact address for the mailto link. */
  email: string;
};

// "This case study is under NDA" (Props, Figma 2699:5456): a soft gray box
// with a centered title, a sentence and a mailto link. The emoji are
// decorative; the title and link carry the meaning.
export default function NdaNote({ email }: Props) {
  return (
    <aside className="rounded-callout border border-nda-border bg-nda-bg px-5 py-12 text-center md:px-nda-x md:py-nda-y">
      <p className="flex items-start justify-center gap-2 font-serif text-nda-title font-semibold text-heading">
        <span aria-hidden="true">🔒</span>
        <span className="text-balance">This case study is under NDA</span>
      </p>
      <div className="mx-auto mt-3 max-w-nda-text font-sans text-case-body text-nda-ink">
        <p>
          Due to the nature of this project, the specific designs I worked on are private, but I&apos;m happy to chat
          about and walk through my process in more detail over a call.
        </p>
        <p className="mt-case-para">
          <span aria-hidden="true">📧</span> Reach out to me at{" "}
          <a
            href={`mailto:${email}`}
            className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {email}
          </a>
        </p>
      </div>
    </aside>
  );
}
