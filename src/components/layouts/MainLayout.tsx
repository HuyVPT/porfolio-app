import { Outlet } from 'react-router-dom';
import Cube from '../cube/cube';
import FitNavBar from '../nav-bar/nav-bar';
import './MainLayout.scss';

const cubesProvider = [
  { position: { x: 5, y: 80 }, size: 75, color: '#f44336' },
  { position: { x: 15, y: 30 }, size: 150, color: '#ffa117' },
  { position: { x: 65, y: 30 }, size: 250, color: '#0fc70f' },
  { position: { x: 92, y: 70 }, size: 100, color: '#2196f3' },
  { position: { x: 35, y: 60 }, size: 125, color: '#b145e9' },
];
function MainLayout({ children }: any) {
  return (
    <div className="main-layout">
      <FitNavBar />
      <div className="page-content">
        <Outlet />
      </div>
      {cubesProvider.map((cube, index) => (
        <Cube key={`cube${index}`} position={cube.position} size={cube.size} color={cube.color}></Cube>
      ))}
    </div>
  );
}

export default MainLayout;
