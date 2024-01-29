import { EnsembleSection } from "@prisma/client"

export type CreateHeaderProps = {
  section: EnsembleSection
  setShowOptions: () => void
}

export default function CreateHeader(props: CreateHeaderProps) {
  const { section, setShowOptions } = props;
  
  return (
    <div data-testid="create-header">
      <div className="flex flex-row justify-between">
        <h3>{section.name}</h3>
        <button className="bg-indigo-600 text-white rounded px-2  shadow hover:bg-indigo-500" onClick={() => setShowOptions()}>Edit</button>
      </div>
      <p className="flex flex-row items-center text-sm text-slate-400">No calls made</p>
    </div>
  )
}