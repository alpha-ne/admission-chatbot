import { useState, useRef, useEffect } from "react";

const PROGRAMS = [
  { id: 1, name: "Computer Science", dept: "Engineering", gpa: 3.7, sat: 1400, deadline: "Jan 15", scholarships: ["Merit Award", "STEM Excellence"], tags: ["tech", "math", "analytical"] },
  { id: 2, name: "Business Administration", dept: "Business", gpa: 3.3, sat: 1200, deadline: "Feb 1", scholarships: ["Leadership Grant", "Dean's Award"], tags: ["leadership", "economics", "management"] },
  { id: 3, name: "Psychology", dept: "Arts & Sciences", gpa: 3.2, sat: 1150, deadline: "Feb 15", scholarships: ["Research Fellowship"], tags: ["people", "science", "research"] },
  { id: 4, name: "Nursing", dept: "Health Sciences", gpa: 3.5, sat: 1250, deadline: "Dec 1", scholarships: ["Healthcare Heroes Fund"], tags: ["healthcare", "science", "helping"] },
  { id: 5, name: "Mechanical Engineering", dept: "Engineering", gpa: 3.6, sat: 1380, deadline: "Jan 15", scholarships: ["Engineering Excellence", "STEM Excellence"], tags: ["tech", "math", "design"] },
  { id: 6, name: "English Literature", dept: "Arts & Sciences", gpa: 3.0, sat: 1100, deadline: "Mar 1", scholarships: ["Writing Award"], tags: ["writing", "creative", "analytical"] },
  { id: 7, name: "Data Science", dept: "Engineering", gpa: 3.6, sat: 1350, deadline: "Jan 15", scholarships: ["STEM Excellence", "Analytics Grant"], tags: ["tech", "math", "analytical"] },
  { id: 8, name: "Pre-Med / Biology", dept: "Health Sciences", gpa: 3.8, sat: 1450, deadline: "Nov 15", scholarships: ["Future Physicians Fund"], tags: ["healthcare", "science", "research"] },
];

const CHECKLIST = [
  { id: "transcript", label: "Official High School Transcript", icon: "📋" },
  { id: "sat", label: "SAT/ACT Scores", icon: "📝" },
  { id: "rec1", label: "Recommendation Letter #1", icon: "✉️" },
  { id: "rec2", label: "Recommendation Letter #2", icon: "✉️" },
  { id: "essay", label: "Personal Statement Essay", icon: "✍️" },
  { id: "activities", label: "Activities & Honors List", icon: "🏆" },
  { id: "fafsa", label: "FAFSA / Financial Aid Form", icon: "💰" },
  { id: "fee", label: "Application Fee / Waiver", icon: "💳" },
];

const ESSAY_TIPS = [
  "Start with a vivid scene or moment — not 'I have always wanted to...'",
  "Show, don't tell. Use specific details and anecdotes.",
  "Reflect genuinely: what did you LEARN, not just what happened?",
  "Keep your authentic voice — avoid trying to sound 'impressive'.",
  "Address challenges or failures with maturity and growth.",
  "Make admissions officers care about YOU, not just your achievements.",
  "Proofread three times. Then have someone else read it.",
];

const TOURS = [
  { name: "Engineering Hub", desc: "State-of-the-art labs and maker spaces", emoji: "⚙️", duration: "12 min" },
  { name: "Campus Center", desc: "Student union, dining, and social spaces", emoji: "🏛️", duration: "8 min" },
  { name: "Research Library", desc: "200,000+ volumes, study pods, digital labs", emoji: "📚", duration: "10 min" },
  { name: "Athletics Complex", desc: "Olympic pool, gym, sports courts", emoji: "🏟️", duration: "7 min" },
  { name: "Residence Halls", desc: "Modern dorms, lounges, dining halls", emoji: "🏠", duration: "9 min" },
];

function getAIResponse(message, context) {
  const msg = message.toLowerCase();
  
  if (msg.includes("gpa") || msg.includes("requirement") || msg.includes("qualify")) {
    return {
      text: "Great question! Requirements vary by program. Here's a quick overview:\n\n• **Engineering programs**: GPA 3.5+, SAT 1350+\n• **Health Sciences**: GPA 3.2–3.8 depending on specialty\n• **Business**: GPA 3.3+, SAT 1200+\n• **Arts & Sciences**: GPA 3.0+\n\nWould you like me to check your specific GPA against a program you're interested in?",
      suggestions: ["Check my GPA for CS", "Show all programs", "What if my GPA is low?"]
    };
  }
  if (msg.includes("essay") || msg.includes("personal statement") || msg.includes("write")) {
    return {
      text: "Essays are your chance to STAND OUT! Here are my top tips:\n\n" + ESSAY_TIPS.slice(0, 4).map(t => `• ${t}`).join("\n") + "\n\nWant to see all essay tips or get help brainstorming a topic?",
      suggestions: ["See all essay tips", "Common essay mistakes", "Brainstorm topics"]
    };
  }
  if (msg.includes("deadline") || msg.includes("when") || msg.includes("date")) {
    return {
      text: "Deadlines are critical — missing them means missing out! Key dates:\n\n• **Nov 15** — Pre-Med/Biology (earliest!)\n• **Dec 1** — Nursing\n• **Jan 15** — CS, Mechanical Engineering, Data Science\n• **Feb 1** — Business Administration\n• **Feb 15** — Psychology\n• **Mar 1** — English Literature\n\n💡 Pro tip: Apply 2 weeks BEFORE the deadline to avoid technical issues.",
      suggestions: ["Set a deadline reminder", "Show application checklist", "What's needed to apply?"]
    };
  }
  if (msg.includes("scholarship") || msg.includes("financial aid") || msg.includes("money") || msg.includes("cost")) {
    return {
      text: "There's more money available than most students realize! 💰\n\nYou may qualify for:\n• **STEM Excellence Scholarship** — for CS, Data Science, Engineering\n• **Merit Award** — GPA 3.7+ in any major\n• **Healthcare Heroes Fund** — Nursing & Pre-Med\n• **Dean's Award** — Top 10% of applicants\n• **FAFSA-based aid** — Available to all applicants!\n\nI can match you to scholarships based on your profile. Want to try?",
      suggestions: ["Match me to scholarships", "How much is tuition?", "Explain FAFSA"]
    };
  }
  if (msg.includes("tour") || msg.includes("campus") || msg.includes("visit")) {
    return {
      text: "Nothing beats seeing campus for yourself! 🏛️\n\nWe offer virtual tours of 5 key locations — no travel required. You can explore the Engineering Hub, Research Library, Residence Halls, and more.\n\nClick **Virtual Tours** in the top navigation to start exploring!",
      suggestions: ["Start virtual tour", "Schedule in-person visit", "See campus photos"]
    };
  }
  if (msg.includes("match") || msg.includes("recommend") || msg.includes("best program") || msg.includes("what should i study")) {
    return {
      text: "I'd love to help find your perfect program! 🎯\n\nTo recommend the best match, tell me:\n1. What subjects do you enjoy most?\n2. What kind of career interests you?\n3. What's your current GPA?\n\nOr click **Program Matcher** above for a quick interactive quiz!",
      suggestions: ["I like math and tech", "I want to work in healthcare", "I enjoy writing and arts"]
    };
  }
  if (msg.includes("math") && msg.includes("tech") || msg.includes("computer") || msg.includes("coding")) {
    return {
      text: "You sound like a perfect fit for our tech programs! 💻\n\n**Top matches for you:**\n• Computer Science (GPA 3.7+, Jan 15 deadline)\n• Data Science (GPA 3.6+, Jan 15 deadline)\n• Mechanical Engineering (GPA 3.6+, Jan 15 deadline)\n\nAll three qualify for the **STEM Excellence Scholarship**. Want more details on any of these?",
      suggestions: ["Tell me about CS", "Compare CS vs Data Science", "What jobs can I get?"]
    };
  }
  if (msg.includes("healthcare") || msg.includes("doctor") || msg.includes("nurse") || msg.includes("medical")) {
    return {
      text: "Healthcare programs open amazing career doors! 🏥\n\n**Your best options:**\n• **Pre-Med/Biology** — Most competitive (GPA 3.8+), leads to medical school\n• **Nursing** — Direct patient care, strong job market (GPA 3.5+)\n\n⚠️ Both have early deadlines — Nov 15 and Dec 1!\n\nBoth programs have dedicated scholarship funding. Want a detailed comparison?",
      suggestions: ["Compare Pre-Med vs Nursing", "What's the acceptance rate?", "See scholarship details"]
    };
  }
  if (msg.includes("checklist") || msg.includes("what do i need") || msg.includes("documents")) {
    return {
      text: "Here's your complete application checklist! ✅\n\nYou'll need: Official transcript, SAT/ACT scores, 2 recommendation letters, personal statement essay, activities list, FAFSA, and the application fee.\n\nClick **My Checklist** above to track your progress item by item — you can check things off as you complete them!",
      suggestions: ["Open my checklist", "How to get recommendations?", "When do I need SAT scores?"]
    };
  }

  return {
    text: "Thanks for your question! I'm here to help you navigate every step of the admissions process.\n\nHere are some popular topics I can help with:",
    suggestions: ["Program recommendations", "Application deadlines", "Scholarship matching", "Essay tips"]
  };
}

export default function AdmissionsBot() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to **Crestview University Admissions**! 🎓\n\nI'm your personal admissions guide. I can help you explore programs, track your application, find scholarships, and answer any questions 24/7.\n\nWhat would you like to explore today?",
      suggestions: ["Find my perfect program", "Check application deadlines", "Scholarship opportunities", "Tour the campus"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [interests, setInterests] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tourIdx, setTourIdx] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text, { gpa, sat, interests });
      setMessages(prev => [...prev, { role: "bot", ...response }]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  const toggleInterest = (tag) => {
    setInterests(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const runMatcher = () => {
    const gpaNum = parseFloat(gpa);
    const satNum = parseInt(sat);
    let results = PROGRAMS.filter(p => {
      const gpaOk = !gpa || gpaNum >= p.gpa - 0.3;
      const satOk = !sat || satNum >= p.sat - 100;
      const interestMatch = interests.length === 0 || interests.some(i => p.tags.includes(i));
      return gpaOk && satOk && interestMatch;
    }).sort((a, b) => {
      const aScore = (interests.filter(i => a.tags.includes(i)).length * 2) + (gpaNum >= a.gpa ? 1 : 0);
      const bScore = (interests.filter(i => b.tags.includes(i)).length * 2) + (gpaNum >= b.gpa ? 1 : 0);
      return bScore - aScore;
    }).slice(0, 4);
    setMatched(results);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedCount / CHECKLIST.length) * 100);

  const renderMessage = (msg, i) => {
    const isBot = msg.role === "bot";
    const parts = msg.text.split(/\*\*(.*?)\*\*/g);

    return (
      <div key={i} style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: "16px",
        animation: "fadeSlide 0.35s ease"
      }}>
        {isBot && (
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #1a3a5c, #2e6da4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, marginRight: 10, flexShrink: 0, marginTop: 4,
            boxShadow: "0 2px 8px rgba(46,109,164,0.3)"
          }}>🎓</div>
        )}
        <div style={{ maxWidth: "75%" }}>
          <div style={{
            background: isBot ? "#fff" : "linear-gradient(135deg, #1a3a5c, #2e6da4)",
            color: isBot ? "#1a2a3a" : "#fff",
            borderRadius: isBot ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
            padding: "12px 16px",
            fontSize: 14, lineHeight: 1.6,
            boxShadow: isBot ? "0 2px 12px rgba(0,0,0,0.08)" : "0 2px 12px rgba(26,58,92,0.25)",
            whiteSpace: "pre-line"
          }}>
            {parts.map((part, pi) => pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part)}
          </div>
          {isBot && msg.suggestions && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {msg.suggestions.map((s, si) => (
                <button key={si} onClick={() => sendMessage(s)} style={{
                  background: "white", border: "1.5px solid #2e6da4", color: "#2e6da4",
                  borderRadius: 20, padding: "4px 12px", fontSize: 12, cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.2s",
                  fontWeight: 500
                }}
                  onMouseEnter={e => { e.target.style.background = "#2e6da4"; e.target.style.color = "white"; }}
                  onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#2e6da4"; }}
                >{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const INTEREST_TAGS = [
    { label: "Technology", value: "tech", emoji: "💻" },
    { label: "Math", value: "math", emoji: "🔢" },
    { label: "Healthcare", value: "healthcare", emoji: "🏥" },
    { label: "Science", value: "science", emoji: "🔬" },
    { label: "Writing", value: "writing", emoji: "✍️" },
    { label: "Leadership", value: "leadership", emoji: "🌟" },
    { label: "Research", value: "research", emoji: "📊" },
    { label: "Creative", value: "creative", emoji: "🎨" },
  ];

  return (
    <div style={{
      fontFamily: "'Lora', Georgia, serif",
      background: "#f0f4f8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@400;500;600&display=swap');
        @keyframes fadeSlide { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #c5d4e3; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d2540 0%, #1a3a5c 50%, #1e4d7b 100%)",
        padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 20px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, background: "rgba(255,255,255,0.15)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, border: "1px solid rgba(255,255,255,0.2)"
          }}>🏛️</div>
          <div>
            <div style={{ color: "white", fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.2px" }}>Crestview University</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Admissions Assistant</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", animation: "blink 2s infinite" }}></div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }}>Online 24/7</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e2e8f0",
        display: "flex", overflowX: "auto",
        padding: "0 16px"
      }}>
        {[
          { id: "chat", label: "Chat", emoji: "💬" },
          { id: "matcher", label: "Program Matcher", emoji: "🎯" },
          { id: "checklist", label: "My Checklist", emoji: "✅" },
          { id: "essays", label: "Essay Tips", emoji: "✍️" },
          { id: "tours", label: "Virtual Tours", emoji: "🏛️" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 16px", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: activeTab === tab.id ? 600 : 400,
            color: activeTab === tab.id ? "#1a3a5c" : "#718096",
            borderBottom: activeTab === tab.id ? "2.5px solid #1a3a5c" : "2.5px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 6
          }}>
            <span>{tab.emoji}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", maxWidth: 760, width: "100%", margin: "0 auto", alignSelf: "stretch" }}>
              {messages.map(renderMessage)}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1a3a5c, #2e6da4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
                  <div style={{ background: "white", borderRadius: "4px 18px 18px 18px", padding: "12px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ display: "inline-block", width: 7, height: 7, background: "#2e6da4", borderRadius: "50%", margin: "0 2px", animation: `blink 1s ${i * 0.2}s infinite` }}></span>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ background: "white", borderTop: "1px solid #e2e8f0", padding: "12px 16px" }}>
              <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 10 }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask me anything about admissions..."
                  style={{
                    flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 24,
                    padding: "10px 18px", fontSize: 14, fontFamily: "'Source Sans 3', sans-serif",
                    outline: "none", background: "#f8fafc", color: "#1a2a3a",
                    transition: "border 0.2s"
                  }}
                  onFocus={e => e.target.style.border = "1.5px solid #2e6da4"}
                  onBlur={e => e.target.style.border = "1.5px solid #e2e8f0"}
                />
                <button onClick={() => sendMessage(input)} style={{
                  background: "linear-gradient(135deg, #1a3a5c, #2e6da4)",
                  color: "white", border: "none", borderRadius: 24,
                  padding: "10px 22px", cursor: "pointer", fontSize: 14,
                  fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
                  boxShadow: "0 2px 10px rgba(26,58,92,0.3)"
                }}>Send</button>
              </div>
            </div>
          </div>
        )}

        {/* PROGRAM MATCHER TAB */}
        {activeTab === "matcher" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20, maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <h2 style={{ fontFamily: "'Lora', serif", color: "#1a3a5c", marginBottom: 4 }}>Find Your Perfect Program</h2>
            <p style={{ color: "#718096", marginBottom: 24, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Tell us about yourself and we'll match you with your best-fit programs.</p>

            <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 6, fontFamily: "'Source Sans 3', sans-serif" }}>Your GPA (Unweighted)</label>
                  <input value={gpa} onChange={e => setGpa(e.target.value)} placeholder="e.g. 3.5"
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Source Sans 3', sans-serif", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 6, fontFamily: "'Source Sans 3', sans-serif" }}>SAT Score (optional)</label>
                  <input value={sat} onChange={e => setSat(e.target.value)} placeholder="e.g. 1300"
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Source Sans 3', sans-serif", outline: "none" }} />
                </div>
              </div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 10, fontFamily: "'Source Sans 3', sans-serif" }}>Your Interests</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {INTEREST_TAGS.map(tag => (
                  <button key={tag.value} onClick={() => toggleInterest(tag.value)} style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                    fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.2s",
                    background: interests.includes(tag.value) ? "#1a3a5c" : "white",
                    color: interests.includes(tag.value) ? "white" : "#4a5568",
                    border: interests.includes(tag.value) ? "1.5px solid #1a3a5c" : "1.5px solid #e2e8f0",
                  }}>{tag.emoji} {tag.label}</button>
                ))}
              </div>
              <button onClick={runMatcher} style={{
                background: "linear-gradient(135deg, #1a3a5c, #2e6da4)", color: "white",
                border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15,
                cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
                boxShadow: "0 4px 14px rgba(26,58,92,0.3)"
              }}>Match Me to Programs →</button>
            </div>

            {matched.length > 0 && (
              <div>
                <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a5c", marginBottom: 14 }}>Your Top Matches</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  {matched.map((p, i) => (
                    <div key={p.id} style={{
                      background: "white", borderRadius: 14, padding: 20,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      border: i === 0 ? "2px solid #2e6da4" : "1px solid #e8edf3",
                      position: "relative"
                    }}>
                      {i === 0 && <div style={{ position: "absolute", top: -10, right: 16, background: "#2e6da4", color: "white", borderRadius: 12, padding: "2px 12px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>BEST MATCH</div>}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 700, color: "#1a2a3a", marginBottom: 2 }}>{p.name}</div>
                          <div style={{ color: "#718096", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}>{p.dept}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: "#718096", fontFamily: "'Source Sans 3', sans-serif" }}>Deadline</div>
                          <div style={{ fontWeight: 600, color: "#1a3a5c", fontFamily: "'Source Sans 3', sans-serif" }}>{p.deadline}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}><span style={{ color: "#718096" }}>Min GPA: </span><strong>{p.gpa}</strong></div>
                        <div style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}><span style={{ color: "#718096" }}>Min SAT: </span><strong>{p.sat}</strong></div>
                      </div>
                      <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {p.scholarships.map(s => (
                          <span key={s} style={{ background: "#f0f7ff", color: "#2e6da4", borderRadius: 8, padding: "3px 10px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }}>💰 {s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKLIST TAB */}
        {activeTab === "checklist" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20, maxWidth: 700, margin: "0 auto", width: "100%" }}>
            <h2 style={{ fontFamily: "'Lora', serif", color: "#1a3a5c", marginBottom: 4 }}>Application Checklist</h2>
            <p style={{ color: "#718096", marginBottom: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Track every component of your application.</p>

            <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#4a5568", fontWeight: 600 }}>Overall Progress</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#2e6da4", fontWeight: 700 }}>{completedCount}/{CHECKLIST.length} complete</span>
              </div>
              <div style={{ background: "#e8edf3", borderRadius: 8, height: 10, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(90deg, #1a3a5c, #2e6da4)", height: "100%", width: `${progress}%`, borderRadius: 8, transition: "width 0.4s ease" }}></div>
              </div>
              <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: "#718096", fontFamily: "'Source Sans 3', sans-serif" }}>
                {progress === 100 ? "🎉 Application ready to submit!" : `${100 - progress}% remaining`}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {CHECKLIST.map(item => (
                <div key={item.id} onClick={() => setCheckedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                  style={{
                    background: "white", borderRadius: 12, padding: "16px 20px",
                    display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    border: checkedItems[item.id] ? "1.5px solid #4ade80" : "1.5px solid #e8edf3",
                    transition: "all 0.2s",
                    opacity: checkedItems[item.id] ? 0.8 : 1
                  }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: checkedItems[item.id] ? "#4ade80" : "white",
                    border: checkedItems[item.id] ? "none" : "2px solid #d1dce8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, transition: "all 0.2s", flexShrink: 0
                  }}>
                    {checkedItems[item.id] ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
                    color: checkedItems[item.id] ? "#718096" : "#1a2a3a",
                    textDecoration: checkedItems[item.id] ? "line-through" : "none",
                    flex: 1
                  }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ESSAYS TAB */}
        {activeTab === "essays" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20, maxWidth: 760, margin: "0 auto", width: "100%" }}>
            <h2 style={{ fontFamily: "'Lora', serif", color: "#1a3a5c", marginBottom: 4 }}>Essay Tips & Guidance</h2>
            <p style={{ color: "#718096", marginBottom: 24, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Craft an essay that makes admissions officers remember you.</p>

            <div style={{ display: "grid", gap: 14 }}>
              {ESSAY_TIPS.map((tip, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "18px 22px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "flex-start"
                }}>
                  <div style={{
                    width: 32, height: 32, background: "linear-gradient(135deg, #1a3a5c, #2e6da4)",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0,
                    fontFamily: "'Source Sans 3', sans-serif"
                  }}>{i + 1}</div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#2d3748", lineHeight: 1.6, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, #0d2540, #1a3a5c)", borderRadius: 16, padding: 24, marginTop: 24, color: "white" }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Need personalized essay help?</div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, opacity: 0.8, lineHeight: 1.6, margin: "0 0 16px" }}>Chat with our admissions assistant for feedback on your essay topic, structure, and voice.</p>
              <button onClick={() => setActiveTab("chat")} style={{
                background: "white", color: "#1a3a5c", border: "none", borderRadius: 10,
                padding: "10px 20px", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
                fontSize: 14, cursor: "pointer"
              }}>Open Chat →</button>
            </div>
          </div>
        )}

        {/* VIRTUAL TOURS TAB */}
        {activeTab === "tours" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20, maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <h2 style={{ fontFamily: "'Lora', serif", color: "#1a3a5c", marginBottom: 4 }}>Virtual Campus Tours</h2>
            <p style={{ color: "#718096", marginBottom: 24, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Explore Crestview's world-class facilities from anywhere.</p>

            <div style={{ display: "grid", gap: 14 }}>
              {TOURS.map((tour, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 16, padding: 20,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex", alignItems: "center", gap: 18,
                  cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                  border: showTour === i ? "2px solid #2e6da4" : "1px solid #e8edf3"
                }}
                  onClick={() => setShowTour(showTour === i ? false : i)}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ fontSize: 40 }}>{tour.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 700, color: "#1a2a3a", marginBottom: 3 }}>{tour.name}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#718096" }}>{tour.desc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#718096", fontFamily: "'Source Sans 3', sans-serif" }}>⏱ {tour.duration}</div>
                    <div style={{ marginTop: 6, background: "#2e6da4", color: "white", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }}>
                      {showTour === i ? "Close" : "▶ Start"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showTour !== false && (
              <div style={{
                marginTop: 20, background: "linear-gradient(135deg, #0d2540, #1e4d7b)",
                borderRadius: 16, padding: 32, textAlign: "center", color: "white",
                animation: "fadeSlide 0.3s ease"
              }}>
                <div style={{ fontSize: 60, marginBottom: 12 }}>{TOURS[showTour].emoji}</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  Welcome to the {TOURS[showTour].name}!
                </div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", opacity: 0.8, maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.6 }}>
                  {TOURS[showTour].desc}. This immersive virtual tour takes approximately {TOURS[showTour].duration} to complete and features 360° photography and video walkthroughs.
                </p>
                <button style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "white", borderRadius: 10, padding: "10px 24px", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                  🎥 Launch 360° Tour
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
