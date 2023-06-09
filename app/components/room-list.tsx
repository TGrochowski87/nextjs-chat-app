import "./room-list.scss";
import Image from "next/image";
import ArrowRight from "assets/arrow-right.svg";
import Person from "assets/person.svg";

const RoomList = () => {
  return (
    <section className="room-list-space block">
      <div className="top-bar">
        <h3>Chat Rooms</h3>
      </div>
      <div className="room-list">
        <div className="room-list-item">
          <div className="info-space">
            <h3>Room Name</h3>
            <div>
              <h3>12</h3>
              <Image src={Person} alt="People in room" width={24} height={24} />
            </div>
          </div>
          <div className="enter-button">
            <h3>Enter</h3>
            <Image src={ArrowRight} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomList;
