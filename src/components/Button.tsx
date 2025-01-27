interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button;
