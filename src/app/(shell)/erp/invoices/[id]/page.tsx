interface Props { params: { id: string } }
export default function InvoiceDetailPage({ params }: Props) {
  return <div className="text-slate-700">Invoice {params.id}</div>;
}
