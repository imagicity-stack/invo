interface Props { params: { id: string } }
export default function ProposalDetailPage({ params }: Props) {
  return <div className="text-slate-700">Proposal {params.id}</div>;
}
