import { useEffect, useState } from "react";

export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => {
      setMatches(e.matches);
      console.log("resize");
    };

    mediaMatch.addEventListener("resize", handler);
    return () => mediaMatch.removeEventListener("resize", handler);
  });
  return matches;
};
