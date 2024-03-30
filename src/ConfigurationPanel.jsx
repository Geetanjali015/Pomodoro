export default function ConfigurationPanel({ title, id, length, onIncrementButton, onDecrementButton }) {
  return (
    <div id={`${id}-label`}>
      <p className="subtitle">{title}</p>
      <div className="configuration-panel">
        <button id={`${id}-decrement`} onClick={onDecrementButton}>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <p id={`${id}-length`}>{length}</p>
        <button id={`${id}-increment`} onClick={onIncrementButton}>
          <i class="fa-solid fa-chevron-up"></i>
        </button>
      </div>
    </div>
  );
}
