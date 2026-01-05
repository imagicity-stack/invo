interface Props { params: { id: string } }
export default function ClientDetailPage({ params }: Props) {
  return <div className="text-slate-700">Client detail for {params.id}</div>;
}
