import { useEffect, useState, type SyntheticEvent } from "react";
import { getProblemById, updateProblem } from "../../services/problemApi";
import { useParams } from "react-router-dom";
import ProblemForm from "../../components/ProblemForm";

function EditProblemsPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadProblem() {
      if (!id) {
        return;
      }
      try {
        const problem = await getProblemById(Number(id));
        setTitle(problem.title);
        setDifficulty(problem.difficulty);
      } catch (err) {
        console.error(err);
        setError("Failed to load problem");
      }
    }

    loadProblem();
  }, [id]);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!difficulty) {
      setError("Difficulty is required");
      return;
    }
    if (!id) {
      setError("Problem ID not found");
      return;
    }
    setLoading(true);
    try {
      await updateProblem(Number(id), { title, difficulty });
      setSuccess("Problem updated successfully");
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to update problem");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Edit Problem</h1>
      <ProblemForm
        title={title}
        difficulty={difficulty}
        onTitleChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        onDifficultyChange={(e) => {
          setDifficulty(e.target.value);
          setError("");
        }}
        onSubmit={handleSubmit}
        submitButtonText={loading ? "Updating..." : "Update Problem"}
        disabled={loading}
      />
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      {/* Add your form or content for editing problems here */}
    </div>
  );
}

export default EditProblemsPage;
