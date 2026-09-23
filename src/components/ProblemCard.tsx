type ProblemsCardProps = {
  title: string;
  difficulty: string;
};

function ProblemCard({ title, difficulty }: ProblemsCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{difficulty}</p>
    </div>
  );
}

export default ProblemCard;
