export default function placeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-[100vh]">{children}</div>;
}
