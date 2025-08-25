import type { ReactionType } from "../../types/reactions/ReactionType";
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";

interface Props {
  onReact: (reaction: ReactionType) => void;
  disabled?: boolean;
}

export function ReactionButtons({ onReact, disabled = false }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onReact("like")}
        aria-label="Sviđa mi se"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Sviđa mi se"
        disabled={disabled}
      >
        <ThumbsUp size={16} className="text-[color:var(--nude-600)]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Like</span>
      </button>

      <button
        onClick={() => onReact("dislike")}
        aria-label="Ne sviđa mi se"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Ne sviđa mi se"
        disabled={disabled}
      >
        <ThumbsDown size={16} className="text-[color:#A63B3B]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Dislike</span>
      </button>

      <button
        onClick={() => onReact("neutral")}
        aria-label="Neutralno"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        title="Neutralno"
        disabled={disabled}
      >
        <Meh size={16} className="text-[color:var(--muted)]" />
        <span className="text-sm font-medium text-[color:var(--text-900)]">Neutral</span>
      </button>
    </div>
  );
}

export default ReactionButtons;
