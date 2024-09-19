import { useDrop } from 'react-dnd';
import './style.css';
import { zones } from './defaultOptions.json';

const DropZone = ({ zone, onDrop }) => {
  const getItemValues = type => zones.find(zone => type === zone.type);

  const acceptableZones = zones.map(zone => zone.type);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: acceptableZones.includes(zone) ? zone : 'drink',
      drop: item => onDrop(zone, item.label),
      collect: monitor => ({
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
            ? 'var(--linear-gradient)'
            : getItemValues(zone).color,
        }}
      >
        <p>{zone}</p>
      </div>
    </div>
  );
};

export default DropZone;
