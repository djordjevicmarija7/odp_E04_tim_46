// src/components/reports/ReactionButtons.tsx
import type { ReactionType } from "../../types/reactions/ReactionType";
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";

interface Props {
  onReact: (reaction: ReactionType) => void;
}

export function ReactionButtons({ onReact }: Props) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={() => onReact("like")}
        aria-label="Sviđa mi se"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Sviđa mi se"
      >
        <ThumbsUp size={16} className="text-[color:var(--nude-600)]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Like</span>
      </button>

      <button
        onClick={() => onReact("dislike")}
        aria-label="Ne sviđa mi se"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Ne sviđa mi se"
      >
        <ThumbsDown size={16} className="text-[color:#A63B3B]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Dislike</span>
      </button>

      <button
        onClick={() => onReact("neutral")}
        aria-label="Neutralno"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Neutralno"
      >
        <Meh size={16} className="text-[color:var(--muted)]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Neutral</span>
      </button>
    </div>
  );
}

