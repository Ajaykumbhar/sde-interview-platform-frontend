import { useEffect, useState, type SyntheticEvent } from "react";
import Button from "../../components/Button";
import { getProblemById, updateProblem } from "../../services/problemApi";
import { useParams } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="Enter problem title"
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Problem"}
          </Button>
        </div>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      {/* Add your form or content for editing problems here */}
    </div>
  );
}

export default EditProblemsPage;
