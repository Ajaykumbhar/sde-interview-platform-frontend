import Button from "../../components/Button";
import ProblemCard from "../../components/ProblemCard";
import { problems } from "../../data/problems";
import { useEffect, useState } from "react";

function ProblemsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h1>DSA Problems</h1>
      {problems.length === 0 ? (
        <p>No Problems Found</p>
      ) : (
        <div>
          <p> Practice coding problems here.</p>
          {problems.map((problem) => (
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
