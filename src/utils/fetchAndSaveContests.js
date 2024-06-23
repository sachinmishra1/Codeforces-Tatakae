const fetchAndSaveContests = async () => {
  try {
    // Fetch contests data from API
    const contestsResponse = await fetch(
      "https://codeforces.com/api/contest.list"
    );
    if (!contestsResponse.ok) {
      throw new Error("Failed to fetch contests data");
    }
    const contestsData = await contestsResponse.json();

    // Filter contests with phase !== "FINISHED"
    const finishedContests = contestsData.result.filter(
      (contest) => contest.phase === "FINISHED"
    );

    // Sort contests reversibly by startTimeSeconds
    finishedContests.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);

    // Fetch problem statistics data from API
    const problemStatsResponse = await fetch(
      "https://codeforces.com/api/problemset.problems"
    );
    if (!problemStatsResponse.ok) {
      throw new Error("Failed to fetch problem statistics data");
    }
    const problemStatsData = await problemStatsResponse.json();

    // Transform data into desired format
    const formattedContests = finishedContests.map((d) => {
      const contest = {
        id: d.id,
        name: d.name,
        type: d.type,
        problems: [],
      };
      const problems = problemStatsData.result.problems.filter(
        (ps) => ps.contestId === d.id
      );
      problems.reverse().forEach((problem) => {
        contest.problems.push({
          index: problem.index,
          rating: problem.rating,
          link: `https://codeforces.com/contest/${contest["id"]}/problem/${problem.index}`,
          solved: 0,
        });
      });
      return contest;
    });

    // Save contests in localStorage
    localStorage.setItem("contestsData", JSON.stringify(formattedContests));

    return formattedContests;
  } catch (error) {
    console.error("Error fetching and saving data:", error);
    throw error; // Re-throw error to handle it in the component
  }
};

export default fetchAndSaveContests;
