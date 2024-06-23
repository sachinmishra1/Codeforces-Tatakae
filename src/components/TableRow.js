import React from "react";

const TableRow = ({ contest, singleUser }) => {
  return (
    <tr>
      <td>
        <a href={contest.link} target="_blank" rel="noopener noreferrer">
          {contest.name}
        </a>
      </td>
      {contest.problems.map((problem) => (
        <td key={problem.index}>
          <a href={problem.link} target="_blank" rel="noopener noreferrer">
            {problem.index}
          </a>
          {singleUser && (
            <span style={{ color: problem.solved > 0 ? "green" : "red" }}>
              {problem.solved > 0 ? "Solved" : "Unsolved"}
            </span>
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
