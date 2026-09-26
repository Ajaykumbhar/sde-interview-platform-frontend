import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProblemCard from "../../components/ProblemCard";
import type { Problem } from "../../types/problem";
import { getProblems } from "../../api/problemApi";

function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

    fetchProblems();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>DSA Problems</h1>

      <input
        type="text"
        placeholder="Search Problem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredProblems.length} Problems Found</p>

      {filteredProblems.length === 0 ? (
        <p>No Matching Problems Found</p>
      ) : (
        <div>
          {filteredProblems.map((problem) => (
            <div key={problem.id}>
              <ProblemCard
                title={problem.title}
                difficulty={problem.difficulty}
              />
            </div>
          ))}
        </div>
      )}

      <Button text="Submit" />
    </div>
  );
}

export default ProblemsPage;
