import { useState } from "react";

export default function Photo({ src, alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);
  const classes = ["photo", className].filter(Boolean).join(" ");

  if (failed) {
    return (
      <div
        className={`photo-fallback ${className}`.trim()}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        {alt ? <span>{alt}</span> : null}
      </div>
    );
  }

  return (
    <img
      className={classes}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
