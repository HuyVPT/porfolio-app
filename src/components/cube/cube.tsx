import { useEffect, useRef } from "react";
import "./cube.scss";
interface CubeProps {
  position?: { x: number; y: number };
  size?: number;
  color?: string;
}
function Cube(props: CubeProps) {
  const cubeRef = useRef(null);
  useEffect(() => {
    if (!cubeRef.current) return;
    const cubeEl = cubeRef.current as HTMLElement;
    if (props.position) {
      cubeEl.style.left = `${props.position.x}%`;
      cubeEl.style.top = `${props.position.y}%`;
    }
    if (props.size) {
      cubeEl.style.setProperty("--height", `${props.size}px`);
      cubeEl.style.setProperty("--width", `${props.size}px`);
    }
    if (props.color) {
      cubeEl.style.setProperty("--color", `${props.color}`);
    }
  }, [props.position, props.size, props.color]);
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
