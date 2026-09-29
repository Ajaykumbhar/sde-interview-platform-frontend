import { useNavigate, useParams } from "react-router-dom";
import { deleteProblem, getProblemById } from "../../services/problemApi";
import { useEffect, useState } from "react";
import type { Problem } from "../../types/problem";
import Button from "../../components/Button";

function ProblemDetailsPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch problem details based on the ID from the URL
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(Number(id));
        setProblem(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load problem");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleDelete = async () => {
    if (!problem) {
      return;
    }
    try {
      await deleteProblem(Number(id));
      navigate("/problems");
    } catch (err) {
      console.error(err);
      setError("Failed to delete problem");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  if (!problem) {
    return <h2>Problem Not Found</h2>;
  }

  return (
    <div>
      <h1>Problem Details</h1>
      <Button onClick={() => navigate(`/editProblem/${problem.id}`)}>
        Edit Problem
      </Button>
      <Button onClick={() => navigate("/problems")}>Back to Problems</Button>
      <hr />
      <p>ID: {problem.id}</p>
      <h2>{problem.title}</h2>
      <p>Difficulty: {problem.difficulty}</p>
      <Button onClick={handleDelete}>Delete Problem</Button>
    </div>
  );
}

export default ProblemDetailsPage;
