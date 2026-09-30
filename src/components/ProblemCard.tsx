import Button from "./Button";
import "../styles/card.css";
type ProblemsCardProps = {
  id: number;
  title: string;
  difficulty: string;
  onEdit: () => void;
  onDelete: () => void;
};

function ProblemCard({
  title,
  difficulty,
  onEdit,
  onDelete,
}: ProblemsCardProps) {
  return (
    <div className="problem-card">
      <h3 className="problem-title">{title}</h3>
      <p className="problem-difficulty">{difficulty}</p>
      <Button
        className="problem-actions"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Edit
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default ProblemCard;
