import githubImageUrl from "./github.png";

export function GitHubLink() {
  return (
    <a
      className="github"
      href="https://github.com/vilanz/react-gol"
      target="_blank"
      rel="noreferrer"
    >
      <img src={githubImageUrl} alt="GitHub" />
      source
    </a>
  );
}
