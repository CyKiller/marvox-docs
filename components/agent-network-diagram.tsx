"use client"

import React, { useState } from "react"

type AgentFamily = {
  name: string
  color: string
  agents: {
    name: string
    role: string
  }[]
}

const agentFamilies: AgentFamily[] = [
  {
    name: "Content Generation",
    color: "from-violet-500 to-purple-500",
    agents: [
      { name: "ReaderAgent", role: "Story Q&A with RAG + chapter citations" },
      { name: "CharacterAgent", role: "Canon-locked character roleplay" },
      { name: "WriterAgent", role: "Multi-character scene generation" },
      { name: "NarratorAgent", role: "Narrative framing & transitions" },
    ],
  },
  {
    name: "Quality Assurance",
    color: "from-blue-500 to-cyan-500",
    agents: [
      { name: "ContinuityAgent", role: "5-layer canon validation" },
      { name: "DialogueQualityAgent", role: "Naturalness scoring + revision" },
      { name: "EmotionalBeatAnalyzer", role: "Arc progression tracking" },
      { name: "ScenePacingOptimizer", role: "Dialogue-to-action ratio" },
    ],
  },
  {
    name: "Audio & Voice",
    color: "from-emerald-500 to-teal-500",
    agents: [
      { name: "VoiceSelectionAgent", role: "Trait → voice DNA mapping" },
      { name: "VoiceConfigurationAgent", role: "300+ voice configs" },
      { name: "AudioSceneAgent", role: "Dialogue block parsing" },
      { name: "AudioContinuityAgent", role: "5-layer audio QA gate" },
      { name: "VoiceCloningAgent", role: "Neural voice DNA cloning" },
      { name: "DNALearningEngine", role: "Voice DNA evolution (≥85%)" },
      { name: "VoiceVault", role: "IP-lock: signs + binds Voice DNA" },
    ],
  },
  {
    name: "Supporting",
    color: "from-yellow-500 to-orange-500",
    agents: [
      { name: "DirectorAgent", role: "Mood/pacing injection" },
      { name: "SummarizationAgent", role: "2-sentence memory compression" },
      { name: "QualityAnalysisAgent", role: "Text heuristics facade" },
      { name: "VoiceAgent", role: "Voice selection/config orchestration" },
      { name: "AudioAgent", role: "Audio parsing/QA orchestration" },
      { name: "AtmosphereAgent", role: "Atmospheric context injection" },
      { name: "ReactionAudioStreamAgent", role: "Live audio streaming" },
      { name: "CharacterParticipantManager", role: "Character reaction generation" },
    ],
  },
  {
    name: "Evolution & Consensus",
    color: "from-pink-500 to-rose-500",
    agents: [
      { name: "ConsensusAnalyzerAgent", role: "Multi-writer character consensus" },
      { name: "EmotionalArcEvolverAgent", role: "Personality evolution from reactions" },
    ],
  },
]

export default function AgentNetworkDiagram() {
  const [expandedFamily, setExpandedFamily] = useState<string | null>("Content Generation")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const totalAgents = agentFamilies.reduce((sum, family) => sum + family.agents.length, 0)

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Agent Network</h1>
        <p className="text-slate-400 mb-6">
          CharacterOS is powered by a multi-agent orchestrated network of {totalAgents}+ specialized agents organized into 5 families.
          Each agent excels at a specific task: content generation, quality assurance, audio production, supporting services, and personality evolution.
        </p>

        <div className="space-y-4">
          {agentFamilies.map((family) => (
            <div key={family.name} className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
              <button
                onClick={() => setExpandedFamily(expandedFamily === family.name ? null : family.name)}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                  expandedFamily === family.name ? "bg-slate-800" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${family.color}`}></div>
                  <h2 className="font-semibold text-white">{family.name}</h2>
                  <span className="text-xs text-slate-400 ml-2">({family.agents.length} agents)</span>
                </div>
                <span className="text-slate-400">{expandedFamily === family.name ? "−" : "+"}</span>
              </button>

              {expandedFamily === family.name && (
                <div className="border-t border-slate-700 bg-slate-950 p-4">
                  <div className="space-y-3">
                    {family.agents.map((agent) => (
                      <div
                        key={agent.name}
                        onClick={() => setSelectedAgent(selectedAgent === agent.name ? null : agent.name)}
                        className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors border border-slate-700"
                      >
                        <div className="font-mono text-sm font-semibold text-white mb-1">{agent.name}</div>
                        <p className="text-xs text-slate-400">{agent.role}</p>

                        {selectedAgent === agent.name && (
                          <div className="mt-3 pt-3 border-t border-slate-600">
                            <p className="text-xs text-slate-300">
                              <span className="font-semibold">Family:</span> {family.name}
                            </p>
                            <p className="text-xs text-slate-300 mt-1">
                              <span className="font-semibold">Status:</span> Production Ready
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Architecture & Orchestration</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎯 Core Orchestrator</h3>
            <p>
              <span className="text-slate-300 font-mono">AgentRuntime</span> in{" "}
              <span className="text-slate-300 font-mono">services/characteros/agent_runtime.py</span> is the central orchestrator. It's a{" "}
              <span className="text-blue-400">singleton</span> (always use <span className="text-blue-400">get_agent_runtime_singleton()</span> — never instantiate per-request).
              The runtime imports and manages all 25+ agents, lazy-initializing them on first use to minimize startup time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔄 Orchestration Patterns</h3>
            <p className="mb-2">
              Agents communicate through typed contracts, RAG retrieval, and shared memory bridges. Key patterns:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <span className="text-cyan-400">WriterAgent</span> → <span className="text-cyan-400">ContinuityAgent</span> (3-pass validation)
              </li>
              <li>
                <span className="text-emerald-400">CharacterAgent</span> → <span className="text-emerald-400">MemoryBridge</span> (memory persistence)
              </li>
              <li>
                <span className="text-violet-400">AudioSceneAgent</span> → <span className="text-violet-400">VoiceSelectionAgent</span> (voice mapping)
              </li>
              <li>
                <span className="text-orange-400">DirectorAgent</span> → <span className="text-orange-400">WriterAgent</span> (mood injection)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">📊 Agent Lifecycle</h3>
            <p>
              Each agent follows a consistent lifecycle: <span className="text-slate-300">initialization</span> (lazy on first use),{" "}
              <span className="text-slate-300">validation</span> (typed contracts at boundaries),{" "}
              <span className="text-slate-300">telemetry</span> (@traced decorator on all public methods),{" "}
              <span className="text-slate-300">error handling</span> (CharacterOSError codes),{" "}
              <span className="text-slate-300">memory persistence</span> (non-blocking MemoryBridge calls).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⚙️ Production Safety</h3>
            <p>
              All agents use <span className="text-slate-300 font-mono">sanitize_story_excerpts()</span> when handling RAG results,{" "}
              <span className="text-slate-300 font-mono">dump_validated()</span> for response contracts,{" "}
              <span className="text-slate-300 font-mono">@traced</span> for telemetry, and{" "}
              <span className="text-slate-300 font-mono">BatchEmbeddingService</span> for cached embeddings. Parallel TTS calls are guarded with{" "}
              <span className="text-slate-300 font-mono">asyncio.Semaphore(5)</span> to prevent memory exhaustion.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Agent Reference</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">📖 Content Generation (4)</h3>
            <p>
              These agents create story content: <span className="text-slate-300 font-mono">ReaderAgent</span> answers story questions with RAG,{" "}
              <span className="text-slate-300 font-mono">CharacterAgent</span> generates character dialogue locked to canon,{" "}
              <span className="text-slate-300 font-mono">WriterAgent</span> creates multi-character scenes (max 5), and{" "}
              <span className="text-slate-300 font-mono">NarratorAgent</span> adds narrative framing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">✅ Quality Assurance (4)</h3>
            <p>
              These agents validate content: <span className="text-slate-300 font-mono">ContinuityAgent</span> checks 5 layers (traits, relationships, timeline, dialogue, spoilers),{" "}
              <span className="text-slate-300 font-mono">DialogueQualityAgent</span> scores naturalness,{" "}
              <span className="text-slate-300 font-mono">EmotionalBeatAnalyzer</span> tracks character arcs, and{" "}
              <span className="text-slate-300 font-mono">ScenePacingOptimizer</span> balances action and dialogue.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">🎙️ Audio & Voice (7)</h3>
            <p>
              These agents handle voice and audio production: <span className="text-slate-300 font-mono">VoiceSelectionAgent</span> maps character traits to voice DNA,{" "}
              <span className="text-slate-300 font-mono">VoiceConfigurationAgent</span> adjusts 300+ voice settings (speed, pitch, emotion),{" "}
              <span className="text-slate-300 font-mono">AudioSceneAgent</span> parses dialogue and detects emotion per line,{" "}
              <span className="text-slate-300 font-mono">VoiceVault</span> IP-locks voice DNA to projects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">🔧 Supporting (8)</h3>
            <p>
              These agents provide orchestration and utility: <span className="text-slate-300 font-mono">DirectorAgent</span> injects mood and pacing,{" "}
              <span className="text-slate-300 font-mono">AtmosphereAgent</span> adds context about setting and tone,{" "}
              <span className="text-slate-300 font-mono">CharacterParticipantManager</span> generates character reactions in collaboration sessions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">🧠 Evolution & Consensus (2)</h3>
            <p>
              These agents enable personality growth: <span className="text-slate-300 font-mono">EmotionalArcEvolverAgent</span> computes character evolution from reactions,{" "}
              <span className="text-slate-300 font-mono">ConsensusAnalyzerAgent</span> detects when multiple writers describe the same character differently and synthesizes a unified voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
