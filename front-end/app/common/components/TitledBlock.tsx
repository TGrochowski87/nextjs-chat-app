import "./components.scss";

interface Props {
  title?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}

const TitledBlock = ({ title, children, className }: Props) => {
  return (
    <section className={`block titled-block-space ${className}`}>
      {title && (
        <div className="top-bar">
          <h3>{title}</h3>
        </div>
      )}
      <div className="contents">{children}</div>
    </section>
  );
};

export default TitledBlock;
