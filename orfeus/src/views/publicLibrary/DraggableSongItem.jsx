import React from 'react';
import { useDrag } from 'react-dnd';
import SongItem from './SongItem';

const DraggableSongItem = ({ id, ...props }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'song',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <SongItem id={id} {...props} />
    </div>
  );
};

export default DraggableSongItem;
