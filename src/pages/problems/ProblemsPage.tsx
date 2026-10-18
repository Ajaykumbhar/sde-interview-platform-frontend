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
  const [sort, setSort] = useState("title,asc");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProblems() {
      setLoading(true);
      setError("");
      try {
        const data = await getProblems(difficulty, page, size, sort);
        setProblems(data.content);
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    console.log("Fetching...");
    fetchProblems();
  }, [difficulty, page, size, sort, refreshKey]);

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
      if (problems.length === 1 && page > 0) {
        setPage((curr) => Math.max(curr - 1, 0));
      } else {
        setRefreshKey((curr) => curr + 1);
      }
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    }
  };

  const handleDifficultyFilter = async (difficulty: string) => {
    setDifficulty(difficulty);
    setPage(0);
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
      <label htmlFor="sort-order">Sort by title:</label>
      <select
        id="sort-order"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(0);
        }}
      >
        <option value="title,asc">A to Z</option>
        <option value="title,desc">Z to A</option>
      </select>
      <div>
        <button onClick={() => handleDifficultyFilter("")}>All</button>
        <button onClick={() => handleDifficultyFilter("Easy")}>Easy</button>
        <button onClick={() => handleDifficultyFilter("Medium")}>Medium</button>
        <button onClick={() => handleDifficultyFilter("Hard")}>Hard</button>
      </div>

      <p>{totalElements} Problems Found</p>

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
                    handleDelete(problem.id);
                  }}
                />
              </div>
            ),
          )}
        </div>
      )}
      <div>
        <label htmlFor="page-size">Problems per Page:</label>
        <select
          id="page-size"
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
            setPage(0);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span>
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>
        <Button
          disabled={totalPages === 0 || page >= totalPages - 1}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ProblemsPage;
