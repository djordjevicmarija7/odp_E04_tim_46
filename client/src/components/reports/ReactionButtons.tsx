import type { ReactionType } from "../../types/reactions/ReactionType";

interface Props {
  onReact: (reaction: ReactionType) => void;
}

export function ReactionButtons({ onReact }: Props) {
  return (
    <div className="flex gap-3 mt-4">
      <button onClick={() => onReact("like")} className="btn-secondary">👍</button>
      <button onClick={() => onReact("dislike")} className="btn-secondary">👎</button>
      <button onClick={() => onReact("neutral")} className="btn-secondary">😐</button>
    </div>
  );
}

