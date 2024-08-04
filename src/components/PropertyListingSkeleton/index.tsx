import './index.css';

export const PropertyListingSkeleton: React.FC = () => {
  return (
    <div className="property-listing-skeleton">
      <div className="skeleton-item">
        <div className="skeleton-title"></div>
        <div className="skeleton-address"></div>
        <div className="skeleton-rent"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-item">
        <div className="skeleton-title"></div>
        <div className="skeleton-address"></div>
        <div className="skeleton-rent"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-item">
        <div className="skeleton-title"></div>
        <div className="skeleton-address"></div>
        <div className="skeleton-rent"></div>
        <div className="skeleton-status"></div>
      </div>
    </div>
  );
};
