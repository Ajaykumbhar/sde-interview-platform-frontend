import { useState, type SyntheticEvent } from "react";
import Button from "../../components/Button";
import { createProblem } from "../../services/problemApi";

function CreateProblemsPage() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      // Call your API to create the problem here
      await createProblem({ title, difficulty });
      setSuccess("Problem created successfully!");
      setTitle("");
      setDifficulty("");
    } catch (err) {
      console.error(err);
      setError("Error creating problem");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Create Problem</h1>

      {/* Add your form or content for creating problems here */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter problem title"
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Problem"}
        </Button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CreateProblemsPage;
