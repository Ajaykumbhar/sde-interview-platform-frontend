import { useState, type SyntheticEvent } from "react";
import { createProblem } from "../../services/problemApi";
import ProblemForm from "../../components/ProblemForm";

function CreateProblemsPage() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setSuccess("");
    setError("");
    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    if (!difficulty) {
      setError("Difficulty is required");
      setLoading(false);
      return;
    }
    setLoading(true);
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
        submitButtonText={loading ? "Creating..." : "Create Problem"}
      />
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CreateProblemsPage;
