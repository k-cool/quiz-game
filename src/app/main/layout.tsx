export default function mainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-[100vh]">{children}</div>;
}
