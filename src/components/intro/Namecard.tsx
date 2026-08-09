import { FacebookIcon, GithubIcon, GmailIcon } from '../Svgicon'

export const Namecard = () => {
  return (
    <div className="relative group p-1 rounded-2xl bg-linear-to-tr from-violet-500/20 via-transparent to-emerald-500/10 hover:from-violet-500/40 hover:to-emerald-500/30 transition-all duration-500">
      {/* Outer subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-violet-500/5 blur-xl group-hover:bg-violet-500/10 transition-all duration-500 pointer-events-none"></div>

      <div className="relative z-10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500">
        
        {/* Welcome Badge */}
        <div className="fade-in-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-6 tracking-wide select-none" style={{ animationDelay: '100ms' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          แฟ้มสะสมผลงาน
        </div>

        {/* Name / Title */}
        <div className="fade-in-up flex flex-col gap-1.5 mb-1" style={{ animationDelay: '200ms' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-linear-to-r from-emerald-400 via-teal-400 to-violet-500 bg-clip-text text-transparent pb-1">
            แทมมารีน ตาปราบ
          </h1>
          <span className="text-lg sm:text-xl font-semibold text-zinc-400/80 tracking-widest uppercase font-mono pl-0.5 select-none">
            Taemmarin Taprab
          </span>
        </div>

        {/* Role & Highlight */}
        <div className="fade-in-up mt-3 flex flex-wrap items-center gap-3" style={{ animationDelay: '300ms' }}>
          <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent uppercase tracking-wider">
            Game • Website Developer
          </span>
          <span className="hidden sm:inline h-1.5 w-1.5 rounded-full bg-teal-400"></span>
          <span className="text-zinc-400 text-sm font-medium">Aspiring Engineer</span>
        </div>

        {/* Bio Text */}
        <p className="fade-in-up mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal" style={{ animationDelay: '400ms' }}>
          จุดเริ่มต้นของดิฉันมาจากความอยากรู้อยากเห็นง่าย ๆ ว่าเว็บไซต์และเกมที่เล่นอยู่ทุกวันมันทำงานยังไงเบื้องหลัง ความสงสัยนั้นค่อย ๆ พาดิฉันเข้าสู่โลกของการเขียนโปรแกรมและ{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400 font-extrabold shadow-sm">
            "Computer Engineering"
          </span>{" "}
          อย่างเต็มตัว ตลอดเส้นทางที่ผ่านมา ดิฉันได้ลองผิดลองถูก ล้มบ้าง เรียนรู้บ้าง แต่สิ่งที่ไม่เคยเปลี่ยนคือความตั้งใจที่จะพัฒนาตัวเองให้เก่งขึ้นในทุก ๆ วัน
        </p>

        {/* Social Links */}
        <div className="fade-in-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '500ms' }}>
          <a
            href="https://www.facebook.com/taemmarin.taprab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-110"
            title="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="mailto:damnwork186@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-110"
            title="Gmail"
          >
            <GmailIcon />
          </a>
          <a
            href="https://github.com/KChronos000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-110"
            title="GitHub"
          >
            <GithubIcon />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Namecard
