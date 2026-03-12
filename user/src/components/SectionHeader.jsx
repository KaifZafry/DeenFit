export default function SectionHeader({ tag, title, titleItalic, description, dark = false }) {
  return (
    <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
      {/* Tag */}
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className="w-6 sm:w-8 h-px bg-[#C9A84C]" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] font-[Montserrat] font-medium">
          {tag}
        </span>
        <div className="w-6 sm:w-8 h-px bg-[#C9A84C]" />
      </div>

      {/* Title */}
      <h2
        className={`font-cormorant-garamond text-head font-light text-head leading-[1.1] text-[36px] sm:text-[46px] lg:text-[58px] ${
          dark ? "text-[#ffffff]" : "text-[#0D0C0A]"
        }`}
      >
        {title}{" "}
        {titleItalic && (
          <em
            className={`italic ${dark ? "text-[#C9A84C]" : "text-[#8A7D6B]"}`}
          >
            {titleItalic}
          </em>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`text-[10px] text-para sm:text-[11px] mb-3 tracking-[0.08em] leading-[1.9] max-w-xs sm:max-w-sm mt-3 sm:mt-4 font-[Montserrat] font-light ${
            dark ? "text-[#D4C5A9]" : "text-[#807c76]"
          }`} style={{fontSize:'10px !important'}}
        >
          {description}
        </p>
      )}
    </div>
  );
}
