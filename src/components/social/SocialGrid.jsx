"use client";

import Container from "../ui/Container";
import { BODY, BODY_SM } from "../../styles/type";
import { SOCIAL_POSTS } from "../../data/social";

// Curated static grid. No embed script, no API, no token refresh - that was
// the point of choosing a curated grid over a live feed.
//
// The empty state is a single line in a bordered panel. Deliberately not
// skeleton tiles or greyed-out placeholders: those imply posts are loading,
// which would be a small lie on a page whose entire argument is that we are
// not pretending to have something we do not have.
export default function SocialGrid() {
  if (SOCIAL_POSTS.length === 0) {
    return (
      <Container width="content">
        <div className="rounded-2xl border border-forest/15 bg-[#FFFDF9] px-8 py-14 text-center">
          <p
            className="mx-auto max-w-[46ch] font-sans text-forest/75"
            style={BODY}
          >
            There is nothing here yet. When there is, it will be posts we made,
            not reposts of other people&rsquo;s
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container width="content">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SOCIAL_POSTS.map((post) => (
          <li key={post.id}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-forest/12 bg-[#FFFDF9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <img
                src={post.image}
                alt={post.alt}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <p
                className="line-clamp-3 px-4 py-4 font-sans text-forest/75"
                style={BODY_SM}
              >
                {post.caption}
              </p>
              <span className="sr-only">
                {" "}
                opens {post.platform} in a new tab
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
