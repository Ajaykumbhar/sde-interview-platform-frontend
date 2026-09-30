import Button from "./Button";
import "./ProblemCard.css";
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
      <div className="problem-header">
        <div className="problem-info">
          <h3 className="problem-title">{title}</h3>

          <p className={`difficulty ${difficulty.toLowerCase()}`}>
            {difficulty}
          </p>
        </div>
        <div className="problem-actions">
          <Button
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
      </div>
    </div>
  );
}

export default ProblemCard;
