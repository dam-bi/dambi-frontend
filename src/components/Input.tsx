export default function Input({
  children,
  error,
}: {
  children: Readonly<React.ReactNode>;
  error: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 p-2.5 border rounded-xl bg-(--bg) w-full
        ${
          error
            ? "border-(--danger) text-(--danger) [&_svg]:stroke-(--danger)"
            : "border-(--border) text-(--ink) [&_svg]:stroke-(--muted)"
        }
        [&_input]:w-full 
        [&_input]:text-sm
        [&_input]:bg-(--bg) 
        [&_input]:placeholder:text-sm 
        [&_input]:placeholder:text-(--muted)
        [&svg]:size-5
        `}>
      {children}
    </div>
  );
}
