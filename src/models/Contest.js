class Contest {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.link = `https://codeforces.com/contest/${this.id}`;
    this.problems = [];
  }

  addProblem(index, solvedCount) {
    this.problems.push({ index, solvedCount });
  }
}

export default Contest;
