import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.Button} type="button">
      Load more..
    </button>
  );
};
export default LoadMoreBtn;
