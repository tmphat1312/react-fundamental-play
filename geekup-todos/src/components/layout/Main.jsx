import DoneTaskStatus from "../DoneTaskStatus";
import SelectUser from "../SelectUser";
import UserTaskList from "../UserTaskList";
import SubHeading from "./SubHeading";

export default function Main() {
  return (
    <main className="container p-16 space-y-6">
      <section>
        <SubHeading>User</SubHeading>
        <SelectUser />
      </section>
      <section>
        <SubHeading>Tasks</SubHeading>
        <UserTaskList />
      </section>
      <DoneTaskStatus />
    </main>
  );
}
