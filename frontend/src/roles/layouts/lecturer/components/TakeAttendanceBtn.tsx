interface TakeAttendanceBtnProps {
  classHasStudents: undefined | boolean;
}

const TakeAttendanceBtn = ({ classHasStudents }: TakeAttendanceBtnProps) => {
  return (
    <button className={`btn-pri w-52 text-nowrap ${!classHasStudents ? 'bg-gray-400 hover:bg-gray-400 border-0' : ''}`} disabled={!classHasStudents}>
      Take attendance
    </button>
  );
};

export default TakeAttendanceBtn;
