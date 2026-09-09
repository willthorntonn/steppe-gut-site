"use client";

import Link from "next/link";
import Container from "../components/ui/Container";

// Matches the Confirmation page layout exactly - only the copy differs.
export default function NotFound() {
  return (
    <>
      <section data-navtheme="light" className="min-h-screen bg-cream flex flex-col">
        <Container width="narrow" className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[136px] text-center">
          <h1 className="-mt-10 font-serif text-[clamp(3.8rem,8.4vw,6.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-forest whitespace-nowrap">
            Page not found
          </h1>
          <p className="mt-8 text-center font-sans text-2xl text-forest/70 whitespace-nowrap">
            Sorry, this page doesn&rsquo;t exist
          </p>
          <Link
            href="/"
            className="mt-10 font-sans text-2xl font-semibold text-gold underline underline-offset-4 hover:text-forest"
          >
            Return to homepage
          </Link>
        </Container>
      </section>
    </>
  );
}
