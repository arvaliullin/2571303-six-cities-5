type ReviewProps = {
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

function Review({ userName, userAvatar, rating, comment, date }: ReviewProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userAvatar} width="54" height="54" alt="User avatar" />
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })}</time>
      </div>
    </li>
  );
}

export default Review;
