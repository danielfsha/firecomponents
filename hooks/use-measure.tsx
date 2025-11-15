import { RefObject, useEffect, useState } from "react";

const useMeasure = <T extends HTMLElement | null>({
  ref,
}: {
  ref: RefObject<T>;
}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();

        setHeight(rect.height);
        setWidth(rect.width);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { height, width };
};

export default useMeasure;
