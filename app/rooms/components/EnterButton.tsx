import Image from "next/image";
import ArrowRight from "assets/arrow-right.svg";
import Link from "next/link";

interface Props {
  roomId: number;
}

const EnterButton = ({ roomId }: Props) => {
  return (
    <Link
      href={{
        pathname: `/rooms/form`,
        query: {
          roomId: roomId,
        },
      }}>
      <div className="enter-button">
        <h3>Enter</h3>
        <Image src={ArrowRight} alt="" />
      </div>
    </Link>
  );
};

export default EnterButton;
