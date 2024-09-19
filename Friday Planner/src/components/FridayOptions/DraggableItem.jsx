import { useDrag } from 'react-dnd';

const DraggableItem = ({ type, label, asset }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, label },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={[`draggable-item ${type}-bg-color`]}
      style={{ opacity: isDragging ? 0.7 : 1 }}
    >
      <p>{label}</p>
      <img src={asset} alt={label} />
    </div>
  );
};

export default DraggableItem;
