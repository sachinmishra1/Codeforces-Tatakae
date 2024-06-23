import React from "react";

const DisplayFilters = ({
  usernames,
  onUpdateSelected,
  onTogglePicked,
  onRefreshSub,
}) => {
  const handleRefresh = () => {
    onRefreshSub();
  };

  return (
    <div>
      <div>
        <span>Usernames: {usernames.join(", ")}</span>
      </div>
      <button onClick={handleRefresh}>Refresh Submissions</button>
    </div>
  );
};

export default DisplayFilters;
