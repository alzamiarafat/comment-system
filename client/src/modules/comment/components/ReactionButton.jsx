import React from "react";

const ReactionButton = ({
  count = 0,
  isActive = false,
  onAction,
  ActiveIcon,
  InactiveIcon,
  activeColorClass = "text-blue-600",
}) => {
  // Logic: Assign values based on state (No else used)
  let Icon = InactiveIcon;
  let textStyles = "text-gray-500 hover:opacity-80";

  if (isActive) {
    Icon = ActiveIcon;
    textStyles = `${activeColorClass} font-semibold`;
  }

  return (
    <button
      type="button"
      className={`flex items-center p-2 text-sm transition-colors ${textStyles}`}
      onClick={onAction}
    >
      <Icon className="mr-1.5 w-4 h-4" />
      <span>{count}</span>
    </button>
  );
};

export default ReactionButton;
