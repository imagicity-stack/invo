interface Props { params: { id: string } }
export default function LeadDetailPage({ params }: Props) {
  return <div className="text-slate-700">Lead detail for {params.id}</div>;
}
