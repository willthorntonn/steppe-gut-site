"use client";

import Container from "../components/ui/Container";
import ContactForm from "../components/contact/ContactForm";

// Reached from the footer's "Contact Us" button. Deliberately bare: the global
// nav and footer come from Layout, and the only thing this route adds is the
// "Contact us" block lifted verbatim from /buy/ (heading + the ~55%-enlarged
// shared form in components/contact/ContactForm.jsx).
export default function Contact() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-20 pt-[112px] sm:pb-28 sm:pt-[132px] lg:pb-36 lg:pt-[186px]"
      >
        <Container width="content" className="text-center">
          {/* Same serif treatment as the /buy/ "Contact us" heading. Carries
              #page-title so the route-change focus move lands here. */}
          <h1
            id="page-title"
            tabIndex={-1}
            className="font-serif text-[clamp(2.7rem,6.48vw,5.13rem)] font-semibold leading-none tracking-[-0.04em] text-forest outline-none"
          >
            Contact us
          </h1>
          <ContactForm />
        </Container>
      </div>
    </>
  );
}
