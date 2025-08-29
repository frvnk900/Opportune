import strfill from  "./icons/star-y.png"
import str from  "./icons/star-d.png"

export default function renderStarRating(score) {
  const stars = [];
  const maxStars = 5;
  const rating = Math.round(score * maxStars); 

  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      stars.push(
        <img
          key={i}
          src={strfill}
          alt="★"
          style={{ width: 20, height: 20, marginRight: 2 }}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src={str}
          alt="☆"
          style={{ width: 20, height: 20, marginRight: 2 }}
        />
      );
    }
  }

  return <div style={{ display: "flex", alignItems: "center" }}>
    rating: {stars}
    
    </div>;
}
