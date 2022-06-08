import { useEffect, useRef } from "react";
import "./cube.scss";
interface CubeProps {
  position?: { x: number; y: number };
  size?: number;
  color?: string;
}
function Cube(props: CubeProps) {
  const cubeRef = useRef();
  useEffect(() => {
    if (props.position) {
      (cubeRef.current as HTMLElement).style.left = `${props.position.x}%`;
      (cubeRef.current as HTMLElement).style.top = `${props.position.y}%`;
    }
    if (props.size) {
      (cubeRef.current as HTMLElement).style.setProperty(
        "--height",
        `${props.size}px`
      );
      (cubeRef.current as HTMLElement).style.setProperty(
        "--width",
        `${props.size}px`
      );
    }
    if (props.color) {
      (cubeRef.current as HTMLElement).style.setProperty(
        "--color",
        `${props.color}`
      );
    }
  }, []);
  return (
    <div className="wrapper-cube" ref={cubeRef}>
      <div className="cube">
        <div className="top"></div>
        <div>
          <span id="i-0"></span>
          <span id="i-1"></span>
          <span id="i-2"></span>
          <span id="i-3"></span>
        </div>
      </div>
    </div>
  );
}

export default Cube;
