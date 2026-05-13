export function SkeletonLine({ className = "" }) {
  return <div className={"animate-pulse rounded-lg bg-cream-200/80 " + className} />;
}

export default function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-3xl border border-cream-200/80 bg-white/70 p-4">
      <SkeletonLine className="h-4 w-1/3" />
      <SkeletonLine className="h-3 w-full" />
      <SkeletonLine className="h-3 w-5/6" />
    </div>
  );
}
