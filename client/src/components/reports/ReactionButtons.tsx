import type { ReactionType } from "../../types/reactions/ReactionType";

interface Props {
  onReact: (reaction: ReactionType) => void;
}

export function ReactionButtons({ onReact }: Props) {
  return (
    <div className="flex gap-2 mt-4">
      <button onClick={() => onReact("like")}>👍</button>
      <button onClick={() => onReact("dislike")}>👎</button>
            <button onClick={() => onReact("neutral")}>:/</button>
    </div>
  );
}
