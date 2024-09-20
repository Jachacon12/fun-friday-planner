import { useDrop } from "react-dnd";
import "./style.css";
import { options, zones } from "./defaultOptions.json";

const DropZone = ({ zone, value, onDrop }) => {
  const { label, asset } = options.find((option) => option.label === value);
  const getItemValues = (type) => zones.find((zone) => type === zone.type);

  const acceptableZones = zones.map((zone) => zone.type);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: acceptableZones.includes(zone) ? zone : "drink",
      drop: (item) => onDrop(zone, item.label),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [zone, acceptableZones]
  );

  return (
    <div>
      <div
        ref={drop}
        className="dropbox"
        style={{
          background: isOver
            ? "var(--linear-gradient)"
            : getItemValues(zone).color,
        }}
      >
        <p>{zone}:</p>
        <div className="current-selection">
          <span>{label}</span> <img src={asset} alt={label} />
        </div>
      </div>
    </div>
  );
};

export default DropZone;
