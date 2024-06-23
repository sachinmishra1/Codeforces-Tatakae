import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DisplayFilters from "./DisplayFilters";
import fetchAndSaveContests from "../utils/fetchAndSaveContests";
import fetchAttemptedProblems from "../utils/fetchAttemptedProblems";

const returnColor = function (rating) {
    let fontColor;
    if (rating < 1200) {
      fontColor = "#CDCDCC";
    } else if (rating < 1400) {
      fontColor = "#77FF77";
    } else if (rating < 1600) {
      fontColor = "#76DDBA";
    } else if (rating < 1900) {
      fontColor = "#AAAAFF";
    } else if (rating < 2100) {
      fontColor = "#FE88FE";
    } else if (rating < 2300) {
      fontColor = "#FFCD89";
    } else if (rating < 2400) {
      fontColor = "#FEBA55";
    } else if (rating < 2600) {
      fontColor = "#FF7676";
    } else if (rating < 3000) {
      fontColor = "#FE3233";
    } else {
      fontColor = "#AA0000";
    }
    return fontColor;
}

const Container = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background-color: #4caf50;
  color: white;
`;

const TableRowHeader = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableBody = styled.tbody`
  font-size: 18px;
`;

const TableRowData = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const ContestNameCell = styled.td`
  width: 25%;
  padding: 12px;
  word-wrap: break-word;
`;

const ProblemsCell = styled.td`
  padding: 12px;
  text-align: center;
`;

const ProblemLink = styled.a`
  text-decoration: none;
  color: #333;
`;

const ProblemBox = styled.div`
  padding: 8px;
  margin: 4px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) =>
    props.solved === 1
      ? "#4CAF50" // Green for solved
      : props.solved === 2
      ? "#FF6347" // Red for wrong answer
      : "white"}; // White for unsolved
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
`;

export class Problem {
  constructor(contestId, index, solvedCount) {
    this.index = index;
    this.link = `https://codeforces.com/contest/${contestId}/problem/${index}`;
    this.solved = 0; // 0 - Unsolved, 1 - Solved, 2 - Wrong answer
    this.solvedCount = solvedCount;
  }

  setSolved(value) {
    this.solved = value;
  }
}

const ContestList = ({ usernames }) => {
    const [contests, setContests] = useState([]);
    const [selected, setSelected] = useState([]);
    const [picked, setPicked] = useState("all");

    useEffect(() => {
        const loadContests = async () => {
            const contestsData = localStorage.getItem("contestsData");
            if (contestsData) {
                setContests(JSON.parse(contestsData));
            } else {
                try {
                    const fetchedContests = await fetchAndSaveContests();
                    setContests(fetchedContests);
                } catch (error) {
                    console.error("Error fetching contests:", error);
                }
            }
        };

        loadContests();
    }, []);

    const refreshContests = async () => {
        try {
            const fetchedContests = await fetchAndSaveContests();
            setContests(fetchedContests);
        } catch (error) {
            console.error("Error refreshing contests:", error);
        }
    };

    const display = (contest) => {
        return (
            (!selected.length || selected.includes(contest.type)) &&
            (picked === "all"
                ? true
                : picked === "active"
                    ? contest.active
                    : contest.passive)
        );
    };

    return (
        <Container>
        { fetchAttemptedProblems('Flamense160') }
      <DisplayFilters
        usernames={usernames}
        onUpdateSelected={setSelected}
        onTogglePicked={setPicked}
        onRefreshSub={refreshContests}
      />
      <hr />
      {!contests.length ? (
        <LoadingText>Loading.....</LoadingText>
      ) : (
        <Table>
          <TableHead>
            <TableRowHeader>
              <TableHeader>Contest Name</TableHeader>
              <TableHeader>Problems</TableHeader>
            </TableRowHeader>
          </TableHead>
          <TableBody>
            {contests.filter(display).map((contest) => (
              <TableRowData key={contest.id}>
                <ContestNameCell>
                  <a
                    href={`https://codeforces.com/contest/${contest.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    {contest.name}
                  </a>
                </ContestNameCell>
                <ProblemsCell>
                  {contest.problems.map((problem) => (
                    <ProblemBox key={problem.index} rating={problem.rating}>
                      <ProblemLink
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: returnColor(problem.rating) }}
                      >
                        {problem.index} ({problem.rating})
                      </ProblemLink>
                    </ProblemBox>
                  ))}
                </ProblemsCell>
              </TableRowData>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ContestList;
