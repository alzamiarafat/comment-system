export default function Select(props) {
  const { label, defaultValue, handleOnChange, options } = props;

  return (
    <div className="flex items-center gap-1 text-sm">
      {label && (
        <label className="text-gray-600 dark:text-gray-300">{label}:</label>
      )}
      <select
        value={defaultValue}
        onChange={handleOnChange}
        className="rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
