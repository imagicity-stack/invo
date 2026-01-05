interface Props { params: { id: string } }
export default function DealDetailPage({ params }: Props) {
  return <div className="text-slate-700">Deal detail for {params.id}</div>;
}
