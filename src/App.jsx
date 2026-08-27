import { useEffect, useState } from 'react'
import './App.css'

const rakhis = [
  { id: 'kundan', name: 'Kundan Bloom', detail: 'Polki stones · silk thread', icon: '✦', color: '#d09a45' },
  { id: 'pearl', name: 'Pearl Garden', detail: 'Freshwater pearls · blush', icon: '❋', color: '#e8a8a1' },
  { id: 'rudraksha', name: 'Sacred Rudraksha', detail: 'Natural beads · vermilion', icon: '◉', color: '#a44f36' },
  { id: 'silk', name: 'Silk Heritage', detail: 'Hand-painted silk · saffron', icon: '✺', color: '#e28145' },
]
const gifts = [
  { id: 'watch', name: 'Classic timepiece', type: 'A little time for us', icon: '⌚' },
  { id: 'journal', name: 'Leather journal', type: 'For new chapters', icon: '▤' },
  { id: 'coffee', name: 'Single-origin coffee', type: 'Slow Sunday mornings', icon: '◒' },
  { id: 'plant', name: 'Jade plant', type: 'Something to grow', icon: '♧' },
  { id: 'earbuds', name: 'Wireless earbuds', type: 'For your soundtrack', icon: '◉' },
  { id: 'chocolate', name: 'Truffle collection', type: 'A little sweetness', icon: '⬟' },
  { id: 'gulab-jamun', name: 'Gulab jamun', type: 'Rose-scented and warm', icon: '●' },
  { id: 'kaju-katli', name: 'Kaju katli', type: 'Melt-in-the-mouth joy', icon: '◇' },
  { id: 'motichoor-ladoo', name: 'Motichoor ladoo', type: 'A festive golden bite', icon: '●' },
  { id: 'barfi', name: 'Assorted barfi', type: 'A classic sweet box', icon: '◆' },
  { id: 'kundan-tilak', name: 'Kundan tilak', type: 'Auspicious festive detail', icon: '✥' },
]
const suggestions = ['My favorite person, now and always.', 'Growing up with you made me better.', 'Here is to our bond that time cannot break.']
const humorousMessages = ['I tied this Rakhi, so snacks are officially my responsibility now.', 'You are my favorite sibling. Please do not tell the others.', 'Raksha Bandhan rule: you protect me, I choose the dessert.', 'Best brother ever, but still owes me a gift.', 'This Rakhi comes with unlimited sibling teasing.']
const savedDraft = () => {
  try { return JSON.parse(localStorage.getItem('rakhi-draft') || '{}') } catch { return {} }
}
const sharedGift = () => {
  try {
    const match = window.location.hash.match(/^#gift=(.+)$/)
    return match ? JSON.parse(decodeURIComponent(match[1])) : null
  } catch { return null }
}

function App() {
  const shared = sharedGift()
  const draft = shared || savedDraft()
  const [activeStep, setActiveStep] = useState(1)
  const [selectedRakhi, setSelectedRakhi] = useState(() => draft.rakhi || rakhis[0])
  const [actualMessage, setMessage] = useState(() => draft.message || 'Forever my protector')
  const [selectedGifts, setSelectedGifts] = useState(() => draft.gifts || ['watch', 'journal', 'chocolate'])
  const [recipient, setRecipient] = useState(() => draft.recipient || 'Isha')
  const [sender, setSender] = useState(() => draft.sender || 'Anaya')
  const [revealed, setRevealed] = useState(() => Boolean(shared))
  const [boxClosed, setBoxClosed] = useState(() => Boolean(shared))
  const [introMessage] = useState(() => humorousMessages[Math.floor(Math.random() * humorousMessages.length)])
  const [rakhiMoment, setRakhiMoment] = useState(() => Boolean(shared))
  const [copied, setCopied] = useState(false)
  const message = rakhiMoment ? introMessage : actualMessage

  useEffect(() => { localStorage.setItem('rakhi-draft', JSON.stringify({ rakhi: selectedRakhi, gifts: selectedGifts, message: actualMessage, recipient, sender })) }, [selectedRakhi, selectedGifts, actualMessage, recipient, sender])
  useEffect(() => {
    if (!revealed || !rakhiMoment) return undefined
    const timer = setTimeout(() => setRakhiMoment(false), 3000)
    return () => clearTimeout(timer)
  }, [revealed, rakhiMoment])

  const toggleGift = (id) => setSelectedGifts((current) => current.includes(id) ? current.filter((gift) => gift !== id) : [...current, id])
  const copyLink = async () => {
    const giftData = encodeURIComponent(JSON.stringify({ rakhi: selectedRakhi, gifts: selectedGifts, message, recipient, sender }))
    await navigator.clipboard?.writeText(`${window.location.origin}${window.location.pathname}#gift=${giftData}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const steps = ['Choose a rakhi', 'Make it yours', 'Pick the little things', 'Ready to reveal']

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="/" aria-label="Rakhii home"><span>ॐ</span><strong>Rakhii</strong></a><div className="top-note"><span className="status-dot" /> Your creation is saved locally</div><div className="top-right"><span className="maker-credit">Made By Monika <span aria-hidden="true">☺</span></span><button className="icon-button" type="button" aria-label="Toggle sound">♩</button></div></header>
      <section className="intro"><div><p className="eyebrow">A little celebration, made by you</p><h1>Make a moment<br /><em>they will keep.</em></h1></div><p className="intro-copy">Craft a personal Raksha Bandhan reveal with the little details that say everything.</p></section>
      <div className="workspace">
        <aside className="stepper"><p className="rail-label">YOUR CREATION</p>{steps.map((step, index) => <button key={step} className={`step ${activeStep === index + 1 ? 'active' : ''} ${activeStep > index + 1 ? 'done' : ''}`} onClick={() => setActiveStep(index + 1)} type="button"><span>{activeStep > index + 1 ? '✓' : `0${index + 1}`}</span>{step}<b>{activeStep === index + 1 ? '›' : ''}</b></button>)}<div className="rail-footer"><span>✦</span><p><strong>Made with love</strong><br />No accounts. No checkout.<br />Just a beautiful surprise.</p></div></aside>
        <section className="builder"><div className="builder-head"><div><p className="eyebrow">Step {activeStep} of 4</p><h2>{steps[activeStep - 1]}</h2></div><span className="progress-label">{activeStep * 25}% complete</span></div>
          {activeStep === 1 && <><p className="section-copy">Start with a rakhi that feels like them. Each one has a story.</p><div className="rakhi-grid">{rakhis.map((rakhi) => <button type="button" key={rakhi.id} className={`rakhi-card ${selectedRakhi.id === rakhi.id ? 'selected' : ''}`} onClick={() => setSelectedRakhi(rakhi)}><div className="rakhi-art" style={{ '--rakhi': rakhi.color }}><span>{rakhi.icon}</span></div><strong>{rakhi.name}</strong><small>{rakhi.detail}</small>{selectedRakhi.id === rakhi.id && <b className="check">✓</b>}</button>)}</div></>}
          {activeStep === 2 && <div className="message-panel"><label htmlFor="rakhi-message">Your message on the rakhi <span>{message.length}/50</span></label><textarea id="rakhi-message" maxLength="50" value={message} onChange={(event) => setMessage(event.target.value)} /><div className="suggestion-title"><span>Need a little inspiration?</span><button type="button" onClick={() => setMessage(suggestions[(suggestions.indexOf(message) + 1) % suggestions.length])}>Shuffle suggestion ↻</button></div><div className="suggestions">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setMessage(suggestion)}>{suggestion}</button>)}</div><div className="style-row"><button className="style-choice selected" type="button">Aa <span>Elegant script</span></button></div></div>}
          {activeStep === 3 && <><p className="section-copy">Pick a few thoughtful things to tuck inside. You can choose up to five.</p><div className="gift-grid">{gifts.map((gift) => <button type="button" key={gift.id} className={`gift-card ${selectedGifts.includes(gift.id) ? 'selected' : ''}`} onClick={() => toggleGift(gift.id)}><span className="gift-icon">{gift.icon}</span><span><strong>{gift.name}</strong><small>{gift.type}</small></span><b>{selectedGifts.includes(gift.id) ? '✓' : '+'}</b></button>)}</div></>}
          {activeStep === 4 && <div className="details-form"><p className="section-copy">One last detail. Who is this little surprise for?</p><label>Recipient name<input value={recipient} onChange={(event) => setRecipient(event.target.value)} /></label><label>From<input value={sender} onChange={(event) => setSender(event.target.value)} /></label><div className="tone-box"><span>✦</span><p>“The best gifts are the ones that feel like a little piece of home.”</p></div></div>}
          <div className="builder-actions"><button className="back-button" type="button" disabled={activeStep === 1} onClick={() => setActiveStep((step) => step - 1)}>← Back</button>{activeStep < 4 ? <button className="primary-button" type="button" onClick={() => setActiveStep((step) => step + 1)}>Continue <span>→</span></button> : <button className="primary-button reveal-button" type="button" onClick={() => { setRakhiMoment(true); setRevealed(true) }}>Reveal the surprise <span>✦</span></button>}</div>
        </section>
        <aside className="preview-column"><div className="preview-label"><span>LIVE PREVIEW</span><button type="button" aria-label="Expand preview">↗</button></div><div className="preview-card"><div className="preview-sparkle s1">✦</div><div className="preview-sparkle s2">✧</div><p className="preview-kicker">A little something for</p><h3>{recipient || 'someone special'}</h3><div className="box-lid"><span>{selectedRakhi.icon}</span></div><div className="hamper-box"><div className="ribbon" /><div className="box-inner"><div className="mini-rakhi" style={{ '--rakhi': selectedRakhi.color }}><i /> <b>{selectedRakhi.icon}</b> <i /></div><div className="mini-gifts">{selectedGifts.slice(0, 4).map((id) => <span key={id}>{gifts.find((gift) => gift.id === id)?.icon}</span>)}</div></div></div><p className="preview-message">“{message}”</p><div className="preview-line" /><p className="preview-from">with love, <strong>{sender || 'you'}</strong></p></div><div className="preview-meta"><span><b>{selectedGifts.length}</b> little things</span><span><b>1</b> personal note</span></div><button className="share-button" type="button" onClick={copyLink}>{copied ? 'Gift link copied ✓' : '⌁ Copy gift link'}</button></aside>
      </div>
      {revealed && <div className="reveal-overlay"><div className="confetti confetti-one">✦　❋　✧　✦　❋</div><div className="confetti confetti-two">✧　✦　❋　✧</div><div className="balloon balloon-one" /><div className="balloon balloon-two" /><div className="balloon balloon-three" /><button className="close-reveal" type="button" onClick={() => setRevealed(false)}>×</button>{rakhiMoment ? <div className="rakhi-intro" role="img" aria-label="Selected Rakhi and personal message"><p className="eyebrow">Your Rakhi, made personal</p><h2>{selectedRakhi.name}</h2><div className="rakhi-intro-art" style={{ '--rakhi': selectedRakhi.color }}><div className="intro-thread"><i /><span>{selectedRakhi.icon}</span><i /></div><div className="intro-glow" /><div className="intro-stars">✦　✧　✦</div></div><p className="intro-message">“{message}”</p><p className="intro-caption">A little piece of your heart, ready to be shared.</p></div> : boxClosed ? <><p className="eyebrow">A surprise for {recipient}</p><h2>Your gift has arrived</h2><div className="closed-gift-stage"><div className="closed-gift-glow" /><div className="closed-gift-lid">✦</div><div className="closed-gift-box"><span>✦</span></div></div><p className="open-prompt">A little something made just for you</p><button className="primary-button open-gift-button" type="button" onClick={() => setBoxClosed(false)}>Tap to open <span>✦</span></button></> : <><p className="eyebrow">Happy Raksha Bandhan</p><h2>{recipient}</h2><div className="surprise-stage"><div className="surprise-glow" /><div className="surprise-rakhi" style={{ '--rakhi': selectedRakhi.color }}><i /><span>{selectedRakhi.icon}</span><i /></div><p className="surprise-rakhi-name">{selectedRakhi.name}</p><div className="surprise-gifts">{selectedGifts.map((id) => { const gift = gifts.find((item) => id === item.id); return <div className="surprise-gift" key={id}><span>{gift?.icon}</span><small>{gift?.name}</small></div> })}</div></div><p className="reveal-message">“{message}”</p><p className="reveal-from">Made with love by {sender}</p><button className="primary-button" type="button" onClick={copyLink}>{copied ? 'Gift link copied ✓' : 'Share this moment ↗'}</button></>}</div>}
    </main>
  )
}
export default App
