import React, { useState, useEffect } from "react";
import fetchAttemptedProblems from "../utils/fetchAttemptedProblems";
import styled from "styled-components";

function getUniqueProblems(firstObj, secondObj) {
  // Create a set of unique problem identifiers from the first object
  const firstProblemsSet = new Set(
    firstObj.OK_problems.map(
      (problem) => `${problem.contestID}-${problem.index}`
    )
  );

  // Filter problems in the second object that are not in the first set
  const uniqueProblems = secondObj.OK_problems.filter(
    (problem) => !firstProblemsSet.has(`${problem.contestID}-${problem.index}`)
  );

  // Create a set to keep track of identifiers to remove duplicates within uniqueProblems
  const uniqueProblemsSet = new Set();
  const finalUniqueProblems = [];

  uniqueProblems.forEach((problem) => {
    const identifier = `${problem.contestID}-${problem.index}`;
    if (!uniqueProblemsSet.has(identifier)) {
      uniqueProblemsSet.add(identifier);
      finalUniqueProblems.push(problem);
    }
  });

  return finalUniqueProblems;
}

const BattlePage = () => {
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const yourProblems = JSON.parse(localStorage.getItem("yourProblems"));
  const opponentProblems = JSON.parse(localStorage.getItem("opponentProblems"));

  const [difference, setDifference] = useState(
    getUniqueProblems(yourProblems, opponentProblems)
  );

  console.log(difference);

  const yourHandle = userDetails[0].handle;
  const opponentHandle = userDetails[1].handle;

  console.log(yourProblems);
  console.log(opponentProblems);
  const yourRating = userDetails[0].rating;
  const opponentRating = userDetails[1].rating;

  const yourProblemsSolved = yourProblems.OK_problems.length;
  const opponentProblemsSolved = opponentProblems.OK_problems.length;
  const [questionData, setQuestionData] = useState([]);

    const handleRefresh = async () => {
      const yourProblems = await fetchAttemptedProblems(yourHandle);
      const opponentProblems = await fetchAttemptedProblems(opponentHandle);
      localStorage.removeItem("yourProblems");
      localStorage.removeItem("opponentProblems");

      if (yourProblems && opponentProblems) {
        localStorage.setItem("yourProblems", JSON.stringify(yourProblems));
        localStorage.setItem(
          "opponentProblems",
          JSON.stringify(opponentProblems)
        );

        const newDifference = getUniqueProblems(yourProblems, opponentProblems);
        setDifference(newDifference);
      }
    };


    useEffect(() => {
      // Apply filters to the question data
      const filteredQuestions = difference.filter((question) => {
        const ratingFilter =
          selectedRating === "all" ||
          (selectedRating === "<1200" && question.rating < 1200) ||
          (selectedRating === "1200-1399" &&
            question.rating >= 1200 &&
            question.rating < 1400) ||
          (selectedRating === "1400-1599" &&
            question.rating >= 1400 &&
            question.rating < 1600) ||
          (selectedRating === "1600-1899" &&
            question.rating >= 1600 &&
            question.rating < 1900) ||
          (selectedRating === "1900-2099" &&
            question.rating >= 1900 &&
            question.rating < 2100) ||
          (selectedRating === "2100-2299" &&
            question.rating >= 2100 &&
            question.rating < 2300) ||
          (selectedRating === "2300-2399" &&
            question.rating >= 2300 &&
            question.rating < 2400) ||
          (selectedRating === "2400-2599" &&
            question.rating >= 2400 &&
            question.rating < 2600) ||
          (selectedRating === "2600-2999" &&
            question.rating >= 2600 &&
            question.rating < 3000) ||
          (selectedRating === ">=3000" && question.rating >= 3000);

        const tagFilter =
          selectedTag === "all" || question.tags.includes(selectedTag);

        return ratingFilter && tagFilter;
      });

      setQuestionData(filteredQuestions);
    }, [difference, selectedRating, selectedTag]);

  // setQuestionData(filteredQuestions);

  return (
    <BigContainer>
      <Container>
        <Header>
          <User>
            <img src={userDetails[0].titlePhoto} alt={yourHandle} />
            <Username>{yourHandle}</Username>
            <Rating>Rating: {yourRating}</Rating>
            <StatsItem>Problems Solved: </StatsItem> {yourProblemsSolved}
          </User>
          <VS>VS</VS>
          <User>
            <img src={userDetails[1].titlePhoto} alt={opponentHandle} />
            <Username>{opponentHandle}</Username>
            <Rating>Rating: {opponentRating}</Rating>
            <StatsItem>Problems Solved: </StatsItem> {opponentProblemsSolved}
          </User>
        </Header>
        <Stats>
          <StatsItem>
            <strong>
              Your are {questionData.length} problems below your opponent
            </strong>
          </StatsItem>
        </Stats>
        <Filters>
          <label>
            Rating Range:
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="all">All</option>
              <option value="<1200">Below 1200</option>
              <option value="1200-1399">1200-1399</option>
              <option value="1400-1599">1400-1599</option>
              <option value="1600-1899">1600-1899</option>
              <option value="1900-2099">1900-2099</option>
              <option value="2100-2299">2100-2299</option>
              <option value="2300-2399">2300-2399</option>
              <option value="2400-2599">2400-2599</option>
              <option value="2600-2999">2600-2999</option>
              <option value=">=3000">3000 and above</option>
            </select>
          </label>
          <label>
            Tags:
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="all" title="all">
                All
              </option>
              <option value="2-sat" title="2-satisfiability">
                2-sat
              </option>
              <option value="binary search" title="Binary search">
                binary search
              </option>
              <option value="bitmasks" title="Bitmasks">
                bitmasks
              </option>
              <option value="brute force" title="Brute force">
                brute force
              </option>
              <option
                value="chinese remainder theorem"
                title="Сhinese remainder theorem"
              >
                chinese remainder theorem
              </option>
              <option value="combinatorics" title="Combinatorics">
                combinatorics
              </option>
              <option
                value="constructive algorithms"
                title="Constructive algorithms"
              >
                constructive algorithms
              </option>
              <option
                value="data structures"
                title="Heaps, binary search trees, segment trees, hash tables, etc"
              >
                data structures
              </option>
              <option value="dfs and similar" title="Dfs and similar">
                dfs and similar
              </option>
              <option value="divide and conquer" title="Divide and Conquer">
                divide and conquer
              </option>
              <option value="dp" title="Dynamic programming">
                dp
              </option>
              <option value="dsu" title="Disjoint set union">
                dsu
              </option>
              <option
                value="expression parsing"
                title="Parsing expression grammar"
              >
                expression parsing
              </option>
              <option value="fft" title="Fast Fourier transform">
                fft
              </option>
              <option value="flows" title="Graph network flows">
                flows
              </option>
              <option value="games" title="Games, Sprague–Grundy theorem">
                games
              </option>
              <option value="geometry" title="Geometry, computational geometry">
                geometry
              </option>
              <option
                value="graph matchings"
                title="Graph matchings, König's theorem, vertex cover of bipartite graph"
              >
                graph matchings
              </option>
              <option value="graphs" title="Graphs">
                graphs
              </option>
              <option value="greedy" title="Greedy algorithms">
                greedy
              </option>
              <option value="hashing" title="Hashing, hashtables">
                hashing
              </option>
              <option
                value="implementation"
                title="Implementation problems, programming technics, simulation"
              >
                implementation
              </option>
              <option value="interactive" title="Interactive problem">
                interactive
              </option>
              <option
                value="math"
                title="Mathematics including integration, differential equations, etc"
              >
                math
              </option>
              <option
                value="matrices"
                title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations"
              >
                matrices
              </option>
              <option value="meet-in-the-middle" title="Meet-in-the-middle">
                meet-in-the-middle
              </option>
              <option
                value="number theory"
                title="Number theory: Euler function, GCD, divisibility, etc"
              >
                number theory
              </option>
              <option
                value="probabilities"
                title="Probabilities, expected values, statistics, random variables, etc"
              >
                probabilities
              </option>
              <option value="schedules" title="Scheduling Algorithms">
                schedules
              </option>
              <option
                value="shortest paths"
                title="Shortest paths on weighted and unweighted graphs"
              >
                shortest paths
              </option>
              <option value="sortings" title="Sortings, orderings">
                sortings
              </option>
              <option
                value="string suffix structures"
                title="Suffix arrays, suffix trees, suffix automatas, etc"
              >
                string suffix structures
              </option>
              <option
                value="strings"
                title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc"
              >
                strings
              </option>
              <option value="ternary search" title="Ternary search">
                ternary search
              </option>
              <option value="trees" title="Trees">
                trees
              </option>
              <option value="two pointers" title="Two pointers">
                two pointers
              </option>
              {/* Add more tags as necessary */}
            </select>
          </label>
        </Filters>
        <QuestionBox>
          <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
          {questionData.length === 0 ? (
            <NoProblemsMessage>No Problems Here</NoProblemsMessage>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Contest ID</th>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {questionData.map((question, index) => (
                  <tr key={index}>
                    <td>{question.contestID}</td>
                    <td>{question.index}</td>
                    <td>
                      <a
                        href={`https://codeforces.com/contest/${question.contestID}/problem/${question.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {question.name}
                      </a>
                    </td>
                    <td>{question.rating}</td>
                    <td>{question.tags.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </QuestionBox>
      </Container>
    </BigContainer>
  );
};

const BigContainer = styled.div`
  background: url("https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_1280.jpg")
    no-repeat center center/cover;
  text-align: center;
  height: 100vh;
  overflow: hidden; /* This will remove both vertical and horizontal scroll bars */
`;

const Container = styled.div`
  padding: 50px;
  color: white;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const User = styled.div`
  text-align: center;
  margin: 0 20px;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

const Username = styled.div`
  font-size: 1.5em;
  margin-top: 10px;
`;

const Rating = styled.div`
  font-size: 1em;
  margin-top: 5px;
`;

const VS = styled.div`
  font-size: 2em;
  margin: 0 20px;
`;

const Stats = styled.div`
  margin-bottom: 20px;
`;

const StatsItem = styled.div`
  font-size: 1.2em;
  margin-top: 10px;
`;

const Filters = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 20px;
    font-size: 1em;
  }

  select {
    margin-left: 10px;
  }
`;

const QuestionBox = styled.div`
  background: #defadc;
  padding: 20px;
  border-radius: 10px;
  max-height: 500px;
  overflow-y: auto;
  color: black;

  thead {
    color: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #333;
  }
`;

const NoProblemsMessage = styled.div`
  font-size: 2em;
  height: 100px;
  color: black;
  width: 100%;
  text-align: center;
`;

const RefreshButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  float: right;
`;

export default BattlePage;
