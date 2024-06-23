export class Problem {
  constructor(contestId, index, solvedCount) {
    this.index = index;
    this.link = `https://codeforces.com/contest/${contestId}/problem/${index}`;
    this.solved = 0; // poor naming
    this.solvedCount = solvedCount;
  }

  setSolved(value) {
    if (this.solved !== 1) this.solved = value;
  }
}
