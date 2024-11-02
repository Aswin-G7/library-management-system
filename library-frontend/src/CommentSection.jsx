import '@fortawesome/fontawesome-free/css/all.min.css';
import './CommentSection.css';

const CommentSection = ({ comments }) => {
  return (
    <section className="content-item" id="comments">
      <h3>{comments.length} Comments</h3>
      {comments.map((comment, index) => (
        <div className="media" key={index}>
          <div className="media-body">
            <h4 className="media-heading">
              {comment.userName}
            </h4>
            <p>{comment.text}</p>
            <ul className="list-unstyled list-inline media-detail">
              <li>
                <i className="fas fa-calendar"></i> {new Date(comment.date).toLocaleDateString()}
              </li>
              <li>
                <i className="fas fa-thumbs-up"></i> {comment.likes}
              </li>
            </ul>
            <ul className="list-unstyled list-inline media-detail">
              <li>
                <button>Like</button>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CommentSection;
