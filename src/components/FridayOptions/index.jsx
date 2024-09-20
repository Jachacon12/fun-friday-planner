import { useState, useEffect, useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem.jsx";
import DropZone from "./DropZone.jsx";
import "./style.css";
import { options, zones } from "./defaultOptions.json";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const FridayOptions = ({ isVisible, closePanel }) => {
  // derived state from zones
  const availableZones = zones.reduce(
    (acc, zone) => ({ ...acc, [zone.type]: null }),
    {}
  );

  const [choices, setChoices] = useState(() => {
    // Initial load from localStorage
    const data = localStorage.getItem("options");
    try {
      return data ? JSON.parse(data) : availableZones;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return availableZones;
    }
  });

  // Save choices to localStorage (debounced for efficiency)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("options", JSON.stringify(choices));
    }, 300); // 300ms debounce to avoid frequent writes

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [choices]);

  // Memoize the handleDrop function to prevent unnecessary re-renders
  const handleDrop = useCallback((zone, item) => {
    setChoices((prevChoices) => ({
      ...prevChoices, // Spread the previous state
      [zone]: item, // Update the specific zone
    }));
  }, []);

  // Conditionally render the panel based on visibility
  if (!isVisible) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="drag-root fixed-position">
        <section className="drag-container">
          <div className="inline-button" onClick={closePanel}>
            <ArrowCircleLeftIcon
              fontSize="large"
              sx={{ color: "var(--primary-color)" }}
            />
            <p className="dark-font bold-font">BACK</p>
          </div>
          <header>
            <h3>Let&#39;s get ready</h3>
          </header>
          <section className="options-section">
            {options.map((option, index) => (
              <DraggableItem
                key={index}
                type={option.type}
                asset={option.asset}
                label={option.label}
              />
            ))}
          </section>
          <section className="zones-section">
            {zones.map((zone, index) => (
              <DropZone
                key={index}
                zone={zone.type}
                value={choices[zone.type]}
                onDrop={handleDrop}
              />
            ))}
          </section>
        </section>
      </section>
    </DndProvider>
  );
};

export default FridayOptions;
