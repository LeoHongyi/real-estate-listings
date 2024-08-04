import './index.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width, height, className }) => {
  return <div className={`skeleton ${className || ''}`} style={{ width, height }} />;
};
