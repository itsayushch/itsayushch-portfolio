const SectionHeading: React.FC<SectionHeadingTypes> = ({ title, subtitle, className }) => {
  return (
    <div className={`${className} flex flex-col items-center justify-center mt-30`}>
      <button className="group relative">
        <span className="bg-accent absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full group-hover:transition-all"></span>
        <h2 className="text-accent text-2xl font-bold tracking-[10]">{title}</h2>{' '}
      </button>
      {subtitle && <p className="text-tertiary-content mt-5 text-lg text-pretty">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading

interface SectionHeadingTypes {
  title: string
  subtitle?: string
  className?: string
}
