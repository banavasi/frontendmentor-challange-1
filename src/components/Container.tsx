export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="flex-row">
        <div className="w-3/4 lg:w-2/5  mx-auto">{children}</div>
      </div>
    </div>
  );
}
