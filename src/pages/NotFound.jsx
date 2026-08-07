import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import PageMeta from "../components/ui/PageMeta";
import { BODY, BODY_SM, CAPTION, DISPLAY, H4 } from "../styles/type";
import { COMPANY } from "../data/site";

// Four destinations, rescoped from not-found.md's list — "How it works",
// "Questions" and "Our story" were pages in the larger draft and no longer
// exist, so linking them from the one page a lost visitor lands on would be
// its own broken link.
const DESTINATIONS = [
  {
    title: "Products",
    excerpt: "The three formats, and what is in them.",
    to: "/products/",
  },
  {
    title: "Ingredients & Sourcing",
    excerpt: "The full ingredient list, and where the milk comes from.",
    to: "/ingredients-sourcing/",
  },
  {
    title: "Social",
    excerpt: "What we are posting, and where to follow along.",
    to: "/social/",
  },
  {
    title: "Contact",
    excerpt: "How to reach a person.",
    to: "/contact/",
  },
];

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found · Steppe Gut" noindex />

      {/* min-h keeps the footer off the middle of a tall screen. */}
      <div
        data-navtheme="light"
        className="min-h-[70vh] bg-cream pb-28 pt-[132px] lg:pb-40 lg:pt-[200px]"
      >
        <Container width="narrow">
          <Eyebrow>404</Eyebrow>
          {/* The heading describes the error rather than repeating the code —
              "404" alone tells a screen-reader user nothing
              (not-found.md, accessibility notes). */}
          <h1
            id="page-title"
            tabIndex={-1}
            className="mt-6 font-serif font-normal text-forest outline-none"
            style={DISPLAY}
          >
            This page isn&rsquo;t here
          </h1>
          <p
            className="mt-7 max-w-[46ch] font-serif text-forest/75"
            style={BODY}
          >
            Either the link was wrong or we moved something. Try one of these.
          </p>

          {/* No search field: not-found.md specifies one, but there is no
              search index across seven pages and 01_navigation.md's search
              overlay was cut in the rescope. A box that returns nothing is
              worse than no box. */}
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DESTINATIONS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex h-full flex-col rounded-2xl border border-forest/15 bg-[#FFFDF9] p-6 transition-colors hover:border-forest/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <h2
                    className="font-serif font-normal text-forest"
                    style={H4}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="mt-2 font-serif text-forest/70"
                    style={BODY_SM}
                  >
                    {item.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="mt-12 max-w-[56ch] font-sans text-forest/55"
            style={CAPTION}
          >
            If you followed a link from somewhere on this site and it brought
            you here, tell us at{" "}
            <a
              className="underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
              href={`mailto:${COMPANY.brandOwner.email}`}
            >
              {COMPANY.brandOwner.email}
            </a>{" "}
            and we will fix it.
          </p>
        </Container>
      </div>
    </>
  );
}
