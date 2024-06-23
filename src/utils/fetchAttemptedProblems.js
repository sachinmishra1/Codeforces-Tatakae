async function fetchAttemptedProblems(handle) {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}`
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();

    // Initialize arrays to store filtered problems
    const okProblems = [];
    const wrongAnswerProblems = [];

    // Process each problem in the result array
    responseData.result.forEach((problem) => {
      // Extract necessary fields
      const { contestId, index, name, rating, tags } = problem.problem;
      const { verdict } = problem;

      // Prepare the problem data object
      const problemData = {
        contestID: contestId,
        index,
        name,
        rating,
        tags,
        verdict,
      };

      // Depending on the verdict, push to appropriate array
      if (verdict === "OK") {
        okProblems.push(problemData);
      } else if (verdict === "WRONG_ANSWER") {
        wrongAnswerProblems.push(problemData);
      }
    });

    // Prepare the final object with filtered data
    const filteredData = {
      OK_problems: okProblems,
      WRONG_ANSWER_problems: wrongAnswerProblems,
    };

      // console.log(filteredData); // Output the filtered data
      return filteredData;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Call the function to fetch and process data
export default fetchAttemptedProblems;
