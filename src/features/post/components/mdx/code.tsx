import classNames from "classnames";

type CodeProps = {
  children: React.ReactNode;
  showLineNumbers: string;
  fileName: string;
  id: string;
};

const Code = ({ fileName, showLineNumbers, id, children }: CodeProps) => {
  return (
    <>
      {fileName && <div className="w-full">{fileName}</div>}
      <code
        className={classNames("", {
          "line-numbers": showLineNumbers !== undefined,
        })}
        id={id}
      >
        {children}
      </code>
    </>
  );
};

export default Code;
