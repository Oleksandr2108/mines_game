interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <h1 className="text-(--textColor) uppercase leading-[150%] ">{text}</h1>
  );
};
export default Title;
