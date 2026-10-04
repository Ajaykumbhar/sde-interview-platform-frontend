import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProblemCard from "../../components/ProblemCard";
import type { Problem } from "../../types/problem";
import { deleteProblem, getProblems } from "../../services/problemApi";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorUtils";
function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProblems() {
      try {
        const data = await getProblems("");
        setProblems(data);
      } catch (err) {
        console.error(err);
        setError(String(getErrorMessage(err)));
      } finally {
        setLoading(false);
      }
    }
    console.log("Fetching...");
    fetchProblems();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredProblems = problems.filter((problem) => {
    return problem.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (id?: number) => {
    if (id === undefined) {
      return;
    }
    try {
      await deleteProblem(id);
      setProblems(problems.filter((problem) => problem.id !== id));
    } catch (err) {
      console.error(err);
      setError(String(getErrorMessage(err)));
    }
  };

  const handleDifficultyFilter = async (difficulty: string) => {
    try {
      setLoading(true);
      if (difficulty === "") {
        const data = await getProblems("");
        setProblems(data);
      } else {
        const data = await getProblems(difficulty);
        setProblems(data);
      }
    } catch (err) {
      console.error(err);
      setError(String(getErrorMessage(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>DSA Problems</h1>
        <Button onClick={() => navigate("/createProblem")}>
          + Create Problem
        </Button>
      </div>
      <input
        type="text"
        placeholder="Search Problem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <button onClick={() => handleDifficultyFilter("")}>All</button>
        <button onClick={() => handleDifficultyFilter("Easy")}>Easy</button>
        <button onClick={() => handleDifficultyFilter("Medium")}>Medium</button>
        <button onClick={() => handleDifficultyFilter("Hard")}>Hard</button>
      </div>
      <p>{filteredProblems.length} Problems Found</p>

      {filteredProblems.length === 0 ? (
        <p>No Matching Problems Found</p>
      ) : (
        <div>
          {filteredProblems.map((problem) =>
            problem.id === undefined ? null : (
              <div
                key={problem.id}
                onClick={() => navigate(`/problemDetails/${problem.id}`)}
                style={{ cursor: "pointer" }}
              >
                <ProblemCard
                  id={problem.id}
                  title={problem.title}
                  difficulty={problem.difficulty}
                  onEdit={() => navigate(`/editProblem/${problem.id}`)}
                  onDelete={() => {
                    // Implement delete functionality
                    handleDelete(problem.id);
                  }}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default ProblemsPage;
