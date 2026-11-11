import { useNavigate, useParams } from "react-router-dom";
import { deleteProblem, getProblemById } from "../../services/problemApi";
import { useEffect, useState } from "react";
import type { Problem } from "../../types/problem";
import Button from "../../components/Button";
import { getErrorMessage } from "../../utils/errorUtils";
import type {
  ProgressResponse,
  PersistedProgressStatus,
} from "../../types/progress";
import { getProgress, updateProgress } from "../../services/progressApi";

function ProblemDetailsPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States to hold the progress data
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState("");
  const [progressStatus, setProgressStatus] = useState<
    PersistedProgressStatus | ""
  >("");
  const [notes, setNotes] = useState<string>("");
  const [savingProgress, setSavingProgress] = useState(false);
  const [saveProgressError, setSaveProgressError] = useState("");
  const [saveProgressSuccessMessage, setSaveProgressSuccessMessage] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch problem details based on the ID from the URL
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(Number(id));
        setProblem(data);
      } catch (err) {
        console.error(err);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

useEffect(() => {
  if (!problem || problem.id === undefined) return;

  const problemId = problem.id;
  let active = true;

  const fetchProgress = async () => {
    try {
      setProgress(null);
      setProgressStatus("");
      setNotes("");
      setProgressLoading(true);
      setProgressError("");

      const progressData = await getProgress(problemId);

      if (!active) return;

      setProgress(progressData);

      setProgressStatus(
        progressData.status === "NOT_STARTED"
          ? ""
          : progressData.status
      );

      setNotes(progressData.notes ?? "");

    } catch (err) {
      if (active) {
        console.error(err);
        setProgress(null);
        setProgressStatus("");
        setNotes("");
        setProgressError(getErrorMessage(err));
      }
    } finally {
      if (active) {
        setProgressLoading(false);
      }
    }
  };

  fetchProgress();

  return () => {
    active = false;
  };

}, [problem?.id]);

  const handleDelete = async () => {
    if (!problem) {
      return;
    }
    try {
      await deleteProblem(Number(id));
      navigate("/problems");
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    }
  };

  const handleSaveProgress = async () => {
    if (!problem || problem.id === undefined || !progressStatus) {
      return;
    }
    try {
      setSavingProgress(true);
      setSaveProgressError("");
      setSaveProgressSuccessMessage("");
      const updatedProgress = await updateProgress(problem.id, {
        status: progressStatus,
        notes: notes,
      });
      setProgress(updatedProgress);
      setProgressStatus(
        updatedProgress.status === "NOT_STARTED" ? "" : updatedProgress.status,
      );
      setNotes(updatedProgress.notes ?? "");
      setSaveProgressSuccessMessage("Progress saved successfully!");
    } catch (err) {
      console.error(err);
      setSaveProgressError(getErrorMessage(err));
    } finally {
      setSavingProgress(false);
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
      <hr />
      <section>
        <h2>My Progress</h2>
        {progressLoading ? (
          <p>Loading your progress...</p>
        ) : progressError ? (
          <p role="alert">{progressError}</p>
        ) : (
          <>
            <p>
              Current Status:{" "}
              <strong>{progress?.status ?? "NOT_STARTED"}</strong>
            </p>
            <div>
              <label htmlFor="progressStatus">Update Status:</label>
              <select
                id="progressStatus"
                value={progressStatus}
                onChange={(e) => {
                  setProgressStatus(
                    e.target.value as PersistedProgressStatus | "",
                  );

                  setSaveProgressError("");
                  setSaveProgressSuccessMessage("");
                }}
              >
                <option value="">Select Status</option>
                <option value="ATTEMPTED">Attempted</option>
                <option value="SOLVED">Solved</option>
                <option value="NEEDS_REVISION">Needs Revision</option>
              </select>
            </div>
            <div>
              <label htmlFor="progress-notes">Notes:</label>
              <textarea
                id="progress-notes"
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                  setSaveProgressError("");
                  setSaveProgressSuccessMessage("");
                }}
                maxLength={5000}
                rows={5}
                placeholder="Write your approach, mistakes, or revision notes..."
              />
              <p>{notes.length}/5000 characters</p>
            </div>
            <Button
              onClick={handleSaveProgress}
              disabled={!progressStatus || savingProgress}
            >
              {savingProgress ? "Saving..." : "Save Progress"}
            </Button>
            {saveProgressError && <p role="alert">{saveProgressError}</p>}
            {saveProgressSuccessMessage && (
              <p role="status">{saveProgressSuccessMessage}</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default ProblemDetailsPage;
