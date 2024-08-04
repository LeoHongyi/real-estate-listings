import { Skeleton } from '../Skeleton';
import './index.css';

export const PropertyDetailsSkeleton: React.FC = () => {
  return (
    <div className="property-details-skeleton">
      <Skeleton className="skeleton-title" height="32px" />
      <Skeleton className="skeleton-image" height="200px" />
      <div className="skeleton-info">
        {[1, 2, 3, 4].map((_, index) => (
          <Skeleton key={index} className="skeleton-info-item" height="24px" />
        ))}
      </div>
      {[1, 2, 3].map((_, index) => (
        <Skeleton key={index} className="skeleton-description" height="16px" />
      ))}
    </div>
  );
};
