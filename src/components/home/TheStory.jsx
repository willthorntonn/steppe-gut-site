import { Fragment } from "react";
import { CHAPTERS } from "../../content/story";
import Chapter from "../editorial/Chapter";
import Plate from "../editorial/Plate";
import ChapterRail from "../editorial/ChapterRail";

// The long read itself: six chapters, each followed by its image plate.
// Composed from content/story.js rather than hand-built per section, so the
// rhythm stays even and the copy can be edited in one place.
export default function TheStory() {
  return (
    <>
      <ChapterRail chapters={CHAPTERS} />
      {CHAPTERS.map((chapter) => (
        <Fragment key={chapter.id}>
          <Chapter
            id={chapter.id}
            numeral={chapter.numeral}
            folio={chapter.folio}
            title={chapter.title}
            body={chapter.body}
            pullQuote={chapter.pullQuote}
          />
          {chapter.plate && <Plate {...chapter.plate} />}
        </Fragment>
      ))}
    </>
  );
}
