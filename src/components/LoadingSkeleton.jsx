import "../css/Skeleton.css";

function LoadingSkeleton() {
  return (
    <div className="skeleton-grid">
      {[...Array(8)].map((_, index) => (
        <div className="skeleton-card" key={index}></div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
