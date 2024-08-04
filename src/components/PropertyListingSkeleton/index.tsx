import { Skeleton } from '../Skeleton';
import './index.css';

export const PropertyListingSkeleton: React.FC = () => {
  return (
    <div className="property-listing-skeleton">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="skeleton-item">
          <Skeleton className="skeleton-title" height="24px" />
          <Skeleton className="skeleton-address" height="18px" />
          <Skeleton className="skeleton-rent" height="20px" width="50%" />
          <Skeleton className="skeleton-status" height="16px" width="30%" />
        </div>
      ))}
    </div>
  );
};
