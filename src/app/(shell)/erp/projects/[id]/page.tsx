interface Props { params: { id: string } }
export default function ProjectDetailPage({ params }: Props) {
  return <div className="text-slate-700">Project {params.id}</div>;
}
