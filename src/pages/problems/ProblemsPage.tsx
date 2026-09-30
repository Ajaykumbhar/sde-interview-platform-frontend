import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProblemCard from "../../components/ProblemCard";
import type { Problem } from "../../types/problem";
import { deleteProblem, getProblems } from "../../services/problemApi";
import { useNavigate } from "react-router-dom";
function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProblems() {
      try {
        const data = await getProblems();
        setProblems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load problems");
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
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
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
      setError("Failed to delete problem");
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
        <button onClick={() => setDifficultyFilter("")}>All</button>
        <button onClick={() => setDifficultyFilter("Easy")}>Easy</button>
        <button onClick={() => setDifficultyFilter("Medium")}>Medium</button>
        <button onClick={() => setDifficultyFilter("Hard")}>Hard</button>
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
