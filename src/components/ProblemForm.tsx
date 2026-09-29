import Button from "./Button";
import "./ProblemForm.css";
//Common Form Component for Create and Edit Problem
interface ProblemFormProps {
  title: string;
  difficulty: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  submitButtonText: string;
  disabled?: boolean;
}

function ProblemForm({
  title,
  difficulty,
  onTitleChange,
  onDifficultyChange,
  onSubmit,
  submitButtonText,
  disabled,
}: ProblemFormProps) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          disabled={disabled}
        />
      </div>
      <div className="form-group">
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={onDifficultyChange}
          disabled={disabled}
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <Button type="submit" disabled={disabled}>
        {submitButtonText}
      </Button>
    </form>
  );
}

export default ProblemForm;
