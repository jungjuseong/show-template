import {useState, useRef, useLayoutEffect} from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import { girl,lotion } from "./blob";

const url = 'https://konvajs.github.io/assets/yoda.jpg';

function UseImage({src, x, y, width, height}) {
  const [image] = useImage(src);

  return <Image image={image} x={x} y={y} width={width} draggable={true}/>;
}
export const Draw = (props) => {
  const {shapes} = props;

  const drawItems = shapes.map((shape,idx) => {
    const attrs = shape.attrs;
    if (attrs.type === 'text') {
      return <Text {...attrs} key={attrs.type + idx}/>
    }
    else if (shape.attrs.type === 'image') {
      return <UseImage x={attrs.x} y={attrs.y} src={attrs.src} key={attrs.type + idx}/>
    }
    else if (shape.type === 'rectangle') {
      return <Rect x={attrs.x} y={attrs.y} fill={attrs.fill} width={attrs.width} height={attrs.height}
      key={attrs.type + idx}/>
    }
  })

  return (
    (shapes.length === 0) ?
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Some text on canvas" fontSize={15} />
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
        />
        <Circle x={200} y={100} radius={50} fill="green" />
        <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        />
      </Layer>
      <Layer>
        <UseImage src="https://konvajs.org/assets/yoda.jpg" x={150} y={0} />
        <UseImage src={lotion} x={150} y={0} width={200}/>
      </Layer>
    </Stage>
    :
    <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      {
        drawItems
      }
      <Text text={`Object: ${shapes.length}`} fontSize={15} />

    </Layer>
    </Stage>

  )
}

