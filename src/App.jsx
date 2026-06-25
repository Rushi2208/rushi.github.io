import React, {useState} from 'react'
import { motion } from 'framer-motion'

const TerminalHeader = () => {
  const [uptime] = useState('12:34:56');
  return (
    <div className="header-terminal text-xs font-mono p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-phosphor">LOC: Bangalore</div>
        <div className="flex items-center gap-1"><span className="badge-live">LIVE</span><span className="text-white/70 font-mono"> TEMP: 42°C</span></div>
        <div className="text-white/60">UPTIME: {uptime}</div>
      </div>
      <nav className="font-mono text-white/80">
        <ul className="flex gap-4">
          <li>~/root/systems</li>
          <li>~/root/lens</li>
          <li>~/root/archives</li>
        </ul>
      </nav>
    </div>
  )
}

const VisualProbe = () => {
  const [hover, setHover] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div className={`probe ${hover? '' : 'probe-idle'}`} onHoverStart={()=>setHover(true)} onHoverEnd={()=>setHover(false)} whileHover={{ scale: 1.02 }}>
        {/* crosshair */}
        <div className="crosshair" />
        {/* when hovered, show colorful image; when idle show technical overlay */}
        {hover ? (
          <img src="/images/profile.jpg" alt="Rushikesh photography" />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/60">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="44" stroke="#00F0FF" strokeOpacity="0.14" strokeWidth="2" />
              <line x1="0" y1="60" x2="120" y2="60" stroke="#00F0FF" strokeOpacity="0.08" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#00F0FF" strokeOpacity="0.08" />
            </svg>
            <div className="metadata">Scope v1.2 · Crosshair locked · ISO: 100</div>
          </div>
        )}
      </motion.div>
      <div className="text-center">
        <h2 className="text-3xl font-display">Rushikesh Gadekar</h2>
        <p className="text-white/70 font-mono">Digital Design Engineer • Texas Instruments</p>
      </div>
    </div>
  )
}

const BentoCard = ({title,desc,icon})=>{
  return (
    <motion.div whileHover={{y:-8, boxShadow: '0 20px 40px rgba(0,240,255,0.08)'}} className="ic-card p-4 rounded-lg project-card">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-cyan-600 to-teal-400 flex items-center justify-center text-black font-bold">{icon}</div>
        <div>
          <h3 className="font-display text-lg">{title}</h3>
          <p className="text-white/70 text-sm">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function App(){
  return (
    <div className="min-h-screen body-grid crt-scanlines bg-obsidian text-white font-sans">
      <TerminalHeader />
      <main className="container mx-auto px-8 py-12 grid grid-cols-12 gap-8">
        <section className="col-span-7 flex items-center justify-center">
          <VisualProbe />
        </section>
        <aside className="col-span-5 flex flex-col gap-6">
          <div className="ic-card p-6 rounded-lg">
            <h4 className="font-display text-2xl mb-2">Lab Overview</h4>
            <p className="text-white/70 font-mono">I build automation for chip verification, embedded systems and prototype hardware. This lab interface surfaces live signals and recent experiments.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <BentoCard icon={'IC'} title={'AI Verification'} desc={'Data-driven test priority and regression selection.'} />
            <BentoCard icon={'FW'} title={'Embedded FW'} desc={'Low-power firmware for ARM/STM32 platforms.'} />
            <BentoCard icon={'PCB'} title={'PCB & Sensors'} desc={'Rapid prototyping and sensor integration.'} />
          </div>
        </aside>

        <section className="col-span-12 mt-6">
          <h3 className="font-display text-2xl mb-4">Projects & Experiments</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <BentoCard icon={'A1'} title={'Line-Follower 2.0'} desc={'PID control + sensor fusion for robust navigation.'} />
            <BentoCard icon={'D1'} title={'Data Logger'} desc={'Low power environmental logger with SD + LoRa.'} />
            <BentoCard icon={'R1'} title={'Rocket Avionics'} desc={'Telemetry, recovery & flight electronics.'} />
          </div>
        </section>
      </main>
    </div>
  )
}
