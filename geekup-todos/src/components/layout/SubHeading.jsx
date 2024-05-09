export default function SubHeading({ children }) {
  return (
    <section>
      <div className="flex gap-4 items-center mb-4">
        <h2 className="text-2xl font-semibold">{children}</h2>
        <hr className="flex-1 -mb-1" />
      </div>
    </section>
  );
}
