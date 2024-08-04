import './index.css';

export const PropertyDetailsSkeleton: React.FC = () => {
  return (
    <div className="property-details-skeleton">
      <div className="skeleton-title"></div>
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-info-item"></div>
        <div className="skeleton-info-item"></div>
        <div className="skeleton-info-item"></div>
        <div className="skeleton-info-item"></div>
      </div>
      <div className="skeleton-description"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-description"></div>
    </div>
  );
};
